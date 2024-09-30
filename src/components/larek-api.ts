import { Product, ProductsResponse } from '../types';
import { API_URL } from '../utils/constants';
import { Api } from './base/api';

type OrderInfo = {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
};
type OrderResponse = {
	id: string;
	total: number;
};
export class LarekApi {
	apiClient: Api;
	constructor() {
		this.apiClient = new Api(API_URL);
	}
	async getProducts() {
		const response = await this.apiClient.get<ProductsResponse>('/product');
		return response.items;
	}
	async getProduct(id: string) {
		const response = await this.apiClient.get<Product>(`/product/${id}`);
		return response;
	}
	async createOrder(orderInfo: OrderInfo) {
		const response = await this.apiClient.post<OrderResponse>("/order",orderInfo);
		return response
	}
}
