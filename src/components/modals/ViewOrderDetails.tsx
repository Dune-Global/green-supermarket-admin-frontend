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
} from "@/components/common"
import { processOrder } from '@/utils/getOrderDetailsById'
import { updateOrderStatus } from '@/utils/updateOrderStatuts'


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
    notes: z.string().min(0).max(400).nullable(),
    orderStatus: z.enum(["Processing", "On The Way", "Delivered"]),
})

type ProductDetail = {
    productName: string;
    productImage: string;
    originalPrice: string;
    quantity: number;
    discount: number;
    subtotal: string;
};


function ViewOrderDetails({ param }: Props) {

    const [isLoading, setIsLoading] = useState(false)
    const [productsArray, setProductsArray] = useState<Array<ProductDetail>>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            notes: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            console.log(values)
            const { orderStatus } = values
            const res = await updateOrderStatus(param, orderStatus)
            console.log(res.message)
            setIsLoading(false)
            toast({
                variant: "default",
                title: "Success!",
                description: "The order status has been updated successfully",
            });
            window.location.reload()
        } catch (error) {
            const err = error as Error
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: err.message || "Please try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleDetails = async () => {
        const id = parseInt(param)
        const res = await processOrder(id)

        const { firstName, lastName, billingAddress, shippingAddress, note, productDetails, orderStatus } = res
        console.log(orderStatus)

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
            originalPrice: parseFloat(item.originalPrice),
            quantity: item.quantity,
            discount: item.discount,
            subtotal: parseFloat(item.subtotal),
        }));


        setProductsArray(arrayOfProductDetails)
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
        form.setValue("orderStatus", orderStatus)


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
                                                <Input placeholder="Notes..." {...field} value={field.value || ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='border w-full p-4 rounded-md'>
                                    <table className='w-full text-xs md:text-sm'>
                                        <tr className='px-4'>
                                            <th className='text-left font-medium max-w-24'>Product</th>
                                            <th className='text-left font-medium'>Original Price</th>
                                            <th className='text-left font-medium'>Quantity</th>
                                            <th className='text-left font-medium'>Discount</th>
                                            <th className='text-left font-medium'>Subtotal</th>
                                        </tr>
                                        <tbody>
                                            {productsArray.map((product, index) => (
                                                <tr key={index} className='px-4'>
                                                    <td className='text-left max-w-24'>
                                                        <div className='flex items-center gap-2'>
                                                            <img src={product.productImage} alt={product.productName} className='max-w-[5rem] h-[5rem]' />
                                                            <div>{product.productName}</div>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>{product.originalPrice} LKR</td>
                                                    <td className='text-left'>{product.quantity}</td>
                                                    <td className='text-left'>{Math.abs(product.discount)} LKR</td>
                                                    <td className='text-left'>{product.subtotal} LKR</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className='flex flex-col border p-4 rounded-md'>
                                    <h3 className='font-medium text-lg mb-3'>Order Status</h3>
                                    <div className='flex flex-col items-center justify-start md:flex-row gap-5'>
                                        <FormField
                                            control={form.control}
                                            name="orderStatus"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormControl>
                                                        <RadioGroup
                                                            key={field.value}
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-2 md:space-y-0 md:flex-row "
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="Processing" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Processing
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="On The Way" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    On The Way
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="Delivered" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">Delivered</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='py-3'>
                                        <Button loading={isLoading} type="submit">Submit Status</Button>
                                    </div>
                                </div>

                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ViewOrderDetails