/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Loading } from '@/components/Loading'
import { EasyQuestions, HardQuestions, MediumQuestions } from '@/data/questions'
import { useGame } from '@/hooks/use-game'
import { delay, randomAllQuestions, textToSpeech } from '@/lib/utils'
import { GameRequest } from '@/lib/validators/game'
import { useDropDownStore, useLevelStore } from '@/store'
import { CurrentGameType } from '@/types/game'
import { AnswerType, QuestionType } from '@/types/question'
import { motion } from "framer-motion"
import { RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Label } from './ui/Label'

export const GameCard = ({ }) => {
    const { dropDown } = useDropDownStore()
    const { level } = useLevelStore()

    const { mutate: result, isLoading } = useGame()

    const [questions, setQuestions] = useState<QuestionType | any>(EasyQuestions)

    const [game, setGame] = useState<CurrentGameType>({
        currentQuestion: 0,
        score: 0,
        endGame: false,
        changeBackground: false,
    });

    useEffect(() => {
        handleNewGame()

        if (level === 'Easy') {
            setQuestions(EasyQuestions)
        } else if (level === 'Medium') {
            setQuestions(MediumQuestions)
        }
        else if (level === 'Hard') {
            setQuestions(HardQuestions)
        }
    }, [level])


    const handleAnswerClick = async (isCorrect: boolean) => {
        setGame({ ...game, changeBackground: true })

        if (isCorrect) new Audio("/audio/correct.mp3").play();
        else new Audio("/audio/incorrect.mp3").play();

        await delay(1000);

        if (isCorrect) {
            setGame({ ...game, score: game.score++ })
        }
        const nextQuestion = game.currentQuestion + 1;

        if (nextQuestion < questions.length) {
            setGame({
                ...game,
                changeBackground: false,
                currentQuestion: nextQuestion
            })

        } else {
            const payload: GameRequest = {
                score: game.score,
                level,
                questionsLength: questions.length,
                date: new Date()
            }

            result(payload)
            setGame({ ...game, endGame: true })
        }
    };

    const handleNewGame = () => {
        randomAllQuestions()
        setGame({ ...game, currentQuestion: 0, score: 0, endGame: false })
    }

    if (isLoading) return <Loading />

    return (
        <main className={`${dropDown ? "blur-[1.5px]" : null}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                {!game.endGame ? (
                    <Card className='mt-10 p-5 sm:flex-col sm:relative sm:items-center sm:p-4 sm:mx-auto sm:mt-36 sm:w-3/5 shadow-lg shadow-black/40 dark:shadow-white/40'>
                        <div className="flex justify-between sm:text-lg text-base">
                            <span>Score: {game.score}</span>
                            <RotateCcw className='w-5 h-5 cursor-pointer' onClick={handleNewGame} />
                        </div>
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle
                                className="mx-auto text-2xl cursor-pointer"
                                onClick={() => textToSpeech(questions[game.currentQuestion].questionText)}>
                                {questions[game.currentQuestion].questionText} 🔊
                            </CardTitle>
                            <CardDescription className='text-base'>
                                {level === 'Medium' ? ' Choose the correct answer in the past.' : 'Choose the correct answer.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid w-full gap-5 place-items-center mx-auto">
                            {questions[game.currentQuestion].answerOptions.map((answerOption: AnswerType, index: number) => (
                                <div key={index} className='w-full'>
                                    <Button
                                        className={`w-full ${game.changeBackground && answerOption.isCorrect ? 'bg-green-500' : null}`}
                                        variant='outline'
                                        onClick={() => handleAnswerClick(answerOption?.isCorrect)}>
                                        {answerOption.answerText}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className='w-full flex justify-center mt-5'>
                            <span>Questions: <span className='font-bold'>{game.currentQuestion + 1}</span>/{questions.length}</span>
                        </CardFooter>
                    </Card >
                ) : (
                    <div className='flex flex-col justify-center items-center h-[60vh] space-y-4 p-5 sm:p-10'>
                        <Label className='text-base sm:text-xl'>You scored {game.score} out of {questions.length} in the {level.toLocaleLowerCase()} level.</Label>
                        <Button className='w-full md:w-2/5' variant='outline' onClick={handleNewGame}>New Game</Button>
                    </div>
                )}
            </motion.div>
        </main>
    )
}

