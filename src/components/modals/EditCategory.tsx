"use client"

import React, { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

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

    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    DialogClose,
} from "@/components/common"

import { MainDetails } from '@/data'
import { DeleteCategory } from '@/components/modals'
import { getMainAndSubById } from '@/utils/getMainAndSubById'
import { IMainCategory } from '@/types'

type Props = { param: number }

const formSchema = z
    .object({
        maincategory: z.string().min(2).max(50).trim(),
        subcategory01: z.string({
            required_error: "Sub category one is required",
        }),
        subcategory02: z.string({
            required_error: "Sub category one is required",
        })
    })

const formStyles = {
    inputRow: "flex flex-col md:flex-row gap-2 w-full justify-between",
    inputCol: "w-full",
    inputLabel: "font-normal text-md",
    errorMessage: "text-red-400 font-medium text-sm",
    radioItems: "flex items-center space-x-2 space-y-0",
    radioInput: "focus-within:bg-green-400 text-gray-900 focus:text-gray-0 focus-visible:bg-green-400"
}



function EditCategory({ param }: Props) {
    const [subCategoryOnes, setSubCategoryOnes] = useState<string[]>([]);
    const [categoryTwos, setCategoryTwos] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maincategory: "",
            subcategory01: "",
            subcategory02: "",
        },
    })

    const handleDetails = async () => {
        try {

            const data = await getMainAndSubById(param);

            if (data.length > 0) {
                const { mainCategoryId, mainCategoryName, mainCategoryDesc, imgUrl, categoryOnes } = data[0];

                form.setValue("maincategory", mainCategoryName);

                // Set subCategoryOnes state
                setSubCategoryOnes(categoryOnes.map((categoryOne) => categoryOne.subCatOneName));

                // Set categoryTwos state
                const allCategoryTwos = categoryOnes.flatMap((categoryOne) => categoryOne.categoryTwos);
                setCategoryTwos(allCategoryTwos.map((categoryTwo) => categoryTwo.subCatTwoName));
            }

        } catch (error) {

        }
    }


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"link"} onClick={handleDetails}>View Details</Button>
            </DialogTrigger>
            <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                <DialogHeader>
                    <DialogTitle className='font-medium'>Edit Categories</DialogTitle>
                </DialogHeader>
                <div className='border-t-2 border-gray-50 py-2'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="maincategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Main Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subcategory01"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sub Category 01</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="View L1 Sub Categories" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='bg-gray-0'>
                                                {subCategoryOnes.map((subCategoryOne) => (
                                                    <SelectItem key={subCategoryOne} value={subCategoryOne}>
                                                        {subCategoryOne}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {categoryTwos.length > 0 && ( // Render only if categoryTwos are available
                                <FormField
                                    control={form.control}
                                    name="subcategory02"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sub Category 02</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!categoryTwos.length}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="View L2 Sub Categories" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className='bg-gray-0'>
                                                    {categoryTwos.map((categoryTwo) => (
                                                        <SelectItem key={categoryTwo} value={categoryTwo}>
                                                            {categoryTwo}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <div className="flex flex-col md:flex-row gap-2 pt-2">
                                <Button type="submit">Edit Details</Button>
                                <DeleteCategory param={param} />
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditCategory