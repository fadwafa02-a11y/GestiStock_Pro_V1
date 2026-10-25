import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import { useAuth } from '../../contexts/AuthContext';

import { getProducts } from '../../api/productApi';
import type { Product, StockMovement } from '../../types';

interface StockMovementFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'in' | 'out';
  onSave: (movement: StockMovement) => void;
}

export function StockMovementForm({ open, onOpenChange, type, onSave }: StockMovementFormProps) {
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    reason: ''
  });

  // 🔥 Charger les produits depuis le backend
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);

        // 🔥 Mettre le premier produit par défaut
        setFormData(prev => ({
          ...prev,
          productId: data[0]?.id || ''
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoading(false);
      }
    }

    if (open) {
      loadProducts();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const movement: StockMovement = {
      id: Date.now().toString(),
      productId: formData.productId,
      type: type,
      quantity: parseInt(formData.quantity),
      date: new Date().toISOString(),
      reason: formData.reason,
      user: user?.name || 'Utilisateur'
    };

    onSave(movement);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'in' ? 'Entrée de stock' : 'Sortie de stock'}
          </DialogTitle>
          <DialogDescription>
            Enregistrez un mouvement de stock pour mettre à jour les quantités
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-center py-4">Chargement des produits...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              
              {/* PRODUIT */}
              <div className="space-y-2">
                <Label htmlFor="mov-product">Produit *</Label>
                <Select 
                  value={formData.productId} 
                  onValueChange={(value) => setFormData({ ...formData, productId: value })}
                >
                  <SelectTrigger id="mov-product">
                    <SelectValue placeholder="Sélectionner un produit" />
                  </SelectTrigger>

                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} (Stock: {product.quantity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* QUANTITÉ */}
              <div className="space-y-2">
                <Label htmlFor="mov-quantity">Quantité *</Label>
                <Input
                  id="mov-quantity"
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>

              {/* RAISON */}
              <div className="space-y-2">
                <Label htmlFor="mov-reason">Raison *</Label>
                <Textarea
                  id="mov-reason"
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder={type === 'in'
                    ? 'Ex: Réapprovisionnement fournisseur'
                    : 'Ex: Vente client, utilisation interne'
                  }
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
