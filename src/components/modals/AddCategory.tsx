"use client"

import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"

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
import { MainDetails } from '@/data/category-forms/main-details'


type Props = {}

const formSchema = z
    .object({
        categoryid: z.string().min(2).max(5).trim(),
        categoryname: z.string().min(2).max(50).trim(),
        description: z.string().min(2).max(50).trim(),
        category1id: z.string().min(2).max(5).trim(),
        category1name: z.string().min(2).max(50).trim(),
        category2id: z.string().min(2).max(5).trim(),
        category2name: z.string().min(2).max(50).trim(),
    })

const formStyles = {
    inputRow: "flex flex-col md:flex-row gap-2 w-full justify-between",
    inputCol: "w-full",
    inputLabel: "font-normal text-md",
    errorMessage: "text-red-400 font-medium text-sm",
    radioItems: "flex items-center space-x-2 space-y-0",
    radioInput: "focus-within:bg-green-400 text-gray-900 focus:text-gray-0 focus-visible:bg-green-400"
}


function AddCategory({ }: Props) {

    const [file, setFile] = useState<File | null>(null);
    const [categoryImageUrl, setCategoryImageUrl] = useState<string | null>(null);
    const [imageLoader, setImageLoader] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setImageLoader(!imageLoader);
            return
        }
    };

    const handleSaveClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        const formData = new FormData();
        setImageLoader(true);

        if (file) {
            formData.append('file', file);
        }

        await fetch('https://greensupermarket-backend.azurewebsites.net/api/v1/file-storage/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCategoryImageUrl(data.imageUrl);
                setImageLoader(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryid: '',
            categoryname: '',
            description: '',
            category1id: '',
            category1name: '',
            category2id: '',
            category2name: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        console.log(categoryImageUrl)
    }




    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant={"outline"} className="border-green-400 text-green-600 rounded-full">Add New</Button>
                </DialogTrigger>
                <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                    <DialogHeader>
                        <DialogTitle className='font-medium'>Category Details</DialogTitle>
                    </DialogHeader>
                    <div className='border-t-2 border-gray-50 py-2'>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                <div className={`${formStyles.inputRow}`}>
                                    {MainDetails.map((item) => (
                                        <div key={item.id} className={`${formStyles.inputCol}`}>
                                            <FormField
                                                control={form.control}
                                                name={item.categoryName}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={`${formStyles.inputLabel}`} >{item.categoryLabel}</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder={item.categoryPlaceholder}  {...field} />
                                                        </FormControl>
                                                        <FormMessage className={`${formStyles.errorMessage}`} />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                    ))}

                                </div>

                                <form>
                                    <FormLabel className={`${formStyles.inputLabel}`}>Category Image</FormLabel>
                                    <div className='flex flex-col md:flex-row md:items-end gap-2'>
                                        <input type="file" onChange={handleFileChange} className='flex h-10 w-full mt-2 rounded-md border border-input px-3 py-2 text-sm text-gray-200 ring-offset-background file:border-0 file:bg-transparent file:rounded-md file:px-2 file:py-[1px] file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        <div className='mr-auto'>
                                            {
                                                imageLoader ? <Button loading >Saving...</Button> : <Button variant={"outline"} onClick={handleSaveClick}>Save Image</Button>
                                            }
                                        </div>
                                    </div>
                                </form>

                                <div className={`${formStyles.inputRow}`}>
                                    <div className={`${formStyles.inputCol}`}>
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={`${formStyles.inputLabel}`} >Category Description</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Description"  {...field} />
                                                    </FormControl>
                                                    <FormMessage className={`${formStyles.errorMessage}`} />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 pt-2'>
                                    <FormLabel className={`${formStyles.inputLabel}`} >Sub Categories</FormLabel>
                                    <div className='flex text-sm gap-2 md:gap-6'>
                                        <div className='flex flex-row gap-1'>
                                            <input type='checkbox' />
                                            <label>Sub Category 1</label>
                                        </div>
                                        <div className='flex flex-row gap-1'>
                                            <input type='checkbox' />
                                            <label>Sub Category 2</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className={`${formStyles.inputRow}`}>
                                        <div className={`${formStyles.inputCol}`}>
                                            <FormField
                                                control={form.control}
                                                name="category1id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={`${formStyles.inputLabel}`} >Category 1 id</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Category 1 id"  {...field} />
                                                        </FormControl>
                                                        <FormMessage className={`${formStyles.errorMessage}`} />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className={`${formStyles.inputCol}`}>
                                            <FormField
                                                control={form.control}
                                                name="category1name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={`${formStyles.inputLabel}`}>Category 1 Name</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Category 1 Name"  {...field} />
                                                        </FormControl>
                                                        <FormMessage className={`${formStyles.errorMessage}`} />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${formStyles.inputRow}`}>
                                        <div className={`${formStyles.inputCol}`}>
                                            <FormField
                                                control={form.control}
                                                name="category2id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={`${formStyles.inputLabel}`} >Category 2 id</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Category 2 id"  {...field} />
                                                        </FormControl>
                                                        <FormMessage className={`${formStyles.errorMessage}`} />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className={`${formStyles.inputCol}`}>
                                            <FormField
                                                control={form.control}
                                                name="category2name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={`${formStyles.inputLabel}`}>Category 2 Name</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Category 2 Name"  {...field} />
                                                        </FormControl>
                                                        <FormMessage className={`${formStyles.errorMessage}`} />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                </div>


                                <div className='flex gap-2 pt-3'>
                                    <Button type="submit">Add Category</Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" onClick={() => form.reset({
                                            categoryid: '',
                                            categoryname: '',
                                            description: '',
                                        })}>Cancel</Button>
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

export default AddCategory