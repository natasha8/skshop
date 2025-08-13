export interface CartItem {
	id: string;
	productId: string;
	title: string;
	slug: string;
	price: number;
	quantity: number;
	size?: string;
	color?: string;
	image: string;
	type: string;
	isPreorder: boolean;
	variantId?: string;
	stock?: number;
}

export interface CartState {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
	isOpen: boolean;
}

export interface CartContextType {
	state: CartState;
	addItem: (item: Omit<CartItem, "id">) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	toggleCart: () => void;
	closeCart: () => void;
	openCart: () => void;
	getItemQuantity: (productId: string, size?: string) => number;
	isInCart: (productId: string, size?: string) => boolean;
}
