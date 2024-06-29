import { IEventEmitter } from './IEventEmitter';

export interface IViewConstructor<T> {
    new(container: HTMLElement, events?: IEventEmitter): IView<T>
}

export interface IView<T> {
	toggleClass(element: HTMLElement, className: string, force?: boolean): void;
	setText(element: HTMLElement, value: unknown): void;
	changeDisableState(element: HTMLElement, state: boolean): void;
	hideElement(element: HTMLElement): void;
	showElement(element: HTMLElement): void;
	setImage(element: HTMLElement, src: string, alt?: string): void;
	render(data?: Partial<T>): HTMLElement;
}