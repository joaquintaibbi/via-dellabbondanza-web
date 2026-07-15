// catalogo.js
// Carga el catálogo desde Google Sheets (CSV publicado), aplica
// filtros y búsqueda, y renderiza las tarjetas de vino.
// Depende de config.js.
let paginaActual = 1;
const VINOS_POR_PAGINA = 24;
const BODEGAS_DESTACADAS = ['Catena Zapata', 'Bodega del Fin del Mundo', 'Rutini', 'Malvinas'];
const VINOS_POR_BODEGA_DESTACADA = 6;

function renderDestacados(){
  const el = document.getElementById('destacados');
  if(!el) return;

  let html = '';
  BODEGAS_DESTACADAS.forEach(bodega => {
    const vinosDeLaBodega = wines.filter(w => w['Bodega'] === bodega).slice(0, VINOS_POR_BODEGA_DESTACADA);
    if(!vinosDeLaBodega.length) return;

    html += `<div class="destacado-grupo">
      <h3 class="destacado-titulo">${bodega}</h3>
      <div class="destacado-scroll">
        ${vinosDeLaBodega.map(w => wineCard(w)).join('')}
      </div>
    </div>`;
  });

  el.innerHTML = html;
}
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
      poblarFiltroBodegas();
      renderDestacados();
      renderCatalog(filtered);
    },
    error: function(){ renderError(); }
  });
}

function applyFilters(){
  paginaActual = 1;
  const q = document.getElementById('search').value.toLowerCase();
  const btn = document.getElementById('clear-search');
  btn.style.display = q ? 'block' : 'none';

  const uvaSel = document.getElementById('filter-uva').value;
  const regionSel = document.getElementById('filter-region').value;
  const precioMin = parseFloat(document.getElementById('filter-precio-min').value) || 0;
  const precioMaxInput = document.getElementById('filter-precio-max').value;
  const precioMax = precioMaxInput ? parseFloat(precioMaxInput) : Infinity;

  filtered = wines.filter(w => {
    const matchType = activeType==='all' || (w['Tipo']||'').toLowerCase()===activeType;
    const matchQ = !q ||
      (w['Nombre']||'').toLowerCase().includes(q) ||
      (w['Bodega']||'').toLowerCase().includes(q) ||
      (w['Uva(s)']||'').toLowerCase().includes(q) ||
      (w['Región']||'').toLowerCase().includes(q);

    const uvaTexto = (w['Uva(s)']||'').toLowerCase();
    const matchUva = !uvaSel || uvaTexto.includes(uvaSel);

    const regionTexto = (w['Región']||'').toLowerCase();
    const matchRegion = !regionSel || regionSel.split('|').some(palabra => regionTexto.includes(palabra));
    const bodegaSel = document.getElementById('filter-bodega').value;
    const matchBodega = !bodegaSel || (w['Bodega']||'') === bodegaSel;

    const precio = parseFloat(w['Precio (€)']) || 0;
    const matchPrecio = precio >= precioMin && precio <= precioMax;

    return matchType && matchQ && matchUva && matchRegion && matchPrecio && matchBodega;
  });
  const bodegaSelCheck = document.getElementById('filter-bodega').value;
const hayFiltros = q || activeType !== 'all' || uvaSel || regionSel || bodegaSelCheck || precioMin > 0 || precioMaxInput;
document.getElementById('reset-filters').style.display = hayFiltros ? 'inline-block' : 'none';

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
  document.getElementById('results-count').textContent = `${list.length} ${t('catalog.count')}`;
  if(!list.length){
el.innerHTML=`<div class="empty-state">
  <img src="assets/copacargando.svg" class="empty-copa" alt=""/>
  <h3>${t('catalog.empty.title')}</h3>
  <p>${t('catalog.empty.body')}</p>
</div>`;
    return;
  }

  const totalPaginas = Math.ceil(list.length / VINOS_POR_PAGINA);
  if(paginaActual > totalPaginas) paginaActual = 1;

  const inicio = (paginaActual - 1) * VINOS_POR_PAGINA;
  const pagina = list.slice(inicio, inicio + VINOS_POR_PAGINA);

  el.innerHTML = pagina.map(w => wineCard(w)).join('') + renderPaginacion(totalPaginas);
}

function renderPaginacion(totalPaginas){
  if(totalPaginas <= 1) return '';

  let botones = '';
  for(let i = 1; i <= totalPaginas; i++){
    botones += `<button class="pagina-btn ${i===paginaActual?'active':''}" onclick="irAPagina(${i})">${i}</button>`;
  }

  return `<div class="paginacion">
    <button class="pagina-btn" onclick="irAPagina(${paginaActual - 1})" ${paginaActual===1?'disabled':''}>‹</button>
    ${botones}
    <button class="pagina-btn" onclick="irAPagina(${paginaActual + 1})" ${paginaActual===totalPaginas?'disabled':''}>›</button>
  </div>`;
}

function irAPagina(n){
  paginaActual = n;
  renderCatalog(filtered);
  document.getElementById('catalog').scrollIntoView({behavior:'smooth', block:'start'});
}

const BOTELLAS_POR_CAJA = 6;

function wineCard(w){
  const precio = parseFloat(w['Precio (€)']||0).toFixed(2);
  const agotado = w['Agotado']==='Sí';
  const isNew = w['Nuevo']==='Sí';
  const img = w['URL Foto'] ? `<img src="${w['URL Foto']}" alt="${w['Nombre']}" loading="lazy" onerror="this.parentNode.innerHTML='<span class=wine-img-placeholder>🍷</span>'"/>` : '<span class="wine-img-placeholder">🍷</span>';
  const id = w['ID'];

  return `<div class="wine-card">
    <div class="wine-img" onclick="openWineModal('${id}')">
      ${img}
      ${agotado?'<span class="badge-agotado">Agotado</span>':''}
      ${isNew?'<span class="badge-new">Nuevo</span>':''}
    </div>
    <div class="wine-info">
      <div class="wine-bodega" onclick="openWineModal('${id}')">${w['Bodega']||''}</div>
      <div class="wine-name" onclick="openWineModal('${id}')">${w['Nombre']}</div>
      <div class="wine-meta" onclick="openWineModal('${id}')">${w['Uva(s)']||''} · ${w['Cosecha']||''} · ${w['Región']||''}</div>
      <div class="wine-footer">
        <div class="wine-price">€${precio} <span>/botella</span></div>
        ${w['Botellas_Por_Caja'] ? `
        <select class="unidad-select" id="unidad-${id}" onclick="event.stopPropagation()">
          <option value="unidad">${t('cart.unidad')}</option>
          <option value="caja">${t('cart.caja')} x${w['Botellas_Por_Caja']}</option>
        </select>
        ` : ''}
        <button class="add-btn" ${agotado?'disabled':''} onclick="event.stopPropagation(); addToCart('${id}')" title="Agregar al pedido">+</button>
      </div>
    </div>
  </div>`;
}

function renderError(){
  document.getElementById('catalog').innerHTML='<div class="empty-state"><h3>Error al cargar</h3><p>No se pudo conectar con el catálogo. Intentá de nuevo.</p></div>';
}
function clearSearch(){
  const input = document.getElementById('search');
  const btn = document.getElementById('clear-search');
  input.value = '';
  btn.style.display = 'none';
  applyFilters();
}
function openWineModal(id){
  const w = wines.find(w => w['ID'] === id);
  if(!w) return;

  const precio = parseFloat(w['Precio (€)']||0).toFixed(2);
  const agotado = w['Agotado']==='Sí';
  const img = w['URL Foto'] ? `<img src="${w['URL Foto']}" alt="${w['Nombre']}"/>` : '🍷';

  document.getElementById('modal-img').innerHTML = img;
  const bodegaInfo = getBodegaInfo(w['Bodega']);
const descHTML = bodegaInfo
  ? `<div class="modal-bodega-desc"><p>${bodegaInfo.descripcion}</p><span>📍 ${bodegaInfo.region} · ${t('modal.desde')} ${bodegaInfo.fundacion}</span></div>`
  : '';
document.getElementById('modal-bodega-desc').innerHTML = descHTML;
  document.getElementById('modal-bodega').textContent = w['Bodega']||'';
  document.getElementById('modal-name').textContent = w['Nombre']||'';
  document.getElementById('modal-meta').textContent = `${w['Uva(s)']||''} · ${w['Cosecha']||''} · ${w['Región']||''}`;
  document.getElementById('modal-precio').textContent = `€${precio} / ${t('modal.precio.unidad')}`;
  const capacidad = w['Capacidad'] || '';
  const capacidadEl = document.getElementById('modal-capacidad');
  if(capacidadEl){
    capacidadEl.textContent = capacidad ? `${t('modal.capacidad')}: ${capacidad}` : '';
    capacidadEl.style.display = capacidad ? 'block' : 'none';
  }

  const puntajeRaw = w['Puntaje_Fuente'] || '';
  const puntajeEl = document.getElementById('modal-puntaje');
  if(puntajeEl){
    if(puntajeRaw){
      puntajeEl.textContent = `⭐ ${traducirPuntaje(puntajeRaw)}`;
      puntajeEl.style.display = 'inline-block';
    }else{
      puntajeEl.textContent = '';
      puntajeEl.style.display = 'none';
    }
  }
  const modalUnidadSelect = document.getElementById('modal-unidad-select');
  if(w['Botellas_Por_Caja']){
    modalUnidadSelect.innerHTML = `
      <option value="unidad">${t('cart.unidad')}</option>
      <option value="caja">${t('cart.caja')} x${w['Botellas_Por_Caja']}</option>
    `;
    modalUnidadSelect.style.display = 'inline-block';
  }else{
    modalUnidadSelect.innerHTML = '';
    modalUnidadSelect.style.display = 'none';
  }

  document.getElementById('modal-qty').value = 1;
  document.getElementById('modal-add').onclick = () => {
    const qty = parseInt(document.getElementById('modal-qty').value)||1;
    const valorElegido = modalUnidadSelect.value || 'unidad';

    let tarjetaSelect = document.getElementById(`unidad-${id}`);
    let esTemporal = false;
    if(!tarjetaSelect){
      tarjetaSelect = document.createElement('select');
      tarjetaSelect.id = `unidad-${id}`;
      tarjetaSelect.style.display = 'none';
      document.body.appendChild(tarjetaSelect);
      tarjetaSelect.innerHTML = `<option value="unidad">u</option><option value="caja">c</option>`;
      esTemporal = true;
    }
    tarjetaSelect.value = valorElegido;

    for(let i=0; i<qty; i++) addToCart(id);

    if(esTemporal) tarjetaSelect.remove();
    closeWineModal();
  };
  document.getElementById('modal-add').disabled = agotado;

  document.getElementById('wine-modal').classList.add('open');
  document.getElementById('modal-overlay').classList.add('open');
}

function closeWineModal(){
  document.getElementById('wine-modal').classList.remove('open');
  document.getElementById('modal-overlay').classList.remove('open');
}
function poblarFiltroBodegas(){
  const select = document.getElementById('filter-bodega');
  const bodegas = [...new Set(wines.map(w => w['Bodega']).filter(Boolean))].sort();
  const opcionesActuales = select.innerHTML;
  bodegas.forEach(bodega => {
    const option = document.createElement('option');
    option.value = bodega;
    option.textContent = bodega;
    select.appendChild(option);
  });
}
function resetFilters(){
  activeType = 'all';
  activeFilters = { uva: null, pais: null, cosecha: null };
  document.getElementById('filter-uva').value = '';
document.getElementById('filter-region').value = '';
document.getElementById('filter-bodega').value = '';
document.getElementById('filter-precio-min').value = '';
document.getElementById('filter-precio-max').value = '';
  document.getElementById('search').value = '';
  document.getElementById('clear-search').style.display = 'none';
  document.querySelectorAll('#type-filters .pill').forEach(p => {
    p.classList.toggle('active', p.dataset.type === 'all');
  });
  document.getElementById('reset-filters').style.display = 'none';
  applyFilters();
}