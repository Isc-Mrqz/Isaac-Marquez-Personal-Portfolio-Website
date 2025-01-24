// This is a function that updates the main displayed chocolate image. This works by taking the image path as an argument and updates the property named "src".
const imgSlider = (image) => {
  document.querySelector('.Primary-Chocolate-Image').src = image;
};


// This is another function that is responsible to the background color change function. This works by accepting a color value and applies it to the property named "background".
const changeBgColor = (color) => {
  // Target only the Home and Login sections by their IDs
  const homeSection = document.getElementById('Home');
  const productsSection = document.getElementById('Products');
  const contactForm = document.getElementById('Contact-Form-Container');
  const loginSection = document.getElementById('LoginandSignUp')

  if (homeSection) {
      homeSection.style.background = color;
  }

  if (productsSection) {
      productsSection.style.background = color;
  }

  if (contactForm) {
    contactForm.style.background = color;
}

  if (loginSection) {
      loginSection.style.background = color;
  }
};


// This is the function to enable the responsive menu's visibility. This works by either adding or removing the "active" class from both the menu button and links.
const menuToggle = () => {
  document.querySelector('.Website-Menu-Button').classList.toggle('active');
  document.querySelector('.Navigational-Links').classList.toggle('active');
};


// Products Section
// These are the data for different chocolate products that Weston's Chocolate Box offer. It is categorized by occasion.
const chocolatesData = {
  birthday: [
    { name: 'Birthday Chocolate Cake', price: 35, image: 'BirthdayCake.jpg' },
    { name: 'Birthday Chocolate Box', price: 10, image: 'Birthdaybox.png' },
    { name: 'Chocolate Tulips', price: 10, image: 'Tulips.png' }
  ],
  anniversary: [
    { name: 'Flower Chocolate Box', price: 10, image: 'Flowerbox.png' },
    { name: 'Heart Chocolate', price: 15, image: 'Heart.jpg' },
    { name: 'Chocolate Bouquet', price: 30, image: 'Rose.jpg' }
  ],
  valentines: [
    { name: 'Chocolate Bouquet', price: 30, image: 'Rose.jpg' },
    { name: 'Heart Chocolate', price: 15, image: 'Heart.jpg' },
    { name: 'Flower Chocolate Box', price: 10, image: 'Flowerbox.png' }
  ],
  easter: [
    { name: 'Easter Egg Chocolates', price: 5, image: 'Egg.jpg' },
    { name: 'Large Easter Egg Chocolate', price: 20, image: 'EggLarge.jpg' },
    { name: 'Chocolate Bunny', price: 10, image: 'Bunny.jpg' }
  ],
  christmas: [
    { name: 'Christmas Box', price: 15, image: 'Christmas.png' },
    { name: 'Christmas Box (with Fox)', price: 15, image: 'ChristmasFox.png' },
    { name: 'Christmas Box (with Socks)', price: 15, image: 'ChristmasSocks.png' }
  ],
  other: [
    { name: 'Gold Assorted Chocolate Box', price: 30, image: 'Gold.png' },
    { name: 'Blue Assorted Chocolate Box', price: 30, image: 'Blue.png' },
    { name: 'Pink Assorted Chocolate Box', price: 30, image: 'Pink.png' }
  ]
};

// These are the DOM elements for selecting the occasion, chocolate items list, basket list, and total price display.
const occasionSelect = document.getElementById('occasion'),
      chocolateList = document.getElementById('Chocolate-Products-Items'),
      basketList = document.getElementById('Basket-Selected-Products'),
      totalPriceElem = document.getElementById('Total-Price');

// I defined a variable named totalPrice that would track the total price of the user's selected products.
let totalPrice = 0;

// I added an event listener that would change or update the chocolate product options depending on the selected occasion.
occasionSelect.addEventListener('change', updateChocolateOptions);

// This is called to populate the chocolate options according to the selected occasion.
updateChocolateOptions();

// I created a function named "updateChocolateOptions" that would update the list of chocolate products based on the user's selected occasion.
function updateChocolateOptions() {
  const chocolates = chocolatesData[occasionSelect.value] || [];
  chocolateList.innerHTML = chocolates.map(({ name, price, image }) => `
    <div class="chocolate-item">
      <img src="images/${image}" alt="${name}">
      <div class="info"><label>${name} - $${price}</label>
      <input type="number" value="0" min="0"></div>
      <button class="add-btn" data-name="${name}" data-price="${price}">Add</button>
    </div>
  `).join(''); // This would create the HTML for each chocolate item.

  // I added another click event listeners to each "Add" button.
  chocolateList.querySelectorAll('.add-btn').forEach(btn =>
    btn.onclick = () => {
      const quantity = btn.previousElementSibling.querySelector('input').value; // This is responsible on getting the quantity from the input field.
      addToBasket(btn.dataset.name, parseFloat(btn.dataset.price), parseInt(quantity, 10));
    }
  );
}


// This is the function to add the user's selected chocolate to their basket.
function addToBasket(name, price, quantity) {
  // If there is no quantity or invalid quantity, it returns.
  if (!quantity || quantity <= 0) return;

  // This validates if the item already exists in the basket.
  const existingItem = basketList.querySelector(`[data-name="${name}"]`);
  if (existingItem) {
    const quantityElem = existingItem.querySelector('.quantity');
     // This updates the quantity of the existing item.
    quantityElem.textContent = parseInt(quantityElem.textContent) + quantity;
  } else {
    basketList.insertAdjacentHTML('beforeend', `
      <li data-name="${name}" data-price="${price}">
        ${name} - $${price} x <span class="quantity">${quantity}</span>
        <button class="remove-btn">Remove</button>
      </li>
    `); // This adds the new item to the basket.
  }

  // This updates the user's total price.
  updateTotal(price * quantity);
}

// The function named "updateTotal" updates the total price based on the amount added or removed by the user.
function updateTotal(amount) {
  totalPrice += amount;
  totalPriceElem.textContent = totalPrice.toFixed(2);
}

// This is the event listener that handles item removal from the basket.
basketList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const item = e.target.closest('li');
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('.quantity').textContent, 10);

    updateTotal(-price * quantity);
    item.remove();
  }
});

// This displays a message to the user when they click the purchase button
document.getElementById('Purchase-Button').onclick = () => alert('Thank you for your purchase!');


// Login and Signup
// This selects all of the elements with the classes named ".Register-Toggle" and ".Login-Toggle".
document.querySelectorAll('.Register-Toggle, .Login-Toggle').forEach(btn =>

  // And for all the buttons, I added an event listener that would execute when clicked.
  // This toggles the "active" class on the container element with the class ".LoginandSignUp-Container".
  btn.onclick = () => document.querySelector('.LoginandSignUp-Container').classList.toggle('active')
);

