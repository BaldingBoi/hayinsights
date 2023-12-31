export type StockData = {
    _id: string;
    ID: string;
    Name: string;
    Logo: string;
    Price: string;
    "Change %": string;
    Volume: string;
    "Relative Vol": string;
    "Market cap": string;
    "P/E": string;
    "EPS diluted\nTTM": string;
    "EPS diluted growth %\nTTM YoY": string;
    "Div yield %\nTTM": string;
    Sector: string;
    "Analyst Rating": string;
};

export type StockDataTransformed = {
    _id: string;
    ID: string;
    Name: string;
    Logo: string;
    Price: number;
    "Change %": number;
    Volume: number;
    "Market cap": number;
    "P/E": number;
    "Div yield %\nTTM": number;
    Sector: string;
};
