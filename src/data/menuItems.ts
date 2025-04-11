
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'food' | 'dessert';
  popular?: boolean;
  vegan?: boolean;
  allergens?: string[];
  image?: string;
}

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 1,
    name: "Algorithm Americano",
    description: "Strong black coffee to fuel your problem-solving sessions",
    price: 3.5,
    category: "coffee",
    popular: true,
    image: "https://placehold.co/400x300/e2a952/1d1e26/png?text=Algorithm+Americano"
  },
  {
    id: 2,
    name: "Binary Brew",
    description: "Our house specialty coffee, served with a binary sugar code pattern",
    price: 4.25,
    category: "coffee",
    image: "https://placehold.co/400x300/e2a952/1d1e26/png?text=Binary+Brew"
  },
  {
    id: 3,
    name: "Masala Espresso",
    description: "Strong espresso infused with Indian spices for an aromatic coding experience",
    price: 4.75,
    category: "coffee",
    popular: true,
    image: "https://placehold.co/400x300/e2a952/1d1e26/png?text=Masala+Espresso"
  },
  {
    id: 4,
    name: "Code Kaapi",
    description: "South Indian filter coffee, strong and frothy - perfect for debugging sessions",
    price: 3.75,
    category: "coffee",
    image: "https://placehold.co/400x300/e2a952/1d1e26/png?text=Code+Kaapi"
  },
  
  // Tea
  {
    id: 5,
    name: "Backtracking Chai",
    description: "Traditional Indian masala chai to help you explore all solution paths",
    price: 3.25,
    category: "tea",
    popular: true,
    image: "https://placehold.co/400x300/57a773/1d1e26/png?text=Backtracking+Chai"
  },
  {
    id: 6,
    name: "Graph Theory Green Tea",
    description: "Refreshing green tea to keep you connected to your problem",
    price: 3.5,
    category: "tea",
    vegan: true,
    image: "https://placehold.co/400x300/57a773/1d1e26/png?text=Graph+Theory+Green+Tea"
  },
  {
    id: 7,
    name: "Kashmiri Kahwa Algorithm",
    description: "Saffron-infused green tea with almonds and cardamom for algorithmic inspiration",
    price: 4.5,
    category: "tea",
    vegan: true,
    image: "https://placehold.co/400x300/57a773/1d1e26/png?text=Kashmiri+Kahwa+Algorithm"
  },
  
  // Food
  {
    id: 8,
    name: "Recursion Reuben",
    description: "A sandwich that calls itself - corned beef, swiss cheese, sauerkraut, Russian dressing",
    price: 12.5,
    category: "food",
    allergens: ["gluten", "dairy"],
    image: "https://placehold.co/400x300/e25252/1d1e26/png?text=Recursion+Reuben"
  },
  {
    id: 9,
    name: "Pointer Paneer Tikka",
    description: "Chunks of paneer marinated in spices and grilled to perfection with bell peppers",
    price: 9.75,
    category: "food",
    popular: true,
    vegan: true,
    image: "https://placehold.co/400x300/e25252/1d1e26/png?text=Pointer+Paneer+Tikka"
  },
  {
    id: 10,
    name: "Hash Table Hummus",
    description: "Chickpea hummus with an efficient arrangement of veggie dippers",
    price: 8.5,
    category: "food",
    vegan: true,
    image: "https://placehold.co/400x300/e25252/1d1e26/png?text=Hash+Table+Hummus"
  },
  {
    id: 11,
    name: "Samosa Sorting Array",
    description: "Crispy triangular pastries filled with spiced potatoes and peas, sorted by spice level",
    price: 7.5,
    category: "food",
    vegan: true,
    popular: true,
    allergens: ["gluten"],
    image: "https://placehold.co/400x300/e25252/1d1e26/png?text=Samosa+Sorting+Array"
  },
  {
    id: 12,
    name: "Binary Search Biryani",
    description: "Fragrant rice dish with vegetables and spices, stratified for optimal flavor searching",
    price: 13.5,
    category: "food",
    vegan: true,
    image: "https://placehold.co/400x300/e25252/1d1e26/png?text=Binary+Search+Biryani"
  },
  
  // Desserts
  {
    id: 13,
    name: "String Manipulation S'mores",
    description: "Deconstructed s'mores with chocolate syntax highlighting",
    price: 6.5,
    category: "dessert",
    allergens: ["gluten", "dairy"],
    image: "https://placehold.co/400x300/9c528b/1d1e26/png?text=String+Manipulation+S'mores"
  },
  {
    id: 14,
    name: "Gulab Jamun Generics",
    description: "Soft, spongy milk solids soaked in rose and cardamom syrup, adaptable to any coding scenario",
    price: 5.75,
    category: "dessert",
    popular: true,
    allergens: ["gluten", "dairy"],
    image: "https://placehold.co/400x300/9c528b/1d1e26/png?text=Gulab+Jamun+Generics"
  },
  {
    id: 15,
    name: "Jalebi Joins",
    description: "Crispy, syrup-soaked funnel cakes that connect nested loops of flavor",
    price: 6.25,
    category: "dessert",
    allergens: ["gluten"],
    image: "https://placehold.co/400x300/9c528b/1d1e26/png?text=Jalebi+Joins"
  }
];
