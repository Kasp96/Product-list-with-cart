export const createFilledCartSummarize = (sum) => {
	const filledCartSummarize = document.createElement('div');
	filledCartSummarize.classList.add(
		'filled-cart-summarize',
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
            This is a<span>carbon-neutral</span> delivery
        </p>
        <button class="buttons confirm-btn text-center w-100">Confirm Order</button>
    `;

	return filledCartSummarize;
};
export const createCartItem = (
	itemName,
	itemPriceElement,
	itemPrice,
	amount,
	imgThumbnail
) => {
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

	return newCartItem;
};
