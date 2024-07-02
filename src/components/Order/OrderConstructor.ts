import { Model } from '..';
import {
	IDelivery,
	IContacts,
	IOrderList,
	IOrderData,
	PaymentType,
} from '../../types';
import { IEvents } from '../base/events';

export class OrderConstructor extends Model<OrderConstructor> {
	protected _payment: PaymentType;
	protected _address: string;
	protected _email: string;
	protected _phone: string;
	protected _total: number;
	protected _items: string[];

	constructor(data: Partial<OrderConstructor>, events: IEvents) {
		super(data, events);
	}

	set payment(value: PaymentType) {
		this._payment = value;
	}

	set address(value: string) {
		this._address = value;
	}

	set email(value: string) {
		this._email = value;
	}

	set phone(value: string) {
		this._phone = value;
	}

	set total(value: number) {
		this._total = value;
	}

	set items(list: string[]) {
		this._items = list;
	}
	set delivery(delivery: IDelivery) {
		this._payment = delivery.payment;
		this._address = delivery.address;
	}

	set contacts(contacts: IContacts) {
		this._email = contacts.email;
		this._phone = contacts.phone;
	}

	set orderList(orderList: IOrderList) {
		this._total = orderList.total;
		this._items = orderList.items;
	}

	get result(): IOrderData {
		return {
			payment: this._payment,
			address: this._address,
			email: this._email,
			phone: this._phone,
			total: this._total,
			items: this._items,
		};
	}
}
