// Declaración de variables y carrito vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Actualiza la cuenta del carrito en la página
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Muestra los elementos del carrito en el modal
function showCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(div);
        });
    }
    
    document.getElementById('cart-modal').classList.remove('hidden');
}

// Añade un producto al carrito
function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const name = productElement.querySelector('h3').textContent;
    const price = parseInt(productElement.querySelector('p').textContent.replace('Precio: $', ''));
    
    const product = { id: productId, name, price };
    
    // Agrega el producto al array del carrito
    cart.push(product);
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Vacía el carrito
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    showCart();
}

// Cerrar el carrito
function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

// Eventos de botones
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.parentElement.getAttribute('data-id');
        addToCart(productId);
    });
});

document.getElementById('show-cart').addEventListener('click', showCart);
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('close-cart').addEventListener('click', closeCart);

// Al cargar la página, actualizamos la cuenta del carrito
updateCartCount();