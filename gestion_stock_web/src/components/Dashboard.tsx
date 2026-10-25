import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

import type { View, Product, Category, StockMovement } from '../types';

import { getProducts } from '../api/productApi';
import { getCategories } from '../api/categoryApi';
import { getStockMovements } from '../api/stockMovementApi';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Charger toutes les données au démarrage
  useEffect(() => {
    async function loadData() {
      try {
        const [prodData, catData, moveData] = await Promise.all([
          getProducts(),
          getCategories(),
          getStockMovements()
        ]);

        setProducts(prodData);
        setCategories(catData);
        setMovements(moveData);
      } catch (error) {
        console.error("Erreur lors du chargement du Dashboard :", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Chargement du tableau de bord...</p>;
  }

  // 📌 Calculs avec les données du backend
  const lowStockProducts = products.filter(p => p.quantity <= p.minQuantity);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const recentMovements = movements.slice(0, 5);

  const stats = [
    {
      title: 'Total produits',
      value: products.length,
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Alertes stock',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      change: lowStockProducts.length > 0 ? 'Attention' : 'OK',
      trend: lowStockProducts.length > 0 ? 'down' : 'up'
    },
    {
      title: 'Valeur stock',
      value: totalValue.toFixed(2) + '€',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Mouvements (7j)',
      value: movements.length,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
      change: '+8%',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Tableau de bord</h2>
        <p className="text-gray-600">Vue d'ensemble de votre gestion de stock</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ALERTES STOCK */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Alertes stock faible</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('alerts')}>
              Voir tout
            </Button>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Aucune alerte stock</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map(product => {
                const category = categories.find(c => c.id === product.categoryId);
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex-1">
                      <p className="text-sm mb-1">{product.name}</p>
                      <p className="text-xs text-gray-600">{category?.name}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive" className="text-xs">
                        {product.quantity} / {product.minQuantity}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* MOUVEMENTS RECENTS */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Mouvements récents</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('stock')}>
              Voir tout
            </Button>
          </div>

          {recentMovements.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Aucun mouvement</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMovements.map(movement => {
                const product = products.find(p => p.id === movement.productId);
                return (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`p-2 rounded ${movement.type === 'in' ? 'bg-green-100' : 'bg-orange-100'}`}
                      >
                        {movement.type === 'in' ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{product?.name}</p>
                        <p className="text-xs text-gray-600">{movement.reason}</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className={`text-sm ${movement.type === 'in' ? 'text-green-600' : 'text-orange-600'}`}>
                        {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(movement.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* RÉPARTITION PAR CATÉGORIE */}
      <Card className="p-6">
        <h3 className="mb-4">Répartition par catégorie</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => {
            const categoryProducts = products.filter(p => p.categoryId === category.id);
            const categoryValue = categoryProducts.reduce(
              (sum, p) => sum + (p.price * p.quantity),
              0
            );

            return (
              <div key={category.id} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{category.name}</p>
                <p className="mb-1">{categoryProducts.length}</p>
                <p className="text-xs text-gray-500">{categoryValue.toFixed(2)}€</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
