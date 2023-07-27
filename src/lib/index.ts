import axios from "axios";
import { Product } from "../types/product";
import { OpenAIConfig } from "../types/config";

export class MortgageProductExplainer {
	private openAIConfig: OpenAIConfig;

	public constructor(config: OpenAIConfig) {
		this.openAIConfig = config;

		axios.defaults.baseURL = `https://${config.instance!}.openai.azure.com/openai/deployments/${config.deployment!}/chat`;
		axios.defaults.headers.common["api-key"] = config.apiKey!;
		axios.defaults.headers.post["Content-Type"] = "application/json";
	}

	public async explainMortgageProduct(product: Product): Promise<string> {
		const result = await axios.post(`/completions?api-version=${this.openAIConfig.apiVersion!}`, {
			messages: [
				{
					role: "system",
					content:
						"You are an assistant helping to summarise mortgage products to present them in a plain English way for people who don't understand financial products at all. This should be in line with UK FAC regulations. Also explain the type of mortgage product. Ensure it is made clear that once the deal ends they will move back onto the standard variable rate of the bank. Tell them that what you are saying does not constitute financial advice and that you are only explaining the product."
				},
				{
					role: "user",
					content: `client type: ${product.clientType}; initial rate: ${product.rate}%; duration: ${product.duration} years; type: ${product.type}; maximum LTV: ${product.ltv}%; ERC: ${product.erc}%; Arrangement fee: £${product.fee}`
				}
			]
		});

		return result.data.choices[0].message.content;
	}
}
