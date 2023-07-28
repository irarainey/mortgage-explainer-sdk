# Mortgage Explainer SDK

This is a simple TypeScript SDK which uses the [Azure OpenAI service](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview) to generate plain English explanations of mortgage products. It is intended to be used as a reference for how to use the Azure OpenAI API, and as a starting point for building your own SDKs.

To use this SDK, you will need to have an Azure subscription running an Azure OpenAI instance and an OpenAI API key. These details are passed to the SDK in the constructor.

## Usage

First create a new TypeScript project and install the SDK:

```bash
npm install mortgage-explainer-sdk
```

Then create a new environment file called `.env` and add the following:

```bash
AI_API_KEY=<your-api-key>
AI_INSTANCE=<your-instance>
AI_API_VERSION=<your-api-version>
AI_DEPLOYMENT=<your-deployment>
```

Finally create a new file called `index.ts` and add the following code:

```typescript
import dotenv from "dotenv";
import { MortgageExplainerSDK, OpenAIConfig, Product } from "mortgage-explainer-sdk";

dotenv.config();

export async function main() {
	const explainer = new MortgageExplainerSDK({
		apiKey: process.env.AI_API_KEY,
		instance: process.env.AI_INSTANCE,
		apiVersion: process.env.AI_API_VERSION,
		deployment: process.env.AI_DEPLOYMENT
	} as OpenAIConfig);

	const result = await explainer.explainProduct({
		rate: 4.64,
		duration: 2,
		type: "tracker",
		ltv: 75,
		erc: 0,
		fee: 999,
		clientType: "remortgage"
	} as Product);

	console.log(result);
}
```

This example calls the `explainProduct` method of the SDK, which returns a promise that resolves to a string containing the explanation. The `Product` object passed to the method contains the details of the mortgage product to be explained.

The output of the above code should look something like this:

> This is a remortgage product, which means you are switching your existing mortgage product for this one. The initial interest rate is 4.64%, which means that for the first two years of the mortgage, that will be the rate you pay. This mortgage product is a tracker, which means that the interest rate you pay will move up and down in line with a chosen base rate, usually the Bank of England's interest rate. 
> 
> The maximum loan to value (LTV) is 75%, which means you can borrow up to 75% of the value of your property. There are no early repayment charges (ERC) if you decide to pay off the mortgage fully or partially earlier than the end of the two-year period. However, if you decide to move to a new mortgage product before this initial two-year period ends, you will be subject to early repayment charges. The arrangement fee for this mortgage product is £999, which you will need to pay when you set up the mortgage. 
> 
> It's important to know that after the initial two-year period, you will move onto the standard variable rate of the bank, which may be higher or lower than the initial rate you are paying. It's always a good idea to keep an eye on your mortgage payments and consider switching to a new mortgage product when the initial period ends, to ensure you are getting the best deal for your circumstances. 
> 
> I want to highlight that what I've said is only an explanation of the product and does not constitute financial advice. It's always best to speak to a qualified mortgage adviser who can provide tailored advice for your specific situation.
