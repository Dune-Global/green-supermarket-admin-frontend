import React from 'react'
import axios from "axios";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
} from "@/components/common"

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

type Props = {
    param: number;
}

function DeleteCategory({ param }: Props) {

    const handleDeleteClick = () => {
        try {

        } catch (error) {

        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant={'destructiveOutline'} type='submit' >Remove Category</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='font-medium'>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this category and it&apos;s corresponding sub categories.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className='flex gap-2 flex-col md:flex-row'>
                            <AlertDialogCancel className='border-none rounded-full inline-block w-auto h-auto p-0 m-0'>
                                <Button variant={'outline'}>Cancel</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction className='rounded-full inline-block w-auto h-auto p-0 m-0'>
                                <Button onClick={handleDeleteClick} variant={'destructive'}>Continue</Button>
                            </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteCategory