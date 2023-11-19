import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { ChatMessage } from "@/lib/chat";

const Chat = ({ role, content }: ChatMessage | any) => {
    return (
        <div
            className={cn(
                "mb-3 flex gap-2 items-center w-full ",
                role !== "user" ? "justify-start" : "flex-row-reverse"
            )}
        >
            {role !== "user" ? (
                <div className="w-[20px]">
                    <Bot size={20} />
                </div>
            ) : (
                <div className="w-[20px]">
                    <User size={20} />
                </div>
            )}

            <div className="p-2 border rounded-lg w-fit max-w-[80%] overflow-break-word  inline-block whitespace-pre-wrap">
                {content}
            </div>
        </div>
    );
};

export default Chat;
