const productsList = document.querySelector('.products-list');
const cartPanel = document.querySelector('.cart-panel');
const emptyCart = document.querySelector('.empty-cart');
const filledCart = document.querySelector('.cart-body');
const addedProductsAmount = document.querySelector('.added-products-amount');
let count = 0;
let priceSummarize = [];

export const handleAddToCart = (e) => {
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
		let finalProductPrice = parseFloat((itemPrice * amount).toFixed(2));

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
                <p class="cart-item-total">$${finalProductPrice.toFixed(2)}</p>
            </div>
            </div>
            <button class="cart-item-remove position-relative border-0 bg-white p-2"><img
                src="../images/icon-remove-item.svg" alt="remove item icon"></button>`;
		filledCart.appendChild(newCartItem);

		priceSummarize.push({ name: itemName, price: finalProductPrice });

		updateCartSummary();

		count += amount;
		addedProductsAmount.textContent = count;

		const cartAmount = newCartItem.querySelector('.cart-item-quantity');
		const cartTotalPriceElement = newCartItem.querySelector('.cart-item-total');

		quantityBtn
			.querySelector('.increase-amount-wrapper')
			.addEventListener('click', () => {
				amount++;
				productAmountElement.textContent = amount;
				cartAmount.textContent = amount + 'x';

				let newTotalPrice = parseFloat((itemPrice * amount).toFixed(2));
				cartTotalPriceElement.textContent = `$${newTotalPrice}`;

				updatePriceSummarize(itemName, newTotalPrice);
				updateCartSummary();

				count++;
				addedProductsAmount.textContent = count;
			});

		quantityBtn
			.querySelector('.reduce-amount-wrapper')
			.addEventListener('click', () => {
				if (amount === 1) return;

				amount--;
				productAmountElement.textContent = amount;
				cartAmount.textContent = amount + 'x';

				let newTotalPrice = parseFloat((itemPrice * amount).toFixed(2));
				cartTotalPriceElement.textContent = `$${newTotalPrice}`;

				updatePriceSummarize(itemName, newTotalPrice);
				updateCartSummary();

				count--;
				addedProductsAmount.textContent = count;
			});

		newCartItem
			.querySelector('.cart-item-remove')
			.addEventListener('click', () => {
				const adjustAmount = parseInt(cartAmount.textContent);
				count -= adjustAmount;
				addedProductsAmount.textContent = count;

				removeFromPriceSummarize(itemName);
				updateCartSummary();

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
				if (addedProductsAmount.innerHTML === '0') {
					emptyCart.style.display = 'flex';
					filledCart.style.display = 'none';
					const filledCartSummarize = document.querySelector(
						'.filled-cart-summarize'
					);
					if (filledCartSummarize) {
						filledCartSummarize.style.display = 'none';
					}
				}
			});
	}
};

productsList.addEventListener('click', handleAddToCart);

const updatePriceSummarize = (productName, newTotalPrice) => {
	let index = priceSummarize.findIndex((item) => item.name === productName);
	if (index !== -1) {
		priceSummarize[index].price = newTotalPrice;
	}
};

const removeFromPriceSummarize = (productName) => {
	priceSummarize = priceSummarize.filter((item) => item.name !== productName);
};

const updateCartSummary = () => {
	if (priceSummarize.length === 0) {
		cartSummarize('0.00');
		return;
	}

	let sum = priceSummarize
		.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0)
		.toFixed(2);
	cartSummarize(sum);
};

const cartSummarize = (sum) => {
	let totalCostsElement = cartPanel.querySelector('.total-costs');
	let filledCartSummarize = document.querySelector('.filled-cart-summarize');

	if (priceSummarize.length === 0) {
		emptyCart.style.display = 'flex';
		filledCart.style.display = 'none';

		if (filledCartSummarize) {
			filledCartSummarize.remove();
		}
		return;
	}
	let confirmBtn;
	if (!filledCartSummarize) {
		filledCartSummarize = document.createElement('div');
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
	} else {
		totalCostsElement.textContent = `$${sum}`;
	}

	emptyCart.style.display = 'none';
	filledCart.style.display = 'flex';
	filledCartSummarize.style.display = 'flex';
};
