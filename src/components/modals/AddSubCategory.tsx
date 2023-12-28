"use client"

import { useState } from "react"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Button,

    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from "@/components/common"

import { AddCategory1, AddCategory2 } from "@/components/modals"

import { toast } from "../common/ui/toast/use-toast"
import { ChevronDown } from "lucide-react"


const AddSubCategory = () => {

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>Add Sub <ChevronDown className="ml-2" size={20} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border border-green-400 bg-gray-0">
                    <DropdownMenuLabel className="font-medium text-md">Sub Category Level</DropdownMenuLabel>
                    <DropdownMenuRadioGroup className="border-t border-gray-50 p-2">
                        <DropdownMenuRadioItem value="sub01" onClick={(e) => { e.preventDefault() }}> <AddCategory1 /> </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="sub02" onClick={(e) => { e.preventDefault() }}> <AddCategory2 /> </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default AddSubCategory