"use server";
import { StockData } from "@/lib/stock";
import axios from "axios";

export const getStockData = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:3000/api/stock-data");
        return res.data as StockData[];
    } catch (e) {
        return null;
    }
};
