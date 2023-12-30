"use client"

import * as z from "zod"

import React, { useEffect, useState } from 'react'

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
import { SubCat01Details } from "@/data"
import { useRouter } from "next/navigation"
import { MainCategory } from "@/types"
import axios from "axios";

import { ToastAction } from "../common/ui/toast/toast";
import { useToast } from "../common/ui/toast/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

type Props = {}

const formSchema = z.object({
    maincategoryid: z
        .string({
            required_error: "Please select a category",
        }),
    subcategoryid: z.string().min(1).max(50),
    subcategoryname: z.string().min(1).max(50),
    subcategorydescription: z.string().min(1).max(50),
})

function AddSubCategoryOne({ }: Props) {
    const router = useRouter()
    const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
    const [isLoading, setIsLoading] = useState(false)

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subcategoryid: "",
            subcategoryname: "",
            subcategorydescription: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true)

        const { maincategoryid, subcategoryid, subcategoryname, subcategorydescription } = values
        const mainCatIdNumber = parseInt(maincategoryid)
        const subCatIdNumber = parseInt(subcategoryid)

        const reqData = { subCatOneId: subCatIdNumber, subCatOneName: subcategoryname, subCatOneDescription: subcategorydescription, mainCategoryId: mainCatIdNumber }

        try {
            const res = await axios.post("/l1-category/add-category", reqData)
            console.log(res)

            setIsLoading(false)

            toast({
                variant: "default",
                title: "success!",
                description: "you have successfully added a L1 sub category.",
            });
            router.refresh()
            window.location.reload();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please enter valid details and try again. (ps: you cannot enter an existing category ID)",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.log("Error:" + error)
            setIsLoading(false)
        }


    }

    const { toast } = useToast()

    return (
        <>
            <Dialog>
                <DialogTrigger>  <Button variant={"secondary"} className="text-left">Sub Category 01</Button> </DialogTrigger>
                <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                    <DialogHeader>
                        <DialogTitle className='font-medium'>Sub Category 01 Details</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="maincategoryid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-normal text-md">Select Main Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select The Main Category" />
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

                                {SubCat01Details.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name={item.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-normal text-md" >{item.label}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={item.placeholder} {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-400 font-medium text-sm" />
                                            </FormItem>
                                        )}
                                    />
                                ))}

                                <div className="flex gap-2">
                                    <Button type="submit" loading={isLoading}>Submit</Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" onClick={() => form.reset({
                                            subcategoryid: "",
                                            subcategoryname: "",
                                            subcategorydescription: "",
                                        })}>Cancel</Button>
                                    </DialogClose>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddSubCategoryOne