import { cloneTemplate } from '../../utils/utils';

export abstract class Template<P, R = never> {
	static templateId: string;
	element: HTMLElement;
	props: P;
	constructor(props: P) {
		const templateId = (this.constructor as typeof Template).templateId;
		const template = document.getElementById(templateId) as HTMLTemplateElement;
		this.element = cloneTemplate(template);
		this.props = props;
	}
	abstract render(renderProps: R): HTMLElement;
	defaultRender() {
		return this.element;
	}
	// update(lastProps: P) {
	// 	const lastElement = this.lastElement;
	// 	if(!lastElement)return;
	// 	const newElement = this.render(lastProps);
	// 	lastElement.replaceWith(newElement);
	// }
	// // обертка для _render
	// const element = cloneTemplate(this.template);
	// this._render(element, props);
	// this.lastElement = element;
	// return element;
}
