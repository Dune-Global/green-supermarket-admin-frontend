"use client"

import EditModerator from "@/components/modals/EditModerator"
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
            const moderator = row.original;
            const param = moderator.empId;

            return (
                <div>
                    <EditModerator param={param} />
                </div>
            );
        }
    },
]
