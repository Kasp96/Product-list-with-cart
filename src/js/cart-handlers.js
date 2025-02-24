import { createCartItem } from './cart-ui-min.js';
import {
	updateCartSummary,
	updatePriceSummarize,
	removeFromPriceSummarize,
} from './cart-utils-min.js';

export const handleAddToCart = (e, cartState) => {
	if (!e.target.classList.contains('add-to-cart-btn')) return;

	const addToCartBtn = e.target;
	const quantityBtn = e.target.nextElementSibling;
	addToCartBtn.style.display = 'none';
	quantityBtn.style.display = 'flex';
	cartState.emptyCart.style.display = 'none';
	cartState.filledCart.style.display = 'flex';

	let productAmountElement = quantityBtn.querySelector('.product-quantity');
	let itemName = addToCartBtn
		.closest('.product-card')
		.querySelector('.product-name').textContent;
	let itemPriceElement = addToCartBtn
		.closest('.product-card')
		.querySelector('.price').textContent;
	let itemPrice = parseFloat(itemPriceElement.slice(1));
	const imgThumbnail = addToCartBtn
		.closest('.product-card')
		.querySelector('.product-thumbnail').src;

	const newCartItem = createCartItem(
		itemName,
		itemPriceElement,
		itemPrice,
		1,
		imgThumbnail
	);
	cartState.filledCart.appendChild(newCartItem);

	cartState.cartItemsArr.push({
		element: newCartItem,
		thumbnail: imgThumbnail,
	});
	cartState.priceSummarize.push({ name: itemName, price: itemPrice });

	updateCartSummary(cartState);

	cartState.count++;
	cartState.addedProductsAmount.textContent = cartState.count;

	const cartAmount = newCartItem.querySelector('.cart-item-quantity');
	const cartTotalPriceElement = newCartItem.querySelector('.cart-item-total');

	quantityBtn
		.querySelector('.increase-amount-wrapper')
		.addEventListener('click', () => {
			handleIncreaseAmount(
				cartAmount,
				cartTotalPriceElement,
				itemPrice,
				productAmountElement,
				itemName,
				cartState
			);
		});

	quantityBtn
		.querySelector('.reduce-amount-wrapper')
		.addEventListener('click', () => {
			handleReduceAmount(
				cartAmount,
				cartTotalPriceElement,
				itemPrice,
				productAmountElement,
				itemName,
				cartState
			);
		});

	newCartItem
		.querySelector('.cart-item-remove')
		.addEventListener('click', () => {
			handleRemoveItem(
				newCartItem,
				cartAmount,
				itemName,
				addToCartBtn,
				quantityBtn,
				cartState
			);
		});
};

const handleIncreaseAmount = (
	cartAmount,
	cartTotalPriceElement,
	itemPrice,
	productAmountElement,
	itemName,
	cartState
) => {
	let amount = parseInt(cartAmount.textContent);
	amount++;

	productAmountElement.textContent = amount;
	cartAmount.textContent = `${amount}x`;
	let newTotalPrice = itemPrice * amount;
	cartTotalPriceElement.textContent = `$${newTotalPrice.toFixed(2)}`;

	updatePriceSummarize(itemName, newTotalPrice, cartState);
	updateCartSummary(cartState);

	cartState.count = cartState.cartItemsArr.reduce((total, item) => {
		const quantity = parseInt(
			item.element.querySelector('.cart-item-quantity').textContent
		);
		return total + quantity;
	}, 0);
	cartState.addedProductsAmount.textContent = cartState.count;
};

const handleReduceAmount = (
	cartAmount,
	cartTotalPriceElement,
	itemPrice,
	productAmountElement,
	itemName,
	cartState
) => {
	let amount = parseInt(cartAmount.textContent);
	if (amount <= 1) return;
	amount--;

	productAmountElement.textContent = amount;
	cartAmount.textContent = `${amount}x`;
	let newTotalPrice = itemPrice * amount;
	cartTotalPriceElement.textContent = `$${newTotalPrice.toFixed(2)}`;

	updatePriceSummarize(itemName, newTotalPrice, cartState);
	updateCartSummary(cartState);

	cartState.count = cartState.cartItemsArr.reduce((total, item) => {
		const quantity = parseInt(
			item.element.querySelector('.cart-item-quantity').textContent
		);
		return total + quantity;
	}, 0);
	cartState.addedProductsAmount.textContent = cartState.count;
};

const handleRemoveItem = (
	cartItem,
	cartAmount,
	itemName,
	addToCartBtn,
	quantityBtn,
	cartState
) => {
	const adjustAmount = parseInt(cartAmount.textContent);
	let amount = 1;
	cartState.cartItemsArr = cartState.cartItemsArr.filter(
		(item) => item.element !== cartItem
	);
	removeFromPriceSummarize(itemName, cartState);

	cartState.count = cartState.cartItemsArr.reduce((total, item) => {
		const quantity = parseInt(
			item.element.querySelector('.cart-item-quantity').textContent
		);
		return total + quantity;
	}, 0);

	cartState.addedProductsAmount.textContent = cartState.count;

	amount = 1;
	quantityBtn.querySelector('.product-quantity').textContent = amount;
	addToCartBtn.style.display = 'flex';
	quantityBtn.style.display = 'none';
	cartItem.remove();

	if (cartState.count === 0) {
		cartState.emptyCart.style.display = 'flex';
		cartState.filledCart.style.display = 'none';
	}

	updateCartSummary(cartState);
};
