// bodegas.js
// Info de bodegas en 3 idiomas, integrado con el sistema i18n de i18n.js.
// Cada bodega tiene descripciones en it/es/en.
// El modal usa currentLang (definido en i18n.js) para mostrar el idioma correcto.

const BODEGAS_INFO = {
  "Catena Zapata": {
    it: "Fondata nel 1902 da Nicola Catena, immigrato italiano, è considerata la bodega simbolo dell'Argentina. Pioniera nel valorizzare il Malbec d'altura, i suoi vigneti si trovano fino a 1.500 metri sul livello del mare ai piedi delle Ande. Premiata come migliore cantina del mondo nel 2023.",
    es: "Fundada en 1902 por Nicola Catena, inmigrante italiano, es considerada la bodega símbolo de Argentina. Pionera en valorizar el Malbec de altura, sus viñedos se encuentran a hasta 1.500 metros sobre el nivel del mar al pie de los Andes. Premiada como mejor bodega del mundo en 2023.",
    en: "Founded in 1902 by Italian immigrant Nicola Catena, it is considered Argentina's most iconic winery. A pioneer in high-altitude Malbec, its vineyards reach up to 1,500 meters above sea level at the foot of the Andes. Named best winery in the world in 2023.",
    region: "Mendoza",
    fundacion: "1902"
  },
  "Catena": {
    it: "Linea di vini della famiglia Catena Zapata, tra le più celebrate d'Argentina. Esprime il meglio del terroir mendocino con varietali come Malbec e Chardonnay d'alta quota.",
    es: "Línea de vinos de la familia Catena Zapata, entre las más celebradas de Argentina. Expresa lo mejor del terroir mendocino con varietales como Malbec y Chardonnay de altura.",
    en: "Wine range from the Catena Zapata family, among Argentina's most celebrated. It expresses the best of Mendoza's terroir with varietals like high-altitude Malbec and Chardonnay.",
    region: "Mendoza",
    fundacion: "1902"
  },
  "Zuccardi": {
    it: "Fondata nel 1963 dall'ingegnere Alberto Zuccardi, è stata nominata per quattro volte migliore cantina del mondo (2019-2022). I suoi vigneti nel Paraje Altamira, Valle de Uco, producono vini di montagna con identità unica e tre etichette premiate con 100 punti Parker.",
    es: "Fundada en 1963 por el ingeniero Alberto Zuccardi, fue nombrada cuatro veces mejor bodega del mundo (2019-2022). Sus viñedos en Paraje Altamira, Valle de Uco, producen vinos de montaña con identidad única y tres etiquetas premiadas con 100 puntos Parker.",
    en: "Founded in 1963 by engineer Alberto Zuccardi, named best winery in the world four times (2019-2022). Its vineyards in Paraje Altamira, Valle de Uco, produce mountain wines with unique identity and three labels awarded 100 Parker points.",
    region: "Valle de Uco, Mendoza",
    fundacion: "1963"
  },
  "Achaval-Ferrer": {
    it: "Boutique winery fondata nel 1998 a Mendoza, celebre per i suoi Malbec di singolo vigneto provenienti dai Parajes Altamira, Perdriel e Mirador. I suoi vini sono considerati tra le espressioni più pure e territoriali del Malbec argentino.",
    es: "Bodega boutique fundada en 1998 en Mendoza, célebre por sus Malbec de viñedo único provenientes de los Parajes Altamira, Perdriel y Mirador. Sus vinos son considerados entre las expresiones más puras del Malbec argentino.",
    en: "Boutique winery founded in 1998 in Mendoza, renowned for its single-vineyard Malbecs from Parajes Altamira, Perdriel and Mirador. Its wines are considered among the purest expressions of Argentine Malbec.",
    region: "Mendoza",
    fundacion: "1998"
  },
  "El Enemigo": {
    it: "Progetto di Adrianna Catena e del rinomato enologo Alejandro Vigil. Vini di carattere intenso e ricercato, espressione della visione moderna del vino argentino. Il suo Cabernet Franc è considerato uno dei migliori del paese.",
    es: "Proyecto de Adrianna Catena y del reconocido enólogo Alejandro Vigil. Vinos de carácter intenso y buscado, expresión de la visión moderna del vino argentino. Su Cabernet Franc es considerado uno de los mejores del país.",
    en: "Project by Adrianna Catena and renowned winemaker Alejandro Vigil. Wines of intense and refined character, expressing a modern vision of Argentine wine. Its Cabernet Franc is considered one of the country's finest.",
    region: "Mendoza",
    fundacion: "2009"
  },
  "Luigi Bosca": {
    it: "Una delle cantine storiche di Mendoza, fondata nel 1901 dalla famiglia Arizu. Oltre un secolo di tradizione vitivinicola che produce vini eleganti e strutturati dai vigneti di Luján de Cuyo.",
    es: "Una de las bodegas históricas de Mendoza, fundada en 1901 por la familia Arizu. Más de un siglo de tradición vitivinícola que produce vinos elegantes y estructurados de los viñedos de Luján de Cuyo.",
    en: "One of Mendoza's historic wineries, founded in 1901 by the Arizu family. Over a century of winemaking tradition producing elegant, structured wines from Luján de Cuyo vineyards.",
    region: "Luján de Cuyo, Mendoza",
    fundacion: "1901"
  },
  "Rutini": {
    it: "Bodega fondata da Philippo Rutini, emigrato italiano arrivato in Argentina nel 1885. Con oltre 130 anni di storia, produce vini di grande eleganza dal Valle de Uco, mantenendo viva la tradizione familiare italiana.",
    es: "Bodega fundada por Philippo Rutini, emigrante italiano llegado a Argentina en 1885. Con más de 130 años de historia, produce vinos de gran elegancia del Valle de Uco, manteniendo viva la tradición familiar italiana.",
    en: "Winery founded by Philippo Rutini, an Italian immigrant who arrived in Argentina in 1885. With over 130 years of history, it produces wines of great elegance from Valle de Uco, keeping the Italian family tradition alive.",
    region: "Tupungato, Valle de Uco",
    fundacion: "1885"
  },
  "Colomé": {
    it: "Una delle cantine più antiche d'Argentina, con vigneti risalenti al 1831 nella Valle Calchaquí, Salta. A 2.300 metri di altitudine produce vini di straordinaria concentrazione e mineralità. Proprietà della famiglia svizzera Hess.",
    es: "Una de las bodegas más antiguas de Argentina, con viñedos que datan de 1831 en el Valle Calchaquí, Salta. A 2.300 metros de altitud produce vinos de extraordinaria concentración y mineralidad. Propiedad de la familia suiza Hess.",
    en: "One of Argentina's oldest wineries, with vineyards dating back to 1831 in the Calchaquí Valley, Salta. At 2,300 meters altitude it produces wines of extraordinary concentration and minerality. Owned by the Swiss Hess family.",
    region: "Valles Calchaquíes, Salta",
    fundacion: "1831"
  },
  "Bodega Garzón": {
    it: "La cantina di riferimento dell'Uruguay, situata a Garzón, Maldonado. Con vigneti oceanici a pochi chilometri dall'Atlantico, produce Tannat e Albariño di classe mondiale. Nominata migliore cantina del Sud America.",
    es: "La bodega de referencia de Uruguay, situada en Garzón, Maldonado. Con viñedos oceánicos a pocos kilómetros del Atlántico, produce Tannat y Albariño de clase mundial. Nominada mejor bodega de Sudamérica.",
    en: "Uruguay's reference winery, located in Garzón, Maldonado. With oceanic vineyards just kilometres from the Atlantic, it produces world-class Tannat and Albariño. Named best winery in South America.",
    region: "Maldonado, Uruguay",
    fundacion: "2011"
  },
  "Otronia": {
    it: "Cantina pioniera della Patagonia argentina, nei pressi di Sarmiento, Chubut, a 45 gradi di latitudine sud. I vigneti più australi del mondo producono vini bianchi di straordinaria freschezza e Pinot Noir di carattere unico.",
    es: "Bodega pionera de la Patagonia argentina, cerca de Sarmiento, Chubut, a 45 grados de latitud sur. Los viñedos más australes del mundo producen vinos blancos de extraordinaria frescura y Pinot Noir de carácter único.",
    en: "Pioneer winery in Argentine Patagonia, near Sarmiento, Chubut, at 45 degrees south latitude. The world's southernmost vineyards produce white wines of extraordinary freshness and uniquely characterful Pinot Noir.",
    region: "Patagonia, Chubut",
    fundacion: "2001"
  },
  "Humberto Canale": {
    it: "La cantina più antica della Patagonia argentina, fondata nel 1909 sulle rive del Rio Negro. Da oltre un secolo produce vini che esprimono il carattere unico del clima patagonico, con le sue escursioni termiche estreme.",
    es: "La bodega más antigua de la Patagonia argentina, fundada en 1909 a orillas del Río Negro. Desde hace más de un siglo produce vinos que expresan el carácter único del clima patagónico, con sus extremas amplitudes térmicas.",
    en: "The oldest winery in Argentine Patagonia, founded in 1909 on the banks of the Río Negro. For over a century it has produced wines that express the unique character of the Patagonian climate, with its extreme temperature variations.",
    region: "Rio Negro, Patagonia",
    fundacion: "1909"
  },
  "Manos Negras": {
    it: "Cantina artigianale del Valle de Uco, fondata con la filosofia di creare vini autentici con minima intervención. Le sue etichette esprimono i diversi terroir del Valle de Uco con uno stile moderno e ricercato.",
    es: "Bodega artesanal del Valle de Uco, fundada con la filosofía de crear vinos auténticos con mínima intervención. Sus etiquetas expresan los distintos terroirs del Valle de Uco con un estilo moderno y buscado.",
    en: "Artisan winery in Valle de Uco, founded on the philosophy of creating authentic wines with minimal intervention. Its labels express the diverse terroirs of Valle de Uco with a modern, refined style.",
    region: "Valle de Uco, Mendoza",
    fundacion: "2005"
  },
  "Alamos": {
    it: "Brand accessibile della famiglia Catena, che porta l'eccellenza mendocina a un pubblico più ampio. I vini Alamos esprimono la qualità del terroir di Mendoza con un ottimo rapporto qualità-prezzo.",
    es: "Marca accesible de la familia Catena, que lleva la excelencia mendocina a un público más amplio. Los vinos Alamos expresan la calidad del terroir de Mendoza con una excelente relación calidad-precio.",
    en: "The accessible range from the Catena family, bringing Mendoza excellence to a wider audience. Alamos wines express the quality of Mendoza's terroir with outstanding value for money.",
    region: "Mendoza",
    fundacion: "1994"
  },
  "Argento": {
    it: "Cantina fondata con l'obiettivo di portare il Malbec argentino in tutto il mondo. Produce vini organici certificati con uve provenienti dai vigneti di Mendoza, con un forte impegno per la sostenibilità ambientale.",
    es: "Bodega fundada con el objetivo de llevar el Malbec argentino a todo el mundo. Produce vinos orgánicos certificados con uvas provenientes de los viñedos de Mendoza, con un fuerte compromiso con la sostenibilidad ambiental.",
    en: "Winery founded with the goal of bringing Argentine Malbec to the world. Produces certified organic wines from Mendoza's vineyards, with a strong commitment to environmental sustainability.",
    region: "Mendoza",
    fundacion: "1999"
  },
  "Bianchi": {
    it: "Storica cantina di San Rafael, Mendoza, fondata nel 1928. Conosciuta per i suoi vini classici e per il rinomato Don Valentin Lacrado, uno dei Malbec più celebri d'Argentina.",
    es: "Histórica bodega de San Rafael, Mendoza, fundada en 1928. Conocida por sus vinos clásicos y por el renombrado Don Valentín Lacrado, uno de los Malbec más célebres de Argentina.",
    en: "Historic winery from San Rafael, Mendoza, founded in 1928. Known for its classic wines and the renowned Don Valentín Lacrado, one of Argentina's most celebrated Malbecs.",
    region: "San Rafael, Mendoza",
    fundacion: "1928"
  },
  "Bouza": {
    it: "Cantina boutique uruguayana fondata dalla famiglia Bouza, di origine basca. Situata vicino a Montevideo, produce Tannat, Tempranillo e Marselan di grande carattere in un ambiente artigianale e familiare.",
    es: "Bodega boutique uruguaya fundada por la familia Bouza, de origen vasco. Situada cerca de Montevideo, produce Tannat, Tempranillo y Marselan de gran carácter en un ambiente artesanal y familiar.",
    en: "Uruguayan boutique winery founded by the Basque-origin Bouza family. Located near Montevideo, it produces characterful Tannat, Tempranillo and Marselan in an artisanal, family environment.",
    region: "Montevideo, Uruguay",
    fundacion: "1999"
  },
  "Michel Rolland": {
    it: "Il leggendario enologo bordolese Michel Rolland ha scelto il Valle de Uco per creare vini di altissimo livello. I suoi vini argentini combinano il savoir-faire europeo con la potenza del terroir andino.",
    es: "El legendario enólogo bordelés Michel Rolland eligió el Valle de Uco para crear vinos de altísimo nivel. Sus vinos argentinos combinan el savoir-faire europeo con la potencia del terroir andino.",
    en: "Legendary Bordeaux winemaker Michel Rolland chose Valle de Uco to create top-quality wines. His Argentine wines combine European savoir-faire with the power of the Andean terroir.",
    region: "Valle de Uco, Mendoza",
    fundacion: "2000"
  },
  "Domingo Molina": {
    it: "Piccola cantina artigianale nella Valle di Cafayate, Salta. Produce Torrontés e Malbec di alta quota che esprimono l'identità unica delle valli calchaquí, a oltre 1.700 metri di altitudine.",
    es: "Pequeña bodega artesanal en el Valle de Cafayate, Salta. Produce Torrontés y Malbec de altura que expresan la identidad única de los valles calchaquíes, a más de 1.700 metros de altitud.",
    en: "Small artisan winery in the Cafayate Valley, Salta. Produces high-altitude Torrontés and Malbec that express the unique identity of the Calchaquí valleys, over 1,700 metres above sea level.",
    region: "Valle de Cafayate, Salta",
    fundacion: "2005"
  },
  "Bodega del Fin del Mundo": {
    it: "Cantina pioniera della Patagonia argentina, fondata nel 1999 a San Patricio del Chañar, Neuquén. Con 870 ettari di vigneti irrigati dalle acque del fiume Neuquén, produce Malbec, Pinot Noir e Cabernet Sauvignon con la consulenza di Michel Rolland.",
    es: "Bodega pionera de la Patagonia argentina, fundada en 1999 en San Patricio del Chañar, Neuquén. Con 870 hectáreas de viñedos irrigados con aguas del río Neuquén, produce Malbec, Pinot Noir y Cabernet Sauvignon con la consultoría de Michel Rolland.",
    en: "Pioneer winery of Argentine Patagonia, founded in 1999 in San Patricio del Chañar, Neuquén. With 870 hectares of vineyards irrigated by the Neuquén River, produces Malbec, Pinot Noir and Cabernet Sauvignon with Michel Rolland as consultant.",
    region: "San Patricio del Chañar, Neuquén",
    fundacion: "1999"
  },
  "Arca Yaco": {
    it: "Bodega boutique fondata da Matías Etchart, nipote del pioniere vitivinicolo salteño Arnaldo Etchart. Situata nella Quebrada de San Lucas a 2.100 metri sul livello del mare, produce Malbec e Torrontés in pie franco di straordinaria espressione territoriale.",
    es: "Bodega boutique fundada por Matías Etchart, nieto del pionero vitivinícola salteño Arnaldo Etchart. Situada en la Quebrada de San Lucas a 2.100 metros sobre el nivel del mar, produce Malbec y Torrontés en pie franco de extraordinaria expresión territorial.",
    en: "Boutique winery founded by Matías Etchart, grandson of Salta wine pioneer Arnaldo Etchart. Located in Quebrada de San Lucas at 2,100 metres above sea level, produces ungrafted Malbec and Torrontés of extraordinary territorial expression.",
    region: "Quebrada de San Lucas, Salta",
    fundacion: "2010"
  },
  "Mario Alberto Kempes": {
    it: "Vino firmato dal leggendario calciatore argentino Mario Alberto Kempes, icona del Mondiale 1978. Elaborato con uve Malbec della Patagonia, è un omaggio al carattere e al carisma del grande campione.",
    es: "Vino firmado por el legendario futbolista argentino Mario Alberto Kempes, ícono del Mundial 1978. Elaborado con uvas Malbec de la Patagonia, es un homenaje al carácter y carisma del gran campeón.",
    en: "Wine signed by legendary Argentine footballer Mario Alberto Kempes, icon of the 1978 World Cup. Made with Patagonian Malbec grapes, it is a tribute to the great champion's character and charisma.",
    region: "Mendoza",
    fundacion: "2015"
  },
  "Javier Zanetti": {
    it: "Vino firmato da Javier Zanetti, storico capitano dell'Inter. Elaborato con la Bodega Humberto Canale in Patagonia, il ricavato sostiene la Fundación PUPI per i bambini meno fortunati.",
    es: "Vino firmado por Javier Zanetti, histórico capitán del Inter. Elaborado con la Bodega Humberto Canale en Patagonia, los ingresos apoyan a la Fundación PUPI para niños en situación vulnerable.",
    en: "Wine signed by Javier Zanetti, legendary Inter captain. Made with Bodega Humberto Canale in Patagonia, proceeds support the PUPI Foundation for vulnerable children.",
    region: "Rio Negro, Patagonia",
    fundacion: "2022"
  },
  "Malma": {
    it: "Cantina patagonina della provincia di Neuquén, il cui nome in lingua mapuche significa 'orgoglio'. Produce Malbec e Pinot Noir che esprimono l'identità unica del terroir desertico della Patagonia settentrionale.",
    es: "Bodega patagónica de la provincia de Neuquén, cuyo nombre en lengua mapuche significa 'orgullo'. Produce Malbec y Pinot Noir que expresan la identidad única del terroir desértico de la Patagonia norte.",
    en: "Patagonian winery from Neuquén province, whose name means 'pride' in Mapuche. Produces Malbec and Pinot Noir expressing the unique identity of the northern Patagonian desert terroir.",
    region: "Neuquén, Patagonia",
    fundacion: "2000"
  },
  "Bodegas Carrau": {
    it: "Una delle più storiche famiglie vitivinicole dell'Uruguay, con radici catalane risalenti al 1752. Con vigneti a Rivera e Cerro Chapeu nel nord dell'Uruguay, produce vini di grande personalità territoriale.",
    es: "Una de las familias vitivinícolas más históricas de Uruguay, con raíces catalanas que se remontan a 1752. Con viñedos en Rivera y Cerro Chapeu, produce vinos de gran personalidad territorial.",
    en: "One of Uruguay's most historic wine families, with Catalan roots dating back to 1752. With vineyards in Rivera and Cerro Chapeu, produces wines of great territorial personality.",
    region: "Rivera y Cerro Chapeu, Uruguay",
    fundacion: "1752"
  },
  "Viña Vik": {
    it: "Progetto vitivinicolo d'eccezione nel Valle de Cachapoal, Cile, fondato dall'imprenditore norvegese Alexander Vik. Con architettura premiata e vigneti in un paesaggio mozzafiato, produce uno dei vini più esclusivi del Sud America.",
    es: "Proyecto vitivinícola de excepción en el Valle de Cachapoal, Chile, fundado por el empresario noruego Alexander Vik. Con arquitectura premiada y viñedos en un paisaje impresionante, produce uno de los vinos más exclusivos de Sudamérica.",
    en: "Exceptional wine project in Chile's Cachapoal Valley, founded by Norwegian entrepreneur Alexander Vik. With award-winning architecture and breathtaking vineyards, produces one of South America's most exclusive wines.",
    region: "Valle de Cachapoal, Chile",
    fundacion: "2006"
  },
  "Erasmo Organic Winery": {
    it: "Cantina organica cilena nel Valle Central, dedicata a vini naturali e sostenibili senza pesticidi né erbicidi. Rispetta i cicli naturali della terra per produrre vini di grande purezza e carattere.",
    es: "Bodega orgánica chilena en el Valle Central, dedicada a vinos naturales y sustentables sin pesticidas ni herbicidas. Respeta los ciclos naturales de la tierra para producir vinos de gran pureza y carácter.",
    en: "Chilean organic winery in the Central Valley, dedicated to natural and sustainable wines without pesticides or herbicides. Respects the natural cycles of the land to produce wines of great purity and character.",
    region: "Valle Central, Chile",
    fundacion: "2005"
  },
  "Inculto": {
    it: "Piccola cantina artigianale dei Valles Calchaquíes, Salta. Il nome evoca terreni incontaminati dove le uve crescono in modo selvaggio e autentico ad alta quota.",
    es: "Pequeña bodega artesanal de los Valles Calchaquíes, Salta. El nombre evoca terrenos no cultivados artificialmente donde las uvas crecen de manera salvaje y auténtica en altura.",
    en: "Small artisan winery in the Calchaquí Valleys, Salta. The name evokes uncultivated land where grapes grow wild and authentic at high altitude.",
    region: "Valles Calchaquíes, Salta",
    fundacion: "2010"
  },
  "Riglos": {
    it: "Cantina boutique del Valle de Uco, Mendoza, che prende il nome dalle iconiche formazioni rocciose de Los Riglos. Produce Malbec e Cabernet Franc di grande eleganza da vigneti ad alta altitudine.",
    es: "Bodega boutique del Valle de Uco, Mendoza, que toma su nombre de las icónicas formaciones rocosas de Los Riglos. Produce Malbec y Cabernet Franc de gran elegancia desde viñedos de alta altitud.",
    en: "Boutique winery from Valle de Uco, Mendoza, named after the iconic Los Riglos rock formations. Produces elegant high-altitude Malbec and Cabernet Franc.",
    region: "Valle de Uco, Mendoza",
    fundacion: "2000"
  },
  "Bira Wines": {
    it: "Progetto vitivinicolo artigianale del Valle de Uco con approccio minimalista. Lavora con piccoli lotti di uve selezionate per produrre vini che rispecchiano fedelmente il terroir mendocino.",
    es: "Proyecto vitivinícola artesanal del Valle de Uco con enfoque minimalista. Trabaja con pequeños lotes de uvas seleccionadas para producir vinos que reflejan fielmente el terroir mendocino.",
    en: "Artisan wine project from Valle de Uco with a minimalist approach. Works with small lots of selected grapes to faithfully reflect the Mendoza terroir.",
    region: "Valle de Uco, Mendoza",
    fundacion: "2008"
  },
  "Avinea": {
    it: "Cantina mendocina che elabora vini espressivi da vigneti selezionati. Un progetto moderno che coniuga tradizione argentina e tecniche contemporanee di vinificazione.",
    es: "Bodega mendocina que elabora vinos expresivos de viñedos seleccionados. Un proyecto moderno que combina tradición argentina y técnicas contemporáneas de vinificación.",
    en: "Mendoza winery producing expressive wines from selected vineyards. A modern project combining Argentine tradition with contemporary winemaking techniques.",
    region: "Mendoza",
    fundacion: "2005"
  },
  "Noemía": {
    it: "Cantina boutique leggendaria di Patagonia, fondata dalla Contessa Noemí Cinzano. Con soli 1,5 ettari di Malbec pre-fillosserica nel Rio Negro, produce uno dei vini più ricercati d'Argentina.",
    es: "Bodega boutique legendaria de Patagonia, fundada por la Condesa Noemí Cinzano. Con solo 1,5 hectáreas de Malbec pre-filoxérico en Río Negro, produce uno de los vinos más codiciados de Argentina.",
    en: "Legendary Patagonian boutique winery founded by Countess Noemí Cinzano. With just 1.5 hectares of pre-phylloxera Malbec in Río Negro, produces one of Argentina's most sought-after wines.",
    region: "Rio Negro, Patagonia",
    fundacion: "2001"
  }
};

function getBodegaInfo(bodegaNombre) {
  const info = BODEGAS_INFO[bodegaNombre];
  if (!info) return null;
  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'it';
  return {
    descripcion: info[lang] || info['it'],
    region: info.region,
    fundacion: info.fundacion
  };
}