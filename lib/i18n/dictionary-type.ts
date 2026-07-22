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

export interface Dictionary {
  meta: { title: string; description: string };

  nav: {
    indice: string;
    mapa: string;
    personajes: string;
    glosario: string;
    contexto: string;
    notas: string;
    nosotros: string;
    privacidad: string;
    terminos: string;
  };

  topnav: { login: string; register: string; logout: string };

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
  };

  contexto: { title: string };

  notas: {
    title: string;
    stats: (read: number, total: number) => string;
    notasGuardadas: string;
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
