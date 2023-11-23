"use client";

import { StockData, StockDataTransformed } from "@/lib/stock";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

const columnsHelper = createColumnHelper<StockData>();

export const columns = [
    columnsHelper.display({
        id: "ID",
        header: () => "Identifier",
        cell: ({ row }) => {
            const stock = row.original;
            return (
                <div className="flex items-center gap-2 ">
                    {stock["Logo"] === "-" ? (
                        <div className="w-10 h-10 bg-slate-300"></div>
                    ) : (
                        <Image
                            src={stock["Logo"]}
                            height={40}
                            width={40}
                            alt={stock["ID"]}
                            className="w-10 h-10"
                        />
                    )}
                    <div className="flex flex-col gap-0">
                        <div>{stock["ID"]}</div>
                        <div className="line-clamp-1">{stock["Name"]}</div>
                    </div>
                </div>
            );
        },
    }),
    columnsHelper.accessor("Price", {
        header: () => "Price (Yen)",

        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("Change %", {
        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("Volume", {
        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("Market cap", {
        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("P/E", {
        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("Div yield %\nTTM", {
        header: () => "Div yield % (TTM)",
        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("Sector", {
        cell: (info) => info.getValue(),
    }),
];
