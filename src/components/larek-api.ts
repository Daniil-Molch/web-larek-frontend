import { API_URL } from '../utils/constants';
import { Api } from './base/api';
import { Product, ProductsResponse } from './base/types';

export class LarekApi {
	apiClient: Api;
	constructor() {
		this.apiClient = new Api(API_URL);
	}
	async getProducts() {
		const response = await this.apiClient.get<ProductsResponse>('/product');
		return response.items;
	}
    async getProduct(id:string){
        const response = await this.apiClient.get<Product>(`/product/${id}`);
		return response;
    }
}
