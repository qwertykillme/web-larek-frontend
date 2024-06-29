import { IProduct } from "./ProductApiTypes";

export type ICardDetails = IProduct & { valid: boolean; state: boolean };