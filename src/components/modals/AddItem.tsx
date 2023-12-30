"use client"

import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ToastAction } from "../common/ui/toast/toast";
import { useToast } from "../common/ui/toast/use-toast";
import axios from "axios"

import * as z from "zod"

import {
    Button,
    Dialog,
    DialogClose,
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
} from "@/components/common"

import { MainDetails } from '@/data'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
axios.defaults.baseURL = BASE_URL;


type Props = {}

const formSchema = z
    .object({
        itemname: z.string().min(2).max(50).trim(),
        category: z.string({
            required_error: "Please select a category",
        }),
        subcategory01: z.string({
            required_error: "Please select a category",
        }),
        subcategory02: z.string({
            required_error: "Please select a category",
        }),
        itemdescription: z.string().min(2).max(150).trim(),
        price: z.string().min(2).max(50).trim(),
        unit: z.string({
            required_error: "Please select a unit",
        }),
        availability: z.string({
            required_error: "Please select the availability",
        }),
        instock: z.string().min(1).max(50).trim(),
        stockkeepingunit: z.string().min(1).max(50).trim(),
        brand: z.string({
            required_error: "Please select a brand",
        }),
        brandname: z.string({
            required_error: "Please enter a brand name",
        }),
        discount: z.string({
            required_error: "Please select a discount",
        }),
        percentage: z.string().min(1).max(3).trim(),
        discountstartdate: z.string({})

    })

const formStyles = {
    inputRow: "flex flex-col md:flex-row gap-2 w-full justify-between",
    inputCol: "w-full",
    inputLabel: "font-normal text-md",
    errorMessage: "text-red-400 font-medium text-sm",
    radioItems: "flex items-center space-x-2 space-y-0",
    radioInput: "focus-within:bg-green-400 text-gray-900 focus:text-gray-0 focus-visible:bg-green-400"
}


function AddItem({ }: Props) {

    const [file, setFile] = useState<File | null>(null);
    const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
    const [fileErrorMessage, setFileErrorMessage] = useState<boolean | null>(false);
    const [categoryImageUrl, setCategoryImageUrl] = useState<string | null>(null);
    const [imageLoader, setImageLoader] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setAllowSubmit(false);

        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileErrorMessage(false);
        } else {
            setImageLoader(!imageLoader);
            return
        }
    };

    const handleSaveClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        const formData = new FormData();
        setImageLoader(true);
        setAllowSubmit(false)

        if (file) {
            formData.append('file', file);
        } else {
            setFileErrorMessage(true);
            setImageLoader(false);
            return
        }

        try {

            const response = await axios.post('/file-storage/upload', formData);
            console.log(response.data);
            setCategoryImageUrl(response.data.imageUrl);
            setImageLoader(false);
            toast({
                variant: "default",
                title: "Success!",
                description: "Image uploaded successfully!",
            });
            setAllowSubmit(true);
            setFileErrorMessage(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please refresh the page and try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.error('Error:', error);
        }


    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (file === null || allowSubmit === false) {
            setFileErrorMessage(true);
            return
        } else {
            setAllowSubmit(true);
            console.log(values)
            console.log(categoryImageUrl)
        }

        setIsLoading(true);

        try {



            // const res = await axios.post("/main-category/add-category", reqData, {
            //     headers: {
            //         "imgUrl": categoryImageUrl
            //     }
            // })
            toast({
                variant: "default",
                title: "Success!",
                description: "You have successfully added a main category.",
            });
            window.location.reload();

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please enter valid details and try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.log("Error: " + error)
            setIsLoading(false);
        }
    }


    const { toast } = useToast();
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant={"outline"} className="border-green-400 rounded-full w-full">Add Item</Button>
                </DialogTrigger>
                <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                    <DialogHeader>
                        <DialogTitle className='font-medium'>Item Details</DialogTitle>
                    </DialogHeader>
                    <div className='border-t-2 border-gray-50 py-2'>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                <div className={`${formStyles.inputRow}`}>

                                </div>

                                <form>
                                    <FormLabel className={`${formStyles.inputLabel}`}>Category Image</FormLabel>
                                    <div className='flex flex-col md:flex-row md:items-end gap-2'>
                                        <input type="file" onChange={handleFileChange} className='flex h-10 w-full mt-2 rounded-md border border-input px-3 py-2 text-sm text-gray-200 ring-offset-background file:border-0 file:bg-transparent file:rounded-md file:px-2 file:py-[1px] file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        {fileErrorMessage && <p className='text-red-400 font-medium text-sm'>Please select and save an image</p>}
                                        <div className='mr-auto'>
                                            {
                                                imageLoader ? <Button loading >Saving...</Button> : <Button variant={"outline"} onClick={handleSaveClick}>Save Image</Button>
                                            }
                                        </div>
                                    </div>
                                </form>

                                <div className={`${formStyles.inputRow}`}>
                                    <div className={`${formStyles.inputCol}`}>
                                    </div>
                                </div>



                                <div className='flex gap-2 pt-3'>
                                    <Button type="submit" loading={isLoading}>Add Category</Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" onClick={() => {
                                            form.reset({
                                                itemname: "",
                                                category: "",
                                                subcategory01: "",
                                                subcategory02: "",
                                                itemdescription: "",
                                                price: "",
                                                unit: "",
                                                availability: "",
                                                instock: "",
                                                stockkeepingunit: "",
                                                brand: "",
                                                brandname: "",
                                                discount: "",
                                                percentage: "",
                                            })
                                            setFile(null);
                                            setFileErrorMessage(false);
                                        }}>Cancel</Button>
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

export default AddItem