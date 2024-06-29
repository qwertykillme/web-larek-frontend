import { IProduct } from '../index';

export interface ICatalogModel {
    items: IProduct[];
    setItems(items: IProduct[]) :void;
    getProduct(id:string): IProduct;
}