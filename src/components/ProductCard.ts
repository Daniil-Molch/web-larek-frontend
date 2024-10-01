import { PropsCardCommon, ProductCardCommon } from './ProductCardCommon';
export type Props = {
	onClick: () => void;
} & PropsCardCommon;
export class ProductCard extends ProductCardCommon {
	constructor(props: Props) {
		super(props);
		this.element.addEventListener('click', () => {
			props.onClick();
		});
	}
	static templateId = 'card-catalog';
	render() {
		return this.element;
	}
	categoryToClass(category: string) {
		switch (category) {
			case 'кнопка':
				return 'button';
			case 'софт-скил':
				return 'soft';
			case 'хард-скил':
				return 'hard';
			case 'дополнительное':
				return 'additional';
			default:
				return 'other';
		}
	}
}

