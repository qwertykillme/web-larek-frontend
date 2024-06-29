export type PaymentType = 'card' | 'cash';

export interface IDelivery {
	payment: PaymentType;
	address: string;
}

export interface IContacts {
	email: string;
	phone: string;
}

export interface IOrderList {
	total: number;
	items: string[];
}

export type IOrderData = IDelivery & IContacts & IOrderList;

export interface IOrder extends IOrderData {
    createOrderData(): IOrderData;
}