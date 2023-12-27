import React from 'react'

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


type Props = {}

function DeleteCategory({ }: Props) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant={'outline'} type='submit' >Remove Category</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='font-medium'>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this moderator account
                            and remove the data from the servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className='flex gap-2 flex-col md:flex-row'>
                            <AlertDialogCancel className='border-none rounded-full inline-block w-auto h-auto p-0 m-0'>
                                <Button variant={'destructiveOutline'}>Cancel</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction className='rounded-full inline-block w-auto h-auto p-0 m-0'>
                                <Button variant={'destructive'}>Continue</Button>
                            </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteCategory