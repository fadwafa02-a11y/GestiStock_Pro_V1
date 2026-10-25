import axios from "axios";
import type { Product, Category, Supplier } from "../types";

const API_URL = "http://localhost:8080";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${API_URL}/categories`);
    return response.data;
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return [];
  }
};

export const getSuppliers = async (): Promise<Supplier[]> => {
  try {
    const response = await axios.get<Supplier[]>(`${API_URL}/suppliers`);
    return response.data;
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des fournisseurs :", error);
    return [];
  }
};
