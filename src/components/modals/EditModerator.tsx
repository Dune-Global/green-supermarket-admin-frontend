"use client"

import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { ToastAction } from "../common/ui/toast/toast";
import { useToast } from "../common/ui/toast/use-toast";

import axios from "axios"

import { addModeratorFormRows, moderatorRadioItems } from "@/data"

import * as z from "zod"

import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,

    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,

    RadioGroup,
    RadioGroupItem
} from "@/components/common"

import { DeleteModerator } from "@/components/modals"
import { IEditModeratorFormSchema } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

type Props = {
    param: string
}

const formSchema: z.ZodSchema<IEditModeratorFormSchema> = z
    .object({
        firstname: z.string().min(2).max(50).trim(),
        lastname: z.string().min(2).max(50).trim(),
        empId: z.string().min(1, { message: "should have at least one character" }).max(5, { message: "can't contain more than 4 characters" }).trim(),
        designation: z.string().min(2).max(50).trim(),
        email: z.string().email(),
        phoneNumber: z.string().min(10).max(10).trim(),
        role: z.enum(["MANAGER", "EMPLOYEE", "DELIVER"], {
            required_error: "Please select a role",
        }),
    })

const formStyles = {
    inputRow: "flex flex-col md:flex-row gap-2 w-full justify-between",
    inputCol: "w-full",
    inputLabel: "font-normal text-md",
    errorMessage: "text-red-400 font-medium text-sm",
    radioItems: "flex items-center space-x-2 space-y-0",
    radioInput: "focus-within:bg-green-400 text-gray-900 focus:text-gray-0 focus-visible:bg-green-400"
}


function EditModerator({ param }: Props) {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            empId: '',
            designation: '',
            email: '',
            phoneNumber: '',
        },
    })


    const handleDetails = async () => {
        setIsLoading(true)

        try {

            const res = await axios.get(`/admins/search-admins/${param}`)

            const details = res.data

            const { firstname, lastname, email, designation, empId, phoneNumber, role } = details
            console.log(details)

            const mod = { firstname, lastname, email, designation, empId, phoneNumber, role }
            console.log(mod)

            form.setValue('firstname', mod.firstname)
            form.setValue('lastname', mod.lastname);
            form.setValue('email', mod.email);
            form.setValue('designation', mod.designation);
            form.setValue('empId', mod.empId);
            form.setValue('phoneNumber', mod.phoneNumber);
            form.setValue('role', mod.role)

            setIsLoading(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }

    }

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {

            setIsLoading(true)

            const { firstname, lastname, empId, designation, email, phoneNumber, role } = values
            const reqdata = { firstname, lastname, email, designation, phoneNumber, role }

            const res = await axios.put(`/admins/${empId}`, reqdata)
            console.log(res)

            form.reset()

            console.log(reqdata)
            console.log(res)
            setIsLoading(false)

            router.push("/moderators")
            toast({
                variant: "default",
                title: "Success!",
                description: "You have successfully saved the changes.",
            });

            form.reset()
            router.refresh()
            window.location.reload();

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please enter valid details and try again. (ps: you cannot change the employee ID)",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.log("Error: " + error)
            setIsLoading(false)

        }
    }

    const handleRemoveModerator = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    const { toast } = useToast()

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant={"link"} onClick={handleDetails}>View Details</Button>
                </DialogTrigger>
                <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                    <DialogHeader>
                        <DialogTitle className='font-medium'>Moderator Details</DialogTitle>
                    </DialogHeader>
                    <div className='border-t-2 border-gray-50 py-2'>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                {addModeratorFormRows.map((row) => (
                                    <div key={row.id} className={`${formStyles.inputRow}`}>
                                        <div className={`${formStyles.inputCol}`}>
                                            <FormField
                                                control={form.control}
                                                name={row.col1Name}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={`${formStyles.inputLabel}`}>{row.col1Label}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={row.col1Placeholder} {...field} />
                                                        </FormControl>
                                                        <FormMessage className={`${formStyles.errorMessage}`} />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className={`${formStyles.inputCol}`}>
                                            <FormField
                                                control={form.control}
                                                name={row.col2Name}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={`${formStyles.inputLabel}`}>{row.col2Label}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={row.col2Placeholder} {...field} />
                                                        </FormControl>
                                                        <FormMessage className={`${formStyles.errorMessage}`} />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))
                                }

                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className={`${formStyles.inputLabel}`} >Access</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    key={form.watch("role")}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex gap-6"
                                                >
                                                    {
                                                        moderatorRadioItems.map((item) => (
                                                            <FormItem key={item.id} className={`${formStyles.radioItems}`}>
                                                                <FormControl>
                                                                    <RadioGroupItem value={item.value} className={`${formStyles.radioInput}`} />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {item.labelName}
                                                                </FormLabel>
                                                            </FormItem>

                                                        ))
                                                    }
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage className={`${formStyles.errorMessage}`} />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex flex-col md:flex-row gap-2 pt-3'>
                                    <Button type="submit" loading={isLoading}>Save Changes</Button>
                                    <button onClick={handleRemoveModerator}>
                                        <DeleteModerator param={param} />
                                    </button>
                                </div>
                            </form>
                        </Form>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditModerator