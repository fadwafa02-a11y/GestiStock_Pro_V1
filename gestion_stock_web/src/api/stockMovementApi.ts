import axios from 'axios';
import type { StockMovement } from '../types';

const API_URL = 'http://localhost:8080/stock-movements';

export const getStockMovements = async (): Promise<StockMovement[]> => {
  try {
    const response = await axios.get<StockMovement[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des mouvements de stock :', error);
    throw error;
  }
};

export const createStockMovement = async (movement: StockMovement): Promise<StockMovement> => {
  try {
    const response = await axios.post<StockMovement>(API_URL, movement);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du mouvement :', error);
    throw error;
  }
};

export const updateStockMovement = async (movement: StockMovement): Promise<StockMovement> => {
  try {
    const response = await axios.put<StockMovement>(`${API_URL}/${movement.id}`, movement);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mouvement :', error);
    throw error;
  }
};

export const deleteStockMovement = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du mouvement :', error);
    throw error;
  }
};
