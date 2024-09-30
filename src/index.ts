import { Product } from './types';
import { LarekApi } from './components/larek-api';
import './scss/styles.scss';
import { CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/base/modal';
import { Model } from './components/base/model';
import { Template } from './components/base/template';
import { Basket } from './components/base/basket';
import {
	MakeOrder,
	MakeOrder2,
	MakeOrder3,
} from './components/base/make-order';
import { formatPrice } from './formatPrice';
const eventEmitter = new EventEmitter();
const model = new Model(eventEmitter);
const basketCounter = document.querySelector('.header__basket-counter');
const basket = new Basket('basket');
const makeOrder = new MakeOrder('order');
const makeOrder2 = new MakeOrder2('contacts');
const makeOrder3 = new MakeOrder3('success');
const basketButton = document.querySelector('.header__basket');
const makebasketProps = () => ({
	price: model.getTotal(),
	products: model.basket,
	onProductDelete: (id: string) => {
		model.deleteFromBasket(id);
	},
	onCreateOrder: () => {
		productModal.openModal(
			makeOrder.render({
				onNext: (orderInfo) => {
					model.setAdress(orderInfo.address);
					model.setPayment(orderInfo.payment);
					productModal.openModal(
						makeOrder2.render({
							onNext: (orderInfo) => {
								model.setEmail(orderInfo.email);
								model.setPhone(orderInfo.phone);
								model.createOrder().then((response) => {
									productModal.openModal(
										makeOrder3.render({
											total: response.total,
											onFinish: () => {
												productModal.closeModal();
											},
										})
									);
								});
							},
						})
					);
				},
			})
		);
	},
});
basketButton.addEventListener('click', () => {
	productModal.openModal(basket.render(makebasketProps()));
});
eventEmitter.on('basket:change', (basketProducts: Product[]) => {
	basketCounter.textContent = basketProducts.length.toString();
	basket.update(makebasketProps());
	console.log(basketProducts);
});
// const adressModal = new Modal(document.getElementById('order'), eventEmitter);
const productModal = new Modal(
	document.getElementById('product-preview-class'),
	eventEmitter
);
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
		card.addEventListener('click', () => {
			productModal.openModal(productPreviewCardTemplate.render(product));
		});
	}
}
class ProductPreviewCard extends Template<Product> {
	_render(card: HTMLElement, product: Product): void {
		const title = card.querySelector('.card__title');
		const image = card.querySelector('.card__image') as HTMLImageElement;
		const cardPrice = card.querySelector('.card__price');
		const cardCategory = card.querySelector('.card__category');
		const button = card.querySelector('.card__button');
		const cardDescription = card.querySelector('.card__text');
		cardCategory.textContent = product.category;
		cardCategory.classList.add(
			`card__category_${categoryToClass(product.category)}`
		);
		cardPrice.textContent = formatPrice(product.price);
		image.src = CDN_URL + product.image;
		title.textContent = product.title;
		cardDescription.textContent = product.description;
		button.addEventListener('click', () => {
			model.addToBasket(product);
		});
	}
}
const productPreviewCardTemplate = new ProductPreviewCard('card-preview');
const productCardTemplate = new ProductCard('card-catalog');
(async () => {
	//выводим карточки при загрузке
	const api = new LarekApi();
	const products = await api.getProducts();
	const gallery = document.querySelector('.gallery');
	for (const product of products) {
		const card = productCardTemplate.render(product);
		gallery.append(card);
	}
})();
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
// buttonDelete.addEventListener('click', () => {
// 	eventEmitter.on('basket:delete', (product: Product) => {
// 		model.deleteFromBasket(product.id);
// 		console.log('Hello');
// 	});
// });
