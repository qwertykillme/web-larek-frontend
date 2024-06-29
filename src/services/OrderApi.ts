import { Api } from '../components/base/api';
import { IOrderApi, IOrderData, IOrderResult } from '../types';

export class OrderApi extends Api implements IOrderApi {
    constructor(baseUrl: string){
        super(baseUrl);
    }

    postOrder(order: IOrderData): Promise<IOrderResult> {
        return this.post('/order', order).then((data: IOrderResult) => data)
    }
}