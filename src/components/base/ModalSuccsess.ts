import { ModalSuccessProps } from "../../types";
import { Template } from "./template";

type RenderProp={
	total:number;
}

export class ModalSuccsess extends Template<ModalSuccessProps,RenderProp> {
	description: HTMLElement;
	render({total}:RenderProp) {
		this.description.textContent = 'Списано ' + total + ' Синапсов';
		return this.element;
	}
	static templateId = 'success';
	constructor(props: ModalSuccessProps) {
		super(props);
		const button = this.element.querySelector('button');
		this.description = this.element.querySelector(
			'.order-success__description'
		);
		button.addEventListener('click', () => {
			props.onFinish();
		});
	}
}
