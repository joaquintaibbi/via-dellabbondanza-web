// config.js
// Constantes del proyecto, estado global compartido entre módulos,
// y helpers de almacenamiento local (sesión y usuarios).
//
// NOTA (10/07): usuarios y sesión siguen en localStorage por ahora.
// Pendiente migrar a Firebase/Supabase Auth — ver doc interno de
// pendientes técnicos, sección 1.1 y 1.2 (BLOQUEANTES).

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SHEETS_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6k_rIOY7x9C5uCCM9oaBn6NtVbAckrlqpn3K6-va_1m-V2icKh2Jai0PNI_cY7FK7emEwSZApvfym/pub?output=csv';
const ORDEN_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6k_rIOY7x9C5uCCM9oaBn6NtVbAckrlqpn3K6-va_1m-V2icKh2Jai0PNI_cY7FK7emEwSZApvfym/pub?gid=1413872444&single=true&output=csv';
const WHATSAPP_NUMBER = '393343077933';
// Webhooks n8n — completar cuando estén listos:
const N8N_REGISTER = ''; // 'https://tu-n8n.com/webhook/vda-register'
const N8N_LOGIN    = ''; // 'https://tu-n8n.com/webhook/vda-login'

// ── STATE ─────────────────────────────────────────────────────────────────────
let wines = [];
let filtered = [];
let cart = {};
let currentUser = null;
let activeType = 'all';
let pendingOrderAfterLogin = false;


// ── STORAGE ───────────────────────────────────────────────────────────────────
function getSession(){ return JSON.parse(localStorage.getItem('vda_session')||'null'); }
function setSession(u){ localStorage.setItem('vda_session', JSON.stringify(u)); }
function clearSession(){ localStorage.removeItem('vda_session'); }

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
// Manda un evento a Google Analytics (GA4). Si gtag no cargó (bloqueador de
// anuncios, sin conexión), no hace nada y no rompe la página.
function trackEvent(nombre, params){
  try{
    if(typeof gtag === 'function') gtag('event', nombre, params || {});
  }catch(e){ /* nunca romper la web por una métrica */ }
}

// Arma el item de un vino con el formato de e-commerce de GA4.
function gaItem(wine, botellas, qty){
  return {
    item_id: String(wine['ID']||''),
    item_name: wine['Nombre']||'',
    item_brand: wine['Bodega']||'',
    item_category: wine['Tipo']||'',
    item_variant: wine['Capacidad']||'',
    price: parseFloat(wine['Precio (€)']||0) * (botellas||1),
    quantity: qty||1
  };
}

 