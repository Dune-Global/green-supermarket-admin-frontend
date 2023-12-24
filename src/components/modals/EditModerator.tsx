"use client"

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

type Props = {
    param: string
}

const formSchema = z
    .object({
        firstname: z.string().min(2).max(50).trim(),
        lastname: z.string().min(2).max(50).trim(),
        empId: z.string().min(1, { message: "should have at least one character" }).max(5, { message: "can't contain more than 4 characters" }).trim(),
        designation: z.string().min(2).max(50).trim(),
        email: z.string().email(),
        phoneNumber: z.string().min(10).max(10).trim(),
        password: z.string().min(8, { message: "password must contain at least 8 characters" }).max(50, { message: "password can't contain more than 50 characters" }).trim(),
        confirmpassword: z.string().min(8, { message: "password must contain at least 8 characters" }).max(50, { message: "password can't contain more than 50 characters" }).trim(),
        role: z.enum(["MANAGER", "EMPLOYEE", "DELIVER"], {
            required_error: "Please select a role",
        }),
    })
    .refine((data) => data.password === data.confirmpassword, {
        path: ["confirmpassword"],
        message: "passwords don't match",
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

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            empId: '',
            designation: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmpassword: '',
        },
    })


    const handleDetails = async () => {
        setLoading(true)

        try {
            const moderator = await fetch(`https://658042866ae0629a3f54c662.mockapi.io/api/moderators/moderators/${param}`)
            const details = await moderator.json();
            const { name, email, designation, empId } = details
            console.log(details)
            const phoneNumber = "1234567898"
            const password = "12345678"
            const confirmpassword = "12345678"
            const role: "MANAGER" | "EMPLOYEE" | "DELIVER" = "MANAGER" as const;;

            const mod = { firstname: name.split(" ")[0], lastname: name.split(" ")[1], email, designation, empId, phoneNumber, password, confirmpassword, role }
            console.log(mod)

            form.setValue('firstname', mod.firstname)
            form.setValue('lastname', mod.lastname);
            form.setValue('email', mod.email);
            form.setValue('designation', mod.designation);
            form.setValue('empId', mod.empId);
            form.setValue('phoneNumber', mod.phoneNumber);
            form.setValue('password', mod.password);
            form.setValue('confirmpassword', mod.confirmpassword);
            form.setValue('role', mod.role)

            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }


    }

    function onSubmit(values: z.infer<typeof formSchema>) {

        const { firstname, lastname, empId, designation, email, phoneNumber, password, role } = values
        const reqdata = { empId, firstname, lastname, email, password, designation, phoneNumber, role }

        form.reset()

        console.log(reqdata)
    }

    const handleEyeClickPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleEyeClickConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleRemoveModerator = (e: React.MouseEvent) => {
        e.preventDefault()
    }


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
                                <div className={`${formStyles.inputRow}`}>
                                    <div className={`${formStyles.inputCol}`}>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={`${formStyles.inputLabel}`} >Password</FormLabel>
                                                    <div className='relative'>
                                                        <FormControl>
                                                            <Input type={showPassword ? "text" : "password"} placeholder="Password"  {...field} />
                                                        </FormControl>
                                                        <button
                                                            className="absolute right-2 top-[0.65rem] text-xl"
                                                            type="button"
                                                            onClick={handleEyeClickPassword}
                                                        >
                                                            {showPassword ? <EyeOff size={22} strokeWidth={2} className='text-gray-200' /> : <Eye size={22} strokeWidth={2} className="text-gray-200" />}
                                                        </button>
                                                    </div>
                                                    <FormMessage className={`${formStyles.errorMessage}`} />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className={`${formStyles.inputCol}`}>
                                        <FormField
                                            control={form.control}
                                            name="confirmpassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={`${formStyles.inputLabel}`}>Confirm Password</FormLabel>
                                                    <div className='relative'>
                                                        <FormControl>
                                                            <Input type={showConfirmPassword ? "text" : "password"} placeholder="Password"  {...field} />
                                                        </FormControl>
                                                        <button
                                                            className="absolute right-2 top-[0.65rem] text-xl"
                                                            type="button"
                                                            onClick={handleEyeClickConfirmPassword}
                                                        >
                                                            {showConfirmPassword ? <EyeOff size={22} strokeWidth={2} className='text-gray-200' /> : <Eye size={22} strokeWidth={2} className="text-gray-200" />}
                                                        </button>
                                                    </div>
                                                    <FormMessage className={`${formStyles.errorMessage}`} />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
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
                                    {
                                        loading ? (<Button type="submit" loading>Loading...</Button>) : (<Button type="submit">Save Changes</Button>)

                                    }
                                    <button onClick={handleRemoveModerator}>
                                        <DeleteModerator />
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