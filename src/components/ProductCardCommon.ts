import { Product } from "../types";
import { CDN_URL } from "../utils/constants";
import { formatPrice } from "../utils/utils";
import { Template } from "./base/template";

export type PropsCardCommon = {
	product: Product;
};
export abstract class ProductCardCommon extends Template<PropsCardCommon> {
	title: HTMLElement;
	image: HTMLImageElement;
	cardPrice: HTMLElement;
	cardCategory: HTMLElement;
	constructor(props: PropsCardCommon) {
		super(props);
		this.title = this.element.querySelector('.card__title');
		this.image = this.element.querySelector('.card__image') as HTMLImageElement;
		this.cardPrice = this.element.querySelector('.card__price');
		this.cardCategory = this.element.querySelector('.card__category');
		this.cardCategory.textContent = this.props.product.category;
		this.cardCategory.classList.add(
			`card__category_${this.categoryToClass(this.props.product.category)}`
		);
		this.cardPrice.textContent = formatPrice(this.props.product.price);
		this.image.src = CDN_URL + this.props.product.image;
		this.title.textContent = this.props.product.title;
	}

	categoryToClass(category: string) {
		switch (category) {
			case 'кнопка':
				return 'button';
			case 'софт-скил':
				return 'soft';
			case 'хард-скил':
				return 'hard';
			case 'дополнительное':
				return 'additional';
			default:
				return 'other';
		}
	}
}
