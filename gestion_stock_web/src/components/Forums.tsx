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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageSquare, Plus, Clock, ThumbsUp, Reply } from 'lucide-react';
import { mockPosts } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

const categories = [
  { id: 'all', name: 'Tous', color: 'gray' },
  { id: 'general', name: 'Général', color: 'blue' },
  { id: 'services', name: 'Services', color: 'green' },
  { id: 'recommendations', name: 'Recommandations', color: 'purple' },
  { id: 'help', name: 'Aide', color: 'orange' },
  { id: 'events', name: 'Événements', color: 'pink' },
];

export function Forums() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState(mockPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category.toLowerCase() === selectedCategory);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'Vous',
      category: categories.find(c => c.id === newPost.category)?.name || 'Général',
      replies: 0,
      likes: 0,
      time: 'À l\'instant',
      date: new Date().toISOString()
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'general' });
    setIsDialogOpen(false);
    toast.success('Discussion créée avec succès !');
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    toast.success('Merci pour votre soutien !');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-2">Forums de discussion</h2>
          <p className="text-gray-600">Échangez avec vos voisins sur tous les sujets du quartier</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle discussion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une discussion</DialogTitle>
              <DialogDescription>
                Partagez vos questions, idées ou informations avec le quartier
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  placeholder="Ex: Recherche recommandation plombier"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea
                  id="content"
                  placeholder="Décrivez votre question ou partagez vos informations..."
                  rows={5}
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreatePost}>Publier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <Card className="p-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Aucune discussion dans cette catégorie</p>
                <p className="text-gray-500 text-sm mt-2">Soyez le premier à démarrer une conversation !</p>
              </Card>
            ) : (
              filteredPosts.map(post => (
                <Card key={post.id} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{post.title}</p>
                          <p className="text-gray-500 text-sm">Par {post.author}</p>
                        </div>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.likes} J'aime
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => setSelectedPost(post)}
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          {post.replies} Réponses
                        </Button>
                        <span className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                          <Clock className="h-3 w-3" />
                          {post.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedPost.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex gap-3 mb-6">
                <Avatar>
                  <AvatarFallback>{selectedPost.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-gray-700">{selectedPost.author}</p>
                  <p className="text-gray-500 text-sm">{selectedPost.time}</p>
                  <p className="mt-3">{selectedPost.content}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="mb-4">{selectedPost.replies} réponse(s)</p>
                <div className="space-y-4 mb-4">
                  {selectedPost.replies === 0 && (
                    <p className="text-gray-500 text-center py-8">Aucune réponse pour le moment</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Votre réponse</Label>
                  <Textarea placeholder="Ajoutez votre commentaire..." rows={3} />
                  <Button className="w-full">Publier la réponse</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
