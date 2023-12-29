"use client"

import React, { useState } from 'react'
import axios from "axios";

import { ToastAction } from "../common/ui/toast/toast";
import { useToast } from "../common/ui/toast/use-toast";

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
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteClick = async () => {
        setIsLoading(true);
        try {
            const res = await axios.delete(`/main-category/delete-category/${param}`);
            console.log(res)

            setIsLoading(false);
            toast({
                variant: "default",
                title: "Success!",
                description: "You have successfully saved the changes.",
            });

            window.location.reload();

        } catch (error) {

            console.log("Error: " + error)
            setIsLoading(false);

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please enter valid details and try again. (ps: you cannot change the employee ID)",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    const { toast } = useToast();
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
                                <Button loading={isLoading} onClick={handleDeleteClick} variant={'destructive'}>Continue</Button>
                            </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteCategory