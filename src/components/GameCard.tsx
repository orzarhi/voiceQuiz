'use client'

import { Loading } from '@/components/Loading'
import { questionSets } from '@/config/questionSets'
import { useGame } from '@/hooks/use-game'
import { delay, randomAllQuestions, textToSpeech } from '@/lib/utils'
import { GameRequest } from '@/lib/validators/game'
import { useDropDownStore, useLevelStore } from '@/store'
import { CurrentGameType } from '@/types/game'
import { AnswerType, QuestionType } from '@/types/question'
import { motion } from "framer-motion"
import { RotateCcw } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Label } from './ui/Label'

interface GameCardProps { }

export const GameCard: FC<GameCardProps> = () => {
    const { dropDown } = useDropDownStore()
    const { level, setLevel } = useLevelStore()
    const { mutate: result, isLoading } = useGame()

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [game, setGame] = useState<CurrentGameType>({
        currentQuestion: 0,
        score: 0,
        endGame: false,
        changeBackground: false,
        selectedAnswer: null
    });

    useEffect(() => {
        if (!level) setLevel('Easy')
    }, []);

    useEffect(() => {
        handleNewGame();
        const questions = questionSets[level];
        if (questions) {
            setQuestions(questions);
        }
    }, [level]);

    const handleAnswerClick = async (isCorrect: boolean, index: number) => {
        if (isCorrect) new Audio("/audio/correct.mp3").play();
        else new Audio("/audio/incorrect.mp3").play();

        setGame(prevGame => ({
            ...prevGame,
            changeBackground: true,
            selectedAnswer: index,
            score: isCorrect ? prevGame.score + 1 : prevGame.score
        }));



        await delay(1500);

        setGame(prevGame => {
            const nextQuestion = prevGame.currentQuestion + 1;

            if (nextQuestion < questions.length) {
                return {
                    ...prevGame,
                    currentQuestion: nextQuestion,
                    changeBackground: false,
                    selectedAnswer: null
                };
            } else {
                const payload: GameRequest = {
                    score: prevGame.score,
                    level,
                    questionsLength: questions.length,
                    date: new Date()
                };

                result(payload);
                return {
                    ...prevGame,
                    endGame: true,
                    changeBackground: false,
                    selectedAnswer: null
                };
            }
        });
    };

    const handleNewGame = () => {
        randomAllQuestions(level);
        setGame(prevGame => ({
            ...prevGame,
            currentQuestion: 0,
            score: 0,
            endGame: false,
            changeBackground: false,
            selectedAnswer: null
        }));
    };

    if (isLoading) return <Loading />

    return (
        <main className={`${dropDown ? "blur-[1.5px]" : null}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                {!game.endGame ? (
                    <Card className='p-5 mt-10 shadow-lg sm:flex-col sm:relative sm:items-center sm:p-4 sm:mx-auto sm:mt-36 sm:w-3/5 shadow-black/40 dark:shadow-white/40'>
                        <div className="flex justify-between text-base sm:text-lg">
                            <span>Score: {game.score}</span>
                            <RotateCcw className='w-5 h-5 cursor-pointer' onClick={handleNewGame} />
                        </div>
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle
                                className="mx-auto text-2xl cursor-pointer"
                                onClick={() => {
                                    const questionText = questions[game.currentQuestion]?.questionText;
                                    if (questionText) {
                                        textToSpeech(questionText);
                                    }
                                }}>
                                {questions[game.currentQuestion]?.questionText} 🔊
                            </CardTitle>
                            <CardDescription className='text-base'>
                                {level === 'Hard' ? ' Choose the correct answer in the past.' : 'Choose the correct answer.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid w-full gap-5 mx-auto place-items-center">
                            {questions.length && questions[game.currentQuestion]?.answerOptions.map((answerOption: AnswerType, index: number) => (
                                <div key={index} className='w-full'>
                                    <Button
                                        className={`w-full ring-0 focus:ring-0 ${game.changeBackground && answerOption.isCorrect ? 'bg-green-500' :
                                            game.changeBackground && game.selectedAnswer === index && !answerOption.isCorrect ? 'bg-red-500' : ''
                                            }`}
                                        variant='outline'
                                        onClick={() => handleAnswerClick(answerOption.isCorrect, index)}>
                                        {answerOption.answerText}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className='flex justify-center w-full mt-5'>
                            <span>Questions: <span className='font-bold'>{game.currentQuestion + 1}</span>/{questions.length}</span>
                        </CardFooter>
                    </Card >
                ) : (
                    <div className='flex flex-col justify-center items-center h-[60vh] space-y-4 p-5 sm:p-10'>
                        <Label className='text-base sm:text-xl'>You scored {game.score} out of {questions.length} in the {level.toLowerCase()} level.</Label>
                        <Button className='w-full md:w-2/5' variant='outline' onClick={handleNewGame}>New Game</Button>
                    </div>
                )}
            </motion.div>
        </main>
    )
}
