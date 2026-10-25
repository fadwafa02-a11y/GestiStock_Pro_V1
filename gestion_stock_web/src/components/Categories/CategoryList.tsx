// src/components/categories/CategoryList.tsx
import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CategoryForm } from './CategoryForm';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import { toast } from 'sonner';
import type { Category, Product } from '../../types';
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
import { getCategories, saveCategory, deleteCategory } from '../../api/categoryApi';
import { getProducts } from '../../api/productApi';

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCategoryItem, setDeleteCategoryItem] = useState<Category | null>(null);

  // Récupération des catégories et produits depuis le backend
  const fetchData = async () => {
    try {
      const [catData, prodData] = await Promise.all([getCategories(), getProducts()]);
      setCategories(catData);
      setProducts(prodData);
    } catch {
      toast.error("Erreur lors du chargement des données");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sauvegarde ou modification d'une catégorie
  const handleSaveCategory = async (category: Category) => {
    try {
      const saved = await saveCategory(category);
      setCategories((prev) => {
        const exists = prev.find((c) => c.id === saved.id);
        if (exists) return prev.map((c) => (c.id === saved.id ? saved : c));
        return [...prev, saved];
      });
      toast.success(`Catégorie ${category.id ? "modifiée" : "ajoutée"} avec succès`);
      setIsFormOpen(false);
      setEditingCategory(null);
    } catch {
      toast.error("Erreur lors de la sauvegarde de la catégorie");
    }
  };

  // Suppression d'une catégorie
  const handleDelete = async () => {
    if (!deleteCategoryItem) return;
    const productsInCategory = products.filter(p => p.categoryId === deleteCategoryItem.id);

    if (productsInCategory.length > 0) {
      toast.error(`Impossible de supprimer : ${productsInCategory.length} produit(s) dans cette catégorie`);
      setDeleteCategoryItem(null);
      return;
    }

    try {
      await deleteCategory(deleteCategoryItem.id);
      setCategories(categories.filter(c => c.id !== deleteCategoryItem.id));
      toast.success("Catégorie supprimée avec succès");
      setDeleteCategoryItem(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Gestion des catégories</h2>
          <p className="text-gray-600">{categories.length} catégorie(s)</p>
        </div>
        <Button onClick={() => { setEditingCategory(null); setIsFormOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle catégorie
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderTree className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">Aucune catégorie</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => {
            const productsCount = products.filter(p => p.categoryId === category.id).length;
            const totalValue = products
              .filter(p => p.categoryId === category.id)
              .reduce((sum, p) => sum + (p.price * p.quantity), 0);

            return (
              <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FolderTree className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg">{category.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {productsCount} produit(s)
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>

                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Valeur totale</p>
                  <p>{totalValue.toFixed(2)}€</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteCategoryItem(category)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <CategoryForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
      />

      <AlertDialog open={!!deleteCategoryItem} onOpenChange={() => setDeleteCategoryItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la catégorie "{deleteCategoryItem?.name}" ? Cette action est irréversible.
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
