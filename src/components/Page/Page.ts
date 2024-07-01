import { View } from '../base/View/View';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { EVENTS } from '../../utils';

export interface IPage {
	catalog: HTMLElement[];
	counter: number;
}

export class Page extends View<IPage> {
	protected _catalog: HTMLElement;
	protected _basket: HTMLElement;
	protected _counter: HTMLSpanElement;
	protected _wrapper: HTMLDivElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter');
		this._wrapper = ensureElement<HTMLDivElement>('.page__wrapper', container);
		this._basket.addEventListener('click', () => events.emit(EVENTS.basketOpen));
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set counter(value: string) {
		this.setText(this._counter, value);
	}

	locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}
