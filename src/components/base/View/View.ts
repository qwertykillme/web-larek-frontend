import { IView } from '../../../types/index';

export abstract class View<T> implements IView<T> {
	protected readonly container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
	}

	toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		if (!element) return;
		element.classList.toggle(className, force);
	}

	setText(element: HTMLElement, value: unknown): void {
		if (!element) return;
		element.textContent = String(value);
	}
	changeDisableState(element: HTMLElement, state: boolean): void {
		if (!element) return;
		if (state) {
			element.setAttribute('disabled', 'disabled');
		} else {
			element.removeAttribute('disabled');
		}
	}

	hideElement(element: HTMLElement): void {
		if (!element) return;
		element.style.display = 'none';
	}

	showElement(element: HTMLElement): void {
		if (!element) return;
		element.style.removeProperty('display');
	}

	setImage(element: HTMLImageElement, src: string, alt?: string): void {
		if (!element) return;
		element.src = src;
		if (alt) {
			element.alt = alt;
		}
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this, data);
		return this.container;
	}
}
