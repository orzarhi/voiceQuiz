import React, { FC } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Label } from './ui/Label'

interface GameCardProps {

}

export const GameCard: FC<GameCardProps> = ({ }) => {
    return (
        <Card className='flex flex-col items-center p-3 mx-auto mt-36 w-3/5 shadow-md'>
            <CardHeader className="space-y-1">
                <CardTitle className="mx-auto text-2xl cursor-pointer">Create 🔊</CardTitle>
                <CardDescription className='text-base'>
                    Please select the correct answer.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid w-3/4 gap-5 place-items-center ">

                <Label className='text-lg'>ללכת</Label>
                <Label className='text-lg'>אמונה</Label>
                <Label className='text-lg'>ליצור</Label>
                <Label className='text-lg'>דרך</Label>

            </CardContent>
            <CardFooter className='w-full mt-5'>
                <Button className='w-full text-lg' variant='outline'>Check me</Button>
            </CardFooter>

        </Card>
    )
}