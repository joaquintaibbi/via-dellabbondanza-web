// bodegas.js
// Descripciones de bodegas para mostrar en el modal del vino.
// Las descripciones están en italiano para el público objetivo.

const BODEGAS_INFO = {
  "Catena Zapata": {
    descripcion: "Fondata nel 1902 da Nicola Catena, immigrato italiano, è considerata la bodega simbolo dell'Argentina. Pioniera nel valorizzare il Malbec d'altura, i suoi vigneti si trovano fino a 1.500 metri sul livello del mare ai piedi delle Ande. Premiata come migliore cantina del mondo nel 2023.",
    region: "Mendoza",
    fundacion: "1902"
  },
  "Catena": {
    descripcion: "Linea di vini della famiglia Catena Zapata, tra le più celebrate d'Argentina. Esprime il meglio del terroir mendocino con varietali come Malbec e Chardonnay d'alta quota.",
    region: "Mendoza",
    fundacion: "1902"
  },
  "Zuccardi": {
    descripcion: "Fondata nel 1963 dall'ingegnere Alberto Zuccardi, è stata nominata per quattro volte migliore cantina del mondo (2019-2022). I suoi vigneti nel Paraje Altamira, Valle de Uco, producono vini di montagna con identità unica e tre etichette premiate con 100 punti Parker.",
    region: "Valle de Uco, Mendoza",
    fundacion: "1963"
  },
  "Achaval-Ferrer": {
    descripcion: "Boutique winery fondata nel 1998 a Mendoza, celebre per i suoi Malbec di singolo vigneto provenienti dai Parajes Altamira, Perdriel e Mirador. I suoi vini sono considerati tra le espressioni più pure e territoriali del Malbec argentino.",
    region: "Mendoza",
    fundacion: "1998"
  },
  "El Enemigo": {
    descripcion: "Progetto di Adrianna Catena e del rinomato enologo Alejandro Vigil. Vini di carattere intenso e ricercato, espressione della visione moderna del vino argentino. Il suo Cabernet Franc è considerato uno dei migliori del paese.",
    region: "Mendoza",
    fundacion: "2009"
  },
  "Luigi Bosca": {
    descripcion: "Una delle cantine storiche di Mendoza, fondata nel 1901 dalla famiglia Arizu. Oltre un secolo di tradizione vitivinicola che produce vini eleganti e strutturati dai vigneti di Luján de Cuyo.",
    region: "Luján de Cuyo, Mendoza",
    fundacion: "1901"
  },
  "Rutini": {
    descripcion: "Bodega fondata da Philippo Rutini, emigrato italiano arrivato in Argentina nel 1885. Con oltre 130 anni di storia, produce vini di grande eleganza dal Valle de Uco, mantenendo viva la tradizione familiare italiana.",
    region: "Tupungato, Valle de Uco",
    fundacion: "1885"
  },
  "Colomé": {
    descripcion: "Una delle cantine più antiche d'Argentina, con vigneti risalenti al 1831 nella Valle Calchaquí, Salta. A 2.300 metri di altitudine produce vini di straordinaria concentrazione e mineralità. Proprietà della famiglia svizzera Hess.",
    region: "Valles Calchaquíes, Salta",
    fundacion: "1831"
  },
  "Bodega Garzón": {
    descripcion: "La cantina di riferimento dell'Uruguay, situata a Garzón, Maldonado. Con vigneti oceanici a pochi chilometri dall'Atlantico, produce Tannat e Albariño di classe mondiale. Nominata migliore cantina del Sud America.",
    region: "Maldonado, Uruguay",
    fundacion: "2011"
  },
  "Otronia": {
    descripcion: "Cantina pioniera della Patagonia argentina, nei pressi di Sarmiento, Chubut, a 45 gradi di latitudine sud. I vigneti più australi del mondo producono vini bianchi di straordinaria freschezza e Pinot Noir di carattere unico.",
    region: "Patagonia, Chubut",
    fundacion: "2001"
  },
  "Humberto Canale": {
    descripcion: "La cantina più antica della Patagonia argentina, fondata nel 1909 sulle rive del Rio Negro. Da oltre un secolo produce vini che esprimono il carattere unico del clima patagonico, con le sue escursioni termiche estreme.",
    region: "Rio Negro, Patagonia",
    fundacion: "1909"
  },
  "Manos Negras": {
    descripcion: "Cantina artigianale del Valle de Uco, fondata con la filosofia di creare vini autentici con minima intervención. Le sue etichette esprimono i diversi terroir del Valle de Uco con uno stile moderno e ricercato.",
    region: "Valle de Uco, Mendoza",
    fundacion: "2005"
  },
  "Alamos": {
    descripcion: "Brand accessibile della famiglia Catena, che porta l'eccellenza mendocina a un pubblico più ampio. I vini Alamos esprimono la qualità del terroir di Mendoza con un ottimo rapporto qualità-prezzo.",
    region: "Mendoza",
    fundacion: "1994"
  },
  "Argento": {
    descripcion: "Cantina fondata con l'obiettivo di portare il Malbec argentino in tutto il mondo. Produce vini organici certificati con uve provenienti dai vigneti di Mendoza, con un forte impegno per la sostenibilità ambientale.",
    region: "Mendoza",
    fundacion: "1999"
  },
  "Bianchi": {
    descripcion: "Storica cantina di San Rafael, Mendoza, fondata nel 1928. Conosciuta per i suoi vini classici e per il rinomato Don Valentin Lacrado, uno dei Malbec più celebri d'Argentina.",
    region: "San Rafael, Mendoza",
    fundacion: "1928"
  },
  "Bouza": {
    descripcion: "Cantina boutique uruguayana fondata dalla famiglia Bouza, di origine basca. Situata vicino a Montevideo, produce Tannat, Tempranillo e Marselan di grande carattere in un ambiente artigianale e familiare.",
    region: "Montevideo, Uruguay",
    fundacion: "1999"
  },
  "Michel Rolland": {
    descripcion: "Il leggendario enologo bordolese Michel Rolland ha scelto il Valle de Uco per creare vini di altissimo livello. I suoi vini argentini combinano il savoir-faire europeo con la potenza del terroir andino.",
    region: "Valle de Uco, Mendoza",
    fundacion: "2000"
  },
  "Domingo Molina": {
    descripcion: "Piccola cantina artigianale nella Valle di Cafayate, Salta. Produce Torrontés e Malbec di alta quota che esprimono l'identità unica delle valli calchaquí, a oltre 1.700 metri di altitudine.",
    region: "Valle de Cafayate, Salta",
    fundacion: "2005"
  }
};