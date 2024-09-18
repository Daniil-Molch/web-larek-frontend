export type Product = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number|null;
};

export type ProductsResponse = {
	total: number;
    items:Product[];
};
