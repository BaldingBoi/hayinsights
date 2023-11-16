"use client";
import React, { useEffect, useRef } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bot, SendHorizonal } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChatStore, useChatStore } from "@/store/chatStore";
import { ChatMessage } from "@/lib/chat";
import Chat from "./Chat";
import { ScrollArea } from "@/components/ui/scroll-area";

const FormSchema = z.object({
	message: z.string(),
});

const AIAssistant = () => {
	const { messages, loading, openChat, setOpenChat, addMessage, setLoading } =
		useChatStore() as ChatStore;

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: "",
		},
	});

	const chatList = useRef(null);

	const onSubmit = async ({ message }: z.infer<typeof FormSchema>) => {
		form.reset();
		setLoading(true);
		addMessage({ content: message, role: "user" });
		const res = await fetch("/api/chat", {
			method: "POST",
			body: JSON.stringify({
				messages: [...messages, { content: message, role: "user" }],
			}),
		});

		const newMessage = await res.json();

		addMessage(newMessage);
		setLoading(false);
	};

	useEffect(() => {
		if (
			messages.length > 0 &&
			// @ts-ignore
			!!chatList?.current.lastElementChild.lastElementChild
				?.lastElementChild
		) {
			// @ts-ignore
			chatList?.current.lastElementChild.lastElementChild.lastElementChild.scrollIntoViewIfNeeded(
				{ behaviour: "smooth" }
			);
		}
	}, [chatList, messages]);
	return (
		<div className="absolute bottom-10 right-10">
			<Popover open={openChat} onOpenChange={setOpenChat}>
				<PopoverTrigger className="rounded-full py-2 px-4 bg-primary">
					<Bot size={32} className="text-white" />
				</PopoverTrigger>
				<PopoverContent align="end" className="w-[400px]">
					<div className="flex flex-col w-full gap-4">
						<div className="flex items-center gap-2 w-full">
							<Bot className="text-primary" />
							<div className="text-lg font-semibold">
								AI Assistant
							</div>
						</div>
						<ScrollArea
							className="w-full h-[300px] flex flex-col justify-end"
							ref={chatList}
						>
							{messages.length > 0 &&
								messages?.map(
									(message: ChatMessage, index: number) => (
										<Chat
											key={index}
											content={message.content}
											role={message.role}
										/>
									)
								)}
							{loading && (
								<Chat content={"AI Assistant is typing ..."} />
							)}
						</ScrollArea>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full flex gap-2"
								autoComplete="off"
							>
								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input
													placeholder="Aske me anything ..."
													{...field}
													className="flex-1"
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button type="submit">
									<SendHorizonal />
								</Button>
							</form>
						</Form>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default AIAssistant;
