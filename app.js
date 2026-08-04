const SB_URL = "https://lxlpoagcutkzarbnggvs.supabase.co";
const SB_KEY = "sb_publishable_SK1gXWsYX3pEbPam5t0k2A_VGIA9Xnj";
const supabase = supabase.createClient(SB_URL, SB_KEY);

let cart = JSON.parse(localStorage.getItem('cb-cart')) || [];

// Load Products on Index
async function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const { data } = await supabase.from('products').select('*').eq('status', 'active');
    grid.innerHTML = data.map(p => `
        <div class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer" onclick="location.href='product.html?id=${p.id}'">
            <img src="${p.images[0]}" class="w-full h-48 object-cover rounded-xl mb-4">
            <h3 class="font-bold truncate">${p.name}</h3>
            <p class="text-primary font-black">৳ ${p.price}</p>
        </div>
    `).join('');
}

// Cart Management
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('translate-x-full'); }

function addToCart(id, name, price, img) {
    const item = cart.find(i => i.id === id);
    if(item) item.qty++; else cart.push({id, name, price, img, qty: 1});
    saveCart();
}

function saveCart() {
    localStorage.setItem('cb-cart', JSON.stringify(cart));
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    localStorage.setItem('cart-total', total);
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items');
    if(!list) return;
    list.innerHTML = cart.map(i => `
        <div class="flex items-center gap-3">
            <img src="${i.img}" class="w-12 h-12 rounded">
            <div class="flex-1 text-sm font-bold">${i.name} <br> <span class="text-primary">৳ ${i.price} x ${i.qty}</span></div>
        </div>
    `).join('');
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = `৳ ${localStorage.getItem('cart-total')}`;
}

// Global Init
if(typeof lucide !== 'undefined') lucide.createIcons();
loadProducts();
renderCart();
