import { ModalSuccessProps } from "../../types";
import { Template } from "./template";



export class ModalSuccsess extends Template<ModalSuccessProps> {
	render() {
		return this.element;
	}
	static templateId = 'success';
	constructor(props: ModalSuccessProps) {
		super(props);
		const button = this.element.querySelector('button');
		const description = this.element.querySelector(
			'.order-success__description'
		);
		description.textContent = 'Списано ' + props.total + ' Синапсов';
		button.addEventListener('click', () => {
			props.onFinish();
		});
	}
}
