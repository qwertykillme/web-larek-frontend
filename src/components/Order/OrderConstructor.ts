import { Model, Order } from '..';
import { IOrder, IDelivery, IContacts, IOrderList } from '../../types';
import { IEvents } from '../base/events';


export class OrderConstructor extends Model<OrderConstructor> {
	protected order: IOrder;

	constructor(data: Partial<OrderConstructor>, events: IEvents) {
		super(data, events);
		this.order = new Order();
	}

	set delivery(delivery: IDelivery) {
		this.order.payment = delivery.payment;
		this.order.address = delivery.address;
	}

	set contacts(contacts: IContacts) {
		this.order.email = contacts.email;
		this.order.phone = contacts.phone;
	}

	set orderList(orderList: IOrderList) {
		this.order.total = orderList.total;
		this.order.items = orderList.items;
	}

	get result(): IOrder {
		return this.order;
	}
}
