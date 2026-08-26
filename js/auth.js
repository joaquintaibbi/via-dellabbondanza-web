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

  const ventanaWA = pendingOrderAfterLogin ? window.open('', '_blank') : null;

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
      sendOrder(ventanaWA);
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
function isValidCodiceFiscale(cf){
  if(!cf) return false;
  cf = cf.toUpperCase().replace(/\s/g, '');
  if(!/^[A-Z]{6}[0-9]{2}[A-EHLMPRST][0-9]{2}[A-Z][0-9]{3}[A-Z]$/.test(cf)) return false;

  const dispari = {
    '0':1,'1':0,'2':5,'3':7,'4':9,'5':13,'6':15,'7':17,'8':19,'9':21,
    'A':1,'B':0,'C':5,'D':7,'E':9,'F':13,'G':15,'H':17,'I':19,'J':21,
    'K':2,'L':4,'M':18,'N':20,'O':11,'P':3,'Q':6,'R':8,'S':12,'T':14,
    'U':16,'V':10,'W':22,'X':25,'Y':24,'Z':23
  };
  const pari = {
    '0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,
    'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,
    'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,
    'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25
  };

  let suma = 0;
  for(let i=0; i<15; i++){
    const ch = cf[i];
    suma += (i % 2 === 0) ? dispari[ch] : pari[ch];
  }
  const letraControl = String.fromCharCode(65 + (suma % 26));
  return letraControl === cf[15];
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
  if(!document.getElementById('reg-privacy-check').checked){
    showErr(err,t('privacy.err'));
    return;
  }

  const ventanaWA = pendingOrderAfterLogin ? window.open('', '_blank') : null;

  showAuthLoader();

  const { createUserWithEmailAndPassword } = window.firebaseAuthFns;
  const { doc, setDoc } = window.firebaseDbFns;

  try{
    const credential = await createUserWithEmailAndPassword(window.firebaseAuth, email, pass);
    const uid = credential.user.uid;

    const { sendEmailVerification } = window.firebaseAuthFns;
    sendEmailVerification(credential.user).catch(e => console.warn('No se pudo enviar el mail de verificación:', e));

    const tipoDocumento = document.getElementById('reg-tipo-documento').value;
const piva = tipoDocumento === 'empresa' ? document.getElementById('reg-piva').value.trim() : document.getElementById('reg-cf').value.trim().toUpperCase();
const user = {restaurant,razonsocial,address,city,piva,email,phone,tipoDocumento};

    await setDoc(doc(window.firebaseDb, 'usuarios', uid), user);

 setSession({...user, uid});
    startApp({...user, uid});

    if(pendingOrderAfterLogin){
      pendingOrderAfterLogin = false;
      sendOrder(ventanaWA);
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
  const params = new URLSearchParams(window.location.search);
  if(params.get('bodega')) showAuthLoader();
  loadCatalog();
  checkAgeGate();
  checkCookieBanner();
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
    window.location.href = 'homepage.html';
  }else{
    document.body.innerHTML = `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:40px;font-family:'Inter',sans-serif;color:#333;">
      <p>${t('age.rechazo')}</p>
    </div>`;
  }
}
function checkCookieBanner(){
  const yaCerrado = localStorage.getItem('vda_cookie_ok');
  if(yaCerrado === 'yes') return;
  document.getElementById('cookie-banner').classList.add('open');
}

function cerrarCookieBanner(){
  localStorage.setItem('vda_cookie_ok', 'yes');
  document.getElementById('cookie-banner').classList.remove('open');
}
function cambiarTipoDocumento(){
  const tipo = document.getElementById('reg-tipo-documento').value;
  document.getElementById('grupo-piva').style.display = tipo === 'empresa' ? 'block' : 'none';
  document.getElementById('grupo-cf').style.display = tipo === 'particular' ? 'block' : 'none';
}