import { IProduct } from "./ProductApiTypes";

export type ICatalogCard = Omit<IProduct, 'description'>;