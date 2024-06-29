import { IOrderResult, IOrderData } from '../index';

export interface IOrderApi {
    postOrder(order: IOrderData): Promise<IOrderResult> 
}