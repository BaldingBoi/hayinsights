export const CHAT_FUNCTIONS = [
	{
		name: "get_current_crypto_info",
		description: "Get the information of a cryptocurrency",
		parameters: {
			type: "object",
			properties: {
				name: {
					type: "string",
					description: "The name of the cryptocurrency",
				},
			},
			required: ["name"],
		},
	},

	{
		name: "send_eth_metamask",
		description: "Send ETH to a wallet address",
		parameters: {
			type: "object",
			properties: {
				to: {
					type: "string",
					description: "The address of the receipient",
				},
				amount: {
					type: "string",
					description: "The amount you want to send",
				},
			},
			required: ["to", "amount"],
		},
	},

	{
		name: "create_dca_simulation",
		description:
			"Create a simulation for the scenario when you have a dca plan for a specific cryptocurrency in the past",
		parameters: {
			type: "object",
			properties: {
				token: {
					type: "string",
					description: "The token/coin that you want to buy with USD",
				},

				amount: {
					type: "string",
					description:
						"The amount of USD that you want to buy the token/coin with",
				},
				interval: {
					type: "string",
					enum: ["Every Day", "Every Week", "Every Month"],
					description: "How often do you want to buy",
				},
				duration: {
					type: "string",
					enum: [
						"For the last month",
						"For the last 3 months",
						"For the last 6 months",
						"For the last year",
					],
					description: "The time period that you buy",
				},
			},
			required: ["baseToken", "amount", "interval", "duration"],
		},
	},
];

export const SAMPLE_QUESTIONS = [
	"What is Ethereum?",
	"How is BTC price Going?",
	"What if I bought 10$ of Bitcoin everyday for the last year?",
	"Send 1 ETH to 0x496A2Fa61F96e448552d72206C0619a1F4161377",
];
