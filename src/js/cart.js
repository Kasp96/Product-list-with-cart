const productsList = document.querySelector('.products-list');
const cartPanel = document.querySelector('.cart-panel');
const emptyCart = document.querySelector('.empty-cart');
const filledCart = document.querySelector('.cart-body');
const addedProductsAmount = document.querySelector('.added-products-amount');
let count = 0;
let priceSummarize = [];

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
		// priceSummarize.push(finalProductPrice);
		// console.log(priceSummarize);
		// cartSummarize(priceSummarize);
		count++;
		addedProductsAmount.textContent = count;
		console.log(addedProductsAmount.textContent);

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
				count++;
				addedProductsAmount.textContent = count;
				console.log(addedProductsAmount.textContent);
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
					count--;
					addedProductsAmount.textContent = count;
					console.log(addedProductsAmount.textContent);
				}
			});
		const removeItemBtn = newCartItem
			.querySelector('.cart-item-remove')
			.addEventListener('click', () => {
				const adjustAmount = parseInt(
					newCartItem.querySelector('.cart-item-quantity').textContent
				);
				count -= adjustAmount;
				addedProductsAmount.textContent = count;

				const productCard = [
					...document.querySelectorAll('.product-card'),
				].find(
					(card) => card.querySelector('.product-name').textContent === itemName
				);
				const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
				const quantityBtn = productCard.querySelector('.quantity-btn');
				const quantity = quantityBtn.querySelector('.product-quantity');
				quantity.textContent = 1;
				addToCartBtn.style.display = 'flex';
				quantityBtn.style.display = 'none';
				newCartItem.remove();
				console.log(addedProductsAmount.textContent);
			});
	}
});

const cartSummarize = (priceSummarize) => {
	const sum = priceSummarize.reduce((acc, num) => acc + num, 0);

	if (cartPanel.querySelector('.filled-cart-summarize')) {
		return;
	} else {
		const filledCartSummarize = document.createElement('div');
		filledCartSummarize.classList.add(
			'filled-cart-summarize',
			'd-flex',
			'flex-column',
			'justify-content-center',
			'align-items-center'
		);
		filledCartSummarize.innerHTML = `
	<div class="order-total d-flex justify-content-between w-100 align-items-center mt-2">
                <p>Order Total</p>
                <p class="total-costs">$${sum}</p>
            </div>
            <p class="carbon-neutral d-flex justify-content-center align-items-center gap-1">
                <img class="me-1" src="../images/icon-carbon-neutral.svg" alt="carbon neutral icon">
                This is a<span>carbon-neutral</span>delivery
            </p>
            <button class="buttons confirm-btn text-center w-100">Confirm Order</button>`;
		cartPanel.appendChild(filledCartSummarize);
	}
};
