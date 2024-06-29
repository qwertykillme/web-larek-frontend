import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "../index";

export class CatalogCard<T> extends Card<T> {
	protected _category: HTMLSpanElement;
	protected _image: HTMLImageElement;

    private static categoryClassMap = new Map<string, string>([
		['софт-скил', 'card__category_soft'],
		['другое', 'card__category_other'],
		['дополнительное', 'card__category_additional'],
		['кнопка', 'card__category_button'],
		['хард-скил', 'card__category_hard']
	]);

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this._category = ensureElement<HTMLSpanElement>('.card__category', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this.container.addEventListener('click', () =>
			this.events.emit('card:select', { id: this.id })
		);
	}

	protected toggleCategory(value: string) {
		const classModifier = CatalogCard.categoryClassMap.get(value);
		if (classModifier) {
			this.toggleClass(this._category, classModifier, true);
		}
	}

	get category() {
		return this._category.textContent || '';
	}

	set category(value: string) {
		this.toggleCategory(value);
		this.setText(this._category, value);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}
}