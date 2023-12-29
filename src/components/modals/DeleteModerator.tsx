"use client"

import { useState } from 'react'

import { useRouter } from "next/navigation"
import { ToastAction } from "../common/ui/toast/toast";
import { useToast } from "../common/ui/toast/use-toast";

import axios from "axios"

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
    param: string
}

function DeleteModerator({ param }: Props) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    async function handleDeleteClick() {
        try {
            setIsLoading(true);

            const res = await axios.delete(`/admins/delete-admin/${param}`);

            setIsLoading(false)

            toast({
                variant: "default",
                title: "Success!",
                description: "You have successfully removed the moderator",
            });

            router.refresh()
            router.push('/moderators')
            window.location.reload();

            console.log(res)


        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.log("Error " + error)
            setIsLoading(false);
        }
    }

    const { toast } = useToast()

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant={'destructiveOutline'} type='submit' >Remove Moderator</Button>
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
                                <Button variant={'outline'}>Cancel</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction className='rounded-full inline-block w-auto h-auto p-0 m-0'>
                                <Button variant={'destructive'} onClick={handleDeleteClick} loading={isLoading}>Continue</Button>
                            </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteModerator