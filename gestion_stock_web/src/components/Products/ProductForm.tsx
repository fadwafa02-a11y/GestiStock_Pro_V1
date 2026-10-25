// src/components/Products/ProductForm.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import type { Product, Category, Supplier } from '../../types';

import { getCategories } from '../../api/categoryApi';
import { getSuppliers } from '../../api/supplierApi';

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

export function ProductForm({ open, onOpenChange, product, onSave }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    supplierId: '',
    price: '',
    quantity: '',
    minQuantity: ''
  });

  // 🔥 Charger catégories + fournisseurs depuis le backend
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [catData, supData] = await Promise.all([
          getCategories(),
          getSuppliers()
        ]);

        setCategories(catData);
        setSuppliers(supData);

        if (product) {
          setFormData({
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            supplierId: product.supplierId,
            price: product.price.toString(),
            quantity: product.quantity.toString(),
            minQuantity: product.minQuantity.toString()
          });
        } else {
          setFormData({
            name: '',
            description: '',
            categoryId: catData[0]?.id || '',
            supplierId: supData[0]?.id || '',
            price: '',
            quantity: '',
            minQuantity: ''
          });
        }

      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    }

    if (open) loadData();
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: product?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      categoryId: formData.categoryId,
      supplierId: formData.supplierId,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      minQuantity: parseInt(formData.minQuantity),
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(newProduct);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? 'Modifier le produit' : 'Nouveau produit'}</DialogTitle>
          <DialogDescription>
            Remplissez les informations du produit
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-center py-4">Chargement...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">

              {/* NOM & CATÉGORIE */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Ordinateur portable"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description détaillée du produit"
                  rows={3}
                />
              </div>

              {/* FOURNISSEUR */}
              <div className="space-y-2">
                <Label htmlFor="supplier">Fournisseur *</Label>
                <Select
                  value={formData.supplierId}
                  onValueChange={(value) => setFormData({ ...formData, supplierId: value })}
                >
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Choisir un fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(sup => (
                      <SelectItem key={sup.id} value={sup.id}>
                        {sup.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PRIX / QTÉ / MIN */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantité *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minQuantity">Stock minimum *</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    required
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {product ? 'Modifier' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
