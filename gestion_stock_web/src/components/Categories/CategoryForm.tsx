// src/components/categories/CategoryForm.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import type { Category } from '../../types';

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSave: (category: Category) => void;
}

export function CategoryForm({ open, onOpenChange, category, onSave }: CategoryFormProps) {
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description
      });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Category = {
      id: category?.id || '', // backend va générer l'id si création
      name: formData.name,
      description: formData.description,
      createdAt: category?.createdAt,
      updatedAt: new Date().toISOString()
    };
    onSave(newCategory);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</DialogTitle>
          <DialogDescription>
            Définissez le nom et la description de la catégorie
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Nom de la catégorie *</Label>
              <Input
                id="cat-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Électronique"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cat-description">Description</Label>
              <Textarea
                id="cat-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description de la catégorie"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {category ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
