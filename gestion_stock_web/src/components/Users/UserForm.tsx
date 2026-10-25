import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { User, UserRole } from '../../types';

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSave: (user: User) => void;
}

export function UserForm({ open, onOpenChange, user, onSave }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'employee' as UserRole
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        password: user.password,
        role: user.role
      });
    } else {
      setFormData({
        name: '',
        username: '',
        password: '',
        role: 'employee'
      });
    }
  }, [user, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: user?.id || Date.now().toString(),
      ...formData
    };

    onSave(newUser);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}</DialogTitle>
          <DialogDescription>
            Remplissez les informations de l'utilisateur
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Nom complet *</Label>
              <Input
                id="user-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Jean Dupont"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur *</Label>
              <Input
                id="username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Ex: jdupont"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe *</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle *</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employé</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {user ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
