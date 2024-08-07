import { Model } from "../index";
import { ICatalogData, IProduct } from "../../types";
import { IEvents } from "../base/events";
import { EVENTS } from "../../utils";

export class Catalog extends Model<ICatalogData> {
    protected _items: IProduct[];

    constructor(data: Partial<ICatalogData>, events: IEvents) {
        super(data, events);
        this._items = [];
    }

    get items(): IProduct[] {
        return this._items;
    }

    set items(list: IProduct[]) {
        this._items = list;
        this.emit(EVENTS.catalogChanged, this._items);
    }

    find(id: string): IProduct | undefined {
        return this._items.find((item) => item.id === id);
    }
}
