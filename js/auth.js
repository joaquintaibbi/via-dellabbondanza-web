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

  const { signInWithEmailAndPassword } = window.firebaseAuthFns;
  const { doc, getDoc } = window.firebaseDbFns;

  try{
    const credential = await signInWithEmailAndPassword(window.firebaseAuth, email, pass);
    const uid = credential.user.uid;

    const userDoc = await getDoc(doc(window.firebaseDb, 'usuarios', uid));

    if(!userDoc.exists()){
      showErr(err,'No se encontraron los datos de tu cuenta. Contactanos.');
      return;
    }

    const user = {...userDoc.data(), uid};
    setSession(user);
    startApp(user);

    if(pendingOrderAfterLogin){
      pendingOrderAfterLogin = false;
      sendOrder();
    }

  }catch(e){
    if(e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'){
      showErr(err,'Email o contraseña incorrectos.');
    }else{
      showErr(err,'Error al iniciar sesión. Intentá de nuevo.');
      console.error('Error en login:', e);
    }
  }
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

  const { createUserWithEmailAndPassword } = window.firebaseAuthFns;
  const { doc, setDoc } = window.firebaseDbFns;

  try{
    const credential = await createUserWithEmailAndPassword(window.firebaseAuth, email, pass);
    const uid = credential.user.uid;

    const { sendEmailVerification } = window.firebaseAuthFns;
    sendEmailVerification(credential.user).catch(e => console.warn('No se pudo enviar el mail de verificación:', e));

    const user = {restaurant,razonsocial,address,city,piva,email,phone};

    await setDoc(doc(window.firebaseDb, 'usuarios', uid), user);

 setSession({...user, uid});
    startApp({...user, uid});

    if(pendingOrderAfterLogin){
      pendingOrderAfterLogin = false;
      sendOrder();
    }

  }catch(e){
    if(e.code === 'auth/email-already-in-use'){

      showErr(err,'Este email ya está registrado.');
    }else if(e.code === 'auth/invalid-email'){
      showErr(err,'El email no es válido.');
    }else{
      showErr(err,'Error al registrar. Intentá de nuevo.');
      console.error('Error en registro:', e);
    }
  }
}

async function doLogout(){
  const { signOut } = window.firebaseAuthFns;
  try{
    await signOut(window.firebaseAuth);
  }catch(e){
    console.error('Error al cerrar sesión en Firebase:', e);
  }
  clearSession(); currentUser=null; cart={};
  updateCartUI();
  const banner = document.getElementById('verify-banner');
  if(banner) banner.remove();
  updateHeaderAuthState();
}

function showErr(el, msg){ el.textContent=msg; el.style.display='block'; }
// ── APP START ─────────────────────────────────────────────────────────────────
function startApp(user){
  currentUser = user;
  closeAuthModal();
  updateHeaderAuthState();
  renderVerificationBanner();
}

function updateHeaderAuthState(){
  const userSpan = document.getElementById('header-user');
  const btn = document.getElementById('header-auth-btn');
  if(currentUser){
    userSpan.textContent = currentUser.restaurant;
    btn.textContent = 'Salir';
  }else{
    userSpan.textContent = '';
    btn.textContent = 'Iniciar sesión';
  }
}

function headerAuthAction(){
  if(currentUser){ doLogout(); } else { openAuthModal(); }
}

function openAuthModal(){
  document.getElementById('auth-screen').classList.add('open');
}

function closeAuthModal(){
  document.getElementById('auth-screen').classList.remove('open');
}

function cancelAuthModal(){
  closeAuthModal();
  pendingOrderAfterLogin = false;
}

function renderVerificationBanner(){
  const existing = document.getElementById('verify-banner');
  if(existing) existing.remove();

  const fbUser = window.firebaseAuth.currentUser;
  if(!fbUser || fbUser.emailVerified) return;

  const banner = document.createElement('div');
  banner.id = 'verify-banner';
  banner.style.cssText = 'background:#FEF3E4;color:#854D0E;padding:10px 20px;font-size:13px;text-align:center;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;';
  banner.innerHTML = `
    <span>📧 Verificá tu email para poder confirmar pedidos.</span>
    <button id="resend-verify-btn" style="background:#854D0E;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;">Reenviar email</button>
  `;

  const header = document.querySelector('header');
  header.insertAdjacentElement('afterend', banner);

  document.getElementById('resend-verify-btn').addEventListener('click', async (e) => {
    const btn = e.target;
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    try{
      const { sendEmailVerification } = window.firebaseAuthFns;
      await sendEmailVerification(window.firebaseAuth.currentUser);
btn.textContent = '¡Enviado!';
    }catch(err){
      if(err.code === 'auth/too-many-requests'){
        btn.textContent = 'Esperá un minuto e intentá de nuevo';
      }else{
        btn.textContent = 'Error, reintentá';
      }
      btn.disabled = false;
      console.error('Error reenviando verificación:', err);
    }
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
window.onload = function(){
  loadCatalog();
  const session = getSession();
  if(session){
    startApp(session);
  }else{
    updateHeaderAuthState();
  }
};
