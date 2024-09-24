// format and category перенести в другой файл
export function formatPrice(price: number | null) {
	if (price == null) {
		return 'Бесценно';
	}
	return `${price} синапсов`;
}
