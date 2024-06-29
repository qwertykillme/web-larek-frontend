import { View } from '../index';
import { IBasketView } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class BasketView extends View<IBasketView> {
	protected _items: HTMLElement;
	protected _price: HTMLSpanElement;
	protected button: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this._items = ensureElement<HTMLUListElement>('.basket__list', container);
		this.button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);
		this._price = ensureElement<HTMLSpanElement>('.basket__price', container);
		this.events = events;
		this.button.addEventListener('click', () => this.events.emit('order:open'));
	}

	set items(items: HTMLElement[]) {
		this._items.replaceChildren(...items);
	}

	set valid(state: boolean) {
		this.changeDisableState(this.button, state);
	}

	set price(value: number) {
		this.setText(this._price, `${value} синапсов`);
	}
}
