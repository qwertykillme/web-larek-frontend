import { Api } from '../components/base/api';
import { IProductApi, EProductUris, IProduct } from '../types';
import { ApiListResponse } from '../components/base/api';

export class ProductApi extends Api implements IProductApi {
    protected readonly cdn: string;

    constructor(baseUrl: string, cdn: string) {
        super(baseUrl)
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get(EProductUris.PRODUCT_LIST).then((data: ApiListResponse<IProduct>) =>
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image,
        }))
    );
}

    getProduct(id: string): Promise<IProduct> {
        return this.get(`${EProductUris.PRODUCT_LIST}/${id}`).then((res: IProduct ) => res )
    }
}