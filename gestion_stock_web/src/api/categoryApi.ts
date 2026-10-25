// src/api/categoryApi.ts
import axios from "axios";
import type { Category } from "../types";

const API_URL = "http://localhost:8080/categories";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return [];
  }
};

export const saveCategory = async (category: Category): Promise<Category> => {
  try {
    if (category.id) {
      const response = await axios.put<Category>(`${API_URL}/${category.id}`, category);
      return response.data;
    } else {
      const response = await axios.post<Category>(API_URL, category);
      return response.data;
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la catégorie :", error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    throw error;
  }
};
