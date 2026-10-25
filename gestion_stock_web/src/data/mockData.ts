export const mockPosts = [
  {
    id: '1',
    title: 'Recherche recommandation plombier',
    content: 'Bonjour ! Je cherche un bon plombier dans le quartier pour réparer une fuite. Quelqu\'un aurait-il une recommandation ?',
    author: 'Marie Dubois',
    category: 'Services',
    replies: 5,
    likes: 3,
    time: 'Il y a 2h',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Nouveau restaurant sur la rue principale',
    content: 'J\'ai découvert un nouveau restaurant italien qui vient d\'ouvrir. La cuisine est excellente et l\'ambiance très agréable. Je recommande vivement !',
    author: 'Jean Martin',
    category: 'Recommandations',
    replies: 8,
    likes: 12,
    time: 'Il y a 5h',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Chien perdu - aide recherche',
    content: 'Mon chien Léo, un golden retriever, s\'est échappé ce matin vers 8h. Si vous l\'avez vu, merci de me contacter.',
    author: 'Sophie Laurent',
    category: 'Aide',
    replies: 12,
    likes: 25,
    time: 'Il y a 8h',
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Journée nettoyage du parc ce samedi',
    content: 'La mairie organise une journée de nettoyage volontaire du parc municipal samedi prochain. Venez nombreux avec vos gants et sacs poubelle !',
    author: 'Pierre Durand',
    category: 'Événements',
    replies: 15,
    likes: 18,
    time: 'Il y a 1j',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    title: 'Travaux sur l\'avenue - info circulation',
    content: 'Des travaux de réfection de la chaussée vont commencer lundi prochain sur l\'avenue principale. Circulation alternée prévue pendant 2 semaines.',
    author: 'Administration',
    category: 'Général',
    replies: 3,
    likes: 7,
    time: 'Il y a 2j',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    title: 'Cours de yoga gratuit au parc',
    content: 'Je propose des cours de yoga gratuits tous les mercredis matins au parc. Ouvert à tous les niveaux, venez avec votre tapis !',
    author: 'Camille Rousseau',
    category: 'Événements',
    replies: 20,
    likes: 35,
    time: 'Il y a 3j',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    title: 'Meilleure boulangerie du quartier ?',
    content: 'Je viens d\'emménager dans le quartier. Quelle est selon vous la meilleure boulangerie pour le pain et les viennoiseries ?',
    author: 'Thomas Bernard',
    category: 'Recommandations',
    replies: 28,
    likes: 15,
    time: 'Il y a 4j',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    title: 'Garde d\'enfants - recherche nounou',
    content: 'Je recherche une personne fiable pour garder mes deux enfants (5 et 7 ans) les mardis et jeudis après-midi. Références demandées.',
    author: 'Isabelle Petit',
    category: 'Services',
    replies: 6,
    likes: 4,
    time: 'Il y a 5j',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Vide-grenier du quartier',
    description: 'Grand vide-grenier annuel organisé sur la place principale. Venez vendre vos objets ou chiner des trouvailles !',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    time: '09:00',
    location: 'Place de la Mairie',
    organizer: 'Association des commerçants',
    attendees: 45,
    type: 'community',
    image: null
  },
  {
    id: '2',
    title: 'Tournoi de pétanque',
    description: 'Tournoi amical ouvert à tous. Inscriptions sur place. Apéritif offert aux participants.',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    time: '14:00',
    location: 'Boulodrome municipal',
    organizer: 'Club de pétanque',
    attendees: 32,
    type: 'sport',
    image: null
  },
  {
    id: '3',
    title: 'Cinéma en plein air',
    description: 'Projection gratuite du film "La Grande Vadrouille". Pensez à apporter vos couvertures et coussins !',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    time: '21:30',
    location: 'Parc des sports',
    organizer: 'Mairie',
    attendees: 120,
    type: 'culture',
    image: null
  },
  {
    id: '4',
    title: 'Atelier jardinage urbain',
    description: 'Apprenez à créer votre potager sur balcon. Matériel fourni, places limitées.',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    time: '10:30',
    location: 'Jardin partagé',
    organizer: 'Les Jardiniers en herbe',
    attendees: 15,
    type: 'community',
    image: null
  },
  {
    id: '5',
    title: 'Marché de Noël',
    description: 'Marché de Noël avec artisans locaux, vin chaud et animations pour les enfants.',
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    time: '10:00',
    location: 'Centre-ville',
    organizer: 'Comité des fêtes',
    attendees: 250,
    type: 'social',
    image: null
  },
  {
    id: '6',
    title: 'Course à pied caritative',
    description: '5km ou 10km pour soutenir l\'association locale. Inscriptions en ligne.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    time: '09:00',
    location: 'Départ Place de la République',
    organizer: 'Run & Solidarité',
    attendees: 180,
    type: 'sport',
    image: null
  },
  {
    id: '7',
    title: 'Concert jazz au parc',
    description: 'Concert gratuit avec le quartet Jazz & Blues. Ambiance décontractée sur l\'herbe.',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    time: '18:00',
    location: 'Parc municipal',
    organizer: 'Service culturel',
    attendees: 200,
    type: 'culture',
    image: null
  }
];
