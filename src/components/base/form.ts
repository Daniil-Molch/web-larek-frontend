import { Template } from './template';
export abstract class Form<T> extends Template<T> {
	constructor(props: T) {
		super(props);
		const inputs = Array.from(this.element.querySelectorAll('input'));
		inputs.forEach((inputEl) => {
			inputEl.addEventListener('input', () => {
				inputEl.dataset.touched = '';
				const validity = inputEl.validity;
				let validationMessage = inputEl.validationMessage;
				if (validity.patternMismatch) {
					validationMessage = inputEl.dataset.errorMessage;
				}
				const isFormValid = inputs.every((el) => el.validity.valid);
				this.isFormValid = isFormValid;
			});
		});
	}
	isFormValid: boolean;
}
