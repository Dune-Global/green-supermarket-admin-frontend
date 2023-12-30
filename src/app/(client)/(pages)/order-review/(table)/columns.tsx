"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    Button
} from "@/components/common"
import { Orders } from "@/types";

export const columns: ColumnDef<Orders>[] = [
    {
        accessorKey: "orderId",
        header: "ORDER ID",
    },
    {
        accessorKey: "date",
        header: "DATE",
    },
    {
        accessorKey: "total",
        header: "TOTAL",
    },
    {
        accessorKey: "status",
        header: "STATUS",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original;
            const itemId = item.orderId;

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