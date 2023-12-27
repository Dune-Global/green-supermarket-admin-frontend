"use client"

import { EditCategory } from "@/components/modals"
import { ColumnDef } from "@tanstack/react-table"

export type Category = {
    mainCategoryId: string
    mainCategoryName: string
    subCategories: string
}

export const columns: ColumnDef<Category>[] = [
    {
        id: "Category ID",
        accessorKey: "mainCategoryId",
        header: "CATEGORY ID",
    },
    {
        id: "Category Name",
        accessorKey: "mainCategoryName",
        header: "CATEGORY",
    },
    {
        id: "Sub Categories",
        accessorKey: "subCategories",
        header: "SUB CATEGORIES",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original;
            console.log(category)

            return (
                <div>
                    <EditCategory />
                </div>
            );
        }
    },
]
