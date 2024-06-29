import { IBasket, IProduct } from '../../types';
import { Model } from '../base/Model/Model';
import { IEvents } from '../base/events';

export class Basket extends Model<IBasket> {
	protected _items: Map<string, IProduct>;

	constructor(data: Partial<IBasket>, events: IEvents) {
		super(data, events);
		this._items = new Map();
	}

	add(item: IProduct): void {
		if (!this._items.has(item.id)) {
			this._items.set(item.id, item);
			this.emit('basket:items-changed', { id: item.id });
		}
	}

	remove(id: string): void {
		if (this._items.delete(id)) {
			this.emit('basket:items-changed', { id: id });
		}
	}

	contains(id: string): boolean {
		return this._items.has(id);
	}

	clear(): void {
		this._items.clear();
		this.emit('basket:items-changed');
	}

	get items(): IProduct[] {
		return Array.from(this._items.values());
	}

	get total(): number {
		return Array.from(this._items.values()).reduce(
			(sum, item) => item.price + sum,
			0
		);
	}

	get length(): number {
		return this._items.size;
	}

	getIdList(): string[] {
		return Array.from(this._items.keys());
	}
}
