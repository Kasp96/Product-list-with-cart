const productsList = document.querySelector('.products-list');

const fetchAPI = async (itemName) => {
	try {
		const URL = '/assets/data.json';
		const res = await fetch(URL);
		const data = await res.json();

		data.forEach((item) => {
			const newItem = document.createElement('div');
			newItem.classList.add(
				'product-card',
				'col-12',
				'col-sm-6',
				'col-md-4',
				'd-flex',
				'flex-column'
			);
			const itemName = item.name;
			const itemCategory = item.category;
			const itemPrice = item.price.toFixed(2);
			const imgMobile = item.image.mobile;
			const imgTablet = item.image.tablet;
			const imgDesktop = item.image.desktop;

			newItem.innerHTML = `<div class="product-img-box position-relative">
    <picture>
      <source srcset="${imgDesktop}" media="(min-width: 1200px)">
      <source srcset="${imgTablet}" media="(min-width: 576px)">
      <img src="${imgMobile}" alt="Waffle with Berries">
    </picture>
    <button
      class="product-btn add-to-cart-btn justify-content-center align-items-center gap-2 position-absolute">
      <img class="pe-none" src="../images/icon-add-to-cart.svg" alt="cart icon">
      Add to Cart
    </button>
    <button class="product-btn quantity-btn position-absolute justify-content-between align-items-center">
      <div class="icon-wrapper reduce-amount-wrapper position-relative"><img src="../images/icon-decrement-quantity.svg"
          alt="reduce quantity button"></div>
      <span class="product-quantity">1</span>
      <div class="icon-wrapper increase-amount-wrapper position-relative"><img src="../images/icon-increment-quantity.svg"
          alt="increase quantity button"></div>
    </button>
  </div>
  <div class="product-info">
    <h2 class="product-category mb-1">${itemCategory}</h2>
    <p class="product-name">${itemName}</p>
    <p class="price">$${itemPrice}</p>
  </div>`;

			productsList.appendChild(newItem);
		});
	} catch (error) {
		console.error('API error:', error);
	}
};

document.addEventListener('DOMContentLoaded', fetchAPI);
