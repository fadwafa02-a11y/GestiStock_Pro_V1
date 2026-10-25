import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertTriangle, Package, ArrowRight } from 'lucide-react';
import { getProducts } from '../../api/productApi';
import { getCategories } from '../../api/categoryApi';
import { getSuppliers } from '../../api/supplierApi';
import type { Product, Category, Supplier, View } from '../../types';

interface StockAlertsProps {
  onNavigate: (view: View) => void;
}

export function StockAlerts({ onNavigate }: StockAlertsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [prodRes, catRes, supRes] = await Promise.all([
          getProducts(),
          getCategories(),
          getSuppliers(),
        ]);
        setProducts(prodRes);
        setCategories(catRes);
        setSuppliers(supRes);
      } catch (error) {
        console.error('Erreur lors du chargement des alertes de stock', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const criticalProducts = products.filter(p => p.quantity === 0);
  const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity <= p.minQuantity);
  const allAlerts = [...criticalProducts, ...lowStockProducts];

  if (loading) return <p>Chargement des alertes...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Alertes de stock</h2>
        <p className="text-gray-600">
          {allAlerts.length} alerte(s) nécessitant votre attention
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 border-red-200 bg-red-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Rupture de stock</p>
              <p className="text-red-600">{criticalProducts.length} produit(s)</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-orange-200 bg-orange-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Stock faible</p>
              <p className="text-orange-600">{lowStockProducts.length} produit(s)</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {criticalProducts.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Rupture de stock
          </h3>
          <div className="grid gap-4">
            {criticalProducts.map(product => {
              const category = categories.find(c => c.id === product.categoryId);
              const supplier = suppliers.find(s => s.id === product.supplierId);

              return (
                <Card key={product.id} className="p-5 border-red-200 bg-red-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="p-2 bg-red-100 rounded">
                          <Package className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="mb-1">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline">{category?.name}</Badge>
                        <Badge variant="outline">Fournisseur: {supplier?.name}</Badge>
                        <Badge variant="destructive">Stock: 0</Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => onNavigate('stock')}
                    >
                      Réapprovisionner
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {lowStockProducts.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-600" />
            Stock faible
          </h3>
          <div className="grid gap-4">
            {lowStockProducts.map(product => {
              const category = categories.find(c => c.id === product.categoryId);
              const supplier = suppliers.find(s => s.id === product.supplierId);

              return (
                <Card key={product.id} className="p-5 border-orange-200 bg-orange-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded">
                          <Package className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="mb-1">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline">{category?.name}</Badge>
                        <Badge variant="outline">Fournisseur: {supplier?.name}</Badge>
                        <Badge variant="secondary">
                          Stock: {product.quantity} / Min: {product.minQuantity}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onNavigate('stock')}
                    >
                      Réapprovisionner
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {allAlerts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h3 className="mb-2">Aucune alerte</h3>
          <p className="text-gray-600">
            Tous vos produits ont un stock suffisant
          </p>
        </Card>
      )}
    </div>
  );
}
