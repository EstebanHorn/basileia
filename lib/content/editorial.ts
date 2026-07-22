// Metadatos editoriales que no vienen en los JSON de app/data (estructura del índice,
// títulos/introducciones de capítulo, y etiquetas para los slugs de categoría/tema).

import type { Locale } from '@/lib/i18n/config';

export interface Section {
  id: string;
  name: string;
  range: [number, number];
}

export interface Discourse {
  id: string;
  name: string;
  chapters: number[];
  summary: string;
}

export interface ChapterMeta {
  title: string;
  intro: string;
}

const SECTIONS: Record<Locale, Section[]> = {
  es: [
    { id: 's1', name: 'Orígenes y preparación', range: [1, 4] },
    { id: 's2', name: 'Sermón del Monte', range: [5, 7] },
    { id: 's3', name: 'Milagros y autoridad', range: [8, 9] },
    { id: 's4', name: 'Discurso de Misión', range: [10, 11] },
    { id: 's5', name: 'Conflicto y controversias', range: [12, 12] },
    { id: 's6', name: 'Parábolas del Reino', range: [13, 13] },
    { id: 's7', name: 'Milagros, fe e inclusión', range: [14, 17] },
    { id: 's8', name: 'Discurso Eclesial', range: [18, 20] },
    { id: 's9', name: 'Semana de Pasión', range: [21, 28] },
  ],
  pt: [
    { id: 's1', name: 'Origens e preparação', range: [1, 4] },
    { id: 's2', name: 'Sermão do Monte', range: [5, 7] },
    { id: 's3', name: 'Milagres e autoridade', range: [8, 9] },
    { id: 's4', name: 'Discurso de Missão', range: [10, 11] },
    { id: 's5', name: 'Conflito e controvérsias', range: [12, 12] },
    { id: 's6', name: 'Parábolas do Reino', range: [13, 13] },
    { id: 's7', name: 'Milagres, fé e inclusão', range: [14, 17] },
    { id: 's8', name: 'Discurso Eclesial', range: [18, 20] },
    { id: 's9', name: 'Semana da Paixão', range: [21, 28] },
  ],
};

const DISCOURSES: Record<Locale, Discourse[]> = {
  es: [
    { id: 'd1', name: 'Sermón del Monte', chapters: [5, 6, 7], summary: 'La constitución del Reino: cómo vive quien sigue a Jesús.' },
    { id: 'd2', name: 'Discurso de Misión', chapters: [10], summary: 'Instrucciones a los doce para anunciar el Reino.' },
    { id: 'd3', name: 'Parábolas del Reino', chapters: [13], summary: 'Historias que revelan y esconden los misterios del Reino.' },
    { id: 'd4', name: 'Discurso Eclesial', chapters: [18], summary: 'Cómo vive la comunidad que sigue a Jesús.' },
    { id: 'd5', name: 'Discurso Escatológico', chapters: [24, 25], summary: 'El fin de los tiempos y la vigilancia del discípulo.' },
  ],
  pt: [
    { id: 'd1', name: 'Sermão do Monte', chapters: [5, 6, 7], summary: 'A constituição do Reino: como vive quem segue a Jesus.' },
    { id: 'd2', name: 'Discurso de Missão', chapters: [10], summary: 'Instruções aos doze para anunciar o Reino.' },
    { id: 'd3', name: 'Parábolas do Reino', chapters: [13], summary: 'Histórias que revelam e escondem os mistérios do Reino.' },
    { id: 'd4', name: 'Discurso Eclesial', chapters: [18], summary: 'Como vive a comunidade que segue a Jesus.' },
    { id: 'd5', name: 'Discurso Escatológico', chapters: [24, 25], summary: 'O fim dos tempos e a vigilância do discípulo.' },
  ],
};

const CHAPTER_META: Record<Locale, Record<number, ChapterMeta>> = {
  es: {
    1: {
      title: 'Genealogía: honor y gracia',
      intro: 'Mateo abre su evangelio no con un relato de acción sino con una lista de nombres. En el mundo bíblico, una genealogía no era un simple registro familiar: servía para demostrar origen, honor y herencia. Mateo la organiza en tres bloques de catorce generaciones desde Abraham hasta Jesús, pasando por David — y lo que revela es tan sorprendente como la inclusión de cuatro mujeres marcadas por escándalo en una lista que la costumbre reservaba solo a hombres.',
    },
    2: {
      title: 'El Rey perseguido',
      intro: 'Cuando comienza el capítulo 2, Jesús ya no es un recién nacido: María y José viven en una casa y el niño podría tener desde varios meses hasta casi dos años. Gobierna Herodes el Grande, un rey impuesto por Roma que sostenía su trono con violencia, manipulación y miedo — el contraste exacto con el Rey que acaba de nacer.',
    },
    3: {
      title: 'La voz que prepara el camino',
      intro: 'Han pasado unos treinta años desde el nacimiento de Jesús. Mateo salta directo al inicio del ministerio público, y después de casi 400 años sin profetas desde Malaquías, aparece Juan el Bautista en el desierto — no desde el templo ni el sistema religioso oficial, vestido como los antiguos profetas, con un mensaje directo: el reino de los cielos se ha acercado.',
    },
    4: {
      title: 'Tentado en el desierto, llamado junto al lago',
      intro: 'Antes del ministerio público hubo formación privada. El mismo Espíritu que descendió sobre Jesús en el bautismo ahora lo conduce al desierto — no para destruirlo, sino para probar y afirmar una identidad que el enemigo intentará cuestionar tres veces.',
    },
    5: {
      title: 'El Sermón del Monte: las bienaventuranzas y la ley del corazón',
      intro: 'Después de la genealogía, el nacimiento, el bautismo y la victoria en el desierto, Jesús sube a un monte y se sienta: la postura del maestro que enseña con autoridad, evocando a Moisés en el Sinaí. Frente a multitudes de Galilea, Decápolis, Jerusalén, Judea y más allá del Jordán, dirige la enseñanza a los discípulos que ya lo siguen — no es evangelismo masivo, es formación.',
    },
    6: {
      title: 'Piedad secreta y el tesoro del corazón',
      intro: 'Jesús acaba de hablar de amar al enemigo y de ser perfectos como el Padre. Ahora baja a algo más cotidiano pero igual de profundo: no solo qué hacemos, sino para quién lo hacemos. Limosna, oración y ayuno —las tres prácticas centrales de la piedad judía— se examinan bajo la misma pregunta, y el capítulo cierra con una advertencia sobre dónde ponemos el corazón: en el tesoro que se acumula o en el Padre que ya sabe lo que necesitamos.',
    },
    7: {
      title: 'Juzgar, pedir y edificar sobre la roca',
      intro: 'Jesús cierra el Sermón del Monte con una serie de instrucciones prácticas para la vida en comunidad: cómo mirar los errores propios antes que los ajenos, la promesa de un Padre que responde a quien le pide, la regla de oro, y una advertencia final sobre la diferencia entre escuchar y obedecer.',
    },
    8: {
      title: 'Autoridad sobre la enfermedad, la naturaleza y los demonios',
      intro: 'Tras el Sermón del Monte, una multitud enorme y creciente —Mateo usa una expresión griega más intensa que antes, ochloi polloi— sigue a Jesús montaña abajo. Lo que viene ahora es esa misma autoridad puesta en acción: cruzando, una tras otra, las fronteras más infranqueables del mundo del siglo I. La social con un leproso, la étnica con un centurión romano, la doméstica en la casa de Pedro, la natural en una tormenta y la espiritual en territorio gentil.',
    },
    9: {
      title: 'Autoridad para perdonar y una mesa inesperada',
      intro: 'Mateo 9 continúa el ritmo del capítulo anterior —Jesús en movimiento constante, actuando con autoridad— pero la tensión con los fariseos se intensifica: ya no observan desde lejos, empiezan a confrontar directamente. Y el capítulo muestra algo que el 8 solo insinuó: Jesús no separa el cuerpo del alma como compartimentos distintos. Sana, perdona, restaura e incluye como acciones que brotan de la misma fuente.',
    },
    10: {
      title: 'El envío de los doce',
      intro: 'Jesús acaba de recorrer todos los pueblos y aldeas, vio a la multitud agobiada y desamparada como ovejas sin pastor, y declaró que la cosecha es abundante pero los obreros son pocos. Mateo 10 es el segundo gran bloque de enseñanza del evangelio, y el primero que no está dirigido a la multitud sino exclusivamente a los discípulos: un manual de instrucciones para el discipulado en misión que sigue hablando a cualquiera que decida seguir a Jesús con seriedad.',
    },
    11: {
      title: 'Dudas desde la cárcel y descanso para el alma',
      intro: 'Los capítulos anteriores mostraron a Jesús enseñando con autoridad, sanando y enviando a sus discípulos: todo apuntaba hacia arriba. En Mateo 11 empieza a aparecer una sombra —duda, resistencia, rechazo— y no de parte de los enemigos obvios sino de personajes inesperados, empezando por el propio Juan el Bautista.',
    },
  },
  pt: {
    1: {
      title: 'Genealogia: honra e graça',
      intro: 'Mateus abre seu evangelho não com um relato de ação, mas com uma lista de nomes. No mundo bíblico, uma genealogia não era um simples registro familiar: servia para demonstrar origem, honra e herança. Mateus a organiza em três blocos de catorze gerações desde Abraão até Jesus, passando por Davi — e o que ela revela é tão surpreendente quanto a inclusão de quatro mulheres marcadas por escândalo em uma lista que o costume reservava apenas aos homens.',
    },
    2: {
      title: 'O Rei perseguido',
      intro: 'Quando começa o capítulo 2, Jesus já não é um recém-nascido: Maria e José vivem em uma casa e o menino pode ter entre alguns meses e quase dois anos. Governa Herodes, o Grande, um rei imposto por Roma que sustentava seu trono com violência, manipulação e medo — o contraste exato com o Rei que acaba de nascer.',
    },
    3: {
      title: 'A voz que prepara o caminho',
      intro: 'Passaram-se cerca de trinta anos desde o nascimento de Jesus. Mateus salta direto para o início do ministério público, e depois de quase 400 anos sem profetas desde Malaquias, aparece João Batista no deserto — não a partir do templo nem do sistema religioso oficial, vestido como os antigos profetas, com uma mensagem direta: o reino dos céus se aproximou.',
    },
    4: {
      title: 'Tentado no deserto, chamado junto ao lago',
      intro: 'Antes do ministério público houve formação privada. O mesmo Espírito que desceu sobre Jesus no batismo agora o conduz ao deserto — não para destruí-lo, mas para provar e afirmar uma identidade que o inimigo tentará questionar três vezes.',
    },
    5: {
      title: 'O Sermão do Monte: as bem-aventuranças e a lei do coração',
      intro: 'Depois da genealogia, do nascimento, do batismo e da vitória no deserto, Jesus sobe a um monte e se senta: a postura do mestre que ensina com autoridade, evocando Moisés no Sinai. Diante de multidões da Galileia, Decápolis, Jerusalém, Judeia e além do Jordão, ele dirige o ensino aos discípulos que já o seguem — não é evangelismo de massa, é formação.',
    },
    6: {
      title: 'Piedade secreta e o tesouro do coração',
      intro: 'Jesus acaba de falar sobre amar o inimigo e ser perfeito como o Pai. Agora desce a algo mais cotidiano, mas igualmente profundo: não apenas o que fazemos, mas para quem o fazemos. Esmola, oração e jejum — as três práticas centrais da piedade judaica — são examinadas sob a mesma pergunta, e o capítulo se fecha com uma advertência sobre onde colocamos o coração: no tesouro que se acumula ou no Pai que já sabe do que precisamos.',
    },
    7: {
      title: 'Julgar, pedir e edificar sobre a rocha',
      intro: 'Jesus encerra o Sermão do Monte com uma série de instruções práticas para a vida em comunidade: como olhar para os próprios erros antes dos alheios, a promessa de um Pai que responde a quem lhe pede, a regra de ouro, e uma advertência final sobre a diferença entre ouvir e obedecer.',
    },
    8: {
      title: 'Autoridade sobre a doença, a natureza e os demônios',
      intro: 'Depois do Sermão do Monte, uma multidão enorme e crescente — Mateus usa uma expressão grega mais intensa que antes, ochloi polloi — segue Jesus montanha abaixo. O que vem agora é essa mesma autoridade posta em ação: cruzando, uma após outra, as fronteiras mais intransponíveis do mundo do século I. A social com um leproso, a étnica com um centurião romano, a doméstica na casa de Pedro, a natural em uma tempestade e a espiritual em território gentio.',
    },
    9: {
      title: 'Autoridade para perdoar e uma mesa inesperada',
      intro: 'Mateus 9 continua o ritmo do capítulo anterior — Jesus em movimento constante, agindo com autoridade — mas a tensão com os fariseus se intensifica: eles já não observam de longe, começam a confrontar diretamente. E o capítulo mostra algo que o 8 apenas insinuou: Jesus não separa o corpo da alma como compartimentos distintos. Cura, perdoa, restaura e inclui como ações que brotam da mesma fonte.',
    },
    10: {
      title: 'O envio dos doze',
      intro: 'Jesus acaba de percorrer todas as cidades e aldeias, viu a multidão aflita e desamparada como ovelhas sem pastor, e declarou que a colheita é grande, mas os trabalhadores são poucos. Mateus 10 é o segundo grande bloco de ensino do evangelho, e o primeiro que não é dirigido à multidão, mas exclusivamente aos discípulos: um manual de instruções para o discipulado em missão que continua falando a qualquer um que decida seguir Jesus a sério.',
    },
    11: {
      title: 'Dúvidas desde a prisão e descanso para a alma',
      intro: 'Os capítulos anteriores mostraram Jesus ensinando com autoridade, curando e enviando seus discípulos: tudo apontava para cima. Em Mateus 11 começa a aparecer uma sombra — dúvida, resistência, rejeição — e não da parte dos inimigos óbvios, mas de personagens inesperados, começando pelo próprio João Batista.',
    },
  },
};

const CATEGORIA_LABELS: Record<Locale, Record<string, string>> = {
  es: {
    principal: 'Principal',
    otro: 'Otros',
    'autoridad-politica': 'Autoridades políticas',
    'autoridad-religiosa': 'Autoridades religiosas',
    discipulo: 'Discípulos',
  },
  pt: {
    principal: 'Principal',
    otro: 'Outros',
    'autoridad-politica': 'Autoridades políticas',
    'autoridad-religiosa': 'Autoridades religiosas',
    discipulo: 'Discípulos',
  },
};

const TEMA_LABELS: Record<Locale, Record<string, string>> = {
  es: {
    'vida-judia': 'Vida judía',
    'politica-romana': 'Política romana',
    geografia: 'Geografía',
    'practicas-religiosas': 'Prácticas religiosas',
  },
  pt: {
    'vida-judia': 'Vida judaica',
    'politica-romana': 'Política romana',
    geografia: 'Geografia',
    'practicas-religiosas': 'Práticas religiosas',
  },
};

export const MAX_CHAPTER = 28;
export const COMPLETED_RANGE: [number, number] = [1, 11];

export function isCompleted(n: number): boolean {
  return n >= COMPLETED_RANGE[0] && n <= COMPLETED_RANGE[1];
}

export function getSections(lang: Locale): Section[] {
  return SECTIONS[lang];
}

export function sectionFor(lang: Locale, n: number): Section | undefined {
  return SECTIONS[lang].find((s) => n >= s.range[0] && n <= s.range[1]);
}

export function getDiscourses(lang: Locale): Discourse[] {
  return DISCOURSES[lang];
}

export function getChapterMeta(lang: Locale, n: number): ChapterMeta | undefined {
  return CHAPTER_META[lang][n];
}

export function categoriaLabel(lang: Locale, categoria: string): string {
  return CATEGORIA_LABELS[lang][categoria] ?? categoria;
}

export function categoriaOrder(): string[] {
  return ['principal', 'discipulo', 'autoridad-religiosa', 'autoridad-politica', 'otro'];
}

export function temaLabel(lang: Locale, tema: string): string {
  return TEMA_LABELS[lang][tema] ?? tema;
}
