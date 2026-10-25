import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { UserForm } from './UserForm';
import { Plus, Edit, Trash2, Users, Shield } from 'lucide-react';
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
import type { User } from '../../types';
import * as userApi from '../../api/userApi';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch {
      toast.error('Erreur lors du chargement des utilisateurs');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (user: User) => {
    try {
      if (editingUser) {
        await userApi.updateUser(user);
        toast.success('Utilisateur modifié avec succès');
      } else {
        await userApi.createUser(user);
        toast.success('Utilisateur créé avec succès');
      }
      fetchUsers();
      setIsFormOpen(false);
      setEditingUser(null);
    } catch {
      toast.error('Erreur lors de la sauvegarde de l’utilisateur');
    }
  };

  const handleDelete = async () => {
    if (deleteUser) {
      try {
        await userApi.deleteUser(deleteUser.id);
        toast.success('Utilisateur supprimé');
        fetchUsers();
        setDeleteUser(null);
      } catch {
        toast.error('Erreur lors de la suppression de l’utilisateur');
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const admins = users.filter(u => u.role === 'admin');
  const employees = users.filter(u => u.role === 'employee');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Gestion des utilisateurs</h2>
          <p className="text-gray-600">{users.length} utilisateur(s)</p>
        </div>
        <Button onClick={() => { setEditingUser(null); setIsFormOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Administrateurs</p>
              <p>{admins.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Employés</p>
              <p>{employees.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Nom d'utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Administrateur' : 'Employé'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteUser(user)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <UserForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        user={editingUser}
        onSave={handleSaveUser}
      />

      <AlertDialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur "{deleteUser?.name}" ? Cette action est irréversible.
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
