import { IBasketCard } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "../index";

export class BasketCard extends Card<IBasketCard> {
	protected _index: HTMLSpanElement;
	protected button: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
        
		super(container, events);
		this._index = ensureElement<HTMLSpanElement>(
			'.basket__item-index',
			container
		);

		this.button = ensureElement<HTMLButtonElement>('.card__button', container);

		this.button.addEventListener('click', () =>
			this.events.emit('basket:remove', { id: this.id })
		);
	}

	set index(value: number) {
		this.setText(this._index, value);
	}
}