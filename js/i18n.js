// i18n.js
// Diccionario de traducción de la interfaz (italiano/español/inglés).
// Los datos del catálogo (nombre del vino, bodega, región, uva) NO se
// traducen — son nombres propios, quedan iguales en los 3 idiomas.
// Se carga ANTES que el resto de los scripts, porque auth.js, catalogo.js
// y carrito.js usan la función t() para armar sus textos.

const TRANSLATIONS = {
  it: {
    'auth.tab.login': 'Accedi',
    'auth.tab.register': 'Registrati',
    'auth.label.email': 'Email',
    'auth.label.password': 'Password',
    'auth.login.btn': 'Accedi al catalogo →',
    'auth.label.nombre': 'Nome',
    'auth.label.razonsocial': 'Ragione sociale',
    'auth.label.direccion': 'Indirizzo',
    'auth.label.ciudad': 'Città',
    'auth.label.piva': 'Partita IVA',
    'auth.label.telefono': 'Telefono',
    'auth.register.btn': 'Crea account e accedi →',
    'auth.placeholder.email': 'tu@ristorante.it',
    'auth.placeholder.password': '••••••••',
    'auth.placeholder.nombre': 'Trattoria Da Mario',
    'auth.placeholder.razonsocial': 'Da Mario SRL',
    'auth.placeholder.direccion': 'Via Roma 45',
    'auth.placeholder.ciudad': 'Milano',
    'auth.placeholder.piva': 'IT12345678901',
    'auth.placeholder.telefono': '+39 02 123456',
    'auth.placeholder.password.reg': 'Minimo 6 caratteri',
    'header.login': 'Accedi',
    'header.logout': 'Esci',
    'destacados.eyebrow': 'Selezione curata',
    'destacados.title': 'I nostri vini in evidenza',
    'search.placeholder': 'Cerca vino, cantina...',
    'filter.all': 'Tutti',
    'filter.tinto': 'Rossi',
    'filter.blanco': 'Bianchi',
    'filter.rosado': 'Rosati',
    'filter.espumante': 'Spumanti',
    'filter.uva': 'Uva',
    'filter.region': 'Regione',
    'filter.precio.min': '€ min',
    'filter.precio.max': '€ max',
    'filter.otros.paises': 'Altri paesi',
    'filter.bodega': 'Cantina',
    'catalog.loading': 'Caricamento catalogo...',
    'catalog.empty.title': 'Nessun risultato',
    'catalog.empty.body': 'Prova con altri filtri.',
    'catalog.error.title': 'Errore di caricamento',
    'catalog.error.body': 'Impossibile connettersi al catalogo. Riprova.',
    'catalog.count': 'vini',
    'cart.title': 'Il tuo ordine',
    'cart.button': 'Carrello',
    'cart.empty': 'Il tuo carrello è vuoto',
    'cart.client.title': 'Dati del cliente',
    'cart.total': 'Totale',
    'cart.send': "Invia ordine a Via dell'Abbondanza",
    'cart.unidad': 'Unità',
    'cart.caja': 'Cassa',
    'confirm.title': 'Ordine inviato!',
    'confirm.body': "Il tuo ordine è stato inviato a Via dell'Abbondanza via WhatsApp. Riceverai a breve la conferma con i dettagli di consegna e fattura.",
    'confirm.back': 'Torna al catalogo',
    'modal.add': "Aggiungi all'ordine",
    'modal.precio.unidad': 'bottiglia',
    'modal.desde': 'Dal',
    'modal.capacidad': 'Formato',
    'modal.puntaje.unidad': 'punti',
    'cart.caja.max': 'Cassa completa',
    'cart.caja.disponible': 'Cassa da',
    'verify.banner': 'Verifica la tua email per confermare gli ordini.',
    'verify.resend': 'Reinvia email',
    'auth.err.campos': 'Compila tutti i campi.',
    'auth.err.piva': 'La Partita IVA non è valida. Verifica le 11 cifre.',
    'auth.err.password.corta': 'La password deve avere almeno 6 caratteri.',
    'auth.err.email.usado': 'Questa email è già registrata.',
    'auth.err.email.invalido': "L'email non è valida.",
    'auth.err.generico.registro': 'Errore nella registrazione. Riprova.',
    'auth.err.credenciales': 'Email o password errati.',
    'auth.err.generico.login': "Errore durante l'accesso. Riprova.",
    'auth.err.sin.datos': 'Dati del tuo account non trovati. Contattaci.',
    'cart.err.vacio': "Aggiungi vini all'ordine prima.",
    'wa.titulo': 'NUOVO ORDINE',
    'wa.restaurante': 'Ristorante:',
    'wa.razonsocial': 'Ragione sociale:',
    'wa.direccion': 'Indirizzo:',
    'wa.piva': 'Partita IVA:',
    'wa.telefono': 'Telefono:',
    'wa.email': 'Email:',
    'wa.pedido': 'ORDINE:',
    'wa.total': 'TOTALE:',
    'wa.fecha': 'Data:',
    'wa.footer': 'Ordine inviato dal catalogo web',
  },
  es: {
    'auth.tab.login': 'Ingresar',
    'auth.tab.register': 'Registrarse',
    'auth.label.email': 'Email',
    'auth.label.password': 'Contraseña',
    'auth.login.btn': 'Acceder al catálogo →',
    'auth.label.nombre': 'Nombre',
    'auth.label.razonsocial': 'Razón social',
    'auth.label.direccion': 'Dirección',
    'auth.label.ciudad': 'Ciudad',
    'auth.label.piva': 'Partita IVA',
    'auth.label.telefono': 'Teléfono',
    'auth.register.btn': 'Crear cuenta y acceder →',
    'auth.placeholder.email': 'tu@restaurante.it',
    'auth.placeholder.password': '••••••••',
    'auth.placeholder.nombre': 'Trattoria Da Mario',
    'auth.placeholder.razonsocial': 'Da Mario SRL',
    'auth.placeholder.direccion': 'Via Roma 45',
    'auth.placeholder.ciudad': 'Milano',
    'auth.placeholder.piva': 'IT12345678901',
    'auth.placeholder.telefono': '+39 02 123456',
    'auth.placeholder.password.reg': 'Mínimo 6 caracteres',
    'header.login': 'Iniciar sesión',
    'header.logout': 'Salir',
    'destacados.eyebrow': 'Selección curada',
    'destacados.title': 'Nuestros vinos destacados',
    'search.placeholder': 'Buscar vino, bodega...',
    'filter.all': 'Todos',
    'filter.tinto': 'Tintos',
    'filter.blanco': 'Blancos',
    'filter.rosado': 'Rosados',
    'filter.espumante': 'Espumantes',
    'filter.uva': 'Uva',
    'filter.region': 'Región',
    'filter.precio.min': '€ mín',
    'filter.precio.max': '€ máx',
    'filter.otros.paises': 'Otros países',
    'filter.bodega': 'Bodega',
    'catalog.loading': 'Cargando catálogo...',
    'catalog.empty.title': 'Sin resultados',
    'catalog.empty.body': 'Probá con otros filtros.',
    'catalog.error.title': 'Error al cargar',
    'catalog.error.body': 'No se pudo conectar con el catálogo. Intentá de nuevo.',
    'catalog.count': 'vinos',
    'cart.title': 'Tu pedido',
    'cart.button': 'Carrito',
    'cart.empty': 'Tu carrito está vacío',
    'cart.client.title': 'Datos del cliente',
    'cart.total': 'Total',
    'cart.send': "Enviar pedido a Via dell'Abbondanza",
    'cart.unidad': 'Unidad',
    'cart.caja': 'Caja',
    'confirm.title': '¡Pedido enviado!',
    'confirm.body': "Tu pedido fue enviado a Via dell'Abbondanza por WhatsApp. En breve recibirás confirmación con los detalles de entrega y factura.",
    'confirm.back': 'Volver al catálogo',
    'modal.add': 'Agregar al pedido',
    'modal.precio.unidad': 'botella',
    'modal.desde': 'Desde',
    'modal.capacidad': 'Formato',
    'modal.puntaje.unidad': 'puntos',
    'cart.caja.max': 'Caja completa',
    'cart.caja.disponible': 'Caja de',
    'verify.banner': 'Verificá tu email para poder confirmar pedidos.',
    'verify.resend': 'Reenviar email',
    'auth.err.campos': 'Completá todos los campos.',
    'auth.err.piva': 'La Partita IVA no es válida. Verificá los 11 dígitos.',
    'auth.err.password.corta': 'La contraseña debe tener al menos 6 caracteres.',
    'auth.err.email.usado': 'Este email ya está registrado.',
    'auth.err.email.invalido': 'El email no es válido.',
    'auth.err.generico.registro': 'Error al registrar. Intentá de nuevo.',
    'auth.err.credenciales': 'Email o contraseña incorrectos.',
    'auth.err.generico.login': 'Error al iniciar sesión. Intentá de nuevo.',
    'auth.err.sin.datos': 'No se encontraron los datos de tu cuenta. Contactanos.',
    'cart.err.vacio': 'Agregá vinos al carrito primero.',
    'wa.titulo': 'NUEVO PEDIDO',
    'wa.restaurante': 'Restaurante:',
    'wa.razonsocial': 'Razón social:',
    'wa.direccion': 'Dirección:',
    'wa.piva': 'P.IVA:',
    'wa.telefono': 'Teléfono:',
    'wa.email': 'Email:',
    'wa.pedido': 'PEDIDO:',
    'wa.total': 'TOTAL:',
    'wa.fecha': 'Fecha:',
    'wa.footer': 'Pedido enviado desde catálogo web',
  },
  en: {
    'auth.tab.login': 'Sign in',
    'auth.tab.register': 'Sign up',
    'auth.label.email': 'Email',
    'auth.label.password': 'Password',
    'auth.login.btn': 'Access catalog →',
    'auth.label.nombre': 'Name',
    'auth.label.razonsocial': 'Business name',
    'auth.label.direccion': 'Address',
    'auth.label.ciudad': 'City',
    'auth.label.piva': 'VAT number',
    'auth.label.telefono': 'Phone',
    'auth.register.btn': 'Create account →',
    'auth.placeholder.email': 'you@restaurant.it',
    'auth.placeholder.password': '••••••••',
    'auth.placeholder.nombre': 'Trattoria Da Mario',
    'auth.placeholder.razonsocial': 'Da Mario SRL',
    'auth.placeholder.direccion': 'Via Roma 45',
    'auth.placeholder.ciudad': 'Milan',
    'auth.placeholder.piva': 'IT12345678901',
    'auth.placeholder.telefono': '+39 02 123456',
    'auth.placeholder.password.reg': 'At least 6 characters',
    'header.login': 'Sign in',
    'header.logout': 'Log out',
    'destacados.eyebrow': 'Curated selection',
    'destacados.title': 'Our featured wines',
    'search.placeholder': 'Search wine, winery...',
    'filter.all': 'All',
    'filter.tinto': 'Reds',
    'filter.blanco': 'Whites',
    'filter.rosado': 'Rosés',
    'filter.espumante': 'Sparkling',
    'filter.uva': 'Grape',
    'filter.region': 'Region',
    'filter.precio.min': '€ min',
    'filter.precio.max': '€ max',
    'filter.otros.paises': 'Other countries',
    'filter.bodega': 'Winery',
    'catalog.loading': 'Loading catalog...',
    'catalog.empty.title': 'No results',
    'catalog.empty.body': 'Try other filters.',
    'catalog.error.title': 'Loading error',
    'catalog.error.body': 'Could not connect to the catalog. Try again.',
    'catalog.count': 'wines',
    'cart.title': 'Your order',
    'cart.button': 'Cart',
    'cart.empty': 'Your cart is empty',
    'cart.client.title': 'Customer details',
    'cart.total': 'Total',
    'cart.send': "Send order to Via dell'Abbondanza",
    'cart.unidad': 'Bottle',
    'cart.caja': 'Case',
    'confirm.title': 'Order sent!',
    'confirm.body': "Your order was sent to Via dell'Abbondanza via WhatsApp. You'll shortly receive confirmation with delivery and invoice details.",
    'confirm.back': 'Back to catalog',
    'modal.add': 'Add to order',
    'modal.precio.unidad': 'bottle',
    'modal.desde': 'Since',
    'modal.capacidad': 'Format',
    'modal.puntaje.unidad': 'points',
    'cart.caja.max': 'Full case',
    'cart.caja.disponible': 'Case of',
    'verify.banner': 'Verify your email to be able to confirm orders.',
    'verify.resend': 'Resend email',
    'auth.err.campos': 'Please fill in all fields.',
    'auth.err.piva': 'VAT number is not valid. Check the 11 digits.',
    'auth.err.password.corta': 'Password must be at least 6 characters.',
    'auth.err.email.usado': 'This email is already registered.',
    'auth.err.email.invalido': 'Email is not valid.',
    'auth.err.generico.registro': 'Error signing up. Try again.',
    'auth.err.credenciales': 'Incorrect email or password.',
    'auth.err.generico.login': 'Error signing in. Try again.',
    'auth.err.sin.datos': 'Account data not found. Contact us.',
    'cart.err.vacio': 'Add wines to the cart first.',
    'wa.titulo': 'NEW ORDER',
    'wa.restaurante': 'Restaurant:',
    'wa.razonsocial': 'Business name:',
    'wa.direccion': 'Address:',
    'wa.piva': 'VAT:',
    'wa.telefono': 'Phone:',
    'wa.email': 'Email:',
    'wa.pedido': 'ORDER:',
    'wa.total': 'TOTAL:',
    'wa.fecha': 'Date:',
    'wa.footer': 'Order sent from web catalog',
  }
};

let currentLang = localStorage.getItem('vda_lang') || 'it';

function t(key){
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || TRANSLATIONS['it'][key]
    || key;
}

function applyTranslations(){
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  updateLangSelectorUI();
}

function setLang(lang){
  currentLang = lang;
  localStorage.setItem('vda_lang', lang);
  applyTranslations();

  // Recargar partes dinámicas que ya se habían armado en el idioma viejo
  if(typeof filtered !== 'undefined' && typeof renderCatalog === 'function'){
    renderCatalog(filtered);
  }
  if(typeof renderDestacados === 'function'){
    renderDestacados();
  }
  if(typeof renderCartItems === 'function'){
    renderCartItems();
  }
  if(typeof updateHeaderAuthState === 'function'){
    updateHeaderAuthState();
  }
}

function updateLangSelectorUI(){
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function traducirPuntaje(textoOriginal){
  if(!textoOriginal) return '';
  const match = textoOriginal.match(/^(\d+)\s*punti\s+(.+)$/i);
  if(!match) return textoOriginal; // certificaciones/medallas: se dejan tal cual, en italiano
  const numero = match[1];
  const critico = match[2];
  return `${numero} ${t('modal.puntaje.unidad')} ${critico}`;
}