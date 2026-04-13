// Configuration
const TAX_RATE = 0.08; // 8% Tax

// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('spice_garden_cart')) || [];

// Update Cart Count in UI
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.innerText = totalItems;
    }
}

// Add Item to Cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Feedback (Optional: show a small toast)
    alert(`${name} added to cart!`);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('spice_garden_cart', JSON.stringify(cart));
}

// Event Listeners for Add to Cart Buttons
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            addToCart(name, price);
        });
    });
});

// Helper for Cart Page
function getCart() {
    return cart;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount();
}

function adjustQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
    updateCartCount();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}
