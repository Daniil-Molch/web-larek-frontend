import { MakeOrderProps, MakeOrderInfo, MakeOrder2Props } from '../../types';
import { Basket } from './basket';
import { Form } from './form';
import { Template } from './template';

export class MakeOrder extends Form<MakeOrderProps> {
	protected _render(element: HTMLElement, props: MakeOrderProps): void {
		this.initValidation(element);
		const { onNext } = props;
		let payment = null as MakeOrderInfo['payment'] | null;
		const address = element.querySelector('.form__input') as HTMLInputElement;
		// const form = element.querySelector('.form');
		const buttonCardPayment = element.querySelector(
			'.button__card'
		) as HTMLButtonElement;
		const buttonCashPayment: HTMLButtonElement =
			element.querySelector('.button__cash');
		const buttonNext = element.querySelector(
			'.order__button'
		) as HTMLButtonElement;
		let paymentTouched = false;
		let addressTouched = false;
		const updateButtons = () => {
			if (payment === 'card') {
				buttonCardPayment.classList.add('button_alt-active');
				buttonCashPayment.classList.remove('button_alt-active');
				return;
			}

			if (payment === 'cash') {
				buttonCashPayment.classList.add('button_alt-active');
				buttonCardPayment.classList.remove('button_alt-active');
				return;
			}
			buttonCardPayment.classList.remove('button_alt-active');
			buttonCashPayment.classList.remove('button_alt-active');
		};
		updateButtons();
		const listener = (e: MouseEvent) => {
			if (e.target == buttonCardPayment) {
				payment = 'card';
			} else {
				payment = 'cash';
			}
			paymentTouched = true;
			updateButtons();
			checkTouched();
		};
		buttonCashPayment.addEventListener('click', listener);
		buttonCardPayment.addEventListener('click', listener);
		function checkTouched() {
			if (paymentTouched && addressTouched) {
				buttonNext.disabled = false;
			}
		}
		element.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!this.isFormValid) {
				console.log('form is not valid');
				return;
			}
			const _address = address.value;
			onNext({
				address: _address,
				payment: payment,
			});
		});
		address.addEventListener('change', () => {
			addressTouched = true;
			checkTouched();
		});
	}
}

export class MakeOrder2 extends Form<MakeOrder2Props> {
	protected _render(element: HTMLElement, props: MakeOrder2Props): void {
		this.initValidation(element);
		const email = element.querySelector(
			'.form__input[name="email"]'
		) as HTMLInputElement;
		const phone = element.querySelector(
			'.form__input[name="phone"]'
		) as HTMLInputElement;
		const buttonFinish = element.querySelector(
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
		element.addEventListener('submit', (e) => {
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
type makeOrder3Props = {
	total: number;
	onFinish: () => void;
};

export class MakeOrder3 extends Template<makeOrder3Props> {
	protected _render(element: HTMLElement, props: makeOrder3Props): void {
		const button = element.querySelector('button');
		const description = element.querySelector('.order-success__description');
		description.textContent = 'Списано ' + props.total + ' Синапсов';
		button.addEventListener('click', () => {
			props.onFinish();
		});
	}
}
