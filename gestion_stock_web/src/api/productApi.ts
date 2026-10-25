// src/api/productApi.ts
import axios from 'axios';
import type { Product } from '../types';

const API_URL = 'http://localhost:8080/products'; // Remplace par l'URL de ton backend si nécessaire

/**
 * Récupère tous les produits depuis le backend
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

/**
 * Sauvegarde un produit (POST) sur le backend
 */
export const saveProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit :', error);
    throw error;
  }
};

/**
 * Met à jour un produit existant (PUT) sur le backend
 */
export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.put<Product>(`${API_URL}/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit :', error);
    throw error;
  }
};

/**
 * Supprime un produit (DELETE) par ID
 */
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du produit :', error);
    throw error;
  }
};
