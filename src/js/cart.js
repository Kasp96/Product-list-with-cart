const productsList = document.querySelector('.products-list');
const cartPanel = document.querySelector('.cart-panel');
const emptyCart = document.querySelector('.empty-cart');
const filledCart = document.querySelector('.cart-body');
const addedProductsAmount = document.querySelector(
	'.added-products-amount'
).textContent;

productsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('add-to-cart-btn')) {
		const addToCartBtn = e.target;
		const quantityBtn = e.target.nextElementSibling;
		addToCartBtn.style.display = 'none';
		quantityBtn.style.display = 'flex';
		emptyCart.style.display = 'none';
		filledCart.style.display = 'flex';

		let productAmountElement = quantityBtn.querySelector('.product-quantity');
		let amount = parseInt(productAmountElement.textContent);
		const itemName = addToCartBtn
			.closest('.product-card')
			.querySelector('.product-name').textContent;
		let itemPriceElement = addToCartBtn
			.closest('.product-card')
			.querySelector('.price').textContent;
		let itemPrice = parseFloat(itemPriceElement.slice(1));
		let finalProductPrice = (itemPrice * amount).toFixed(2);

		const newCartItem = document.createElement('div');
		newCartItem.classList.add(
			'cart-item',
			'd-flex',
			'justify-content-between',
			'align-items-center',
			'w-100'
		);

		newCartItem.innerHTML = `<div>
        <h3 class="cart-item-name">${itemName}</h3>
        <div class="cart-item-price-box d-flex gap-2">
            <p class="cart-item-quantity me-2">${amount}x</p>
            <p class="cart-item-price">@ ${itemPriceElement}</p>
            <p class="cart-item-total">$${finalProductPrice}</p>
        </div>
        </div>
        <button class="cart-item-remove position-relative border-0 bg-white p-2"><img
            src="../images/icon-remove-item.svg" alt="remove item icon"></button>`;
		filledCart.appendChild(newCartItem);

		const cartAmount = newCartItem.querySelector('.cart-item-quantity');
		const cartTotalPriceElement = newCartItem.querySelector('.cart-item-total');
		let newAmount = productAmountElement.textContent;

		const increaseQuantityBtn = quantityBtn
			.querySelector('.increase-amount-wrapper')
			.addEventListener('click', () => {
				newAmount = ++amount;
				productAmountElement.textContent = newAmount;
				cartAmount.textContent = newAmount + 'x';
				cartTotalPriceElement.textContent = (itemPrice * newAmount).toFixed(2);
			});

		const reduceQuantityBtn = quantityBtn
			.querySelector('.reduce-amount-wrapper')
			.addEventListener('click', () => {
				if (amount === 1) {
					return;
				} else {
					newAmount = --amount;
					productAmountElement.textContent = newAmount;
					cartAmount.textContent = newAmount + 'x';
					cartTotalPriceElement.textContent = (itemPrice * newAmount).toFixed(
						2
					);
				}
			});
		const removeItemBtn = newCartItem
			.querySelector('.cart-item-remove')
			.addEventListener('click', () => {
				newCartItem.remove();
			});
	}
});
