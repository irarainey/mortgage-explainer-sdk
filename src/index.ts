import dotenv from "dotenv";
import { MortgageProductExplainer as MortgageProductExplainer } from "./lib";
import { Product } from "./types/product";
import { OpenAIConfig } from "./types/config";

dotenv.config();

export async function main() {
	const explainer = new MortgageProductExplainer({
		apiKey: process.env.AI_API_KEY,
		instance: process.env.AI_INSTANCE,
		apiVersion: process.env.AI_API_VERSION,
		deployment: process.env.AI_DEPLOYMENT
	} as OpenAIConfig);

	const result = await explainer.explainMortgageProduct({ rate: 4.64, duration: 2, type: "tracker", ltv: 75, erc: 0, fee: 999, clientType: 'remortgage' } as Product);

	console.log(result);
}
