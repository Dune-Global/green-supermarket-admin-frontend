"use client"

import { useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Button,
    Input,

    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/common"
import { AddItem } from "@/components/modals"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnFilters,
            columnVisibility
        }
    })

    return (
        <>
            <div className="flex justify-between gap-1">

                <div className="flex items-center pb-2">
                    <Input
                        placeholder="Filter Items..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm border-2 border-gray-50"
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="border-2 py-1 px-2 rounded-md border-gray-50 mb-2 text-sm text-gray-400">
                            Columns
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-0">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <div className="flex items-center justify-between border-2 border-gray-50 p-4 rounded-t-md">
                <h1 className="font-medium text-xl">Items</h1>
                <div className="flex flex-col md:flex-row gap-2">
                    <AddItem />
                </div>
            </div>

            <div className="rounded-b-md py-2 border-x-2 border-b-2 border-gray-50">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-none">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-gray-0"
                                >
                                    {row.getVisibleCells().map((cell, cellIndex) => (
                                        <TableCell key={cell.id}>
                                            {columns[cellIndex]?.id === "inStock" && (
                                                <button
                                                    className="rounded bg-green-400 text-gray-0 px-1 mr-2 w-5"
                                                    onClick={() => {
                                                        const num = parseInt(row.id) + 1;
                                                        console.log("Button clicked for inStock" + num);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            )}
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </>
    )
}
