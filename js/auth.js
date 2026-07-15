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

  if(!email||!pass){ showErr(err,t('auth.err.campos')); return; }

  showAuthLoader();

  const { signInWithEmailAndPassword } = window.firebaseAuthFns;
  const { doc, getDoc } = window.firebaseDbFns;

  try{
    const credential = await signInWithEmailAndPassword(window.firebaseAuth, email, pass);
    const uid = credential.user.uid;

    const userDoc = await getDoc(doc(window.firebaseDb, 'usuarios', uid));

    if(!userDoc.exists()){
      showErr(err,t('auth.err.sin.datos'));
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
      showErr(err,t('auth.err.credenciales'));
    }else if(e.code === 'auth/too-many-requests'){
      showErr(err,t('auth.err.demasiados.intentos'));
    }else{
      showErr(err,t('auth.err.generico.login'));
      console.error('Error en login:', e);
    }
  }finally{
    hideAuthLoader();
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
    showErr(err,t('auth.err.campos')); return;
  }
  if(!isValidPartitaIva(piva)){
    showErr(err,t('auth.err.piva'));
    return;
  }
  if(pass.length<6){ showErr(err,t('auth.err.password.corta')); return; }

  showAuthLoader();

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
      showErr(err,t('auth.err.email.usado'));
    }else if(e.code === 'auth/invalid-email'){
      showErr(err,t('auth.err.email.invalido'));
    }else{
      showErr(err,t('auth.err.generico.registro'));
      console.error('Error en registro:', e);
    }
  }finally{
    hideAuthLoader();
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
    btn.textContent = t('header.logout');
  }else{
    userSpan.textContent = '';
    btn.textContent = t('header.login');
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
  // Ya no mostramos ningún aviso visual — el mail de verificación se
  // manda en silencio al registrarse (ver doRegister), sin pedirle
  // nada al usuario. Se mantiene la función vacía porque startApp()
  // todavía la llama; si en el futuro se quiere reactivar el aviso,
  // el código viejo está en el historial de git.
}

// ── INIT ──────────────────────────────────────────────────────────────────────
window.onload = function(){
  applyTranslations();
  checkAgeGate();
  loadCatalog();
  const session = getSession();
  if(session){
    startApp(session);
  }else{
    updateHeaderAuthState();
  }
};

let authLoaderLottie = null;

function showAuthLoader(){
  const overlay = document.getElementById('auth-loading-overlay');
  if(!overlay) return;
  overlay.classList.add('open');
  if(!authLoaderLottie && window.lottie){
    authLoaderLottie = lottie.loadAnimation({
      container: document.getElementById('auth-loading-lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/ee1a593b-9fe2-4ac9-8b20-8cd7bc5266c6/CVroXxL0aA.json'
    });
  }
}

function hideAuthLoader(){
  const overlay = document.getElementById('auth-loading-overlay');
  if(overlay) overlay.classList.remove('open');
}
async function doPasswordReset(){
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const err = document.getElementById('login-error');
  err.style.display='none';

  if(!email){
    showErr(err, t('auth.err.email.para.reset'));
    return;
  }

  const { sendPasswordResetEmail } = window.firebaseAuthFns;

  try{
    await sendPasswordResetEmail(window.firebaseAuth, email);
    alert(t('auth.reset.enviado'));
  }catch(e){
    if(e.code === 'auth/invalid-email'){
      showErr(err, t('auth.err.email.invalido'));
    }else{
      alert(t('auth.reset.enviado'));
    }
  }
}
function checkAgeGate(){
  const yaConfirmado = localStorage.getItem('vda_age_ok');
  if(yaConfirmado === 'yes') return;
  document.getElementById('age-gate-overlay').classList.add('open');
}

function confirmarEdad(esMayor){
  if(esMayor){
    localStorage.setItem('vda_age_ok', 'yes');
    document.getElementById('age-gate-overlay').classList.remove('open');
  }else{
    document.body.innerHTML = `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:40px;font-family:'Inter',sans-serif;color:#333;">
      <p>${t('age.rechazo')}</p>
    </div>`;
  }
}