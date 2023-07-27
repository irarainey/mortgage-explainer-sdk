import { ClientType } from "./client-type";
import { ProductType } from "./product-types";

export interface Product {
	rate: number;
	duration: number;
	type: ProductType;
	ltv: number;
	erc: number;
	fee: number;
	clientType: ClientType;
}
