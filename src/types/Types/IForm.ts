import { IFormState } from "./IFormState";

export interface IForm extends IFormState {
	render(data?: IFormState): HTMLElement;
}