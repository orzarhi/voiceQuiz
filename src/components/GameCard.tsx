import React, { FC } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'

interface GameCardProps {

}

export const GameCard: FC<GameCardProps> = ({ }) => {
    return (
        <Card className='flex flex-col items-center mt-10 p-3'>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create</CardTitle>
                <CardDescription>
                    Please select the correct answer.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">

            </CardContent>
            <CardFooter>
                <Button >Create account</Button>
            </CardFooter>

        </Card>
    )
}