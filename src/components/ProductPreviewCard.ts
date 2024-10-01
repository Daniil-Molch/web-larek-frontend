import { ProductCardCommon, PropsCardCommon } from './ProductCardCommon';
type Props = {
	onAddToBasket: () => void;
} & PropsCardCommon;
export class ProductPreviewCard extends ProductCardCommon {
	render() {
		return this.element
	}
	static templateId = 'card-preview';
	constructor(props: Props) {
		super(props);
		const button = this.element.querySelector('.card__button');
		const cardDescription = this.element.querySelector('.card__text');
		cardDescription.textContent = props.product.description;
		button.addEventListener('click', () => {
			props.onAddToBasket();
		});
	}
}
