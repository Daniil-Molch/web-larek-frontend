import { cloneTemplate } from '../../utils/utils';

export abstract class Template<P> {
	template: HTMLTemplateElement;
	constructor(id: string) {
		this.template = document.getElementById(id) as HTMLTemplateElement;
	}
	lastProps: P | null;
	lastElement: HTMLElement | null;
	update(lastProps: P) {
		const lastElement = this.lastElement;
		if(!lastElement)return;
		const newElement = this.render(lastProps);
		lastElement.replaceWith(newElement);
	}
	render(props: P) {
		// обертка для _render
		const element = cloneTemplate(this.template);
		this._render(element, props);
		this.lastElement = element;
		return element;
	}
	protected abstract _render(element: HTMLElement, props: P): void; //
}
