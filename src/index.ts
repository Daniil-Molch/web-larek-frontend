import { ModalOrderProps, Product } from './types';
import { LarekApi } from './components/larek-api';
import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/base/modal';
import { Model } from './components/base/model';
import { Basket } from './components/basket';
import {
	ModalOrder,
} from './components/base/make-order';
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
	api.createOrder(model.getOrderInfo()).then((response) => {
		model.clearBasket();
		onOrderSuccess(response);
	});
};
const onOrderSuccess = (response: any) => {
	const modalSuccess = new ModalSuccsess({
		total: response.total,
		onFinish: () => {
			modal.closeModal();
		},
	});
	modal.openModal(modalSuccess.render());
};
const onAddressSubmit: ModalOrderProps['onNext'] = (orderInfo) => {
	model.setAdress(orderInfo.address);
	model.setPayment(orderInfo.payment);
	const modalContacts = new ModalContacts({
		onNext: onContactsSubmit,
	});
	modal.openModal(modalContacts.render());
};
const makebasketProps = () => ({
	price: model.getTotal(),
	products: model.basket,
	onProductDelete: (id: string) => {
		model.deleteFromBasket(id);
	},
	onCreateOrder: () => {
		const modalOrder = new ModalOrder({
			onNext: onAddressSubmit,
		});
		modal.openModal(modalOrder.render());
	},
});
basketButton.addEventListener('click', () => {
	const basket = new Basket(makebasketProps());
	const listener = () => {
		basket.update(model.basket);
	};
	eventEmitter.on('basket:change', listener);
	const listener2 = () => {
		eventEmitter.off('basket:change', listener);
		eventEmitter.off('modal:close', listener2);
	};
	eventEmitter.on('modal:close', listener2);
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
