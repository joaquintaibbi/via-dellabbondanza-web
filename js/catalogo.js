// catalogo.js
// Carga el catálogo desde Google Sheets (CSV publicado), aplica
// filtros y búsqueda, y renderiza las tarjetas de vino.
// Depende de config.js.

// ── CATALOG ───────────────────────────────────────────────────────────────────
function loadCatalog(){
  Papa.parse(SHEETS_CSV, {
    download: true,
    skipEmptyLines: true,
    complete: function(results){
      const rows = results.data;
      // Row 0 = title, Row 1 = headers, Row 2+ = data
      const headers = rows[1];
      wines = rows.slice(2).map(r => {
        const w = {};
        headers.forEach((h,i) => w[h.trim()] = r[i]||'');
        return w;
      }).filter(w => w['Nombre']);
      filtered = [...wines];
      renderCatalog(filtered);
    },
    error: function(){ renderError(); }
  });
}

function applyFilters(){
  const q = document.getElementById('search').value.toLowerCase();
  filtered = wines.filter(w => {
    const matchType = activeType==='all' || (w['Tipo']||'').toLowerCase()===activeType;
    const matchQ = !q ||
      (w['Nombre']||'').toLowerCase().includes(q) ||
      (w['Bodega']||'').toLowerCase().includes(q) ||
      (w['Uva(s)']||'').toLowerCase().includes(q) ||
      (w['Región']||'').toLowerCase().includes(q);
    return matchType && matchQ;
  });
  renderCatalog(filtered);
}

function setTypeFilter(type, el){
  activeType = type;
  document.querySelectorAll('#type-filters .pill').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

function renderCatalog(list){
  const el = document.getElementById('catalog');
  document.getElementById('results-count').textContent = `${list.length} vinos`;
  if(!list.length){
    el.innerHTML='<div class="empty-state"><h3>Sin resultados</h3><p>Probá con otros filtros.</p></div>';
    return;
  }
  el.innerHTML = list.map(w => wineCard(w)).join('');
}

function wineCard(w){
  const precio = parseFloat(w['Precio (€)']||0).toFixed(2);
  const agotado = w['Agotado']==='Sí';
  const isNew = w['Nuevo']==='Sí';
  const img = w['URL Foto'] ? `<img src="${w['URL Foto']}" alt="${w['Nombre']}" loading="lazy" onerror="this.parentNode.innerHTML='<span class=wine-img-placeholder>🍷</span>'"/>` : '<span class="wine-img-placeholder">🍷</span>';
  const id = w['ID'];

  return `<div class="wine-card">
    <div class="wine-img">
      ${img}
      ${agotado?'<span class="badge-agotado">Agotado</span>':''}
      ${isNew?'<span class="badge-new">Nuevo</span>':''}
    </div>
    <div class="wine-info">
      <div class="wine-bodega">${w['Bodega']||''}</div>
      <div class="wine-name">${w['Nombre']}</div>
      <div class="wine-meta">${w['Uva(s)']||''} · ${w['Cosecha']||''} · ${w['Región']||''}</div>
      <div class="wine-footer">
        <div class="wine-price">€${precio} <span>/botella</span></div>
        <button class="add-btn" ${agotado?'disabled':''} onclick="addToCart('${id}')" title="Agregar al pedido">+</button>
      </div>
    </div>
  </div>`;
}

function renderError(){
  document.getElementById('catalog').innerHTML='<div class="empty-state"><h3>Error al cargar</h3><p>No se pudo conectar con el catálogo. Intentá de nuevo.</p></div>';
}

