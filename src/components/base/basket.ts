import { formatPrice } from '../../formatPrice';
import { Product } from '../../types';
import { Template } from './template';
type BasketProps = {
	products: Product[];
	price: number;
	onCreateOrder: () => void;
	onProductDelete: (id: string) => void;
};

export class Basket extends Template<BasketProps> {
	protected _render(element: HTMLElement, props: BasketProps): void {
		const orderList = element.querySelector('.basket__list');
		const price = element.querySelector('.basket__price');
		const makeOrderButton = element.querySelector(
			'.basket__button'
		) as HTMLButtonElement;
		price.textContent = formatPrice(props.price);
		for (const product of props.products) {
			orderList.append(
				basketItem.render({
					product,
					onDelete: () => {
						props.onProductDelete(product.id);
					},
				})
			);
		}
		makeOrderButton.addEventListener('click', () => {
			props.onCreateOrder();
		});
	}
}
type BasketItemProps = {
	product: Product;
	onDelete: () => void;
};
class BasketItem extends Template<BasketItemProps> {
	protected _render(
		element: HTMLElement,
		{ product, onDelete }: BasketItemProps
	): void {
		const title = element.querySelector('.card__title');
		const cardPrice = element.querySelector('.card__price');
		const buttonDelete = element.querySelector('.basket__item-delete');
		cardPrice.textContent = formatPrice(product.price);
		title.textContent = product.title;
		buttonDelete.addEventListener('click', () => {
			onDelete();
		});
	}
}
// export class SavePrice extends Basket {
// 	savePrice(element: HTMLElement, props: BasketProps) {
// 		const price = element.querySelector('.basket__price');
// 		price.textContent = formatPrice(props.price);
// 	}
// }
const basketItem = new BasketItem('card-basket');
