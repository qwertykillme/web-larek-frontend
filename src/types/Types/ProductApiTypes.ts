export interface IIdentifier {
    id: string
}

export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number | null
}

export interface IProductApi {
    getProductList(): Promise<IProduct[]>
    getProduct(id: string): Promise<IProduct>
}

export enum EProductUris {
    PRODUCT_LIST = "/product"
}