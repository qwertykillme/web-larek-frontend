import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { View } from '../index';

export class Card<T> extends View<T> {
	protected _title: HTMLHeadingElement;
	protected _price: HTMLSpanElement;
	protected _id: string;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
		this._price = ensureElement<HTMLSpanElement>('.card__price', container);
	}

	get id() {
		return this._id;
	}

	get title() {
		return this._title.textContent || '';
	}

	get price() {
		return this._price.textContent || '';
	}

	set id(value: string) {
		this._id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: string) {
		const priceText = value ? `${value} синапсов` : 'Бесценно';
		this.setText(this._price, priceText);
	}
}
