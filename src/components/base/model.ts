import { Product } from '../../types';
import { EventEmitter } from './events';

export class Model {
	basket: Product[]=[];
	ee: EventEmitter;
	constructor(ee: EventEmitter) {
		this.ee = ee;
	}
	addToBasket(product: Product) {
		this.basket.push(product);
		this.ee.emit('basket:change', this.basket);
	}
    getTotal(){
        return this.basket.reduce((acc,item)=>acc+item.price,0)
    }
    
}
