import React, { useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
} from "@/components/common"

type Props = {}

const formStyles = {
    inputRow: "flex flex-col md:flex-row gap-2 w-full justify-between",
    inputCol: "w-full",
    inputLabel: "font-normal text-md",
    errorMessage: "text-red-400 font-medium text-sm",
    radioItems: "flex items-center space-x-2 space-y-0",
    radioInput: "focus-within:bg-green-400 text-gray-900 focus:text-gray-0 focus-visible:bg-green-400"
}

function AddCategory2({ }: Props) {

    return (
        <Dialog>
            <DialogTrigger>
                <button className="w-full text-left">Sub Category 01</button>
            </DialogTrigger>
            <DialogContent className='bg-gray-0 border-2 border-gray-50'>
                <DialogHeader>
                    <DialogTitle className='font-medium'>Sub Category 01 Details</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddCategory2