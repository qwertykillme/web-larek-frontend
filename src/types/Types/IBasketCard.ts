import { IProduct } from "..";

export type IBasketCard = Omit<IProduct, 'description' | 'category' | 'image'> & {
	index: number;
};