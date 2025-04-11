
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'food' | 'dessert';
  popular?: boolean;
  vegan?: boolean;
  allergens?: string[];
}

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 1,
    name: "Algorithm Americano",
    description: "Strong black coffee to fuel your problem-solving sessions",
    price: 3.5,
    category: "coffee",
    popular: true
  },
  {
    id: 2,
    name: "Binary Brew",
    description: "Our house specialty coffee, served with a binary sugar code pattern",
    price: 4.25,
    category: "coffee"
  },
  {
    id: 3,
    name: "Complexity Cappuccino",
    description: "The perfect balance of espresso, steamed milk, and a complexity diagram in the foam",
    price: 4.75,
    category: "coffee"
  },
  {
    id: 4,
    name: "Dynamic Programming Doppio",
    description: "Double espresso shot for those tough DP problems",
    price: 3.75,
    category: "coffee"
  },
  
  // Tea
  {
    id: 5,
    name: "Backtracking Black Tea",
    description: "Robust black tea to help you explore all possible solutions",
    price: 3.25,
    category: "tea",
    vegan: true
  },
  {
    id: 6,
    name: "Graph Theory Green Tea",
    description: "Refreshing green tea to keep you connected to your problem",
    price: 3.5,
    category: "tea",
    vegan: true
  },
  
  // Food
  {
    id: 7,
    name: "Recursion Reuben",
    description: "A sandwich that calls itself - corned beef, swiss cheese, sauerkraut, Russian dressing",
    price: 12.5,
    category: "food",
    popular: true,
    allergens: ["gluten", "dairy"]
  },
  {
    id: 8,
    name: "Tree Traversal Toast",
    description: "Avocado toast with nodes of tomato, traversed with a balsamic reduction",
    price: 9.75,
    category: "food",
    vegan: true,
    allergens: ["gluten"]
  },
  {
    id: 9,
    name: "Hash Table Hummus",
    description: "Chickpea hummus with an efficient arrangement of veggie dippers",
    price: 8.5,
    category: "food",
    vegan: true
  },
  {
    id: 10,
    name: "Sorting Salad",
    description: "Vegetables perfectly sorted by color and nutrient value",
    price: 10.5,
    category: "food",
    vegan: true
  },
  
  // Desserts
  {
    id: 11,
    name: "String Manipulation S'mores",
    description: "Deconstructed s'mores with chocolate syntax highlighting",
    price: 6.5,
    category: "dessert",
    popular: true,
    allergens: ["gluten", "dairy"]
  },
  {
    id: 12,
    name: "Bit Manipulation Brownies",
    description: "Rich chocolate brownies with a pattern of ones and zeros in the frosting",
    price: 5.75,
    category: "dessert",
    allergens: ["gluten", "dairy", "eggs"]
  }
];
