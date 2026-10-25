import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar as CalendarIcon, Plus, MapPin, Users, Clock, Check } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

const eventTypes = [
  { id: 'all', name: 'Tous' },
  { id: 'social', name: 'Social' },
  { id: 'sport', name: 'Sport' },
  { id: 'culture', name: 'Culture' },
  { id: 'community', name: 'Communautaire' },
  { id: 'other', name: 'Autre' },
];

export function Events() {
  const [selectedType, setSelectedType] = useState('all');
  const [events, setEvents] = useState(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [attendingEvents, setAttendingEvents] = useState<Set<string>>(new Set());
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'social'
  });

  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now);

  const filteredUpcoming = selectedType === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(e => e.type === selectedType);

  const filteredPast = selectedType === 'all'
    ? pastEvents
    : pastEvents.filter(e => e.type === selectedType);

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      type: newEvent.type,
      organizer: 'Vous',
      attendees: 1,
      image: null
    };

    setEvents([event, ...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewEvent({ title: '', description: '', date: '', time: '', location: '', type: 'social' });
    setIsDialogOpen(false);
    toast.success('Événement créé avec succès !');
  };

  const handleAttend = (eventId: string) => {
    if (attendingEvents.has(eventId)) {
      setAttendingEvents(prev => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
      setEvents(events.map(e => e.id === eventId ? { ...e, attendees: e.attendees - 1 } : e));
      toast.info('Participation annulée');
    } else {
      setAttendingEvents(prev => new Set(prev).add(eventId));
      setEvents(events.map(e => e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e));
      toast.success('Vous participez à cet événement !');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-2">Événements du quartier</h2>
          <p className="text-gray-600">Découvrez et participez aux événements locaux</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Créer un événement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un événement</DialogTitle>
              <DialogDescription>
                Organisez un événement pour rassembler votre quartier
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Titre de l'événement</Label>
                <Input
                  id="event-title"
                  placeholder="Ex: Pique-nique au parc"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type">Type d'événement</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger id="event-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.filter(t => t.id !== 'all').map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        id="event-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? selectedDate.toLocaleDateString('fr-FR') : 'Choisir une date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          if (date) {
                            setNewEvent({ ...newEvent, date: date.toISOString() });
                          }
                        }}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time">Heure</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-location">Lieu</Label>
                <Input
                  id="event-location"
                  placeholder="Ex: Parc central"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Décrivez votre événement..."
                  rows={4}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateEvent}>Créer l'événement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-6">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
          {eventTypes.map(type => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedType} className="mt-6 space-y-8">
          <div>
            <h3 className="mb-4">À venir</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredUpcoming.length === 0 ? (
                <Card className="p-12 text-center md:col-span-2">
                  <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Aucun événement à venir dans cette catégorie</p>
                </Card>
              ) : (
                filteredUpcoming.map(event => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {event.image && (
                      <div className="h-48 bg-gray-200">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <p className="mb-1">{event.title}</p>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{event.organizer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-600 text-sm">Par {event.organizer}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{eventTypes.find(t => t.id === event.type)?.name}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarIcon className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          {event.attendees} participant(s)
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        variant={attendingEvents.has(event.id) ? 'outline' : 'default'}
                        onClick={() => handleAttend(event.id)}
                      >
                        {attendingEvents.has(event.id) ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Vous participez
                          </>
                        ) : (
                          'Participer'
                        )}
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {filteredPast.length > 0 && (
            <div>
              <h3 className="mb-4">Événements passés</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredPast.map(event => (
                  <Card key={event.id} className="overflow-hidden opacity-75">
                    {event.image && (
                      <div className="h-48 bg-gray-200">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <p className="flex-1">{event.title}</p>
                        <Badge variant="secondary">Terminé</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
