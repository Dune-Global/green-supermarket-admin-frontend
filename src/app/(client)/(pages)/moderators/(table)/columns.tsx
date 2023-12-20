"use client"

import { Button } from "@/components/common"
import { ColumnDef } from "@tanstack/react-table"

export type Moderator = {
    empId: string
    name: string
    email: string
    designation: string
}

export const columns: ColumnDef<Moderator>[] = [
    {
        accessorKey: "empId",
        header: "EMPLOYEE ID",
    },
    {
        accessorKey: "name",
        header: "FULL NAME",
    },
    {
        accessorKey: "email",
        header: "EMAIL",
    },
    {
        accessorKey: "designation",
        header: "DESIGNATION",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const moderator = row.original

            return (
                <Button variant={"link"}>View Details</Button>
            )
        }
    },
]