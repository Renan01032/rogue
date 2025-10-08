export type Item = {
  id: string;
  name: string;
  description: string | null; // A descrição pode ser opcional (nula)
  rarity: string;
  type: string;
  imageUrl: string;
  
  attributes: any; 
  
  createdAt: Date; 
};