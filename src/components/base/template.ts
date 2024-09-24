import { cloneTemplate } from "../../utils/utils";

export abstract class Template<P> {
	template: HTMLTemplateElement;
	constructor(id: string) {
		this.template = document.getElementById(id) as HTMLTemplateElement;
	}
	render(props: P) {
		// обертка для _render
		const element = cloneTemplate(this.template);
		this._render(element, props);
		return element;
	}
	protected abstract _render(element: HTMLElement, props: P): void; //
}