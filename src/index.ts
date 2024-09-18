import { Product } from './components/base/types';
import { LarekApi } from './components/larek-api';
import './scss/styles.scss';
import { CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
abstract class Template<P> {
	template: HTMLTemplateElement;
	constructor(id: string) {
		this.template = document.getElementById(id) as HTMLTemplateElement;
	}
	render(props: P) {
		const element = cloneTemplate(this.template);
		this._render(element, props);
		return element;
	}
	protected abstract _render(element: HTMLElement, props: P): void;
}
class ProductCard extends Template<Product> {
	_render(card: HTMLElement, product: Product): void {
		const title = card.querySelector('.card__title');
		const image = card.querySelector('.card__image') as HTMLImageElement;
		const cardPrice = card.querySelector('.card__price');
		const cardCategory = card.querySelector('.card__category');
		cardCategory.textContent = product.category;
		cardCategory.classList.add(
			`card__category_${categoryToClass(product.category)}`
		);
		cardPrice.textContent = formatPrice(product.price);
		image.src = CDN_URL + product.image;
		title.textContent = product.title;
	}
}
const productCardTemplate=new ProductCard('card-catalog');
(async () => {
	//выводим карточки при загрузке
	const api = new LarekApi();
	const products = await api.getProducts();
	const gallery = document.querySelector('.gallery');
	for (const product of products) {
        const card=productCardTemplate.render(product);
		gallery.append(card);
	}
})();
// format and category перенести в другой файл 
function formatPrice(price: number | null) {
	if (price == null) {
		return 'Бесценно';
	}
	return `${price} синапсов`;
}
function categoryToClass(category: string) {
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
