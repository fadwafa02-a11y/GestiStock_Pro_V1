import axios from "axios";
import type { Supplier } from "../types";

const BASE_URL = "http://localhost:8080/suppliers";

export async function getSuppliers(): Promise<Supplier[]> {
  try {
    const response = await axios.get<Supplier[]>(BASE_URL); // <-- Typage ici
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des fournisseurs :", error);
    return []; // On renvoie un tableau vide en cas d'erreur
  }
}

export async function createSupplier(supplier: Supplier): Promise<Supplier> {
  try {
    const response = await axios.post<Supplier>(BASE_URL, supplier);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du fournisseur :", error);
    throw error;
  }
}

export async function updateSupplier(supplier: Supplier): Promise<Supplier> {
  try {
    const response = await axios.put<Supplier>(`${BASE_URL}/${supplier.id}`, supplier);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification du fournisseur :", error);
    throw error;
  }
}

export async function deleteSupplier(id: string): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du fournisseur :", error);
    throw error;
  }
}
