import { ModalOrderProps, Product } from './types';
import { LarekApi } from './components/larek-api';
import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/base/modal';
import { Model } from './components/base/model';
import { Basket, BasketItem } from './components/basket';
import { ModalOrder } from './components/base/make-order';
import { ModalContacts } from './components/base/ModalContacts';
import { ModalSuccsess } from './components/base/ModalSuccsess';
import { ProductCard } from './components/ProductCard';
import { ProductPreviewCard } from './components/ProductPreviewCard';
const api = new LarekApi();
const eventEmitter = new EventEmitter();
const model = new Model(eventEmitter);
const basketCounter = document.querySelector('.header__basket-counter');
const basketButton = document.querySelector('.header__basket');
const onContactsSubmit = (orderInfo: any) => {
	model.setEmail(orderInfo.email);
	model.setPhone(orderInfo.phone);
	api
		.createOrder(model.getOrderInfo())
		.then((response) => {
			model.clearBasket();
			onOrderSuccess(response);
		})
		.catch((error) => {
			//у нас нет экрана ошибки , поэтому отобраажем ошибку в консоли
			console.error(error);
		});
};
const modalSuccess = new ModalSuccsess({
	onFinish: () => {
		modal.closeModal();
	},
});
const onOrderSuccess = (response: any) => {
	modal.openModal(modalSuccess.render({ total: response.total }));
};
const modalContacts = new ModalContacts({
	onNext: onContactsSubmit,
});
const onAddressSubmit: ModalOrderProps['onNext'] = (orderInfo) => {
	model.setAdress(orderInfo.address);
	model.setPayment(orderInfo.payment);
	modal.openModal(modalContacts.render());
};
const makeBasketChildren = () => {
	const children = model.basket.map((product, index) => {
		const basketItem = new BasketItem({
			index: index + 1,
			product,
			onDelete: () => model.deleteFromBasket(product.id),
		});
		return basketItem.render();
	});
	return children;
};
const modalOrder = new ModalOrder({
	onNext: onAddressSubmit,
});
const makebasketProps = () => ({
	price: model.getTotal(),
	children: makeBasketChildren(),
	onProductDelete: (id: string) => {
		model.deleteFromBasket(id);
	},
	onCreateOrder: () => {
		modal.openModal(modalOrder.render());
	},
});
const basket = new Basket(makebasketProps());
const listener = () => {
	basket.update({ children: makeBasketChildren(), total: model.getTotal() });
};
eventEmitter.on('basket:change', listener);
basketButton.addEventListener('click', () => {
	modal.openModal(basket.render());
});
eventEmitter.on('basket:change', (basketProducts: Product[]) => {
	basketCounter.textContent = basketProducts.length.toString();
});

const modal = new Modal(
	document.getElementById('product-preview-class'),
	eventEmitter
);

api
	.getProducts()
	.then((products) => {
		//выводим карточки при загрузке
		const gallery = document.querySelector('.gallery');
		for (const product of products) {
			const onProductClick = () => {
				const previw = new ProductPreviewCard({
					product,
					onAddToBasket: () => {
						model.addToBasket(product);
					},
				});
				modal.openModal(previw.render());
			};
			const productCard = new ProductCard({ product, onClick: onProductClick });
			const card = productCard.render();
			gallery.append(card);
		}
	})
	.catch((error) => {
		//у нас нет экрана ошибки , поэтому отобраажем ошибку в консоли
		console.error(error);
	});
