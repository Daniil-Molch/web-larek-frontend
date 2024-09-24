import { formatPrice } from '../../formatPrice';
import { Product } from '../../types';
import { Template } from './template';
type BasketProps = {
	products: Product[];
	price: number;
};
export class Basket extends Template<BasketProps> {
	protected _render(element: HTMLElement, props: BasketProps): void {
		const orderList = element.querySelector('.basket__list');
		const price = element.querySelector('.basket__price');
		price.textContent = formatPrice(props.price);
		for (const product of props.products) {
			orderList.append(basketItem.render(product));
		}
	}
}
class BasketItem extends Template<Product> {
	protected _render(element: HTMLElement, props: Product): void {
		const title = element.querySelector('.card__title');
		const cardPrice = element.querySelector('.card__price');
		cardPrice.textContent = formatPrice(props.price);
		title.textContent = props.title;
	}
}
const basketItem = new BasketItem('card-basket');
// оформить заказ => ивент листенер на кнопку продолжить 
//имвент имитер.emit.createorder 
// index.ts EE.on "create order"()=>{modal.openmodal()}