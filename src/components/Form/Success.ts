import { ensureElement } from '../../utils/utils';
import { View } from '../base/View/View';
import { IEvents } from '../base/events';
import { EVENTS } from '../../utils';

export interface ISuccess {
	total: number;
}

export class Success extends View<ISuccess> {
	protected button: HTMLButtonElement;
	protected events: IEvents;
	protected description: HTMLParagraphElement;
	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.button = ensureElement<HTMLButtonElement>('.button', container);
		this.description = ensureElement<HTMLParagraphElement>('.order-success__description', container);
		this.events = events;

		this.button.addEventListener('click', () =>
			this.events.emit(EVENTS.successfulSubmission)
		);
	}

	set total(value: number) {
		const text = `Списано ${value} синапсов`;
		this.setText(this.description, text);
	}
}