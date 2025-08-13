"use client";

import React, {
	createContext,
	useContext,
	useReducer,
	useEffect,
	ReactNode,
	useRef,
} from "react";
import { CartState, CartContextType, CartItem } from "@/types/cart";
import { useState } from "react";

// Initial cart state
const initialState: CartState = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
	isOpen: false,
};

// Cart action types
type CartAction =
	| { type: "ADD_ITEM"; payload: CartItem }
	| { type: "REMOVE_ITEM"; payload: string }
	| { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
	| { type: "CLEAR_CART" }
	| { type: "TOGGLE_CART" }
	| { type: "CLOSE_CART" }
	| { type: "OPEN_CART" }
	| { type: "LOAD_CART"; payload: CartState };

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_ITEM": {
			const existingItemIndex = state.items.findIndex(
				(item) =>
					item.productId === action.payload.productId &&
					item.size === action.payload.size
			);

			console.log("ADD_ITEM:", {
				payload: action.payload,
				existingItemIndex,
				currentItems: state.items,
			});

			if (existingItemIndex > -1) {
				// Update existing item quantity
				const updatedItems = [...state.items];
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity:
						updatedItems[existingItemIndex].quantity +
						action.payload.quantity,
				};

				console.log(
					"Updated existing item:",
					updatedItems[existingItemIndex]
				);

				return calculateCartTotals({
					...state,
					items: updatedItems,
				});
			} else {
				// Add new item
				console.log("Adding new item");
				return calculateCartTotals({
					...state,
					items: [...state.items, action.payload],
				});
			}
		}

		case "REMOVE_ITEM": {
			const updatedItems = state.items.filter(
				(item) => item.id !== action.payload
			);
			return calculateCartTotals({
				...state,
				items: updatedItems,
			});
		}

		case "UPDATE_QUANTITY": {
			const updatedItems = state.items
				.map((item) =>
					item.id === action.payload.id
						? {
								...item,
								quantity: Math.max(0, action.payload.quantity),
						  }
						: item
				)
				.filter((item) => item.quantity > 0); // Remove items with 0 quantity

			console.log("UPDATE_QUANTITY:", {
				id: action.payload.id,
				quantity: action.payload.quantity,
				updatedItems,
			});

			return calculateCartTotals({
				...state,
				items: updatedItems,
			});
		}

		case "CLEAR_CART":
			return {
				...state,
				items: [],
				totalItems: 0,
				totalPrice: 0,
			};

		case "TOGGLE_CART":
			return {
				...state,
				isOpen: !state.isOpen,
			};

		case "CLOSE_CART":
			return {
				...state,
				isOpen: false,
			};

		case "OPEN_CART":
			return {
				...state,
				isOpen: true,
			};

		case "LOAD_CART":
			console.log("LOAD_CART:", action.payload);
			// Ensure the loaded cart has calculated totals
			return calculateCartTotals(action.payload);

		default:
			return state;
	}
}

// Helper function to calculate cart totals
function calculateCartTotals(state: CartState): CartState {
	const totalItems = state.items.reduce(
		(sum, item) => sum + item.quantity,
		0
	);
	const totalPrice = state.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	console.log("Calculating totals:", {
		items: state.items,
		totalItems,
		totalPrice,
	});

	return {
		...state,
		totalItems,
		totalPrice,
	};
}

// Create cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);
	const [mounted, setMounted] = useState(false);
	const idCounterRef = useRef(0);

	// Load cart from localStorage on mount
	useEffect(() => {
		setMounted(true);
		try {
			const savedCart = localStorage.getItem("cart");
			if (savedCart) {
				const parsedCart = JSON.parse(savedCart);
				console.log("Loading cart from localStorage:", parsedCart);
				dispatch({ type: "LOAD_CART", payload: parsedCart });
			}
		} catch (error) {
			console.error("Error loading cart from localStorage:", error);
		}
	}, []);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		if (mounted) {
			try {
				console.log("Saving cart to localStorage:", state);
				localStorage.setItem("cart", JSON.stringify(state));
			} catch (error) {
				console.error("Error saving cart to localStorage:", error);
			}
		}
	}, [state, mounted]);

	// Cart actions
	const addItem = (item: Omit<CartItem, "id">) => {
		const newItem: CartItem = {
			...item,
			id: `${item.productId}-${
				item.size || "default"
			}-${++idCounterRef.current}`,
		};
		dispatch({ type: "ADD_ITEM", payload: newItem });
	};

	const removeItem = (id: string) => {
		dispatch({ type: "REMOVE_ITEM", payload: id });
	};

	const updateQuantity = (id: string, quantity: number) => {
		dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	const toggleCart = () => {
		dispatch({ type: "TOGGLE_CART" });
	};

	const closeCart = () => {
		dispatch({ type: "CLOSE_CART" });
	};

	const openCart = () => {
		dispatch({ type: "OPEN_CART" });
	};

	const getItemQuantity = (productId: string, size?: string): number => {
		const item = state.items.find(
			(item) => item.productId === productId && item.size === size
		);
		return item ? item.quantity : 0;
	};

	const isInCart = (productId: string, size?: string): boolean => {
		return state.items.some(
			(item) => item.productId === productId && item.size === size
		);
	};

	const contextValue: CartContextType = {
		state,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		toggleCart,
		closeCart,
		openCart,
		getItemQuantity,
		isInCart,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
}

// Custom hook to use cart context
export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
