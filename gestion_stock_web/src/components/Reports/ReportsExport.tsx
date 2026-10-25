import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { generateCSV, downloadCSV } from '../../utils/exportUtils';
import { toast } from 'sonner';
import type { Product, Category, Supplier } from '../../types';
import { getProducts, getCategories, getSuppliers } from '../../api/reportApi';

export function ReportsExport() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [includeProducts, setIncludeProducts] = useState(true);
  const [includeCategories, setIncludeCategories] = useState(false);
  const [includeSuppliers, setIncludeSuppliers] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prods, cats, sups] = await Promise.all([
        getProducts(),
        getCategories(),
        getSuppliers()
      ]);
      setProducts(prods);
      setCategories(cats);
      setSuppliers(sups);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleExportCSV = () => {
    const csvContent = generateCSV(products, categories, suppliers);
    const filename = `stock_rapport_${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csvContent, filename);
    toast.success('Rapport CSV téléchargé');
  };

  const handleExportPDF = () => {
    // Simulation d'export PDF
    const filename = `stock_rapport_${new Date().toISOString().split('T')[0]}.pdf`;
    toast.info('Génération du PDF en cours...');
    setTimeout(() => {
      toast.success('Rapport PDF téléchargé (simulé)');
    }, 1000);
  };

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
    lowStock: products.filter(p => p.quantity <= p.minQuantity).length,
    outOfStock: products.filter(p => p.quantity === 0).length,
    categories: categories.length,
    suppliers: suppliers.length
  };

  if (loading) return <p>Chargement des données...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Rapports et exports</h2>
        <p className="text-gray-600">Générez et téléchargez des rapports de stock</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Statistiques du stock</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total produits</p>
                <p>{stats.totalProducts}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Valeur totale</p>
                <p>{stats.totalValue.toFixed(2)}€</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Stock faible</p>
                <p>{stats.lowStock} produit(s)</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Rupture de stock</p>
                <p>{stats.outOfStock} produit(s)</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Catégories</p>
                <p>{stats.categories}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Fournisseurs</p>
                <p>{stats.suppliers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Détails par catégorie</h3>
            <div className="space-y-3">
              {categories.map(category => {
                const categoryProducts = products.filter(p => p.categoryId === category.id);
                const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

                return (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p>{category.name}</p>
                      <p className="text-sm text-gray-600">{categoryProducts.length} produit(s)</p>
                    </div>
                    <p className="text-sm">{categoryValue.toFixed(2)}€</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Options d'export</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="products" 
                  checked={includeProducts}
                  onCheckedChange={(checked) => setIncludeProducts(checked as boolean)}
                />
                <Label htmlFor="products" className="cursor-pointer">
                  Inclure les produits
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="categories"
                  checked={includeCategories}
                  onCheckedChange={(checked) => setIncludeCategories(checked as boolean)}
                />
                <Label htmlFor="categories" className="cursor-pointer">
                  Inclure les catégories
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="suppliers"
                  checked={includeSuppliers}
                  onCheckedChange={(checked) => setIncludeSuppliers(checked as boolean)}
                />
                <Label htmlFor="suppliers" className="cursor-pointer">
                  Inclure les fournisseurs
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={handleExportCSV}
                disabled={!includeProducts && !includeCategories && !includeSuppliers}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Exporter en CSV
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={handleExportPDF}
                disabled={!includeProducts && !includeCategories && !includeSuppliers}
              >
                <FileText className="mr-2 h-4 w-4" />
                Exporter en PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
