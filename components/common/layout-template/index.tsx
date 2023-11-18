import React from "react";
import Header from "../header";
import ChatPage from "@/components/pages/chat";

const LayoutTemplate = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-[100dvh] w-[100svw] flex-col items-center gap-0 overflow-x-hidden">
            <Header />
            {children}
            <ChatPage />
        </main>
    );
};

export default LayoutTemplate;
