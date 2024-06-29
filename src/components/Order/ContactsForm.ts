import { IContacts } from "../../types";
import { Form } from "../index";
import { IEvents } from "../base/events";

export class ContactsForm extends Form<IContacts> {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
		this.phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
	}

	get email(): string {
		return this.emailInput.value;
	}

	get phone(): string {
		return this.phoneInput.value;
	}
}