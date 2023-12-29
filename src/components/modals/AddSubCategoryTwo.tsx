"use client"

import * as z from "zod"

import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,

    Button,
    Input
} from "@/components/common"

type Props = {}

const formSchema = z.object({
    username: z.string().min(2).max(50),
})


function AddSubCategoryTwo({ }: Props) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger>  <button className="text-left">Sub Category 02</button> </DialogTrigger>
                <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                    <DialogHeader>
                        <DialogTitle className='font-medium'>Sub Category 02 Details</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddSubCategoryTwo