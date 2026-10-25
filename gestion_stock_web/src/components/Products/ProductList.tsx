// src/components/Products/ProductList.tsx
import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ProductForm } from './ProductForm';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import type { Product } from '../../types';
import { getProducts, saveProduct, updateProduct, deleteProduct } from '../../api/productApi';
import { mockCategories, mockSuppliers } from '../../data/stockData';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductItem, setDeleteProductItem] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = async (product: Product) => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(product);
        setProducts(products.map(p => (p.id === updated.id ? updated : p)));
        toast.success('Produit modifié avec succès');
      } else {
        const saved = await saveProduct(product);
        setProducts([...products, saved]);
        toast.success('Produit ajouté avec succès');
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch {
      toast.error('Erreur lors de la sauvegarde du produit');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteProductItem) return;
    try {
      await deleteProduct(deleteProductItem.id);
      setProducts(products.filter(p => p.id !== deleteProductItem.id));
      toast.success('Produit supprimé');
      setDeleteProductItem(null);
    } catch {
      toast.error('Erreur lors de la suppression du produit');
    }
  };

  const getStockStatus = (product: Product) => {
    if (product.quantity === 0) return { label: 'Rupture', variant: 'destructive' as const };
    if (product.quantity <= product.minQuantity) return { label: 'Stock faible', variant: 'destructive' as const };
    return { label: 'En stock', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      {/* Header et boutons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Gestion des produits</h2>
          <p className="text-gray-600">{filteredProducts.length} produit(s)</p>
        </div>
        <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau produit
        </Button>
      </div>

      {/* Filtres et tableau */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {mockCategories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Aucun produit trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => {
                  const category = mockCategories.find(c => c.id === product.categoryId);
                  const supplier = mockSuppliers.find(s => s.id === product.supplierId);
                  const status = getStockStatus(product);

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p>{product.name}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{category?.name}</TableCell>
                      <TableCell>{supplier?.name}</TableCell>
                      <TableCell className="text-right">{product.price.toFixed(2)}€</TableCell>
                      <TableCell className="text-right">{product.quantity} / {product.minQuantity}</TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteProductItem(product)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <ProductForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

      <AlertDialog open={!!deleteProductItem} onOpenChange={() => setDeleteProductItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit "{deleteProductItem?.name}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
