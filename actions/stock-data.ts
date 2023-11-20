"use server";
import axios from "axios";

export const getStockData = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:3000/api/stock-data", {
            timeout: 10000,
        });
        return res.data;
    } catch (e) {
        return null;
    }
};
