import type { Dictionary } from '../dictionary-type';

const pt: Dictionary = {
  meta: {
    title: 'Basileia',
    description:
      'Basileia — plataforma de estudo do Evangelho de Mateus: análise grega, contexto histórico-cultural e comentário capítulo a capítulo.',
  },

  nav: {
    indice: 'Índice',
    mapa: 'Mapa',
    personajes: 'Personagens',
    glosario: 'Glossário',
    contexto: 'Contexto',
    notas: 'Notas',
    nosotros: 'Sobre nós',
    privacidad: 'Privacidade',
    terminos: 'Termos de uso',
  },

  topnav: { login: 'Entrar', register: 'Registrar-se', logout: 'Sair' },

  auth: {
    loginTitle: 'Iniciar sessão',
    registerTitle: 'Criar conta',
    loginCta: 'Entrar',
    registerCta: 'Criar conta',
    loginTab: 'Iniciar sessão',
    registerTab: 'Criar conta',
    namePlaceholder: 'Nome',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Senha',
    confirmationMessage: 'Enviamos um e-mail para confirmar sua conta. Confirme e depois inicie sessão.',
    submitting: 'Um momento…',
  },

  footer: {
    tagline:
      'Estudo do Evangelho de Mateus — análise grega, contexto histórico e comentário capítulo a capítulo, baseado no estudo bíblico da igreja Reino em Movimento.',
    explorar: 'Explorar',
    proyecto: 'Projeto',
    rights: 'Todos os direitos reservados.',
  },

  inicio: {
    title: 'O Evangelho de Mateus',
    subtitle:
      'Um cobrador de impostos que viveu rejeitado por seu povo e por Roma, e que escreveu o relato de um Rei que veio cumprir a promessa. Análise grega, contexto histórico e comentário capítulo a capítulo.',
    continue: (n) => `Continuar em Mateus ${n}`,
    discoursesTitle: 'Panorama em cinco discursos',
    discoursesSubtitle: 'Mateus organiza os ensinamentos de Jesus em torno de cinco grandes blocos.',
    shortcutsTitle: 'Acessos diretos',
    mapa: 'Mapa',
    personajes: 'Personagens',
    glosario: 'Glossário',
    contexto: 'Contexto',
    mateoRange: (range) => `Mateus ${range}`,
  },

  indice: {
    title: 'Índice de capítulos',
    stats: (total, completed, read) => `${total} capítulos · ${completed} disponíveis para estudo · ${read} marcados como lidos`,
    all: 'Todos',
    legendCompleted: 'Concluído (disponível para estudo)',
    legendPending: 'Pendente',
    legendRead: 'Lido — toque no círculo do capítulo para marcá-lo',
    markRead: 'Marcar como lido',
    markUnread: 'Marcado como lido',
  },

  capitulo: {
    soloTexto: 'Somente texto',
    paraReflexionar: 'Para refletir',
    misNotas: 'Suas notas sobre este capítulo',
    loginPrompt: 'Inicie sessão ou crie uma conta para escrever e salvar suas notas deste capítulo.',
    iniciarSesion: 'Iniciar sessão',
    crearCuenta: 'Criar conta',
    notaPlaceholder: 'Escreva o que este capítulo diz a você...',
    pendingTitle: 'Este capítulo ainda está pendente de desenvolvimento.',
    pendingBody: 'O comentário, a análise grega e o contexto serão adicionados em breve.',
    compartirWhatsapp: 'Compartilhar no WhatsApp',
    terminosGriegos: 'Termos gregos',
    personajes: 'Personagens',
    lugares: 'Lugares',
    contexto: 'Contexto',
    sinContexto: 'Sem nota de contexto adicional para este capítulo.',
    mateoPrefix: 'Mateus',
  },

  mapa: {
    title: 'Mapa do ministério de Jesus',
    subtitleDesktop: 'Toque em um ponto do mapa para ver seu contexto e os capítulos relacionados.',
    subtitleMobile: 'Arraste o mapa para se mover. Toque em um ponto para ver seu contexto.',
    disclaimer: 'Mapa ilustrativo — localizações aproximadas.',
  },

  personajes: {
    title: 'Personagens',
    verMas: 'Ver mais',
    ocultar: 'Ocultar',
    categoriaTodos: 'Todos',
  },

  glosario: {
    title: 'Glossário grego',
    statLine: (count) => `${count} termos do estudo dos capítulos.`,
    searchPlaceholder: 'Buscar termo...',
    verEnMateo: (ref) => `Ver em Mateus ${ref} →`,
  },

  contexto: { title: 'Contexto histórico-cultural' },

  notas: {
    title: 'Minhas notas e progresso',
    stats: (read, total) => `${read} de ${total} capítulos marcados como lidos.`,
    notasGuardadas: 'Notas salvas nesta sessão',
  },

  nosotros: {
    title: 'Sobre nós',
    intro:
      'A ideia da Basileia é mostrar e ensinar o Evangelho de Mateus e a vida de Jesus de uma maneira diferente e mais intuitiva, com um tom teológico. É baseada no estudo bíblico da igreja Reino em Movimento.',
    sections: [
      {
        title: 'Por que "Basileia"?',
        paragraphs: [
          'Basileia (βασιλεία) é a palavra grega que Mateus usa repetidas vezes ao longo do seu evangelho para falar do "reino dos céus". Não é um lugar distante nem uma promessa apenas para depois da morte: é o governo de Deus irrompendo já, em meio à história, por meio da vida, do ensino, da morte e da ressurreição de Jesus.',
          'Escolhemos esse nome porque resume do que trata todo o evangelho: um Rei que cumpre a promessa feita a Abraão e a Davi, e um Reino que não se impõe pela força, mas se revela em parábolas, se vive em comunidade e se anuncia até os confins da terra.',
        ],
      },
      {
        title: 'De onde nasce este estudo',
        paragraphs: [
          'Basileia nasce do estudo bíblico pessoal, capítulo a capítulo, do Evangelho de Mateus, desenvolvido no âmbito da igreja Reino em Movimento. O que começou como anotações de estudo — comentário versículo por versículo, apontamentos de grego, fichas de contexto histórico — foi tomando forma até se tornar esta plataforma, com a ideia de disponibilizá-la a qualquer pessoa que queira percorrer o evangelho com método e profundidade.',
          'Não é um projeto institucional nem uma editora: é um recurso feito por uma pessoa que estuda a Bíblia em comunidade e quis compartilhar esse trabalho de uma forma mais acessível e intuitiva do que um caderno de anotações.',
        ],
      },
      {
        title: 'O que você vai encontrar na plataforma',
        paragraphs: ['Basileia organiza o estudo de Mateus em várias camadas que se complementam entre si:'],
      },
      {
        title: 'Como estudamos',
        paragraphs: [
          'A abordagem é teológica, mas acessível: cada passagem é lida primeiro em seu contexto — histórico, cultural, literário — antes de perguntar o que significa para nós hoje. Evitamos ler um versículo isolado do seu parágrafo, e um parágrafo isolado do resto do evangelho.',
          'Mateus escreve para uma comunidade judaica que precisava entender que Jesus era o cumprimento da Lei e dos Profetas, não sua abolição. Essa chave de leitura atravessa todo o comentário: menos "versículo do dia" e mais o relato completo de um Rei e seu Reino.',
        ],
      },
    ],
    features: [
      { title: 'Comentário capítulo a capítulo', desc: 'Cada capítulo dividido em blocos de texto com comentário próprio, versículo por versículo.' },
      { title: 'Análise de grego', desc: 'Palavras-chave em seu idioma original, com transliteração e explicação de nuances que se perdem na tradução.' },
      { title: 'Contexto histórico-cultural', desc: 'Fichas sobre vida judaica, política romana, geografia e práticas religiosas do século I.' },
      { title: 'Mapa interativo', desc: 'Os lugares do ministério de Jesus, localizados e conectados com os capítulos em que aparecem.' },
      { title: 'Personagens', desc: 'Galeria das figuras do evangelho, com seu papel e seu arco dentro do relato.' },
      { title: 'Notas pessoais', desc: 'Espaço privado para anotar suas próprias reflexões capítulo por capítulo, disponível ao iniciar sessão.' },
    ],
  },

  privacidad: {
    title: 'Política de privacidade',
    updated: 'Última atualização: julho de 2026.',
    sections: [
      {
        title: '1. Quem somos',
        paragraphs: [
          'Basileia é um projeto pessoal de estudo bíblico, sem fins comerciais, desenvolvido a partir do estudo do Evangelho de Mateus no âmbito da igreja Reino em Movimento. Não é uma empresa nem coleta dados com fins publicitários.',
        ],
      },
      {
        title: '2. Quais dados coletamos',
        paragraphs: ['Dependendo de como você usa a plataforma, guardamos diferentes tipos de informação:'],
        bullets: [
          'Se você criar uma conta: e-mail e, se indicado, seu nome. A senha é gerenciada pelo Supabase e nunca fica armazenada nem é visível em texto simples.',
          'Se você escrever notas: o conteúdo das notas que você salva por capítulo, associado à sua conta.',
          'Progresso de leitura: quais capítulos você marcou como lidos.',
          'Preferências locais: tema claro/escuro, último capítulo visitado e capítulos lidos são salvos no armazenamento local do seu navegador, mesmo sem ter iniciado sessão. Essa informação não sai do seu dispositivo, a menos que você inicie sessão.',
        ],
      },
      {
        title: '3. Para que usamos seus dados',
        paragraphs: [
          'Usamos seus dados exclusivamente para oferecer a funcionalidade da plataforma: identificá-lo ao iniciar sessão, salvar e mostrar suas notas e seu progresso de leitura. Não usamos seus dados para fins publicitários, não os vendemos e não os compartilhamos com terceiros alheios ao funcionamento do serviço.',
        ],
      },
      {
        title: '4. Onde são armazenados',
        paragraphs: [
          'Os dados de conta, notas e progresso são armazenados no Supabase, nosso provedor de banco de dados e autenticação, com regras de acesso (RLS) que garantem que cada usuário só possa ver e modificar suas próprias informações. Não utilizamos serviços de análise nem publicidade de terceiros na plataforma.',
        ],
      },
      {
        title: '5. Seus direitos',
        paragraphs: [
          'Você pode acessar, corrigir ou excluir seus dados a qualquer momento. Se quiser excluir sua conta e todas as informações associadas (notas e progresso incluídos), escreva para nós através dos canais de contato da igreja Reino em Movimento e trataremos disso o quanto antes.',
        ],
      },
      {
        title: '6. Mudanças nesta política',
        paragraphs: [
          'Esta política pode ser atualizada à medida que a plataforma evolui. Se houver mudanças importantes na forma como tratamos seus dados, isso será refletido nesta mesma página.',
        ],
      },
    ],
  },

  terminos: {
    title: 'Termos de uso',
    updated: 'Última atualização: julho de 2026.',
    sections: [
      {
        title: '1. Aceitação',
        paragraphs: ['Ao usar a Basileia, você aceita estes termos. Se não concordar com algum deles, pedimos que não utilize a plataforma.'],
      },
      {
        title: '2. O que é a Basileia',
        paragraphs: [
          'Basileia é um recurso gratuito de estudo do Evangelho de Mateus: comentário capítulo a capítulo, análise de termos gregos, contexto histórico-cultural, mapa interativo, personagens, glossário e um espaço de notas pessoais para usuários registrados.',
        ],
      },
      {
        title: '3. Contas de usuário',
        paragraphs: [
          'Para escrever e salvar notas, você precisa criar uma conta com seu e-mail. Você é responsável por manter a confidencialidade da sua senha e de toda atividade que ocorra em sua conta. Você pode encerrar sessão ou solicitar a exclusão da sua conta a qualquer momento.',
        ],
      },
      {
        title: '4. Conteúdo da plataforma',
        paragraphs: [
          'O comentário, as fichas de contexto e o restante do material teológico da Basileia são de autoria própria, baseados no estudo bíblico da igreja Reino em Movimento, e são oferecidos com fins educativos e de estudo pessoal. Você pode citá-lo ou compartilhá-lo indicando a fonte; não é permitido reproduzi-lo comercialmente sem autorização.',
          'O texto bíblico citado pertence às suas respectivas versões e traduções, cujos direitos correspondem aos seus editores ou organizações responsáveis.',
        ],
      },
      {
        title: '5. Notas pessoais',
        paragraphs: ['As notas que você escreve são privadas: só você pode vê-las e editá-las. Não as revisamos nem as usamos para outro fim além de mostrá-las a você quando voltar à plataforma.'],
      },
      {
        title: '6. Uso responsável',
        paragraphs: [
          'Pedimos que você use a Basileia de boa-fé: não tente violar a segurança da plataforma, acessar contas alheias nem utilizar o serviço para fins diferentes do estudo bíblico pessoal.',
        ],
      },
      {
        title: '7. Disponibilidade',
        paragraphs: [
          'Basileia é um projeto em desenvolvimento contínuo. É possível que haja interrupções temporárias, mudanças de funcionalidade ou ampliações de conteúdo sem aviso prévio. Fazemos o possível para manter seus dados disponíveis, mas não podemos garantir disponibilidade ininterrupta do serviço.',
        ],
      },
      {
        title: '8. Mudanças nestes termos',
        paragraphs: ['Podemos atualizar estes termos à medida que a plataforma cresce. As mudanças relevantes serão refletidas nesta mesma página.'],
      },
      {
        title: '9. Contato',
        paragraphs: ['Para dúvidas sobre estes termos ou sua conta, você pode nos contatar através dos canais da igreja Reino em Movimento.'],
      },
    ],
  },
};

export default pt;
