export interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface AboutSection {
  title: string;
  paragraphs: string[];
}

export interface AboutFeature {
  title: string;
  desc: string;
}

export interface SeoEntry {
  title: string;
  description: string;
}

export interface Dictionary {
  meta: { title: string; description: string };

  ui: { cerrar: string };

  seo: {
    indice: SeoEntry;
    mapa: SeoEntry;
    personajes: SeoEntry;
    glosario: SeoEntry;
    contexto: SeoEntry;
    nosotros: SeoEntry;
    privacidad: SeoEntry;
    terminos: SeoEntry;
    paralelos: SeoEntry;
  };

  nav: {
    indice: string;
    mapa: string;
    personajes: string;
    glosario: string;
    contexto: string;
    paralelos: string;
    notas: string;
    nosotros: string;
    privacidad: string;
    terminos: string;
  };

  topnav: {
    login: string;
    register: string;
    logout: string;
    cambiarTema: string;
    abrirMenu: string;
    cerrarMenu: string;
  };

  auth: {
    loginTitle: string;
    registerTitle: string;
    loginCta: string;
    registerCta: string;
    loginTab: string;
    registerTab: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmationMessage: string;
    submitting: string;
  };

  footer: { tagline: string; explorar: string; proyecto: string; rights: string };

  inicio: {
    title: string;
    subtitle: string;
    continue: (chapter: number) => string;
    discoursesTitle: string;
    discoursesSubtitle: string;
    shortcutsTitle: string;
    mapa: string;
    personajes: string;
    glosario: string;
    contexto: string;
    mateoRange: (range: string) => string;
  };

  indice: {
    title: string;
    stats: (total: number, completed: number, read: number) => string;
    all: string;
    legendCompleted: string;
    legendPending: string;
    legendRead: string;
    markRead: string;
    markUnread: string;
  };

  capitulo: {
    soloTexto: string;
    paraReflexionar: string;
    misNotas: string;
    loginPrompt: string;
    iniciarSesion: string;
    crearCuenta: string;
    notaPlaceholder: string;
    pendingTitle: string;
    pendingBody: string;
    compartirWhatsapp: string;
    terminosGriegos: string;
    personajes: string;
    lugares: string;
    contexto: string;
    sinContexto: string;
    mateoPrefix: string;
    lemaLabel: string;
    citaAtChip: (referencia: string) => string;
    paraleloChip: (referencia: string) => string;
    guardando: string;
    guardado: string;
    errorGuardado: string;
    reintentarGuardado: string;
  };

  mapa: {
    title: string;
    subtitleDesktop: string;
    subtitleMobile: string;
    disclaimer: string;
  };

  personajes: {
    title: string;
    verMas: string;
    ocultar: string;
    categoriaTodos: string;
  };

  glosario: {
    title: string;
    statLine: (count: number) => string;
    searchPlaceholder: string;
    verEnMateo: (ref: string) => string;
    categoriaTodos: string;
    categoriaVerbo: string;
    categoriaSustantivo: string;
    categoriaAdjetivo: string;
    categoriaOtro: string;
  };

  contexto: { title: string };

  paralelos: {
    title: string;
    subtitle: string;
    tipoCitaAT: string;
    tipoParalelo: string;
  };

  buscar: {
    navLabel: string;
    title: string;
    placeholder: string;
    referenciaResultado: (chapter: number) => string;
    tipoTexto: string;
    tipoComentario: string;
    tipoGriego: string;
    tipoPersonajes: string;
    tipoLugares: string;
    tipoContexto: string;
    sinResultados: string;
    empiezaAEscribir: string;
  };

  notas: {
    title: string;
    stats: (read: number, total: number) => string;
    notasGuardadas: string;
  };

  errores: {
    cargando: string;
    notFoundTitle: string;
    notFoundBody: string;
    errorTitle: string;
    errorBody: string;
    reintentar: string;
    volverInicio: string;
  };

  nosotros: {
    title: string;
    intro: string;
    sections: AboutSection[];
    features: AboutFeature[];
  };

  privacidad: { title: string; updated: string; sections: LegalSection[] };
  terminos: { title: string; updated: string; sections: LegalSection[] };
}
