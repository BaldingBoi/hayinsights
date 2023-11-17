import { NextRequest, NextResponse } from "next/server";

import axios from "axios";

export async function GET() {
	return NextResponse.json("hello");
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const openAIResponse = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-4",
				messages: body.messages,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
				timeout: 30000,
			}
		);
		return NextResponse.json(openAIResponse.data.choices[0].message);
	} catch (e: any) {
		return NextResponse.json(
			{ error: e?.message || "Unknown Error" },
			{ status: 500 }
		);
	}
}
