import { ModalContactsProps } from "../../types";
import { Form } from "./form";


export class ModalContacts extends Form<ModalContactsProps> {
	render() {
		return this.element;
	}
	static templateId = 'contacts';

	constructor(props: ModalContactsProps) {
		super(props);
		const email = this.element.querySelector(
			'.form__input[name="email"]'
		) as HTMLInputElement;
		const phone = this.element.querySelector(
			'.form__input[name="phone"]'
		) as HTMLInputElement;
		const buttonFinish = this.element.querySelector(
			'.button__finish'
		) as HTMLButtonElement;
		let emailTouched = false;
		let phoneTouched = false;
		function checkTouched() {
			if (emailTouched && phoneTouched) {
				buttonFinish.disabled = false;
			}
		}
		email.addEventListener('change', () => {
			emailTouched = true;
			checkTouched();
		});
		phone.addEventListener('change', () => {
			phoneTouched = true;
			checkTouched();
		});
		this.element.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!this.isFormValid) {
				console.log('form is not valid');
				return;
			}
			props.onNext({
				email: email.value,
				phone: phone.value,
			});
		});
	}
}
