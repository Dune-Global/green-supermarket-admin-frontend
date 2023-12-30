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
    RadioGroupItem,
    Checkbox
} from "@/components/common"
import { processOrder } from '@/utils/getOrderDetailsById'


const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

type Props = {
    param: string
}
const formSchema = z.object({
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    billingaddress: z.string().min(1).max(150),
    shippingaddress: z.string().min(1).max(150),
    province: z.string().min(1).max(50),
    city: z.string().min(1).max(50),
    zipcode: z.string().min(1).max(50),
    email: z.string().email(),
    mobile: z.string().min(1).max(10),
    notes: z.string().min(1).max(400),
    processingstatus: z.boolean().default(false).optional(),
    onthewaystatus: z.boolean().default(false).optional(),
    deliveredstatus: z.boolean().default(false).optional(),
})


function ViewOrderDetails({ param }: Props) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    const handleDetails = async () => {
        const id = parseInt(param)
        const res = await processOrder(id)

        const { firstName, lastName, billingAddress, shippingAddress, note, productDetails } = res

        const billAdd = billingAddress.address
        const shipAdd = shippingAddress.address
        const province = shippingAddress.province
        const city = shippingAddress.city
        const postalCode = shippingAddress.postalCode
        const email = shippingAddress.email
        const mobile = shippingAddress.phoneNumber
        const additionalNotes = note

        const arrayOfProductDetails = productDetails.map((item: any) => ({
            productName: item.productName,
            productImage: item.productImage,
            originalPrice: item.price,
            quantity: item.quantity,
            discount: item.discount,
            subtotal: item.totalAmount,
        }));

        console.log(arrayOfProductDetails)


        form.setValue("firstname", firstName)
        form.setValue("lastname", lastName)
        form.setValue("billingaddress", billAdd)
        form.setValue("shippingaddress", shipAdd)
        form.setValue("province", province)
        form.setValue("city", city)
        form.setValue("zipcode", postalCode)
        form.setValue("email", email)
        form.setValue("mobile", mobile)
        form.setValue("notes", additionalNotes)


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
                        <DialogTitle className='font-medium'>Order Details</DialogTitle>
                    </DialogHeader>
                    <div className='border-t-2 border-gray-50 py-2'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className='flex flex-col md:flex-row justify-between gap-2'>
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="First Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Last Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="billingaddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Billing Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Billing Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="shippingaddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shipping Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Shipping Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex flex-col md:flex-row md:justify-evenly gap-2'>
                                    <FormField
                                        control={form.control}
                                        name="province"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Province</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Province" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="City" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="zipcode"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Zipcode</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Zipcode" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='flex flex-col md:flex-row md:justify-between gap-2'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mobile"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Mobile Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Mobile Number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additonal Notes</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Notes..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex flex-col'>
                                    <h3 className='font-medium text-sm mb-2'>Order Status</h3>
                                    <div className='flex flex-col justify-start md:flex-row gap-5'>
                                        <FormField
                                            control={form.control}
                                            name="processingstatus"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-2 space-y-0 ">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className='font-normal'>
                                                            Processing
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="onthewaystatus"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-2 space-y-0 ">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className='font-normal'>
                                                            On the way
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="deliveredstatus"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className='font-normal'>
                                                            Delivered
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ViewOrderDetails