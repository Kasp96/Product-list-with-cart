import { showOrderConfirmation } from './order-confirmation-min.js';
import { handleAddToCart } from './cart-handlers-min.js';
import { updateCartSummary } from './cart-utils-min.js';



export const productsList = document.querySelector('.products-list');
export const cartState = {
	cartPanel: document.querySelector('.cart-panel'),
	emptyCart: document.querySelector('.empty-cart'),
	filledCart: document.querySelector('.cart-body'),
	addedProductsAmount: document.querySelector('.added-products-amount'),
	count: 0,
	priceSummarize: [],
	cartItemsArr: [],
};

productsList.addEventListener('click', (e) => handleAddToCart(e, cartState));
