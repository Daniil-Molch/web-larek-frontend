
import { BasketItemProps, Product } from '../types';
import { formatPrice } from '../utils/utils';
import { Template } from './base/template';
type BasketProps = {
	products: Product[];
	price: number;
	onCreateOrder: () => void;
	onProductDelete: (id: string) => void;
};

export class Basket extends Template<BasketProps> {
	render() {
		return this.element;
	}
	static templateId = 'basket';
	orderList: HTMLElement;
	constructor(props: BasketProps) {
		super(props);
		this.orderList = this.element.querySelector('.basket__list');
		const price = this.element.querySelector('.basket__price');
		const makeOrderButton = this.element.querySelector(
			'.basket__button'
		) as HTMLButtonElement;
		price.textContent = formatPrice(props.price);
		makeOrderButton.addEventListener('click', () => {
			props.onCreateOrder();
		});
		this.update(props.products);
	}
	protected _render(element: HTMLElement, props: BasketProps): void {}
	update(products: Product[]) {
		this.orderList.replaceChildren(
			...products.map((product,index) => {
				const basketItem = new BasketItem({
					index:index+1,
					product,
					onDelete: () => this.props.onProductDelete(product.id),
				});
				return basketItem.render();
			})
		);
	}
}

class BasketItem extends Template<BasketItemProps> {
	render() {
		return this.element;
	}
	static templateId = 'card-basket';
	constructor(props: BasketItemProps) {
		super(props);
		const title = this.element.querySelector('.card__title');
		const cardPrice = this.element.querySelector('.card__price');
		const buttonDelete = this.element.querySelector('.basket__item-delete');
		cardPrice.textContent = formatPrice(props.product.price);
		title.textContent = props.product.title;
		buttonDelete.addEventListener('click', () => {
			this.props.onDelete();
		});
		const el= this.element.querySelector(".basket__item-index");
		el.textContent=props.index.toString();

	}

}
