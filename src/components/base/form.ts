import { Model } from './model';
import { Template } from './template';
type FormErrors = {
	isDisabled: boolean;
	errors: string[];
};

export abstract class Form<T> extends Template<T> {
    isFormValid: boolean;
	initValidation(element:HTMLElement) {
		const inputs = Array.from(element.querySelectorAll('input'));
		inputs.forEach((inputEl) => {
			inputEl.addEventListener('input', () => {
                inputEl.dataset.touched="";
				const validity = inputEl.validity;
				let validationMessage = inputEl.validationMessage;
				if (validity.patternMismatch) {
					validationMessage = inputEl.dataset.errorMessage;
				}
                const isFormValid = inputs.every((el) => el.validity.valid);
                this.isFormValid= isFormValid;
			});
            
		});
	}
}
