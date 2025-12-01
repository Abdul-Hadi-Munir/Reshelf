/**
 * app.js
 * Contains all product data, cart state, and reusable rendering/utility functions.
 */

// --- Product Data ---
const PRODUCTS = [
    {
        id: 1,
        name: "Premium Instant Coffee Jar",
        description: "Rich, aromatic instant coffee perfect for your morning start. Sourced from a well-known international brand.",
        originalPrice: 1200,
        reshelfPrice: 899,
        category: "beverages",
        bestSeller: true,
        discount: 25,
        image: "https://images.unsplash.com/photo-1510414842595-dac9016145dc?q=80&w=2574&auto=format&fit=crop",
        features: ["200g Jar", "Expiry 30-05-2026", "Reduced waste initiative"],
        collection: "short-dated-essentials"
    },
    {
        id: 2,
        name: "Organic Whole Wheat Flour",
        description: "High-quality organic whole wheat flour, ideal for baking bread and rotis. Excess inventory from a major local mill.",
        originalPrice: 500,
        reshelfPrice: 350,
        category: "pantry-staples",
        bestSeller: true,
        discount: 30,
        image: "https://images.unsplash.com/photo-1579737190132-72f6a7384196?q=80&w=2574&auto=format&fit=crop",
        features: ["5kg Bag", "Expiry 15-08-2026", "Gluten-rich"],
        collection: "kitchen-must-haves"
    },
    {
        id: 3,
        name: "Dark Chocolate Chip Cookies (Family Pack)",
        description: "A large family pack of crispy dark chocolate chip cookies. Short-dated stock with huge savings.",
        originalPrice: 450,
        reshelfPrice: 200,
        category: "snacks",
        bestSeller: false,
        discount: 55,
        image: "https://images.unsplash.com/photo-1549704456-4b62f79ce1cb?q=80&w=2574&auto=format&fit=crop",
        features: ["500g Pack", "Best Before 10-03-2026", "Contains nuts"],
        collection: "sweet-deals"
    },
    {
        id: 4,
        name: "Premium Basmati Rice",
        description: "Aged premium Basmati rice, ideal for biryani and pulao. Surplus stock from import batch.",
        originalPrice: 3000,
        reshelfPrice: 2550,
        category: "pantry-staples",
        bestSeller: true,
        discount: 15,
        image: "https://images.unsplash.com/photo-1601337449553-62c2f70b79ac?q=80&w=2574&auto=format&fit=crop",
        features: ["10kg Bag", "Expiry 01-11-2026", "Extra long grain"],
        collection: "kitchen-must-haves"
    },
    {
        id: 5,
        name: "Mint & Aloe Vera Shampoo",
        description: "Refreshing shampoo for daily use. Packaging refresh clearance stock.",
        originalPrice: 800,
        reshelfPrice: 560,
        category: "personal-care",
        bestSeller: false,
        discount: 30,
        image: "https://images.unsplash.com/photo-1627477526684-2a6c1e1808b8?q=80&w=2574&auto=format&fit=crop",
        features: ["400ml Bottle", "Expiry 01-09-2026", "Paraben-free"],
        collection: "personal-care-saver"
    },
    {
        id: 6,
        name: "Disposable Diapers (Jumbo Pack)",
        description: "High-absorption disposable diapers, size 4. Overstock clearance.",
        originalPrice: 4500,
        reshelfPrice: 3150,
        category: "baby",
        bestSeller: true,
        discount: 30,
        image: "https://images.unsplash.com/photo-1582266782806-38d7809618d3?q=80&w=2574&auto=format&fit=crop",
        features: ["Pack of 80", "Expiry 01-12-2026", "Hypoallergenic"],
        collection: "baby-essentials"
    },
    {
        id: 7,
        name: "Multi-Surface Cleaner Spray",
        description: "Powerful lemon-scented cleaner for all household surfaces. Surplus due to bulk order cancellation.",
        originalPrice: 650,
        reshelfPrice: 400,
        category: "household",
        bestSeller: false,
        discount: 38,
        image: "https://images.unsplash.com/photo-1609164223326-7243b811ce71?q=80&w=2574&auto=format&fit=crop",
        features: ["750ml Spray", "Expiry 01-06-2026", "Anti-bacterial formula"],
        collection: "cleaning-power"
    },
    {
        id: 8,
        name: "Dry Cat Food (Tuna Flavor)",
        description: "Veterinarian-recommended dry cat food. Minor packaging flaw stock.",
        originalPrice: 1800,
        reshelfPrice: 1530,
        category: "pet",
        bestSeller: true,
        discount: 15,
        image: "https://images.unsplash.com/photo-1583592661555-520e5c9b7407?q=80&w=2574&auto=format&fit=crop",
        features: ["1.5kg Bag", "Expiry 01-09-2026", "High protein"],
        collection: "pet-care-saver"
    },
];

// --- Utility Functions ---

/** Formats a number as Pakistani Rupee (PKR). */
function formatPrice(price) {
    if (typeof price !== 'number' || isNaN(price)) {
        return 'Rs 0';
    }
    return 'Rs ' + price.toLocaleString('en-PK', { minimumFractionDigits: 0 });
}

/** Generates the HTML for a single product card. */
function createProductCard(product) {
    return `
        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            <a href="product.html?id=${product.id}" class="product-card-link block">
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105">
                    <span class="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">${product.discount}% OFF</span>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${product.name}</h3>
                    <p class="text-sm text-gray-500 mb-2">${product.features[0]}</p>
                    <div class="flex items-end justify-between">
                        <div>
                            <span class="text-2xl font-bold text-emerald-600">${formatPrice(product.reshelfPrice)}</span>
                            <span class="text-sm text-gray-400 line-through block">${formatPrice(product.originalPrice)}</span>
                        </div>
                        <button class="add-to-cart-button bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition duration-300" data-product-id="${product.id}" onclick="event.preventDefault(); addToCart(${product.id}, 1)">
                            <i data-lucide="plus" class="h-5 w-5 pointer-events-none"></i>
                        </button>
                    </div>
                </div>
            </a>
        </div>
    `;
}

/** Renders an array of products into a specified grid container. */
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        if (productList.length === 0) {
            container.innerHTML = `<p class="text-center text-xl text-gray-500 lg:col-span-4">No products found in this category.</p>`;
        } else {
            container.innerHTML = productList.map(createProductCard).join('');
        }
        // Re-initialize Lucide icons after dynamic content is added
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// --- Cart State and Management ---
let cart = JSON.parse(localStorage.getItem('reshelfCart')) || [];

function saveCart() {
    localStorage.setItem('reshelfCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll('.cart-item-count');
    countElements.forEach(el => el.textContent = totalItems);
}

function addToCart(productId, quantity) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItemIndex = cart.findIndex(item => item.id === productId);

    const actualQuantity = parseInt(quantity) || 1;

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += actualQuantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.reshelfPrice,
            image: product.image,
            quantity: actualQuantity,
        });
    }

    saveCart();
    showToastNotification(`Added ${actualQuantity} x ${product.name.split(' ').slice(0, 3).join(' ')} to cart!`);
}

function showToastNotification(message) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Ensure cart count is initialized on every page load
document.addEventListener('DOMContentLoaded', updateCartCount);