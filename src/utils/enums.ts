import { ensureElement } from "./utils";

export enum UIMESSAGES {
    buyButtonText = 'Купить',
    removeButtonText = 'Удалить из корзины',
    unableToBuyText = 'Нельзя купить',
    inputValidationError = 'Заполните все поля'
}

export enum EVENTS {
    modalOpen = 'modal:open',
	modalClose = 'modal:close',
	catalogChanged = 'catalog:items-changed',
	cardSelect = 'card:select',
	basketOpen = 'basket:open',
	basketAdd = 'basket:add',
	basketRemove = 'basket:remove',
	basketItemChanged = 'basket:items-changed',
	orderOpen = 'order:open',
	orderInput = 'order:input',
	orderSubmit = 'order:submit',
	contactsInput = 'contacts:input',
	contactsSubmit = 'contacts:submit',
	successfulSubmission = 'success:submit'
}