import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const Chat = () => {
    return (
        <div className="absolute bottom-10 right-10">
            <Popover>
                <PopoverTrigger>
                    <Button className="rounded-full">
                        <Bot size={32} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[400px]">
                    <div className="flex flex-col"></div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Chat;
