'use client'

import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Questions } from '@/data/questions'

interface GameCardProps { }

export const GameCard: FC<GameCardProps> = ({ }) => {

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    return (
        <Card className='flex flex-col relative items-center p-4 mx-auto mt-36 w-3/5 shadow-md'>
            <div className="flex justify-start absolute left-2 underline">
                <span>Questions {currentQuestion + 1}/</span> {Questions.length}
            </div>
            <CardHeader className="space-y-1">
                <CardTitle className="mx-auto text-2xl cursor-pointer">{Questions[currentQuestion].questionText} 🔊</CardTitle>
                <CardDescription className='text-base'>
                    Please select the correct answer.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid w-3/4 gap-5 place-items-center ">
                {Questions[currentQuestion].answerOptions.map((answerOption, index) => (
                    <div key={index} className='w-full'>
                        <Button className='w-full' variant='outline'>{answerOption.answerText}</Button>

                    </div>

                ))}
            </CardContent>
            <CardFooter className='w-full'>
                {/* <Button className='w-full text-lg' variant='outline'>Check me</Button> */}
            </CardFooter>

        </Card>
    )
}