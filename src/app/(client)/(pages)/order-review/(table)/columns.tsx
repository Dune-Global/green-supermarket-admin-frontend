"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Orders } from "@/types";
import { ViewOrderDetails } from "@/components/modals";

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

            return (
                <div>
                    <ViewOrderDetails param={itemId} />
                </div>
            )
        }
    }
]