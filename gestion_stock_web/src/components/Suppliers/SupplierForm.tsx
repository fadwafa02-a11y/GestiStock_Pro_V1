import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import type { Supplier } from '../../types';

interface SupplierFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: Supplier | null;
  onSave: (supplier: Supplier) => void;
}

export function SupplierForm({ open, onOpenChange, supplier, onSave }: SupplierFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address
      });
    } else {
      setFormData({
        name: '',
        contact: '',
        phone: '',
        email: '',
        address: ''
      });
    }
  }, [supplier, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSupplier: Supplier = {
      id: supplier?.id || Date.now().toString(),
      ...formData
    };

    onSave(newSupplier);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{supplier ? 'Modifier le fournisseur' : 'Nouveau fournisseur'}</DialogTitle>
          <DialogDescription>
            Remplissez les informations du fournisseur
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sup-name">Nom du fournisseur *</Label>
                <Input
                  id="sup-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: TechSupply Pro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sup-contact">Personne de contact *</Label>
                <Input
                  id="sup-contact"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Ex: Marie Laurent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sup-phone">Téléphone *</Label>
                <Input
                  id="sup-phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="01 23 45 67 89"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sup-email">Email *</Label>
                <Input
                  id="sup-email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@example.fr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sup-address">Adresse *</Label>
              <Textarea
                id="sup-address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Adresse complète"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {supplier ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
