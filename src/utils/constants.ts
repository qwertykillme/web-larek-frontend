import { ensureElement } from "./utils";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const templates = {
	card: ensureElement<HTMLTemplateElement>('#card-catalog'),
	preview: ensureElement<HTMLTemplateElement>('#card-preview'),
	basketCard: ensureElement<HTMLTemplateElement>('#card-basket'),
	basket: ensureElement<HTMLTemplateElement>('#basket'),
	order: ensureElement<HTMLTemplateElement>('#order'),
	contacts: ensureElement<HTMLTemplateElement>('#contacts'),
	success: ensureElement<HTMLTemplateElement>('#success'),
};

export const settings = {

};
