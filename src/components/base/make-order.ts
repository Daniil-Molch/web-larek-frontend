import { ModalOrderProps, MakeOrderInfo} from '../../types';
import { Form } from './form';

export class ModalOrder extends Form<ModalOrderProps> {
	buttonCardPayment: HTMLButtonElement;
	buttonCashPayment: HTMLButtonElement;
	buttonNext: HTMLButtonElement;
	address: HTMLInputElement;
	render() {
		return this.element;
	}
	static templateId = 'order';
	paymentTouched = false;
	addressTouched = false;
	payment = null as MakeOrderInfo['payment'] | null;
	constructor(props: ModalOrderProps) {
		super(props);
		this.address = this.element.querySelector(
			'.form__input'
		) as HTMLInputElement;

		this.buttonCardPayment = this.element.querySelector(
			'.button__card'
		) as HTMLButtonElement;
		this.buttonCashPayment = this.element.querySelector('.button__cash');
		this.buttonNext = this.element.querySelector(
			'.order__button'
		) as HTMLButtonElement;
		this.buttonCashPayment.addEventListener('click', this.listener.bind(this));
		this.buttonCardPayment.addEventListener('click', this.listener.bind(this));
		this.address.addEventListener('change', () => {
			this.addressTouched = true;
			this.checkTouched();
		});
		this.element.addEventListener('submit', this.onSubmit.bind(this));
	}
	updateButtons() {
		if (this.payment === 'card') {
			this.buttonCardPayment.classList.add('button_alt-active');
			this.buttonCashPayment.classList.remove('button_alt-active');
			return;
		}

		if (this.payment === 'cash') {
			this.buttonCashPayment.classList.add('button_alt-active');
			this.buttonCardPayment.classList.remove('button_alt-active');
			return;
		}
		this.buttonCardPayment.classList.remove('button_alt-active');
		this.buttonCashPayment.classList.remove('button_alt-active');
	}
	listener(e: MouseEvent) {
		if (e.target == this.buttonCardPayment) {
			this.payment = 'card';
		} else {
			this.payment = 'cash';
		}
		this.paymentTouched = true;
		this.updateButtons();
		this.checkTouched();
	}
	checkTouched() {
		if (this.paymentTouched && this.addressTouched) {
			this.buttonNext.disabled = false;
		}
	}
	onSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!this.isFormValid) {
			console.log('form is not valid');
			return;
		}
		const _address = this.address.value;
		this.props.onNext({
			address: _address,
			payment: this.payment,
		});
	}
}


