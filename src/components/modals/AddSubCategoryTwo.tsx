"use client"

import * as z from "zod"

import React, { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,

    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,

    Button,
    Input,
    DialogClose
} from "@/components/common"

import { MainCategory, SubCategoryOne } from "@/types"
import axios from "axios";

import { ToastAction } from "../common/ui/toast/toast";
import { useToast } from "../common/ui/toast/use-toast";
import { SubCat02Details } from "@/data"

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

type Props = {}

const formSchema01 = z.object({
    maincategoryid: z
        .string({
            required_error: "Please select a category",
        }),
})

const formSchema02 = z.object({
    subcategoryone: z.
        string({
            required_error: "Please select a category"
        }),
    subcategoryid: z.string().min(1).max(50),
    subcategoryname: z.string().min(1).max(50),
    subcategorydescription: z.string().min(1).max(50),
})


function AddSubCategoryTwo({ }: Props) {
    const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryOne[]>([]);
    const [isSaveLoading, setIsSaveLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMaincategorySelected, setIsMainCategorySelected] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {

                const { data } = await axios.get("/main-category/all-categories")
                setMainCategories(data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])


    const form01 = useForm<z.infer<typeof formSchema01>>({
        resolver: zodResolver(formSchema01),
        defaultValues: {
        },
    })

    const form02 = useForm<z.infer<typeof formSchema02>>({
        resolver: zodResolver(formSchema02),
        defaultValues: {
            subcategoryid: "",
            subcategoryname: "",
            subcategorydescription: "",
        },
    })

    async function onSubmitOne(values: z.infer<typeof formSchema01>) {
        setIsSaveLoading(true)

        const { maincategoryid } = values
        const id = parseInt(maincategoryid)

        try {
            const { data } = await axios.get(`/l1-category/main-category/${id}`)
            setSubCategories(data)

            setIsSaveLoading(false)
            toast({
                variant: "default",
                title: "success!",
                description: "saved successfully.",
            });

            setIsMainCategorySelected(true)
        } catch (error) {
            console.log("Error" + error)
            setIsSaveLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please refresh and try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    async function onSubmitTwo(values: z.infer<typeof formSchema02>) {
        try {
            setIsLoading(true)
            const { subcategoryone, subcategoryid, subcategoryname, subcategorydescription } = values
            const reqData = { subCatTwoId: subcategoryid, subCatTwoName: subcategoryname, subCatTwoDescription: subcategorydescription, subCatOneId: subcategoryone }

            const res = await axios.post("/l2-category/add-category", reqData)

            setIsLoading(false)
            toast({
                variant: "default",
                title: "success!",
                description: "L2 Sub Category added successfully",
            });
            window.location.reload();
        } catch (error) {
            console.log("Error:" + error)
            setIsLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please refresh and try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }

    }


    const { toast } = useToast()
    return (
        <>
            <Dialog>
                <DialogTrigger>  <Button variant={"secondary"} className="text-left">Sub Category 02</Button> </DialogTrigger>
                <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                    <DialogHeader>
                        <DialogTitle className='font-medium'>Sub Category 02 Details</DialogTitle>
                    </DialogHeader>
                    <div className="border-t-2 border-gray-50 pt-2">
                        <Form {...form01}>
                            <form onSubmit={form01.handleSubmit(onSubmitOne)} className="space-y-2 mb-2 flex flex-col md:flex-row md:items-end md:gap-2 ">
                                <FormField
                                    control={form01.control}
                                    name="maincategoryid"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="font-normal text-md">Main Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Please select and save a main category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-gray-0">
                                                    {mainCategories.map((category) => (
                                                        <SelectItem key={category.mainCategoryId} value={category.mainCategoryId.toString()}>
                                                            {category.mainCategoryName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-400 font-medium text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" variant={"outline"} loading={isSaveLoading}>Save Category</Button>
                            </form>
                        </Form>

                        <Form {...form02}>
                            <form onSubmit={form02.handleSubmit(onSubmitTwo)} className="space-y-3">
                                <FormField
                                    control={form02.control}
                                    name="subcategoryone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-normal text-md">L1 Sub Category</FormLabel>
                                            <Select disabled={!isMaincategorySelected} onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a subcategory" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-gray-0">
                                                    {subCategories && subCategories.map((category) => (
                                                        <SelectItem key={category.subCatOneId} value={category.subCatOneId.toString()}>
                                                            {category.subCatOneName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-400 font-medium text-sm" />
                                        </FormItem>
                                    )}
                                />

                                {SubCat02Details.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form02.control}
                                        name={item.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-normal text-md" >{item.label}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={item.placeholder} {...field} disabled={!isMaincategorySelected} />
                                                </FormControl>
                                                <FormMessage className="text-red-400 font-medium text-sm" />
                                            </FormItem>
                                        )}
                                    />
                                ))}

                                <div className="flex gap-2 pt-2 ">
                                    <Button loading={isLoading} type="submit">Submit</Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" onClick={() => {
                                            form01.reset({
                                                maincategoryid: "",
                                            })
                                            form02.reset({
                                                subcategoryone: "",
                                                subcategoryid: "",
                                                subcategoryname: "",
                                                subcategorydescription: "",
                                            })
                                            window.location.reload()
                                        }
                                        }>Cancel</Button>
                                    </DialogClose>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default AddSubCategoryTwo
