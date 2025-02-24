import { productsList, cartState } from './cart-min.js';
import { fetchAPI } from './scripts-min.js';
import { cartSummarize, updateCartSummary } from './cart-utils-min.js';
import { createFilledCartSummarize } from './cart-ui-min.js';

const bgShadow = document.querySelector('.bg-shadow');
const orderConfirmation = document.querySelector('.order-confirmation');
const orderedItemsList = orderConfirmation.querySelector('.ordered-items-list');

export const showOrderConfirmation = (filledCartSummarize, cartItemsArr) => {
	const confirmBtn = filledCartSummarize.querySelector('.confirm-btn');
	const newOrderBtn = orderConfirmation.querySelector('.new-order-btn');
	confirmBtn.addEventListener('click', () => {
		bgShadow.style.display = 'block';
		orderConfirmation.style.display = 'block';

		const finalCosts = filledCartSummarize.querySelector('.total-costs');

		orderedItemsList.innerHTML = '';

		cartItemsArr.forEach(({ element, thumbnail }) => {
			const name = element.querySelector('.cart-item-name').textContent;
			const amount = element.querySelector('.cart-item-quantity').textContent;
			const price = element.querySelector('.cart-item-price').textContent;
			const totalPrice = parseFloat(
				element.querySelector('.cart-item-total').textContent.replace('$', '')
			).toFixed(2);

			const orderedItem = document.createElement('div');
			orderedItem.classList.add(
				'ordered-item',
				'd-flex',
				'justify-content-between',
				'align-items-center'
			);
			orderedItem.innerHTML = `
            <div class="ordered-item-info d-flex align-items-center">
                <img class="thumbnail-img me-3" src="${thumbnail}" alt="thumbnail">
                <div class="d-flex flex-column gap-2">
                    <h3 class="ordered-item-name">${name}</h3>
                    <p class="ordered-item-price">
                        <span class="ordered-item-amount me-3">${amount}</span>${price}
                    </p>
                </div>
            </div>
            <p class="ordered-item-total">$${totalPrice}</p>
        `;
			orderedItemsList.appendChild(orderedItem);
		});

		orderConfirmation.querySelector('.total-costs').textContent =
			finalCosts.textContent;
	});

	const startNewOrder = () => {
		orderConfirmation.style.display = 'none';
		bgShadow.style.display = 'none';

		cartState.cartItemsArr.forEach((item) => {
			item.element.remove();
		});

		cartState.cartItemsArr = [];
		cartState.priceSummarize = [];
		cartState.count = 0;
		cartState.addedProductsAmount.textContent = cartState.count;

		let filledCartSummarize = document.querySelector('.filled-cart-summarize');
		if (filledCartSummarize) {
			filledCartSummarize.style.display = 'none';
		}

		cartState.emptyCart.style.display = 'flex';
		cartState.filledCart.style.display = 'none';

		updateCartSummary(cartState);

		const quantityBtns = document.querySelectorAll('.quantity-btn');
		const addBtns = document.querySelectorAll('.add-to-cart-btn');
		quantityBtns.forEach((btn) => {
			const quantity = btn.querySelector('.product-quantity');
			quantity.textContent = 1;
			btn.style.display = 'none';
		});
		addBtns.forEach((btn) => {
			btn.style.display = 'flex';
		});
	};

	newOrderBtn.addEventListener('click', startNewOrder);
};
