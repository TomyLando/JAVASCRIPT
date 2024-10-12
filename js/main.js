// Declaración de variables
const products = [
    { id: 1, name: "Producto 1", price: 10 },
    { id: 2, name: "Producto 2", price: 20 },
    { id: 3, name: "Producto 3", price: 30 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para renderizar productos
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Función para agregar productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = `Total: $${total}`;
}

// Inicializar la aplicación
renderProducts();
renderCart();