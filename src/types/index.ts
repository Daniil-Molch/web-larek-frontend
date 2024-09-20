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
export type Allfunc ={
	// Корзина с товарами
	basket: Product[];
	// Массив карточек товара
	store: Product[];
	// Информация о заказе при покупке товара
	order: Order;
	// Ошибки при заполнении форм
	formErrors: string;
	// Метод для добавления товара в корзину
	addToBasket(value: Product): void;
	// Метод для удаления товара из корзины
	deleteFromBasket(id: string): void;
	// Метод для полной очистки корзины
	clearBasket(): void;
	// Метод для получения количества товаров в корзине
	getBasketAmount(): number;
	// Метод для получения суммы цены всех товаров в корзине
	getTotalBasketPrice(): number;
	// Метод для добавления ID товаров в корзине в поле items для order
	setItems(): void;
	// Метод для заполнения полей email, phone, address, payment в order
	setOrderField(field: keyof OrderForm, value: string): void;
	// Валидация форм для окошка "контакты"
	validateContacts(): boolean;
	// Валидация форм для окошка "заказ"
	validateOrder(): boolean;
	// Очистить order после покупки товаров
	refreshOrder(): boolean;
	// Метод для превращения данных, полученых с сервера в тип данных приложения
	setStore(items: Product[]): void;
	// Метод для обновления поля selected во всех товарах после совершения покупки
	resetSelected(): void;
}
