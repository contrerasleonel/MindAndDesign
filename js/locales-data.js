// ====================================================================
// MIND & DESIGN — LOCALES DEFINITIVOS (12 LOCALES)
// Respeta EXACTAMENTE posiciones, pisos y mapPosition originales
// ====================================================================

const localsData = [
  // ================================================================
  // 1. (posición original)
  // ================================================================
  {
    id: 1,
    name: "Tay Shop",
    category: "Decoración", // ← La categoría más cercana
    image: "img/localtaylor/imagenLocalTaylor.jpg",
    gallery: [
      "img/localtaylor/imagenLocalTaylor.jpg",
      "img/localtaylor/imagenLocalTaylor2.jpg",
      "img/localtaylor/imagenLocalTaylor3.jpg",
    ],
    description:
      "La tienda oficial para transformar tu espacio con el estilo de Taylor Swift. Especialistas en stickers duraderos y prints digitales inspirados en sus álbumes, eras y diseños icónicos.",
    longDescription:
      "Tay Shop es un espacio creado para fans que buscan diseño de calidad inspirado en Taylor Swift. Aquí vas a encontrar stickers resistentes y prints digitales que homenajean cada era: desde el estilo cottagecore de folklore hasta la vibra pop y colorida de Lover. Todos los diseños están pensados con detalle, impresos en alta calidad y creados para darle vida a tus objetos, cuadernos, paredes o cualquier rincón. Navegá por nuestras categorías y encontrá el diseño perfecto para personalizar tu día a día con un toque de magia swiftie.",
    hours: "Lun-Dom: 10:00 - 20:00",
    location: "Local 101 - Primer Piso",
    isActive: true,
    floor: 1, // ← 1 o 2
    mapPosition: { x: 30, y: 15 }, // ← ajustá según dónde lo quieras en el mapa
    website: "https://seekerott.github.io/proyecto-personal/",
    contact: {
      instagram: "@tay-shop",
    },
  },

  {
    id: 2,
    name: "Op Art Studio",
    category: "Decoración",
    image: "img/localOpArt/imagenOpArt.jpg",
    gallery: [
      "img/localOpArt/imagenOpArt.jpg",
      "img/localOpArt/imagenOpArt2.jpg",
      "img/localOpArt/imagenOpArt3.jpg",
    ],
    description:
      "Objetos de diseño, cerámicas y muebles que combinan formas modernas con colores suaves.",
    longDescription:
      "Op Art Studio ofrece piezas decorativas, cerámicas y muebles pensados para transformar espacios cotidianos en ambientes visualmente atractivos y únicos. Su estilo combina líneas modernas con una paleta suave, logrando un equilibrio entre funcionalidad y estética.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 205 - Segundo Piso", // si querés cambiar ubicación, decime
    isActive: true,
    floor: 2,
    mapPosition: { x: 58, y: 15 }, // si tenés coordenadas reales, pasámelas
    website: "https://piaggg.github.io/Trabajo-Practico-Obligatorio/index.html",
    contact: {
      instagram: null,
    },
  },

  {
    id: 3,
    name: "Sofía Sarkany",
    category: "Moda",
    image: "img/localSofiaSarkany/imagenLocalSofia.png",
    gallery: [
      "img/localSofiaSarkany/imagenLocalSofia2.png",
      "img/localSofiaSarkany/imagenLocalSofia3.png",
      "img/localSofiaSarkany/imagenLocalSofia4.png",
    ],
    description:
      "Moda moderna, femenina y vanguardista con el estilo característico de Sofía Sarkany.",
    longDescription:
      "La tienda oficial diseñada para vivir la esencia moderna, femenina y vanguardista de Sofía Sarkany. Nuestro espacio reúne las piezas más icónicas de la marca: desde el denim con sello propio hasta looks nocturnos llenos de actitud, pasando por básicos renovados y accesorios que realzan cada outfit. Inspirada en la estética minimalista y elegante de sus colecciones, la tienda ofrece una experiencia visual cuidada, con líneas limpias, tonos neutros y detalles en rosa pálido que acompañan el universo de la marca. Cada prenda y cada categoría están seleccionadas para expresar creatividad, movimiento y autenticidad. Viví la moda a través de Sarkany y encontrá prendas que acompañen tu ritmo, tu personalidad y tu día a día.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 150 - Primer Piso",
    isActive: true,
    floor: 1,
    mapPosition: { x: 30, y: 58 },
    website: "https://martinasalvia.github.io/Local-Comercial/",
    contact: {
      instagram: "@sofiasarkany",
    },
  },

  {
    id: 4,
    name: "LUMEN",
    category: "Iluminación",
    image: "img/localLumen/imagenLocalLumen.jpg", // cambiá si tu archivo principal tiene otro nombre
    gallery: [
      "img/localLumen/imagenLocalLumen.jpg",
      "img/localLumen/imagenLocalLumen2.png",
      "img/localLumen/imagenLocalLumen3.png",
    ],
    description:
      "Iluminación moderna y cálida inspirada en el diseño minimalista y materiales naturales.",
    longDescription:
      "LUMEN propone una iluminación contemporánea con identidad propia: líneas limpias, luz cálida y materiales naturales que crean ambientes equilibrados y visualmente agradables. Su estilo Neo-Nature combina lo moderno con lo orgánico para lograr espacios confortables, simples y armónicos. Cada pieza está pensada para acompañar hogares actuales, aportando una estética serena y un diseño funcional.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 125 - Primer Piso", // cambiá si corresponde
    isActive: true,
    floor: 1,
    mapPosition: { x: 58, y: 30 },
    website: "https://contrerasleonel.github.io/LUMEN/inspiracion.html",
    contact: {
      phone: "+54 11 5555-1234",
      email: "info@lumen.com.ar",
    },
  },

  {
    id: 5,
    name: "ROSES",
    category: "Moda",
    image: "img/localRoses/imagenLocalRoses.png",
    gallery: [
      "img/localRoses/imagenLocalRoses.png",
      "img/localRoses/imagenLocalRoses2.png",
      "img/localRoses/imagenLocalRoses3.png",
      "img/localRoses/imagenLocalRoses4.png",
    ],
    description:
      "Moda natural, moderna y auténtica, con estilo propio y sin exageraciones.",
    longDescription:
      "ROSÉS es ese espacio donde la moda se siente natural, auténtica y un poco más tuya. La tienda está pensada para que entres y conectes al instante: fotos limpias, prendas al frente y un mood moderno que no necesita exagerar para destacar. Todo fluye fácil, ordenado y con un estilo que se nota sin querer llamar la atención.\n\nAquí encontrás desde básicos que siempre salvan hasta piezas que elevan cualquier look sin perder comodidad. El diseño del espacio acompaña ese mismo espíritu: tonos suaves, líneas simples y una vibra ligera que deja que la ropa hable por vos.\n\nEn ROSÉS no se trata solo de comprar ropa, sino de encontrar esas prendas que encajan con tu energía, tu ritmo y tu forma de vivir el día. Es moda con frescura, con calma y con personalidad. Como vos.",
    hours: "Lun-Sáb: 10:00 - 20:00",
    location: "Local 212 - Segundo Piso", 
    isActive: true,
    floor: 2,
    mapPosition: { x: 30, y: 30 },
    website: "https://romontello.github.io/rosesfinal/",
    contact: {
      instagram: "@roses.shop",
    },
  },
  // ================================================================
  {
    id: 6,
    name: "Luna Studio",
    category: "Moda",
    image: "img/imagenesLocales/localModa.jpg",
    gallery: [
      "img/imagenesLocales/localModa2.jpg",
      "img/imagenesLocales/localModa3.jpg",
    ],
    description: "Moda suave inspirada en telas etéreas y tonos neutros.",
    longDescription:
      "Luna Studio reinterpreta la moda femenina con prendas delicadas y una estética ligera que transmite frescura y naturalidad.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 115 - Primer Piso",
    isActive: true,
    floor: 1,
    mapPosition: { x: 15, y: 58 },
  },
  {
    id: 7,
    name: "Casa Natura",
    category: "Decoración",
    image: "img/imagenesLocales/imagenLocalDeco2.jpg",
    gallery: [
      "img/imagenesLocales/imagenLocalDeco3.jpg",
      "img/imagenesLocales/imagenLocalDeco4.jpg",
    ],
    description: "Decoración orgánica con estilo escandinavo.",
    longDescription:
      "Casa Natura combina madera clara, fibras naturales y diseño minimalista para crear ambientes cálidos y equilibrados.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 180 - Primer Piso",
    isActive: true,
    floor: 1,
    mapPosition: { x: 58, y: 58 },
  },
  {
    id: 8,
    name: "Olive Wear",
    category: "Moda",
    image: "img/imagenesLocales/localModa4.jpg",
    gallery: [
      "img/imagenesLocales/localModa5.jpg",
      "img/imagenesLocales/localModa6.jpg",
    ],
    description: "Moda contemporánea en paletas oliva y beige.",
    longDescription:
      "Olive Wear presenta colecciones suaves inspiradas en la naturaleza, con tonos tierra y cortes modernos pensados para el día a día.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 220 - Segundo Piso",
    isActive: true,
    floor: 2,
    mapPosition: { x: 58, y: 30 },
  },
  {
    id: 9,
    name: "Forma Home Studio",
    category: "Decoración",
    image: "img/imagenesLocales/imagenLocalDeco5.jpg",
    gallery: [
      "img/imagenesLocales/imagenLocalDeco6.jpg",
      "img/imagenesLocales/imagenLocalDeco7.jpg",
    ],
    description: "Muebles de líneas suaves y diseño natural.",
    longDescription:
      "Forma Home Studio destaca por piezas contemporáneas en materiales nobles, buscando espacios modernos y cálidos.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 108 - Primer Piso",
    isActive: true,
    floor: 1,
    mapPosition: { x: 30, y: 30 },
  },
  {
    id: 10,
    name: "Natura Deco",
    category: "Decoración",
    image: "img/imagenesLocales/imagenLocalDeco8.jpg",
    gallery: [
      "img/imagenesLocales/imagenLocalDeco.jpg",
      "img/imagenesLocales/imagenLocalDeco4.jpg",
    ],
    description: "Decoración con fibras naturales y esencia botánica.",
    longDescription:
      "Natura Deco ofrece piezas hechas a mano e inspiradas en la naturaleza, ideales para ambientes cálidos y orgánicos.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 230 - Segundo Piso",
    isActive: true,
    floor: 2,
    mapPosition: { x: 30, y: 58 },
  },
  {
    id: 11,
    name: "Atelier 31",
    category: "Moda",
    image: "img/imagenesLocales/localModa7.jpg",
    description: "Moda artesanal en paletas naturales.",
    longDescription:
      "Atelier 31 combina confección artesanal, materiales puros y un enfoque slow-fashion minimalista.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 260 - Segundo Piso",
    isActive: false,
    floor: 1,
    mapPosition: { x: 58, y: 74 },
  },
  {
    id: 12,
    name: "Kinoko Light",
    category: "Iluminación",
    image: "img/imagenesLocales/imagenLocalLuminaria2.jpg",
    description: "Iluminación inspirada en formas orgánicas.",
    longDescription:
      "Kinoko Light se destaca por luminarias escultóricas con una estética cálida y natural.",
    hours: "Lun-Dom: 10:00 - 21:00",
    location: "Local 270 - Segundo Piso",
    isActive: false,
    floor: 2,
    mapPosition: { x: 58, y: 58 },
  },
];
