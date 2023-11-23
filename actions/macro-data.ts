"use server";
import { StockData } from "@/lib/stock";
import axios from "axios";

export const getExchangeRate = async () => {
    try {
        const res = await axios.get(
            "http://127.0.0.1:3000/api/macro-data/jpyusd"
        );
        return res.data as any;
    } catch (e) {
        return null;
    }
};
