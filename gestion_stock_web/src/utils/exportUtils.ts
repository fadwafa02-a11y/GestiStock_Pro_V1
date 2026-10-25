import type { Product, Category, Supplier } from '../types';

export function generateCSV(
  products: Product[],
  categories: Category[],
  suppliers: Supplier[]
): string {
  const headers = ['Nom', 'Description', 'Catégorie', 'Fournisseur', 'Prix', 'Quantité', 'Stock Min'];
  
  const rows = products.map(product => {
    const category = categories.find(c => c.id === product.categoryId);
    const supplier = suppliers.find(s => s.id === product.supplierId);
    
    return [
      product.name,
      product.description,
      category?.name || 'N/A',
      supplier?.name || 'N/A',
      product.price.toFixed(2) + '€',
      product.quantity,
      product.minQuantity
    ];
  });

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  return csvContent;
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadPDF(content: string, filename: string): void {
  // Simuler un téléchargement PDF (dans un vrai projet, utiliser jsPDF ou pdfmake)
  const blob = new Blob([content], { type: 'application/pdf' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
