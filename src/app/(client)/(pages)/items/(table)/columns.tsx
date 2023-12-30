"use client"

import { Item } from "@/utils/getItemDetails"
import { ColumnDef } from "@tanstack/react-table"
import {
    Button
} from "@/components/common"

export const columns: ColumnDef<Item>[] = [
    {
        accessorKey: "id",
        header: "ITEM ID",
    },
    {
        accessorKey: "name",
        header: "NAME",
    },
    {
        accessorKey: "price",
        header: "PRICE(LKR)",
    },
    {
        id: "inStock",
        accessorKey: "inStock",
        header: "IN STOCK",
    },
    {
        accessorKey: "brand",
        header: "BRAND",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original;
            const itemId = item.id;

            const handleClick = () => {
                window.alert(`You clicked on ${itemId}`)
            }

            return (
                <div>
                    <Button onClick={handleClick} variant={"link"}>View Details</Button>
                </div>
            )
        }
    }
]