import type { User, Category, Supplier, Product, StockMovement } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Administrateur'
  },
  {
    id: '2',
    username: 'employe',
    password: 'employe123',
    role: 'employee',
    name: 'Jean Dupont'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Électronique',
    description: 'Produits électroniques et accessoires'
  },
  {
    id: '2',
    name: 'Alimentation',
    description: 'Produits alimentaires et boissons'
  },
  {
    id: '3',
    name: 'Bureautique',
    description: 'Fournitures de bureau'
  },
  {
    id: '4',
    name: 'Mobilier',
    description: 'Meubles et équipements'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechSupply Pro',
    contact: 'Marie Laurent',
    phone: '01 23 45 67 89',
    email: 'contact@techsupply.fr',
    address: '15 Rue de la Tech, 75001 Paris'
  },
  {
    id: '2',
    name: 'AlimDistrib',
    contact: 'Pierre Martin',
    phone: '01 98 76 54 32',
    email: 'info@alimdistrib.fr',
    address: '8 Avenue du Commerce, 69001 Lyon'
  },
  {
    id: '3',
    name: 'Bureau Plus',
    contact: 'Sophie Dubois',
    phone: '04 56 78 90 12',
    email: 'contact@bureauplus.fr',
    address: '22 Boulevard des Fournitures, 33000 Bordeaux'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ordinateur portable Dell',
    description: 'Ordinateur portable 15 pouces, 16GB RAM, 512GB SSD',
    categoryId: '1',
    supplierId: '1',
    price: 899.99,
    quantity: 5,
    minQuantity: 10,
    createdAt: new Date(2024, 0, 15).toISOString(),
    updatedAt: new Date(2024, 10, 1).toISOString()
  },
  {
    id: '2',
    name: 'Souris sans fil Logitech',
    description: 'Souris ergonomique sans fil',
    categoryId: '1',
    supplierId: '1',
    price: 29.99,
    quantity: 3,
    minQuantity: 15,
    createdAt: new Date(2024, 1, 20).toISOString(),
    updatedAt: new Date(2024, 10, 2).toISOString()
  },
  {
    id: '3',
    name: 'Café en grains 1kg',
    description: 'Café arabica premium',
    categoryId: '2',
    supplierId: '2',
    price: 15.50,
    quantity: 50,
    minQuantity: 20,
    createdAt: new Date(2024, 2, 10).toISOString(),
    updatedAt: new Date(2024, 10, 3).toISOString()
  },
  {
    id: '4',
    name: 'Ramettes papier A4',
    description: 'Lot de 5 ramettes de papier blanc A4',
    categoryId: '3',
    supplierId: '3',
    price: 25.00,
    quantity: 8,
    minQuantity: 10,
    createdAt: new Date(2024, 3, 5).toISOString(),
    updatedAt: new Date(2024, 10, 4).toISOString()
  },
  {
    id: '5',
    name: 'Stylos bille (boîte de 50)',
    description: 'Stylos bille bleus, qualité professionnelle',
    categoryId: '3',
    supplierId: '3',
    price: 12.50,
    quantity: 25,
    minQuantity: 10,
    createdAt: new Date(2024, 4, 12).toISOString(),
    updatedAt: new Date(2024, 10, 5).toISOString()
  },
  {
    id: '6',
    name: 'Chaise de bureau ergonomique',
    description: 'Chaise avec support lombaire réglable',
    categoryId: '4',
    supplierId: '3',
    price: 199.99,
    quantity: 2,
    minQuantity: 5,
    createdAt: new Date(2024, 5, 8).toISOString(),
    updatedAt: new Date(2024, 10, 6).toISOString()
  },
  {
    id: '7',
    name: 'Clavier mécanique',
    description: 'Clavier RGB avec switches mécaniques',
    categoryId: '1',
    supplierId: '1',
    price: 89.99,
    quantity: 15,
    minQuantity: 10,
    createdAt: new Date(2024, 6, 15).toISOString(),
    updatedAt: new Date(2024, 10, 7).toISOString()
  },
  {
    id: '8',
    name: 'Eau minérale (pack de 6)',
    description: 'Bouteilles d\'eau minérale 1.5L',
    categoryId: '2',
    supplierId: '2',
    price: 3.50,
    quantity: 100,
    minQuantity: 50,
    createdAt: new Date(2024, 7, 20).toISOString(),
    updatedAt: new Date(2024, 11, 1).toISOString()
  }
];

export const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    type: 'in',
    quantity: 10,
    date: new Date(2024, 9, 1).toISOString(),
    reason: 'Réapprovisionnement',
    user: 'Jean Dupont'
  },
  {
    id: '2',
    productId: '1',
    type: 'out',
    quantity: 5,
    date: new Date(2024, 9, 15).toISOString(),
    reason: 'Vente client',
    user: 'Jean Dupont'
  },
  {
    id: '3',
    productId: '3',
    type: 'in',
    quantity: 30,
    date: new Date(2024, 9, 20).toISOString(),
    reason: 'Réapprovisionnement',
    user: 'Administrateur'
  },
  {
    id: '4',
    productId: '2',
    type: 'out',
    quantity: 7,
    date: new Date(2024, 10, 1).toISOString(),
    reason: 'Utilisation interne',
    user: 'Jean Dupont'
  }
];
