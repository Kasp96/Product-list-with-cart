import { createFilledCartSummarize } from './cart-ui-min.js';
import { showOrderConfirmation } from './order-confirmation-min.js';


export const updatePriceSummarize = (productName, newTotalPrice, cartState) => {
	let index = cartState.priceSummarize.findIndex(
		(item) => item.name === productName
	);
	if (index !== -1) {
		cartState.priceSummarize[index].price = newTotalPrice;
	}
};

export const removeFromPriceSummarize = (productName, cartState) => {
	cartState.priceSummarize = cartState.priceSummarize.filter(
		(item) => item.name !== productName
	);
};

export const updateCartSummary = (cartState) => {
	if (cartState.priceSummarize.length === 0) {
		cartSummarize('0.00', cartState);
		return;
	}

	let sum = cartState.priceSummarize
		.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0)
		.toFixed(2);
	cartSummarize(sum, cartState);
};

export const cartSummarize = (sum, cartState) => {
    let totalCostsElement = cartState.cartPanel.querySelector('.total-costs');
    let filledCartSummarize = document.querySelector('.filled-cart-summarize');

    if (cartState.priceSummarize.length === 0) {
        cartState.emptyCart.style.display = 'flex';
        cartState.filledCart.style.display = 'none';

        if (filledCartSummarize) {
            filledCartSummarize.remove();
        }
        return null;
    }

    if (!filledCartSummarize) {
        filledCartSummarize = createFilledCartSummarize(sum);
        cartState.cartPanel.appendChild(filledCartSummarize);

        showOrderConfirmation(filledCartSummarize, cartState.cartItemsArr);
    } else if (totalCostsElement) { 
        totalCostsElement.textContent = `$${sum}`;
    }

    cartState.emptyCart.style.display = 'none';
    cartState.filledCart.style.display = 'flex';
    filledCartSummarize.style.display = 'flex';

    return filledCartSummarize;
};

