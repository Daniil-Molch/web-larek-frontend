import { EventEmitter } from './events';

// function openModal(modal: any) {
// 	modal.classList.add('modal_active');
// }
// const modal1 = document.getElementById('modal_container');
// openModal(modal1);

export class Modal {
	element: HTMLElement;
	modalContent: HTMLElement;
	buttonCard: HTMLButtonElement;
	ev: EventEmitter;
	constructor(el: HTMLElement, ev: EventEmitter) {
		this.element = el;
		this.ev = ev;
		this.modalContent = this.element.querySelector('.modal__content');
		this.buttonCard = this.element.querySelector('.modal__close');
		this.buttonCard.addEventListener('click', this.closeModal.bind(this));
	}

	openModal(...content:HTMLElement[]) {
		this.element.classList.add('modal_active');
		this.ev.emit('modal:open');
        document.body.style.overflow="hidden";
        this.modalContent.replaceChildren(...content);
	}
	closeModal() {
		this.element.classList.remove('modal_active');
		this.ev.emit('modal:close');
        document.body.style.overflow="auto";
	}
}
