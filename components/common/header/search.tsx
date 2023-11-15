"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const FormSchema = z.object({
	search: z.string(),
});

export function Search() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			search: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex items-center gap-2"
			>
				<FormField
					control={form.control}
					name="search"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder={"Search"}
									{...field}
									className="w-[350px]"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">
					<SearchIcon />
				</Button>
			</form>
		</Form>
	);
}
