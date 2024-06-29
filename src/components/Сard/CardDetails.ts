import { ICardDetails } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { CatalogCard } from './CatalogCard';
import { UIMESSAGES, EVENTS } from '../../utils/index';

export class CardDetails extends CatalogCard<ICardDetails> {
	protected _description: HTMLParagraphElement;
	protected button: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this._description = ensureElement<HTMLParagraphElement>(
			'.card__text',
			container
		);
		this.button = ensureElement<HTMLButtonElement>('.card__button', container);

		this.button.addEventListener('click', () => {
			if (this.button.textContent === UIMESSAGES.buyButtonText) {
				this.events.emit(EVENTS.basketAdd, { id: this.id });
				return;
			}
			this.events.emit(EVENTS.basketRemove, { id: this.id });
		});
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set valid(state: boolean) {
		this.changeDisableState(this.button, !state);
	}

	get valid() {
		return !this.button.disabled;
	}

	set state(state: boolean) {
		if (!this.valid) {
			this.setText(this.button, UIMESSAGES.unableToBuyText);
		} else {
			const text = state ? UIMESSAGES.buyButtonText : UIMESSAGES.removeButtonText;
			this.setText(this.button, text);
		}
	}
}
