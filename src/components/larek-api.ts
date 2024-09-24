import { Product, ProductsResponse } from '../types';
import { API_URL } from '../utils/constants';
import { Api } from './base/api';


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
