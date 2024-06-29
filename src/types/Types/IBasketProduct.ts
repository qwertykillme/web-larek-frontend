import { IProduct } from '../index';

export interface IBasketProduct extends Pick <IProduct, 'id' | 'title'> {}