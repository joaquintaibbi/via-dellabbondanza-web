// auth.js
// Login, registro, logout y arranque de la aplicación tras autenticar.
// Depende de config.js (debe cargarse antes en index.html).

// ── AUTH ──────────────────────────────────────────────────────────────────────
function showTab(tab){
  document.querySelectorAll('.auth-tab button').forEach((b,i)=>{
    b.classList.toggle('active', (tab==='login'&&i===0)||(tab==='register'&&i===1));
  });
  document.getElementById('tab-login').style.display = tab==='login'?'flex':'none';
  document.getElementById('tab-register').style.display = tab==='register'?'flex':'none';
}

async function doLogin(){
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');
  err.style.display='none';

  if(!email||!pass){ showErr(err,'Completá todos los campos.'); return; }

  // Si hay webhook de n8n configurado, usarlo
  if(N8N_LOGIN){
    try{
      const res = await fetch(N8N_LOGIN, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pass})});
      const data = await res.json();
      if(data.success && data.user){ setSession(data.user); startApp(data.user); return; }
      showErr(err, data.error||'Email o contraseña incorrectos.'); return;
    }catch(e){ console.warn('n8n no disponible, usando localStorage'); }
  }

  // Fallback: localStorage
  const users = getUsers();
  const user = users.find(u=>u.email===email&&u.password===pass);
  if(!user){ showErr(err,'Email o contraseña incorrectos.'); return; }
  setSession(user); startApp(user);
}

function isValidPartitaIva(piva){
  const clean = piva.replace(/\s/g,'').toUpperCase().replace(/^IT/,'');
  if(!/^\d{11}$/.test(clean)) return false;

  let sum = 0;
  for(let i=0; i<10; i++){
    let digit = parseInt(clean[i], 10);
    if(i % 2 === 1){
      digit *= 2;
      if(digit > 9) digit -= 9;
    }
    sum += digit;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(clean[10], 10);
}

async function doRegister(){
  const restaurant = document.getElementById('reg-restaurant').value.trim();
  const razonsocial = document.getElementById('reg-razonsocial').value.trim();
  const address = document.getElementById('reg-address').value.trim();
  const city = document.getElementById('reg-city').value.trim();
  const piva = document.getElementById('reg-piva').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const phone = document.getElementById('reg-phone').value.trim();
  const pass = document.getElementById('reg-pass').value;
  const err = document.getElementById('reg-error');
  const suc = document.getElementById('reg-success');
  err.style.display='none'; suc.style.display='none';

  if(!restaurant||!razonsocial||!address||!city||!piva||!email||!phone||!pass){
    showErr(err,'Completá todos los campos.'); return;
  }

  if(!isValidPartitaIva(piva)){
    showErr(err,'La Partita IVA no es válida. Verificá los 11 dígitos.');
    return;
  }
  
  if(pass.length<6){ showErr(err,'La contraseña debe tener al menos 6 caracteres.'); return; }

  const users = getUsers();
  if(users.find(u=>u.email===email)){ showErr(err,'Este email ya está registrado.'); return; }

  const user = {restaurant,razonsocial,address,city,piva,email,phone,password:pass};

  // Si hay webhook n8n configurado, guardar en Sheets via n8n
  if(N8N_REGISTER){
    try{
      await fetch(N8N_REGISTER, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(user)});
    }catch(e){ console.warn('n8n no disponible, guardando solo en localStorage'); }
  }

  // Siempre guardar en localStorage como respaldo
  users.push(user);
  saveUsers(users);
  setSession(user); startApp(user);
}

function doLogout(){
  clearSession(); currentUser=null; cart={};
  document.getElementById('app-screen').style.display='none';
  document.getElementById('auth-screen').style.display='flex';
}

function showErr(el, msg){ el.textContent=msg; el.style.display='block'; }
// ── APP START ─────────────────────────────────────────────────────────────────
function startApp(user){
  currentUser = user;
  document.getElementById('auth-screen').style.display='none';
  document.getElementById('app-screen').style.display='flex';
  document.getElementById('header-user').textContent = user.restaurant;
  loadCatalog();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
window.onload = function(){
  const session = getSession();
  if(session){ startApp(session); }
};
