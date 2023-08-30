'use client'

import { Questions } from '@/data/questions'
import { delay, textToSpeech } from '@/lib/utils'
import { useDropDownStore } from '@/store'
import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'

export const GameCard = ({ }) => {
    const { dropDown } = useDropDownStore()

    const [game, setGame] = useState({
        currentQuestion: 0,
        score: 0,
        endGame: false,
        changeBackground: false
    });

    const handleAnswerClick = async (isCorrect: boolean) => {
        setGame({ ...game, changeBackground: true })

        if (isCorrect) new Audio("/audio/correct.mp3").play();
        else new Audio("/audio/incorrect.mp3").play();

        await delay(1000);

        if (isCorrect) {
            setGame({ ...game, score: game.score++ })
        }
        const nextQuestion = game.currentQuestion + 1;

        if (nextQuestion < Questions.length) {
            setGame({
                ...game,
                changeBackground: false,
                currentQuestion: nextQuestion
            })

        } else setGame({ ...game, endGame: true })
    };

    const handleNewGame = () => setGame({ ...game, currentQuestion: 0, score: 0, endGame: false, })

    return (
        <main className={`${dropDown ? "blur-[1.5px]" : null}`}>
            {!game.endGame ? (
                <Card className='mt-10 p-5 sm:flex-col sm:relative sm:items-center sm:p-4 sm:mx-auto sm:mt-36 sm:w-3/5 sm:shadow-md'>
                    <div className="flex justify-between sm:text-lg text-base">
                        <span>Score: {game.score}</span>
                        <RotateCcw className='w-5 h-5 cursor-pointer' onClick={handleNewGame} />
                    </div>
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle
                            className="mx-auto text-2xl cursor-pointer"
                            onClick={() => textToSpeech(Questions[game.currentQuestion].questionText)}>
                            {Questions[game.currentQuestion].questionText} 🔊
                        </CardTitle>
                        <CardDescription className='text-base'>
                            Choose the correct answer in the past.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid w-full gap-5 place-items-center mx-auto">
                        {Questions[game.currentQuestion].answerOptions.map((answerOption, index) => (
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
                        <span>Questions: <span className='font-bold'>{game.currentQuestion + 1}</span>/{Questions.length}</span>
                    </CardFooter>
                </Card >
            ) : (
                <div className='flex flex-col justify-center items-center h-[60vh] space-y-5 p-10'>
                    <h2 className='text-xl'>You scored {game.score} out of {Questions.length}.</h2>
                    <Button className='w-full md:w-2/5' variant='outline' onClick={handleNewGame}>New Game</Button>
                </div>
            )}
        </main>
    )
}

