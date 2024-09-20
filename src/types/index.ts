export type Product = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export type ProductsResponse = {
	total: number;
	items: Product[];
};

export type Order = {
	// Массив ID купленных товаров
	items: string[];
	// Способ оплаты
	payment: string;
	// Сумма заказа
	total: number;
	// Адрес доставки
	address: string;
	// Электронная почта
	email: string;
	// Телефон
	phone: string;
};

export type OrderForm = {
	payment: string;
	address: string;
	email: string;
	phone: string;
};
export type Allfunc = {
	basket: Product[];
	store: Product[];
	order: Order;
	formErrors: string;
	addToBasket(value: Product): void;
	deleteFromBasket(id: string): void;
	clearBasket(): void;
	getBasketAmount(): number;
	setItems(): void;
	validateContacts(): boolean;
	validateOrder(): boolean;
	refresh(): boolean;
	resetSelected(): void;
};
