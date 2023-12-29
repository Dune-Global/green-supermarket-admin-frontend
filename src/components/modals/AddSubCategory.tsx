"use client"

import {
    Button,

    Popover,
    PopoverContent,
    PopoverTrigger,

} from "@/components/common"

import { ChevronDown } from "lucide-react"
import { AddSubCategoryOne, AddSubCategoryTwo } from "@/components/modals"


const AddSubCategory = () => {

    return (
        <>
            <Popover>
                <PopoverTrigger><Button variant={"outline"}>Add Sub</Button></PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 mr-2 bg-gray-0 max-w-[15rem] border border-green-400">
                    <h2 className="text-lg border-b-[1px]">Select a level</h2>
                    <div className="flex flex-col items-start gap-2 text-sm">
                        <AddSubCategoryOne />
                        <AddSubCategoryTwo />
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default AddSubCategory