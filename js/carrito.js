// carrito.js
// Manejo del carrito de compras y envío del pedido por WhatsApp.
// Depende de config.js y de las variables globales 'wines' y
// 'currentUser' definidas en catalogo.js / auth.js.

// ── CART ──────────────────────────────────────────────────────────────────────
function addToCart(id){
  const wine = wines.find(w=>w['ID']===id);
  if(!wine) return;
  if(!cart[id]) cart[id] = {wine, qty:0};
  cart[id].qty++;
  updateCartUI();
  // Brief visual feedback
  const btn = event.target;
  btn.textContent='✓';
  setTimeout(()=>btn.textContent='+', 600);
}

function removeFromCart(id){
  delete cart[id];
  updateCartUI();
  renderCartItems();
}

function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id].qty += delta;
  if(cart[id].qty <= 0){ delete cart[id]; }
  updateCartUI();
  renderCartItems();
}

function updateCartUI(){
  const total = Object.values(cart).reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-count').textContent = total;
}

function openCart(){
  renderCartItems();
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
}

function closeCart(){
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
}

function renderCartItems(){
  const el = document.getElementById('cart-items');
  const items = Object.entries(cart);

  if(!items.length){
    el.innerHTML='<div class="cart-empty">🛒<p>Tu carrito está vacío</p></div>';
    document.getElementById('cart-total').textContent = '€0.00';
    return;
  }

  let total = 0;
  el.innerHTML = items.map(([id,item])=>{
    const precio = parseFloat(item.wine['Precio (€)']||0);
    const subtotal = precio * item.qty;
    total += subtotal;
    const img = item.wine['URL Foto'] ? `<img src="${item.wine['URL Foto']}" alt=""/>` : '🍷';
    return `<div class="cart-item">
      <div class="cart-item-img">${img}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.wine['Nombre']}</div>
        <div class="cart-item-bodega">${item.wine['Bodega']||''} · €${precio.toFixed(2)}/u</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${id}',-1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${id}',1)">+</button>
          <button class="remove-btn" onclick="removeFromCart('${id}')">🗑</button>
        </div>
      </div>
      <div class="cart-item-price">€${subtotal.toFixed(2)}</div>
    </div>`;
  }).join('');

  document.getElementById('cart-total').textContent = `€${total.toFixed(2)}`;

  // Client info
  if(currentUser){
    document.getElementById('cart-client-info').innerHTML = `
      <strong>Datos del cliente</strong>
      <p>${currentUser.restaurant} · ${currentUser.razonsocial}<br>
      ${currentUser.address}, ${currentUser.city}<br>
      P.IVA: ${currentUser.piva} · ${currentUser.phone}</p>`;
  }
}

function sendOrder(){
  const items = Object.values(cart);
  if(!items.length){ alert('Agregá vinos al carrito primero.'); return; }
  let total = 0;
  const lines = items.map(item=>{
    const precio = parseFloat(item.wine['Precio (€)']||0);
    const subtotal = precio * item.qty;
    total += subtotal;
    return `• ${item.qty}× ${item.wine['Nombre']} (${item.wine['Cosecha']||''}) — €${precio.toFixed(2)} c/u`;
  }).join('\n');

  const u = currentUser;
  const fecha = new Date().toLocaleDateString('es-AR',{day:'2-digit',month:'2-digit',year:'numeric'});

  const msg = `🍷 *NUEVO PEDIDO*
━━━━━━━━━━━━━━━━━━━━
*Restaurante:* ${u.restaurant}
*Razón social:* ${u.razonsocial}
*Dirección:* ${u.address}, ${u.city}
*P.IVA:* ${u.piva}
*Teléfono:* ${u.phone}
*Email:* ${u.email}

📦 *PEDIDO:*
${lines}

💰 *TOTAL: €${total.toFixed(2)}*

🗓️ Fecha: ${fecha}
_Pedido enviado desde catálogo web_`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  cart = {};
  updateCartUI();
  closeCart();
  document.getElementById('app-screen').style.display='none';
  document.getElementById('confirm-screen').style.display='flex';
}

function backToCatalog(){
  document.getElementById('confirm-screen').style.display='none';
  document.getElementById('app-screen').style.display='flex';
}

