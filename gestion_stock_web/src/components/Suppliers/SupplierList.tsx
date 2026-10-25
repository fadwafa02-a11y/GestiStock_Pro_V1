import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus, Edit, Trash2, Box } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { SupplierForm } from "./SupplierForm";
import type { Supplier } from "../../types";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../../api/supplierApi";

export function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [deleteSupplierItem, setDeleteSupplierItem] = useState<Supplier | null>(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleSaveSupplier = async (supplier: Supplier) => {
    try {
      if (editingSupplier) {
        const updated = await updateSupplier(supplier);
        setSuppliers(suppliers.map(s => s.id === updated.id ? updated : s));
        toast.success("Fournisseur modifié avec succès");
      } else {
        const created = await createSupplier(supplier);
        setSuppliers([...suppliers, created]);
        toast.success("Fournisseur ajouté avec succès");
      }
      setIsFormOpen(false);
      setEditingSupplier(null);
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement du fournisseur");
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteSupplierItem) return;

    try {
      await deleteSupplier(deleteSupplierItem.id);
      setSuppliers(suppliers.filter(s => s.id !== deleteSupplierItem.id));
      toast.success("Fournisseur supprimé avec succès");
      setDeleteSupplierItem(null);
    } catch (error) {
      toast.error("Erreur lors de la suppression du fournisseur");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Gestion des fournisseurs</h2>
          <p className="text-gray-600">{suppliers.length} fournisseur(s)</p>
        </div>
        <Button onClick={() => { setEditingSupplier(null); setIsFormOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Nouveau fournisseur
        </Button>
      </div>

      {suppliers.length === 0 ? (
        <Card className="p-12 text-center">
          <Box className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">Aucun fournisseur</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map(supplier => (
            <Card key={supplier.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg">{supplier.name}</h3>
                  <Badge variant="secondary" className="mt-1">{supplier.contact}</Badge>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{supplier.address}</p>
              <p className="text-gray-600 text-sm mb-4">{supplier.phone} | {supplier.email}</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(supplier)}>
                  <Edit className="h-4 w-4 mr-1" /> Modifier
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDeleteSupplierItem(supplier)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <SupplierForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        supplier={editingSupplier}
        onSave={handleSaveSupplier}
      />

      <AlertDialog open={!!deleteSupplierItem} onOpenChange={() => setDeleteSupplierItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le fournisseur "{deleteSupplierItem?.name}" ? Cette action est irréversible.
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
