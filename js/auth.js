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

    const user = {restaurant,razonsocial,address,city,piva,email,phone};

    await setDoc(doc(window.firebaseDb, 'usuarios', uid), user);

    setSession({...user, uid});
    startApp({...user, uid});

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
