import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar, MessageSquare, Users, TrendingUp, Clock, MapPin } from 'lucide-react';
import type { View } from '../App';
import { mockPosts, mockEvents } from '../data/mockData';

interface HomeProps {
  onNavigate: (view: View) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const recentPosts = mockPosts.slice(0, 3);
  const upcomingEvents = mockEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="mb-2">Bienvenue dans votre quartier</h2>
        <p className="text-gray-600">
          Connectez-vous avec vos voisins, participez aux discussions et rejoignez les événements locaux.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3>Forums actifs</h3>
              <p className="text-gray-600 mt-1">Participez aux discussions de votre quartier</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3>{upcomingEvents.length} événements</h3>
              <p className="text-gray-600 mt-1">À venir dans votre quartier</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3>Communauté</h3>
              <p className="text-gray-600 mt-1">Rencontrez vos voisins</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <h3>Discussions récentes</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('forums')}>
              Voir tout
            </Button>
          </div>
          <div className="space-y-3">
            {recentPosts.map(post => (
              <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('forums')}>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{post.title}</p>
                        <p className="text-gray-500 text-sm">{post.author}</p>
                      </div>
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.replies} réponses
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.time}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <h3>Événements à venir</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('events')}>
              Voir tout
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <Card key={event.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('events')}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary text-white rounded-lg flex flex-col items-center justify-center">
                    <span className="text-sm">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}</span>
                    <span>{new Date(event.date).getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{event.title}</p>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees} participants
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
