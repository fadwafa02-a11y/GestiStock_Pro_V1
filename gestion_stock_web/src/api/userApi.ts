import axios from "axios";
import type { User } from "../types";

const API_URL = "http://localhost:8080/users";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    // Tu peux renvoyer un tableau vide ou relancer l'erreur
    return [];
  }
};

export const createUser = async (user: User): Promise<User | null> => {
  try {
    const response = await axios.post<User>(API_URL, user);
    return response.data;
  } catch (error: unknown) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return null;
  }
};

export const updateUser = async (user: User): Promise<User | null> => {
  try {
    const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
    return response.data;
  } catch (error: unknown) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error: unknown) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return false;
  }
};
