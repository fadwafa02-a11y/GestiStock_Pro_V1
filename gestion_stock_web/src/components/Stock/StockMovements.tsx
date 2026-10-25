import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { StockMovementForm } from './StockMovementForm';
import { Plus, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import type { StockMovement } from '../../types';
import * as stockMovementApi from '../../api/stockMovementApi';
import * as productApi from '../../api/productApi';

export function StockMovements() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [movementType, setMovementType] = useState<'in' | 'out'>('in');

  const fetchMovements = async () => {
    try {
      const data = await stockMovementApi.getStockMovements();
      setMovements(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch {
      toast.error('Erreur lors du chargement des mouvements de stock');
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await productApi.getProducts();
      setProducts(data);
    } catch {
      toast.error('Erreur lors du chargement des produits');
    }
  };

  useEffect(() => {
    fetchMovements();
    fetchProducts();
  }, []);

  const handleSaveMovement = async (movement: StockMovement) => {
    try {
      if (movement.id && movements.find(m => m.id === movement.id)) {
        await stockMovementApi.updateStockMovement(movement);
        toast.success('Mouvement mis à jour');
      } else {
        await stockMovementApi.createStockMovement(movement);
        toast.success('Mouvement ajouté');
      }
      fetchMovements();
      setIsFormOpen(false);
    } catch {
      toast.error('Erreur lors de la sauvegarde du mouvement');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await stockMovementApi.deleteStockMovement(id);
      toast.success('Mouvement supprimé');
      fetchMovements();
    } catch {
      toast.error('Erreur lors de la suppression du mouvement');
    }
  };

  const inMovements = movements.filter(m => m.type === 'in');
  const outMovements = movements.filter(m => m.type === 'out');

  const MovementsTable = ({ movements }: { movements: StockMovement[] }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Quantité</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Aucun mouvement enregistré
              </TableCell>
            </TableRow>
          ) : (
            movements.map(movement => {
              const product = products.find(p => p.id === movement.productId);
              return (
                <TableRow key={movement.id}>
                  <TableCell>{new Date(movement.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{product?.name || 'Inconnu'}</TableCell>
                  <TableCell>
                    <Badge variant={movement.type === 'in' ? 'default' : 'secondary'}>
                      {movement.type === 'in' ? (
                        <>
                          <ArrowUp className="h-3 w-3 mr-1" />
                          Entrée
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-3 w-3 mr-1" />
                          Sortie
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={movement.type === 'in' ? 'text-green-600' : 'text-orange-600'}>
                      {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{movement.reason}</TableCell>
                  <TableCell>{movement.user}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => { setIsFormOpen(true); setMovementType(movement.type); handleSaveMovement(movement); }}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(movement.id)}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Mouvements de stock</h2>
          <p className="text-gray-600">{movements.length} mouvement(s) total</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => { setMovementType('in'); setIsFormOpen(true); }}>
            <ArrowUp className="mr-2 h-4 w-4" /> Entrée stock
          </Button>
          <Button variant="outline" onClick={() => { setMovementType('out'); setIsFormOpen(true); }}>
            <ArrowDown className="mr-2 h-4 w-4" /> Sortie stock
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total mouvements</p>
              <p>{movements.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Entrées</p>
              <p>{inMovements.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ArrowUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Sorties</p>
              <p>{outMovements.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ArrowDown className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Tous ({movements.length})</TabsTrigger>
            <TabsTrigger value="in">Entrées ({inMovements.length})</TabsTrigger>
            <TabsTrigger value="out">Sorties ({outMovements.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all"><MovementsTable movements={movements} /></TabsContent>
          <TabsContent value="in"><MovementsTable movements={inMovements} /></TabsContent>
          <TabsContent value="out"><MovementsTable movements={outMovements} /></TabsContent>
        </Tabs>
      </Card>

      <StockMovementForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        type={movementType}
        onSave={handleSaveMovement}
      />
    </div>
  );
}
