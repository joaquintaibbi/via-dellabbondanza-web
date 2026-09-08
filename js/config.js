// config.js
// Constantes del proyecto, estado global compartido entre módulos,
// y helpers de almacenamiento local (sesión y usuarios).
//
// NOTA (10/07): usuarios y sesión siguen en localStorage por ahora.
// Pendiente migrar a Firebase/Supabase Auth — ver doc interno de
// pendientes técnicos, sección 1.1 y 1.2 (BLOQUEANTES).

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SHEETS_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6k_rIOY7x9C5uCCM9oaBn6NtVbAckrlqpn3K6-va_1m-V2icKh2Jai0PNI_cY7FK7emEwSZApvfym/pub?output=csv';
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

 