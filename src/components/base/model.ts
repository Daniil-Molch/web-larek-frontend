import { Product, Allfunc } from '../../types';
import { LarekApi } from '../larek-api';
import { EventEmitter } from './events';
const api = new LarekApi();

export class Model {
	setPhone(phone: string) {
		this.phone = phone;
	}
	payment: string;
	basket: Product[] = [];
	ee: EventEmitter;
	address: string;
	email: string;
	id: string;
	phone: string;
	constructor(ee: EventEmitter) {
		this.ee = ee;
	}
	setPayment(payment: string) {
		this.payment = payment;
	}
	addToBasket(product: Product) {
		if (this.basket.filter((item) => item.id === product.id).length) return;
		this.basket.push(product);
		this.ee.emit('basket:change', this.basket);
	}
	getTotal() {
		return this.basket.reduce((acc, item) => acc + item.price, 0);
	}
	setAdress(s: string) {
		this.address = s;
	}
	setEmail(s: string) {
		this.email = s;
	}
	async createOrder() {
		const response = await api.createOrder({
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.getTotal(),
			items: this.basket.map((item) => item.id),
		});
		this.basket = [];
		this.ee.emit('basket:change', this.basket);
		return response;
	}

	deleteFromBasket(id: string) {
		this.basket = this.basket.filter((item) => item.id !== id);
		this.ee.emit('basket:change', this.basket);
	}
}
