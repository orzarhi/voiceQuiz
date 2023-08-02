'use client'

import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Questions } from '@/data/questions'
import { textToSpeech } from '@/lib/utils'

interface GameCardProps { }

export const GameCard: FC<GameCardProps> = ({ }) => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const [game, setGame] = useState({
        currentQuestion: 0,
        score: 0,
        endGame: false,
        changeBackground: false
    });

    const handleAnswerClick = async (isCorrect: boolean) => {
        setGame({ ...game, changeBackground: !game.changeBackground })
        await delay(1000);
        if (isCorrect) {
            setGame({ ...game, score: game.score++ })
        }
        const nextQuestion = game.currentQuestion + 1;

        if (nextQuestion < Questions.length) {
            setGame({ ...game, changeBackground: !game.changeBackground })
            setGame({ ...game, currentQuestion: nextQuestion })

        } else setGame({ ...game, endGame: true })

    };

    return (
        <Card className=' flex-col relative items-center p-4 mx-auto mt-36 w-3/5 shadow-md'>
            <div className="flex justify-start">
                <span>Score: {game.score}</span>
            </div>
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="mx-auto text-2xl cursor-pointer" onClick={() => textToSpeech(Questions[game.currentQuestion].questionText)}>{Questions[game.currentQuestion].questionText} 🔊</CardTitle>
                <CardDescription className='text-base'>
                    Please select the correct answer.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid w-3/4 gap-5 place-items-center mx-auto">
                {Questions[game.currentQuestion].answerOptions.map((answerOption, index) => (
                    <div key={index} className='w-full'>
                        <Button
                            className={`w-full ${game.changeBackground && answerOption.isCorrect && 'bg-green-500'}`}
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
        </Card>
    )
}

