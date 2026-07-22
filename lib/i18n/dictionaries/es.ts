import type { Dictionary } from '../dictionary-type';

const es: Dictionary = {
  meta: {
    title: 'Basileia',
    description:
      'Basileia — plataforma de estudio del Evangelio de Mateo: análisis griego, contexto histórico-cultural y comentario capítulo a capítulo.',
  },

  nav: {
    indice: 'Índice',
    mapa: 'Mapa',
    personajes: 'Personajes',
    glosario: 'Glosario',
    contexto: 'Contexto',
    notas: 'Notas',
    nosotros: 'Sobre nosotros',
    privacidad: 'Privacidad',
    terminos: 'Términos de uso',
  },

  topnav: { login: 'Iniciar sesión', register: 'Registrarse', logout: 'Cerrar sesión' },

  auth: {
    loginTitle: 'Iniciar sesión',
    registerTitle: 'Crear cuenta',
    loginCta: 'Entrar',
    registerCta: 'Crear cuenta',
    loginTab: 'Iniciar sesión',
    registerTab: 'Crear cuenta',
    namePlaceholder: 'Nombre',
    emailPlaceholder: 'Correo electrónico',
    passwordPlaceholder: 'Contraseña',
    confirmationMessage: 'Te enviamos un correo para confirmar tu cuenta. Confirmalo y después iniciá sesión.',
    submitting: 'Un momento…',
  },

  footer: {
    tagline:
      'Estudio del Evangelio de Mateo — análisis griego, contexto histórico y comentario capítulo a capítulo, basado en el estudio bíblico de la iglesia Reino en Movimiento.',
    explorar: 'Explorar',
    proyecto: 'Proyecto',
    rights: 'Todos los derechos reservados.',
  },

  inicio: {
    title: 'El Evangelio de Mateo',
    subtitle:
      'Un recaudador de impuestos que vivió rechazado por su pueblo y por Roma, y que escribió el relato de un Rey que vino a cumplir la promesa. Análisis griego, contexto histórico y comentario capítulo a capítulo.',
    continue: (n) => `Continuar en Mateo ${n}`,
    discoursesTitle: 'Panorama en cinco discursos',
    discoursesSubtitle: 'Mateo organiza las enseñanzas de Jesús en torno a cinco grandes bloques.',
    shortcutsTitle: 'Accesos directos',
    mapa: 'Mapa',
    personajes: 'Personajes',
    glosario: 'Glosario',
    contexto: 'Contexto',
    mateoRange: (range) => `Mateo ${range}`,
  },

  indice: {
    title: 'Índice de capítulos',
    stats: (total, completed, read) => `${total} capítulos · ${completed} disponibles para estudio · ${read} marcados como leídos`,
    all: 'Todos',
    legendCompleted: 'Completado (disponible para estudio)',
    legendPending: 'Pendiente',
    legendRead: 'Leído — tocá el círculo del capítulo para marcarlo',
    markRead: 'Marcar como leído',
    markUnread: 'Marcado como leído',
  },

  capitulo: {
    soloTexto: 'Solo texto',
    paraReflexionar: 'Para reflexionar',
    misNotas: 'Tus notas sobre este capítulo',
    loginPrompt: 'Iniciá sesión o creá una cuenta para escribir y guardar tus notas de este capítulo.',
    iniciarSesion: 'Iniciar sesión',
    crearCuenta: 'Crear cuenta',
    notaPlaceholder: 'Escribe lo que este capítulo te dice a ti...',
    pendingTitle: 'Este capítulo todavía está pendiente de desarrollo.',
    pendingBody: 'El comentario, análisis griego y contexto se agregarán próximamente.',
    compartirWhatsapp: 'Compartir por WhatsApp',
    terminosGriegos: 'Términos griegos',
    personajes: 'Personajes',
    lugares: 'Lugares',
    contexto: 'Contexto',
    sinContexto: 'Sin nota de contexto adicional para este capítulo.',
    mateoPrefix: 'Mateo',
  },

  mapa: {
    title: 'Mapa del ministerio de Jesús',
    subtitleDesktop: 'Tocá un punto del mapa para ver su contexto y los capítulos relacionados.',
    subtitleMobile: 'Arrastrá el mapa para moverte. Tocá un punto para ver su contexto.',
    disclaimer: 'Mapa ilustrativo — ubicaciones aproximadas.',
  },

  personajes: {
    title: 'Personajes',
    verMas: 'Ver más',
    ocultar: 'Ocultar',
    categoriaTodos: 'Todos',
  },

  glosario: {
    title: 'Glosario griego',
    statLine: (count) => `${count} términos del estudio de los capítulos.`,
    searchPlaceholder: 'Buscar término...',
    verEnMateo: (ref) => `Ver en Mateo ${ref} →`,
  },

  contexto: { title: 'Contexto histórico-cultural' },

  notas: {
    title: 'Mis notas y progreso',
    stats: (read, total) => `${read} de ${total} capítulos marcados como leídos.`,
    notasGuardadas: 'Notas guardadas en esta sesión',
  },

  nosotros: {
    title: 'Sobre nosotros',
    intro:
      'La idea de Basileia es mostrar y enseñar el Evangelio de Mateo y la vida de Jesús de una manera diferente y más intuitiva, con un tono teológico. Está basada en el estudio bíblico de la iglesia Reino en Movimiento.',
    sections: [
      {
        title: '¿Por qué "Basileia"?',
        paragraphs: [
          'Basileia (βασιλεία) es la palabra griega que Mateo usa una y otra vez a lo largo de su evangelio para hablar del "reino de los cielos". No es un lugar lejano ni una promesa solo para después de la muerte: es el gobierno de Dios irrumpiendo ya, en medio de la historia, a través de la vida, la enseñanza, la muerte y la resurrección de Jesús.',
          'Elegimos ese nombre porque resume de qué se trata todo el evangelio: un Rey que cumple la promesa hecha a Abraham y a David, y un Reino que no se impone por la fuerza sino que se revela en parábolas, se vive en comunidad y se anuncia hasta los confines de la tierra.',
        ],
      },
      {
        title: 'De dónde nace este estudio',
        paragraphs: [
          'Basileia surge del estudio bíblico personal de capítulo a capítulo del Evangelio de Mateo, desarrollado en el marco de la iglesia Reino en Movimiento. Lo que empezó como notas de estudio —comentario versículo por versículo, apuntes de griego, fichas de contexto histórico— fue tomando forma hasta convertirse en esta plataforma, con la idea de ponerlo a disposición de cualquiera que quiera recorrer el evangelio con método y profundidad.',
          'No es un proyecto institucional ni una editorial: es un recurso hecho por una persona que estudia la Biblia en comunidad y quiso compartir ese trabajo de una manera más accesible e intuitiva que un cuaderno de notas.',
        ],
      },
      {
        title: 'Qué vas a encontrar en la plataforma',
        paragraphs: ['Basileia organiza el estudio de Mateo en varias capas que se complementan entre sí:'],
      },
      {
        title: 'Cómo estudiamos',
        paragraphs: [
          'El enfoque es teológico pero accesible: cada pasaje se lee primero en su contexto —histórico, cultural, literario— antes de preguntarse qué significa para nosotros hoy. Evitamos leer un versículo aislado de su párrafo, y un párrafo aislado del resto del evangelio.',
          'Mateo escribe para una comunidad judía que necesitaba entender que Jesús era el cumplimiento de la Ley y los Profetas, no su abolición. Esa clave de lectura atraviesa todo el comentario: menos "versículo del día" y más el relato completo de un Rey y su Reino.',
        ],
      },
    ],
    features: [
      { title: 'Comentario capítulo a capítulo', desc: 'Cada capítulo dividido en bloques de texto con comentario propio, versículo por versículo.' },
      { title: 'Análisis de griego', desc: 'Palabras clave en su idioma original, con transliteración y explicación de matices que se pierden en la traducción.' },
      { title: 'Contexto histórico-cultural', desc: 'Fichas sobre vida judía, política romana, geografía y prácticas religiosas del siglo I.' },
      { title: 'Mapa interactivo', desc: 'Los lugares del ministerio de Jesús, ubicados y conectados con los capítulos donde aparecen.' },
      { title: 'Personajes', desc: 'Galería de las figuras del evangelio, con su rol y su arco dentro del relato.' },
      { title: 'Notas personales', desc: 'Espacio privado para anotar tus propias reflexiones capítulo por capítulo, disponible al iniciar sesión.' },
    ],
  },

  privacidad: {
    title: 'Política de privacidad',
    updated: 'Última actualización: julio de 2026.',
    sections: [
      {
        title: '1. Quiénes somos',
        paragraphs: [
          'Basileia es un proyecto personal de estudio bíblico, sin fines comerciales, desarrollado a partir del estudio del Evangelio de Mateo en el marco de la iglesia Reino en Movimiento. No es una empresa ni recopila datos con fines publicitarios.',
        ],
      },
      {
        title: '2. Qué datos recopilamos',
        paragraphs: ['Según cómo uses la plataforma, guardamos distintos tipos de información:'],
        bullets: [
          'Si creás una cuenta: correo electrónico y, si lo indicás, tu nombre. La contraseña la gestiona Supabase y nunca queda almacenada ni es visible en texto plano.',
          'Si escribís notas: el contenido de las notas que guardás por capítulo, asociado a tu cuenta.',
          'Progreso de lectura: qué capítulos marcaste como leídos.',
          'Preferencias locales: tema claro/oscuro, último capítulo visitado y capítulos leídos se guardan en el almacenamiento local de tu navegador, incluso sin haber iniciado sesión. Esta información no sale de tu dispositivo salvo que inicies sesión.',
        ],
      },
      {
        title: '3. Para qué usamos tus datos',
        paragraphs: [
          'Usamos tus datos exclusivamente para brindarte la funcionalidad de la plataforma: identificarte al iniciar sesión, guardar y mostrarte tus notas y tu progreso de lectura. No usamos tus datos con fines publicitarios, no los vendemos y no los compartimos con terceros ajenos al funcionamiento del servicio.',
        ],
      },
      {
        title: '4. Dónde se almacenan',
        paragraphs: [
          'Los datos de cuenta, notas y progreso se almacenan en Supabase, nuestro proveedor de base de datos y autenticación, con reglas de acceso (RLS) que garantizan que cada usuario solo puede ver y modificar su propia información. No utilizamos servicios de analítica ni publicidad de terceros en la plataforma.',
        ],
      },
      {
        title: '5. Tus derechos',
        paragraphs: [
          'Podés acceder, corregir o eliminar tus datos en cualquier momento. Si querés eliminar tu cuenta y toda la información asociada (notas y progreso incluidos), escribinos a través de los medios de contacto de la iglesia Reino en Movimiento y lo gestionamos a la brevedad.',
        ],
      },
      {
        title: '6. Cambios en esta política',
        paragraphs: [
          'Esta política puede actualizarse a medida que la plataforma evolucione. Si hay cambios importantes en cómo tratamos tus datos, lo vamos a reflejar en esta misma página.',
        ],
      },
    ],
  },

  terminos: {
    title: 'Términos de uso',
    updated: 'Última actualización: julio de 2026.',
    sections: [
      {
        title: '1. Aceptación',
        paragraphs: ['Al usar Basileia aceptás estos términos. Si no estás de acuerdo con alguno de ellos, te pedimos que no utilices la plataforma.'],
      },
      {
        title: '2. Qué es Basileia',
        paragraphs: [
          'Basileia es un recurso gratuito de estudio del Evangelio de Mateo: comentario capítulo a capítulo, análisis de términos griegos, contexto histórico-cultural, mapa interactivo, personajes, glosario y un espacio de notas personales para usuarios registrados.',
        ],
      },
      {
        title: '3. Cuentas de usuario',
        paragraphs: [
          'Para escribir y guardar notas necesitás crear una cuenta con tu correo electrónico. Sos responsable de mantener la confidencialidad de tu contraseña y de toda actividad que ocurra bajo tu cuenta. Podés cerrar sesión o solicitar la eliminación de tu cuenta en cualquier momento.',
        ],
      },
      {
        title: '4. Contenido de la plataforma',
        paragraphs: [
          'El comentario, las fichas de contexto y el resto del material teológico de Basileia son de autoría propia, basados en el estudio bíblico de la iglesia Reino en Movimiento, y se ofrecen con fines educativos y de estudio personal. Podés citarlo o compartirlo señalando la fuente; no está permitido reproducirlo comercialmente sin autorización.',
          'El texto bíblico citado pertenece a sus respectivas versiones y traducciones, cuyos derechos corresponden a sus editores u organizaciones responsables.',
        ],
      },
      {
        title: '5. Notas personales',
        paragraphs: ['Las notas que escribís son privadas: solo vos podés verlas y editarlas. No las revisamos ni las usamos con otro fin que mostrártelas cuando volvés a la plataforma.'],
      },
      {
        title: '6. Uso responsable',
        paragraphs: [
          'Te pedimos que uses Basileia de buena fe: no intentes vulnerar la seguridad de la plataforma, acceder a cuentas ajenas ni utilizar el servicio con fines distintos al estudio bíblico personal.',
        ],
      },
      {
        title: '7. Disponibilidad',
        paragraphs: [
          'Basileia es un proyecto en desarrollo continuo. Es posible que haya interrupciones temporales, cambios de funcionalidad o ampliaciones de contenido sin aviso previo. Hacemos lo posible por mantener tus datos disponibles, pero no podemos garantizar disponibilidad ininterrumpida del servicio.',
        ],
      },
      {
        title: '8. Cambios en estos términos',
        paragraphs: ['Podemos actualizar estos términos a medida que la plataforma crezca. Los cambios relevantes se van a reflejar en esta misma página.'],
      },
      {
        title: '9. Contacto',
        paragraphs: ['Para consultas sobre estos términos o tu cuenta, podés contactarnos a través de los medios de la iglesia Reino en Movimiento.'],
      },
    ],
  },
};

export default es;
