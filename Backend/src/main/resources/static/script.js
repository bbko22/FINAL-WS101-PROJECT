// Global State Management
let currentUser = null;
let currentRole = null;
let selectedRole = null;
let cart = [];
let products = [];
let orders = [];
let reports = [];

// Sample Data
const sampleProducts = [
    { id: 1, name: "Puto", price: 6.00, description: "A soft, fluffy Filipino steamed rice cake with a mildly sweet taste, perfect as a snack or paired with savory dishes.", story: "Hand-crafted and roasted by local producers to maintain a traditional flavor.", artisan: "Maturan Farms", location: "Bicol, Philippines", category: "Food", inStock: true, image: "images/1.jpg" },
    { id: 2, name: "Rice Cake", price: 25.00, description: "A soft, lightly sweet cake made from rice flour, commonly steamed or baked and enjoyed as a simple snack or dessert.", story: "Thinly sliced and fried for a light, crunchy snack.", artisan: "Tarlac Snacks Co.", location: "Tarlac, Philippines", category: "Food", inStock: true, image: "images/2.jpg" },
    { id: 3, name: "Kakanin Combo", price: 120.00, description: "A variety of traditional Filipino rice-based delicacies in one set, offering different flavors and textures, perfect for sharing or merienda.", story: "A classic crowd-favorite sweet made in traditional small batches.", artisan: "Sweet Treats", location: "Iloilo, Philippines", category: "Food", inStock: true, image: "images/3.jpg" },
    { id: 4, name: "Binagol", price: 70.00, description: "A sweet Filipino dessert made from taro, coconut milk, and sugar, traditionally served in a coconut shell.", story: "Handmade by local artisans using time-honored techniques.", artisan: "Abaniko Co.", location: "Cebu, Philippines", category: "Home", inStock: true, image: "images/4.jpg" },
    { id: 5, name: "Banig", price: 200.00, description: "A handwoven mat made from dried leaves, used for sleeping, sitting, or as a decorative piece.", story: "Lightweight, breathable and handwoven from locally harvested buri leaves.", artisan: "WeaveCraft", location: "Leyte, Philippines", category: "Wearables", inStock: true, image: "images/5.jpg" },
    { id: 6, name: "Rixy Woven Straw Wall Basket", price: 95.00, description: "A lightweight, handwoven straw basket designed for wall display, adding natural texture and decorative storage to any space.", story: "Made from upcycled coconut shells and natural oils.", artisan: "EcoHome", location: "Mindanao, Philippines", category: "Home", inStock: true, image: "images/6.jpg" },
    { id: 7, name: "Conical Hat", price: 50.00, description: "A lightweight, wide-brim hat with a cone shape that provides sun and rain protection.", story: "Delicately assembled by coastal artisans.", artisan: "Capiz Creations", location: "Palawan, Philippines", category: "Decor", inStock: true, image: "images/7.jpg" },
    { id: 8, name: "Hand Woven Lidded Basket", price: 95.00, description: "A durable, handwoven basket with a fitted lid for neat storage and natural decor.", story: "Durable and lightweight rattan furniture hand-crafted by skilled weavers.", artisan: "RattanWorks", location: "Laguna, Philippines", category: "Furniture", inStock: true, image: "images/8.jpg" },
    { id: 9, name: "Barong", price: 295.00, description: "A traditional Filipino formal shirt made from lightweight fabric, worn for special occasions.", story: "Traditional engraving passed down through generations.", artisan: "Zamboanga Brass", location: "Zamboanga, Philippines", category: "Decor", inStock: true, image: "images/9.jpg" },
    { id: 10, name: "Walis Tambo", price: 125.00, description: "A traditional Filipino broom made from tiger grass, used for sweeping floors.", story: "Glazed and fired using traditional methods.", artisan: "ClayHouse", location: "Pampanga, Philippines", category: "Kitchen", inStock: true, image: "images/10.jpg" },
    { id: 11, name: "Lambanog", price: 350.00, description: "A traditional Filipino coconut wine with a strong, clear taste, often enjoyed during celebrations.", story: "Hand-beaded with local motifs.", artisan: "T'boli Artisans", location: "South Cotabato, Philippines", category: "Jewelry", inStock: true, image: "images/11.jpg" },
    { id: 12, name: "Bracelet", price: 20.00, description: "A handcrafted bracelet made with unique materials and designs, adding a personal and stylish touch.", story: "Intricately embroidered by experienced weavers.", artisan: "Heritage Weaves", location: "Bicol, Philippines", category: "Fabric", inStock: true, image: "images/12.jpg" },
    { id: 13, name: "Winnowing Tray", price: 50.00, description: "A handcrafted bracelet made from woven winnowing tray material, featuring a natural, rustic design.", story: "Sustainably made from coconut shells and sealed for durability.", artisan: "CocoCraft", location: "Iloilo, Philippines", category: "Kitchen", inStock: true, image: "images/13.jpg" },
    { id: 14, name: "Handmade Crocheted Flowers", price: 100.00, description: "Handcrafted yarn flowers with detailed stitching, perfect for décor or gifts.", story: "Light and delicate fiber handwoven into elegant fans.", artisan: "PinaTextiles", location: "Aklan, Philippines", category: "Wearables", inStock: true, image: "images/14.jpg" },
    { id: 15, name: "Tobacco Dry Leaves", price: 130.00, description: "Naturally dried tobacco leaves used for traditional smoking, crafting, or processing.", story: "Traditional inlay work from Iloilo artisans.", artisan: "Pearl Inlays", location: "Iloilo, Philippines", category: "Decor", inStock: true, image: "images/15.jpg" }
];

const sampleStories = [
    {
        artisan: "Maria Rodriguez",
        location: "Santa Fe, NM",
        story: "I've been working with clay for over 20 years, and each piece I create tells a story of tradition and innovation. My grandmother taught me the ancient techniques, but I love incorporating modern designs.",
        avatar: "👩‍🎨"
    },
    {
        artisan: "James Wilson",
        location: "Asheville, NC",
        story: "Working with wood connects me to nature in the most profound way. I source all my materials locally and sustainably, ensuring each piece respects the tree it came from.",
        avatar: "👨‍🔧"
    },
    {
        artisan: "Sarah Chen",
        location: "Portland, OR",
        story: "Macrame became my meditation. What started as a hobby during stressful times has become my passion and livelihood. Each knot is tied with intention and love.",
        avatar: "👩‍💼"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProducts();
    updateCartCount();
    checkLoginStatus();

    // Add image preview logic for Add Product form
    const imgInput = document.getElementById('product-image');
    if (imgInput) {
        imgInput.addEventListener('change', function() {
            const file = this.files && this.files[0];
            const wrapper = document.getElementById('product-image-preview-wrapper');
            const preview = document.getElementById('product-image-preview');
            if (file && preview) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    if (wrapper) wrapper.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else if (wrapper) {
                wrapper.style.display = 'none';
                if (preview) preview.src = '';
            }
        });
    }

    // Keyboard support for nav toggle (Enter / Space)
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }
});

function initializeApp() {
    // Show homepage by default
    showSection('homepage');
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('artisan-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    
    // Load user session
    const savedUser = localStorage.getItem('artisan-user');
    const savedRole = localStorage.getItem('artisan-role');
    if (savedUser && savedRole) {
        currentUser = JSON.parse(savedUser);
        currentRole = savedRole;
        updateNavigation();
        showDashboard();
    }

    // Ensure nav links are visible (fix for missing links)
    ensureNavVisibility();

    // Load persisted artisan products (if any)
    loadSavedProducts();
    
    // Initialize sample orders for demo
    orders = [
        {
            id: 'ORD-001',
            customer: 'John Doe',
            items: [products[0], products[1]],
            total: 83.00,
            status: 'pending',
            date: new Date().toLocaleDateString()
        },
        {
            id: 'ORD-002',
            customer: 'Jane Smith',
            items: [products[2]],
            total: 55.00,
            status: 'confirmed',
            date: new Date().toLocaleDateString()
        }
    ];
}

// Persist products helpers
function saveProductsToStorage() {
    try {
        // Save only custom products (those with customSaved flag)
        const saved = products.filter(p => p._custom === true);
        localStorage.setItem('artisan-saved-products', JSON.stringify(saved));
    } catch (e) {
        console.error('Error saving products to storage', e);
    }
}

function loadSavedProducts() {
    try {
        const raw = localStorage.getItem('artisan-saved-products');
        if (!raw) return;
        const saved = JSON.parse(raw);
        // Merge saved products without duplicating ids
        saved.forEach(sp => {
            if (!products.find(p => p.id === sp.id)) {
                products.unshift(sp); // put custom products first
            }
        });
    } catch (e) {
        console.error('Error loading saved products', e);
    }
}

// Utility to show inline messages in forms
function showFormMessage(id, message, type = 'error') {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.remove('error', 'success');
    el.classList.add(type);
    // Auto-clear after a while
    setTimeout(() => {
        el.textContent = '';
        el.classList.remove('error', 'success');
    }, 5000);
}

// Update mobile menu toggle to manage aria-expanded
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.nav-toggle');
    navMenu.classList.toggle('active');
    const expanded = navMenu.classList.contains('active');
    if (toggle) toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

// Ensure mobile menu closes when changing sections
function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.nav-toggle');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
}

// Navigation Functions
function updateNavigation() {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const profileLink = document.getElementById('profile-link');
    
    if (currentUser) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
        profileLink.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
        profileLink.style.display = 'none';
    }
}

// Ensure navigation links are visible and consistent (fix for missing About/Cart/Login)
function ensureNavVisibility() {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const profileLink = document.getElementById('profile-link');
    const cartLink = document.querySelector('.cart-link');
    const navMenu = document.getElementById('nav-menu');

    if (loginLink) loginLink.style.display = 'block';
    if (logoutLink && currentUser) logoutLink.style.display = 'block';
    if (profileLink && currentUser) profileLink.style.display = 'block';
    if (cartLink) cartLink.style.display = 'inline-flex';
    if (navMenu) navMenu.style.display = 'flex';
}

// Authentication Functions
function setRole(role, ev) {
    selectedRole = role;

    // Update UI to show selected role
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => btn.classList.remove('selected'));

    // Prefer the event's clicked button, fallback to data-role lookup
    let btnEl = null;
    if (ev && ev.target) {
        btnEl = ev.target.closest('.role-btn');
    }
    if (!btnEl) {
        btnEl = document.querySelector(`.role-btn[data-role="${role}"]`);
    }
    if (btnEl) btnEl.classList.add('selected');

    // Show login inputs
    const li = document.getElementById('login-inputs');
    if (li) li.style.display = 'block';
    // clear any login form message
    const loginMsg = document.getElementById('login-message');
    if (loginMsg) { loginMsg.textContent = ''; loginMsg.classList.remove('error','success'); }
}

function login() {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const loginMsgId = 'login-message';

    if (!selectedRole) {
        showFormMessage(loginMsgId, 'Please select a role before signing in.', 'error');
        return;
    }

    if (!email || !password) {
        showFormMessage(loginMsgId, 'Please enter both email and password.', 'error');
        return;
    }

    // Simulate login (in real app, this would validate credentials)
    currentUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        joinDate: new Date().toLocaleDateString()
    };

    currentRole = selectedRole;

    // Save to localStorage
    localStorage.setItem('artisan-user', JSON.stringify(currentUser));
    localStorage.setItem('artisan-role', currentRole);

    // Update navigation
    updateNavigation();

    // Show appropriate dashboard
    showDashboard();

    showFormMessage(loginMsgId, `Welcome back, ${currentUser.name}!`, 'success');
    setTimeout(()=>{ document.getElementById('login-inputs').style.display = 'none'; }, 700);
}

function logout() {
    currentUser = null;
    currentRole = null;
    
    // Clear localStorage
    localStorage.removeItem('artisan-user');
    localStorage.removeItem('artisan-role');
    
    // Update navigation
    updateNavigation();
    
    // Show homepage
    showSection('homepage');
    
    showMessage('You have been logged out successfully.', 'info');
}

function showDashboard() {
    switch(currentRole) {
        case 'consumer':
            showSection('consumer-dashboard');
            break;
        case 'artisan':
            showSection('artisan-dashboard');
            break;
        case 'admin':
            showSection('admin-dashboard');
            break;
        default:
            showSection('homepage');
    }
}

function checkLoginStatus() {
    if (!currentUser && (window.location.hash === '#cart' || window.location.hash === '#checkout')) {
        showSection('login');
        showMessage('Please log in to access your cart.', 'info');
    }
}

// Product Functions
function loadProducts() {
    // Load products from Java backend
    fetch('/api/products')
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            products = data;
            // Merge any saved products
            loadSavedProducts();
            // Re-render product sections that rely on products list
            loadFeaturedProducts();
            loadConsumerFeed();
            loadArtisanProducts();
            loadProductsGrid();
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            // Fallback to sample products if backend not available
            products = [...sampleProducts];
            loadSavedProducts();
            loadFeaturedProducts();
            loadConsumerFeed();
            loadArtisanProducts();
            loadProductsGrid();
        });
}

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    container.innerHTML = '';
    
    // Show first 4 products as featured
    const featuredProducts = products.slice(0, 4);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function loadConsumerFeed() {
    const container = document.getElementById('consumer-products');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product, true);
        container.appendChild(productCard);
    });
}

function loadProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

function createProductCard(product, includeReport = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductDetails(product.id);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₱${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                ${includeReport ? `
                    <button class="report-btn" onclick="event.stopPropagation(); reportProduct(${product.id})" title="Report this product">
                        <i class="fas fa-flag"></i>
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const detailsContainer = document.getElementById('product-details');
    
    detailsContainer.innerHTML = `
        <div class="product-detail-image">
            <div class="product-image" style="height: 300px; font-size: 4rem;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <p class="product-price" style="font-size: 1.5rem; margin: 1rem 0;">₱${product.price.toFixed(2)}</p>
            <p class="product-description" style="margin-bottom: 2rem;">${product.description}</p>
            
            <div class="artisan-info" style="background: var(--accent-color); padding: 1rem; border-radius: var(--radius); margin-bottom: 2rem;">
                <h4>Meet the Artisan</h4>
                <p><strong>${product.artisan}</strong> from ${product.location}</p>
                <p style="margin-top: 0.5rem; font-style: italic;">"${product.story}"</p>
            </div>
            
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal('product-modal')">
                    <i class="fas fa-cart-plus"></i> Add to Cart - ₱${product.price.toFixed(2)}
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm.trim()) {
        loadFeaturedProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.artisan.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('featured-products');
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('artisan-cart', JSON.stringify(cart));
    
    updateCartCount();
    if (!currentUser) {
        showMessage(`${product.name} added to cart as guest. Please log in to checkout.`, 'info');
    } else {
        showMessage(`${product.name} added to cart!`, 'success');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('artisan-cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
    showMessage('Item removed from cart.', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    localStorage.setItem('artisan-cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function loadCartItems() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!container) {
        console.error('Cart items container not found');
        return;
    }
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Start shopping to add items to your cart</p>
                <button class="btn btn-primary" onclick="showSection('products')">
                    <i class="fas fa-store"></i> Browse Products
                </button>
            </div>
        `;
        if (totalElement) totalElement.textContent = '0.00';
        return;
    }
    
    let total = 0;
    container.innerHTML = '';
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">₱${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(cartItem);
    });
    
    if (totalElement) totalElement.textContent = total.toFixed(2);
}

// Artisan Functions
function loadArtisanProducts() {
    const container = document.getElementById('artisan-products');
    container.innerHTML = '';
    
    // For demo, show all products as if they belong to the current artisan
    const artisanProducts = products.slice(0, 3); // Show first 3 as examples
    
    if (artisanProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box"></i>
                <h3>No products yet</h3>
                <p>Start by adding your first product</p>
                <button class="btn btn-primary" onclick="showSection('add-product')">Add Product</button>
            </div>
        `;
        return;
    }
    
    artisanProducts.forEach(product => {
        const productCard = createArtisanProductCard(product);
        container.appendChild(productCard);
    });
}

function createArtisanProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₱${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-actions">
                <button class="btn btn-secondary" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-secondary" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function showArtisanTab(tabName, ev) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    if (ev && ev.target) {
        const clicked = ev.target.closest('.tab-btn');
        if (clicked) clicked.classList.add('active');
    }

    // Show tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    const el = document.getElementById(tabName);
    if (el) el.classList.add('active');

    // Load specific content
    switch(tabName) {
        case 'my-products':
            loadArtisanProducts();
            break;
        case 'orders':
            loadArtisanOrders();
            break;
    }
}

function loadArtisanOrders() {
    const container = document.getElementById('artisan-orders');
    container.innerHTML = '';
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>No orders yet</h3>
                <p>Orders will appear here when customers purchase your products</p>
            </div>
        `;
        return;
    }
    
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
            <div class="order-items">
                <div class="order-item-detail">
                    <span>Customer: ${order.customer}</span>
                    <span>Date: ${order.date}</span>
                </div>
                <div class="order-item-detail">
                    <span>Items: ${order.items.length}</span>
                    <span>Total: ₱${order.total.toFixed(2)}</span>
                </div>
            </div>
        `;
        
        container.appendChild(orderItem);
    });
}

// Add Product Modal
function showAddProductModal() {
    document.getElementById('add-product-modal').classList.add('active');
}

document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('product-name').value.trim();
    const description = document.getElementById('product-description').value.trim();
    const priceRaw = document.getElementById('product-price').value;
    const price = priceRaw ? parseFloat(priceRaw) : 0;
    const category = document.getElementById('product-category').value.trim();
    const story = document.getElementById('product-story').value.trim();
    const messageId = 'add-product-message';

    if (!currentUser || currentRole !== 'artisan') {
        showFormMessage(messageId, 'You must be logged in as an Artisan to add products.', 'error');
        showSection('login');
        return;
    }

    if (!name || !description || !price || price <= 0 || !category) {
        showFormMessage(messageId, 'Please fill in all required fields with valid values.', 'error');
        return;
    }

    const fileInput = document.getElementById('product-image');
    const file = fileInput && fileInput.files && fileInput.files[0];

    const pushProduct = function(imageData) {
        const newProduct = {
            id: Date.now(),
            name,
            description,
            price,
            category,
            story,
            artisan: currentUser ? currentUser.name : 'Artisan',
            location: "Your Location",
            inStock: true,
            image: imageData || 'images/wlis.jpg',
            _custom: true
        };

        products.unshift(newProduct);
        saveProductsToStorage();
        closeModal('add-product-modal');
        loadArtisanProducts();
        showFormMessage(messageId, 'Product added successfully!', 'success');

        // Reset form
        document.getElementById('add-product-form').reset();
        const wrapper = document.getElementById('product-image-preview-wrapper');
        if (wrapper) wrapper.style.display = 'none';
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            pushProduct(ev.target.result);
        };
        reader.onerror = function() {
            showFormMessage(messageId, 'There was an error reading the image file.', 'error');
        };
        reader.readAsDataURL(file);
    } else {
        pushProduct();
    }
});

function editProduct(productId) {
    // In a real app, this would open an edit modal
    showMessage('Edit functionality would open here in a real application.', 'info');
}

function deleteProduct(productId) {
    // simple confirmation
    const ok = confirm('Are you sure you want to delete this product?');
    if (!ok) return;

    products = products.filter(p => p.id !== productId);
    saveProductsToStorage();
    loadArtisanProducts();
    showMessage('Product deleted successfully.', 'success');
}

// Admin Functions
function showAdminSection(section) {
    const container = document.getElementById('admin-content');
    
    switch(section) {
        case 'users':
            container.innerHTML = `
                <h3>User Management</h3>
                <div class="admin-table">
                    <p>User management interface would be implemented here.</p>
                    <p>Features: View users, activate/deactivate accounts, manage permissions</p>
                </div>
            `;
            break;
        case 'products':
            container.innerHTML = `
                <h3>Product Approval</h3>
                <div class="admin-table">
                    <p>Product approval interface would be implemented here.</p>
                    <p>Features: Review new products, approve/reject listings, manage categories</p>
                </div>
            `;
            break;
        case 'reports':
            loadReports();
            break;
        case 'analytics':
            container.innerHTML = `
                <h3>Platform Analytics</h3>
                <div class="analytics-dashboard">
                    <div class="stat-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div class="stat-card" style="background: var(--white); padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow);">
                            <h4>Total Users</h4>
                            <p style="font-size: 2rem; color: var(--primary-color);">1,234</p>
                        </div>
                        <div class="stat-card" style="background: var(--white); padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow);">
                            <h4>Total Products</h4>
                            <p style="font-size: 2rem; color: var(--primary-color);">${products.length}</p>
                        </div>
                        <div class="stat-card" style="background: var(--white); padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow);">
                            <h4>Total Orders</h4>
                            <p style="font-size: 2rem; color: var(--primary-color);">${orders.length}</p>
                        </div>
                        <div class="stat-card" style="background: var(--white); padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow);">
                            <h4>Total Reports</h4>
                            <p style="font-size: 2rem; color: var(--primary-color);">${reports.length}</p>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
}

function loadReports() {
    const container = document.getElementById('admin-content');
    
    container.innerHTML = `
        <h3>User Reports</h3>
        <div class="reports-list" id="reports-list">
            ${reports.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-flag"></i>
                    <h4>No reports</h4>
                    <p>User reports will appear here</p>
                </div>
            ` : ''}
        </div>
    `;
    
    if (reports.length > 0) {
        const reportsList = document.getElementById('reports-list');
        reports.forEach(report => {
            const reportItem = document.createElement('div');
            reportItem.className = 'report-item';
            reportItem.style.cssText = 'background: var(--white); padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow); margin-bottom: 1rem;';
            reportItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-weight: 600;">Report #${report.id}</span>
                    <span style="background: #fff3cd; color: #856404; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.9rem;">Pending</span>
                </div>
                <p><strong>Reason:</strong> ${report.reason}</p>
                <p><strong>Product:</strong> ${report.productName}</p>
                <p><strong>Details:</strong> ${report.details || 'No additional details provided'}</p>
                <p><strong>Reported by:</strong> User #${report.reporterId}</p>
                <p><strong>Date:</strong> ${report.date}</p>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="resolveReport(${report.id})">Resolve</button>
                    <button class="btn btn-secondary" onclick="dismissReport(${report.id})">Dismiss</button>
                </div>
            `;
            reportsList.appendChild(reportItem);
        });
    }
}

function resolveReport(reportId) {
    reports = reports.filter(r => r.id !== reportId);
    loadReports();
    showMessage('Report resolved successfully.', 'success');
}

function dismissReport(reportId) {
    reports = reports.filter(r => r.id !== reportId);
    loadReports();
    showMessage('Report dismissed.', 'info');
}

// Reporting Functions
function reportProduct(productId) {
    if (!currentUser) {
        showSection('login');
        showMessage('Please log in to report content.', 'info');
        return;
    }
    
    const modal = document.getElementById('report-modal');
    modal.classList.add('active');
    
    // Store the product ID for the report
    modal.dataset.productId = productId;
}

document.getElementById('report-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const modal = document.getElementById('report-modal');
    const productId = parseInt(modal.dataset.productId);
    const product = products.find(p => p.id === productId);
    const reason = document.getElementById('report-reason').value;
    const details = document.getElementById('report-details').value;
    
    const newReport = {
        id: Date.now(),
        productId,
        productName: product.name,
        reason,
        details,
        reporterId: currentUser.id,
        date: new Date().toLocaleDateString()
    };
    
    reports.push(newReport);
    closeModal('report-modal');
    showMessage('Report submitted successfully. Thank you for helping keep our community safe.', 'success');
    
    // Reset form
    document.getElementById('report-form').reset();
});

// Checkout Functions
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showMessage('Your cart is empty.', 'error');
        return;
    }
    
    // Simulate order processing
    const orderId = 'ORD-' + Date.now();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create new order
    const newOrder = {
        id: orderId,
        customer: currentUser.name,
        items: [...cart],
        total,
        status: 'pending',
        date: new Date().toLocaleDateString()
    };
    
    orders.push(newOrder);
    
    // Clear cart
    cart = [];
    localStorage.setItem('artisan-cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    showMessage(`Order ${orderId} placed successfully! Total: $${total.toFixed(2)}`, 'success');
    
    // Redirect to homepage
    setTimeout(() => {
        showSection('homepage');
    }, 2000);
});

// Artisan Stories
function loadArtisanStories() {
    const container = document.getElementById('artisan-stories');
    const aboutContainer = document.getElementById('about-artisan-stories');
    
    if (container) {
        container.innerHTML = '';
        
        sampleStories.forEach(story => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            storyCard.innerHTML = `
                <div class="story-header">
                    <div class="artisan-avatar">
                        ${story.avatar}
                    </div>
                    <div class="artisan-info">
                        <h4>${story.artisan}</h4>
                        <p class="location">${story.location}</p>
                    </div>
                </div>
                <div class="story-content">
                    <p class="story-text">${story.story}</p>
                </div>
            `;
            
            container.appendChild(storyCard);
        });
    }
    
    // Also load stories in about section if it exists
    if (aboutContainer) {
        aboutContainer.innerHTML = '';
        
        sampleStories.forEach(story => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            storyCard.innerHTML = `
                <div class="story-header">
                    <div class="artisan-avatar">
                        ${story.avatar}
                    </div>
                    <div class="artisan-info">
                        <h4>${story.artisan}</h4>
                        <p class="location">${story.location}</p>
                    </div>
                </div>
                <div class="story-content">
                    <p class="story-text">${story.story}</p>
                </div>
            `;
            
            aboutContainer.appendChild(storyCard);
        });
    }
}

// Profile Functions
function loadUserProfile() {
    const profileName = document.getElementById('profile-name');
    const profileRole = document.getElementById('profile-role');
    const profileContent = document.getElementById('profile-content');
    
    if (!currentUser) {
        showSection('login');
        return;
    }
    
    profileName.textContent = currentUser.name;
    profileRole.textContent = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
    
    profileContent.innerHTML = `
        <div style="background: var(--white); padding: 2rem; border-radius: var(--radius); box-shadow: var(--shadow);">
            <h3>Profile Information</h3>
            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                    <span style="font-weight: 500;">Email:</span>
                    <span>${currentUser.email}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                    <span style="font-weight: 500;">Role:</span>
                    <span>${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                    <span style="font-weight: 500;">Member Since:</span>
                    <span>${currentUser.joinDate}</span>
                </div>
            </div>
            
            ${currentRole === 'artisan' ? `
                <div style="margin-top: 2rem;">
                    <h4>Artisan Dashboard</h4>
                    <p>Manage your products and orders from your artisan dashboard.</p>
                    <button class="btn btn-primary" onclick="showSection('artisan-dashboard')">Go to Dashboard</button>
                </div>
            ` : ''}
            
            ${currentRole === 'consumer' ? `
                <div style="margin-top: 2rem;">
                    <h4>Shopping History</h4>
                    <p>View your orders and purchase history.</p>
                    <div style="margin-top: 1rem;">
                        <p>Total Orders: ${orders.filter(o => o.customer === currentUser.name).length}</p>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Utility Functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Position the message
    messageEl.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
}

// Add CSS for message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle clicks outside modals to close them
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Handle search on Enter key
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.getElementById('nav-menu').classList.remove('active');
    }
});

// Show add product modal when section is requested
function showSection(sectionId) {
    console.debug('showSection called', sectionId);
    if (sectionId === 'add-product') {
        showAddProductModal();
        return;
    }

    // Close mobile menu if open
    closeMobileMenu();
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Load specific content based on section
        switch(sectionId) {
            case 'homepage':
                loadFeaturedProducts();
                loadArtisanStories();
                break;
            case 'about':
                loadArtisanStories(); // Load stories in about section
                break;
            case 'consumer-dashboard':
                loadConsumerFeed();
                break;
            case 'artisan-dashboard':
                loadArtisanProducts();
                loadArtisanOrders();
                break;
            case 'cart':
                loadCartItems();
                break;
            case 'products':
                loadProductsGrid();
                break;
            case 'profile':
                loadUserProfile();
                break;
            case 'login':
                // Reset login form
                const li = document.getElementById('login-inputs');
                if (li) li.style.display = 'none';
                const roleBtns = document.querySelectorAll('.role-btn');
                roleBtns.forEach(btn => btn.classList.remove('selected'));
                selectedRole = null;
                break;
        }

        // Defensive check: ensure section content exists (fallbacks)
        ensureSectionContent(sectionId);
    }

    // Ensure section has content if some loader failed
    function ensureSectionContent(sectionId) {
        const target = document.getElementById(sectionId);
        if (!target) return;
        // If section already has visible children or text, assume OK
        if (target.children.length > 0 && target.innerText.trim() !== '') return;

        console.warn(`ensureSectionContent: ${sectionId} appears empty — applying fallback.`);

        switch(sectionId) {
            case 'about':
                target.innerHTML = `
                    <div class="about-container">
                        <h2>About ArtisanHub</h2>
                        <p>ArtisanHub connects local artisans with customers who appreciate handcrafted, unique items. We support local creativity and sustainable commerce.</p>
                    </div>
                `;
                break;
            case 'cart':
                // Try to run loader, otherwise render a simple empty cart message
                if (document.getElementById('cart-items')) {
                    loadCartItems();
                } else {
                    target.innerHTML = `
                        <div class="cart-container">
                            <h2>Shopping Cart</h2>
                            <div class="cart-items" id="cart-items">
                                <div class="empty-state">
                                    <i class="fas fa-shopping-cart"></i>
                                    <h3>Your cart is empty</h3>
                                    <p>Start shopping to add items to your cart</p>
                                </div>
                            </div>
                            <div class="cart-summary">
                                <div class="cart-total">
                                    <h3>Total: ₱<span id="cart-total">0.00</span></h3>
                                </div>
                            </div>
                        </div>
                    `;
                }
                break;
            case 'login':
                if (target.querySelector('.login-form')) {
                    // loader ok
                } else {
                    target.innerHTML = `
                        <div class="login-container">
                            <div class="login-form">
                                <h2>Welcome Back</h2>
                                <p>Choose your role to continue</p>
                                <div class="role-selection">
                                    <button class="role-btn" data-role="consumer" onclick="setRole('consumer', event)">
                                        <i class="fas fa-shopping-bag"></i>
                                        <span>Consumer</span>
                                    </button>
                                    <button class="role-btn" data-role="artisan" onclick="setRole('artisan', event)">
                                        <i class="fas fa-palette"></i>
                                        <span>Artisan</span>
                                    </button>
                                </div>
                                <div class="login-inputs" id="login-inputs" style="display:none;">
                                    <input type="email" placeholder="Email" id="email-input">
                                    <input type="password" placeholder="Password" id="password-input">
                                    <button class="login-btn" onclick="login()">Sign In</button>
                                </div>
                            </div>
                        </div>
                    `;
                }
                break;
            default:
                // no-op
        }
    }
}