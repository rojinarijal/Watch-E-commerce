import products from './script.js';

// State management
let cart = JSON.parse(localStorage.getItem('timeless_aura_cart')) || [];

function saveCart() {
    localStorage.setItem('timeless_aura_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartItems();
}

// Add item to cart
export function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.discounted ? product.discountedPrice : product.originalPrice,
            quantity: quantity
        });
    }
    saveCart();
    openCart();
}

// Remove item from cart
export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

// Update item quantity
export function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
    }
}

// Clear cart
export function clearCart() {
    cart = [];
    saveCart();
}

// Open / Close Cart Drawer
export function openCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.add('active');
        overlay.classList.add('active');
    }
}

export function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Render Cart Items inside drawer
function renderCartItems() {
    const itemsContainer = document.getElementById('cart-drawer-items');
    const totalContainer = document.getElementById('cart-subtotal-val');
    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p class="cart-empty-message">Your cart is empty.</p>';
        if (totalContainer) totalContainer.textContent = 'Rs. 0';
        return;
    }

    let subtotal = 0;
    itemsContainer.innerHTML = '';

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price}</div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn decrease-qty" data-id="${item.id}">-</button>
                    <span class="cart-qty-val">${item.quantity}</span>
                    <button class="cart-qty-btn increase-qty" data-id="${item.id}">+</button>
                    <button class="cart-remove-btn" data-id="${item.id}" style="margin-left: auto;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemDiv);
    });

    if (totalContainer) {
        totalContainer.textContent = `Rs. ${subtotal}`;
    }

    // Add event listeners for cart control buttons
    itemsContainer.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'), 10);
            updateQuantity(id, -1);
        });
    });

    itemsContainer.querySelectorAll('.increase-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'), 10);
            updateQuantity(id, 1);
        });
    });

    itemsContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'), 10);
            removeFromCart(id);
        });
    });
}

// Update badge count in header
function updateCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
}

// Create and inject Cart Drawer and Overlay into DOM
function injectCartDOM() {
    if (document.getElementById('cart-drawer')) return;

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.classList.add('cart-overlay');
    document.body.appendChild(overlay);

    // Drawer
    const drawer = document.createElement('div');
    drawer.id = 'cart-drawer';
    drawer.classList.add('cart-drawer');
    drawer.innerHTML = `
        <div class="cart-drawer-header">
            <h2>Your Cart</h2>
            <button class="cart-close-btn" id="cart-close-btn">&times;</button>
        </div>
        <div class="cart-drawer-items" id="cart-drawer-items">
            <!-- Dynamic Cart Items -->
        </div>
        <div class="cart-drawer-footer">
            <div class="cart-subtotal">
                <span>Subtotal:</span>
                <span id="cart-subtotal-val">Rs. 0</span>
            </div>
            <button class="cart-checkout-btn" id="cart-checkout-btn">Checkout</button>
        </div>
    `;
    document.body.appendChild(drawer);

    // Events to close cart
    document.getElementById('cart-close-btn').addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    // Checkout event
    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Premium custom checkout modal alert
        showCheckoutDialog();
    });
}

function showCheckoutDialog() {
    closeCart();
    
    // Create checkout success dialogue
    const dialogBg = document.createElement('div');
    dialogBg.classList.add('dialog-background', 'active');
    
    const dialogBox = document.createElement('div');
    dialogBox.classList.add('dialog');
    dialogBox.style.display = 'block';
    dialogBox.innerHTML = `
        <i class="fa-solid fa-circle-check" style="font-size: 50px; color: #00BFA6; margin-bottom: 15px;"></i>
        <h2 style="color: #00BFA6; font-size: 24px; margin-bottom: 10px;">Order Placed Successfully!</h2>
        <p style="margin-top: 10px; font-size: 16px; color: #333;">Thank you for shopping with Timeless Aura! Your luxury timepieces are being prepared for shipping.</p>
        <button id="checkout-close-btn" class="btn" style="margin-top: 20px; padding: 10px 30px;">Close</button>
    `;
    
    document.body.appendChild(dialogBg);
    document.body.appendChild(dialogBox);
    
    document.getElementById('checkout-close-btn').addEventListener('click', () => {
        dialogBg.remove();
        dialogBox.remove();
        clearCart();
    });
}

// Set up UI components, badge, search listeners
function initUI() {
    injectCartDOM();

    // Setup Cart Icon Badge & Click
    const cartIcon = document.getElementById('cart-btn');
    if (cartIcon) {
        // Wrap in relative container to support badges cleanly
        if (!cartIcon.parentElement.classList.contains('cart-icon-container')) {
            const wrapper = document.createElement('span');
            wrapper.classList.add('cart-icon-container');
            cartIcon.parentNode.insertBefore(wrapper, cartIcon);
            wrapper.appendChild(cartIcon);

            // Append Badge
            const badge = document.createElement('span');
            badge.id = 'cart-badge-count';
            badge.classList.add('cart-badge');
            badge.style.display = 'none';
            wrapper.appendChild(badge);

            wrapper.addEventListener('click', (e) => {
                e.preventDefault();
                openCart();
            });
        }
    }

    // Setup Wishlist Wrapper (pure aesthetic layout alignment)
    const wishlistIcon = document.getElementById('wishlist-btn');
    if (wishlistIcon) {
        if (!wishlistIcon.parentElement.classList.contains('wishlist-icon-container')) {
            const wrapper = document.createElement('span');
            wrapper.classList.add('wishlist-icon-container');
            wishlistIcon.parentNode.insertBefore(wrapper, wishlistIcon);
            wrapper.appendChild(wishlistIcon);
            
            wrapper.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Wishlist feature coming soon!');
            });
        }
    }

    // Bind Navbar Search Inputs
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `product.html?search=${encodeURIComponent(query)}`;
        }
    };

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Populate the Cart values
    saveCart();
}

// Initialized automatically when the module loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
} else {
    initUI();
}
