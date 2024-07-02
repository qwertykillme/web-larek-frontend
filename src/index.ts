import './scss/styles.scss';
import {
	Catalog,
	Basket,
	Page,
	Modal,
	BasketView,
	OrderForm,
	ContactsForm,
	CatalogCard,
	BasketCard,
	OrderConstructor,
	CardDetails,
	Success,
} from './components/index';
import { EventEmitter } from './components/base/events';
import { OrderApi, ProductApi } from './services';
import {
	IForm,
	IFormState,
	IProduct,
	ICatalogCard,
	IIdentifier,
	IOrderList,
	IOrderData,
	IOrderResult,
	PaymentType,
} from './types/index';
import { CDN_URL, API_URL, templates } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { EVENTS, UIMESSAGES } from './utils/enums';

const pageContent = ensureElement<HTMLElement>('.page');
const modalContainer = ensureElement<HTMLDivElement>('#modal-container');

const productApi = new ProductApi(API_URL, CDN_URL);
const orderApi = new OrderApi(API_URL);
const emitter = new EventEmitter();

const page = new Page(pageContent, emitter);
const modal = new Modal(modalContainer, emitter);
const catalog = new Catalog({}, emitter);
const cardDetails = new CardDetails(cloneTemplate(templates.preview), emitter);
const basket = new Basket({}, emitter);
const basketView = new BasketView(cloneTemplate(templates.basket), emitter);
const orderBuilder = new OrderConstructor({}, emitter);
const orderForm = new OrderForm(cloneTemplate(templates.order), emitter);
const contactsForm = new ContactsForm(
	cloneTemplate(templates.contacts),
	emitter
);
const successForm = new Success(cloneTemplate(templates.success), emitter);

// Не понимаю, зачем ее переносить, если валидация происходит в конкретной форме  (валидация сейчас относительно абстрактная
// и привязана к конкретной форме.
// иначе класс ордера станет неабстрактным, причем будет хранить валидацию не ордера, а конкретной формы)
// возможно я неправильно поняла ваш комментарий

function validate(form: IForm) {
	const errorText = getErrorText(form);
	const validity: IFormState = { valid: form.valid, error: errorText };
	form.render(validity);
}

function getErrorText(form: IForm) {
	const errorText = !form.valid ? UIMESSAGES.inputValidationError : '';
	return errorText;
}

emitter.on(EVENTS.modalOpen, () => {
	page.locked(true);
});

emitter.on(EVENTS.modalClose, () => {
	page.locked(false);
});

emitter.on(EVENTS.catalogChanged, (data: IProduct[]) => {
	const cardList = data.map((item) => {
		const card = new CatalogCard<ICatalogCard>(
			cloneTemplate(templates.card),
			emitter
		);
		return card.render(item);
	});
	page.render({ catalog: cardList });
});

emitter.on(EVENTS.cardSelect, (data: IIdentifier) => {
	modal.open();
	const product = catalog.find(data.id);
	if (product) {
		const previewData = Object.assign(product, {
			valid: Boolean(product.price),
			state: !basket.contains(data.id),
		});
		modal.render({ content: cardDetails.render(previewData) });
	}
});

emitter.on(EVENTS.basketOpen, () => {
	modal.open();
	modal.render({
		content: basketView.render({
			price: basket.total,
			valid: basket.length === 0,
		}),
	});
});

emitter.on(EVENTS.basketAdd, (data: IIdentifier) => {
	const product = catalog.find(data.id);
	basket.add(product);
});

emitter.on(EVENTS.basketRemove, (data: IIdentifier) => {
	basket.remove(data.id);
});

emitter.on(EVENTS.basketItemChanged, (data: IIdentifier) => {
	cardDetails.render({ valid: true, state: !basket.contains(data.id) });
	page.render({ counter: basket.length });
	const cardList = basket.items.map((item, index) => {
		const cardData = Object.assign(item, { index: index + 1 });
		const card = new BasketCard(cloneTemplate(templates.basketCard), emitter);
		return card.render(cardData);
	});
	basketView.render({
		items: cardList,
		valid: basket.length === 0,
		price: basket.total,
	});
});

emitter.on(EVENTS.orderOpen, () => {
	const orderList: IOrderList = {
		total: basket.total,
		items: basket.getIdList(),
	};
	orderBuilder.orderList = orderList;

	modal.render({
		content: orderForm.render({
			valid: orderForm.valid,
			error: getErrorText(orderForm),
		}),
	});
});

emitter.on(EVENTS.orderInput, () => {
	orderBuilder.payment = orderForm.payment as PaymentType;
	orderBuilder.address = orderForm.address;
	validate(orderForm);
});

emitter.on(EVENTS.orderSubmit, () => {
	modal.render({
		content: contactsForm.render({
			valid: contactsForm.valid,
			error: getErrorText(contactsForm),
		}),
	});
});

emitter.on(EVENTS.contactsInput, () => {
	orderBuilder.email = contactsForm.email;
	orderBuilder.phone = contactsForm.phone;
	validate(contactsForm);
});

emitter.on(EVENTS.contactsSubmit, () => {
	const apiObj: IOrderData = orderBuilder.result;
	orderApi
		.postOrder(apiObj)
		.then((data: IOrderResult) => {
			modal.render({ content: successForm.render({ total: data.total }) });
			orderForm.clear();
			contactsForm.clear();
			basket.clear();
		})
		.catch(console.error);
});

emitter.on(EVENTS.successfulSubmission, () => {
	modal.close();
});

productApi
	.getProductList()
	.then((data) => {
		catalog.items = data;
	})
	.catch(console.error);
