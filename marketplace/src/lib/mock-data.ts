import { Item } from '@/types/item'; 

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Espada do Cavaleiro',
    description: 'Uma espada forjada com honra.',
    rarity: 'Raro',
    type: 'Arma',
    imageUrl: '/assets/sword_01.png', // Exemplo, ajuste o caminho
    attributes: { dano: 25 },
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Escudo de Ferro',
    description: 'Resistente a ataques comuns.',
    rarity: 'Comum',
    type: 'Escudo',
    imageUrl: '/assets/shield_02.png', // Exemplo, ajuste o caminho
    attributes: { defesa: 20 },
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Elmo Alado',
    description: 'Um elmo que pertenceu a um herói lendário.',
    rarity: 'Épico',
    type: 'Armadura',
    imageUrl: '/assets/helmet_05.png', // Exemplo, ajuste o caminho
    attributes: { defesa: 15, agilidade: 5 },
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Poção de Grande Cura',
    description: 'Restaura uma grande quantidade de vida.',
    rarity: 'Raro',
    type: 'Poção',
    imageUrl: '/assets/potion_03.png', // Exemplo, ajuste o caminho
    attributes: { cura: 100 },
    createdAt: new Date(),
  },
  
];