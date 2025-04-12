
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
      "id": 1,
      "name": "Filter Coffee",
      "description": "A South Indian specialty. Expertly handcrafted to deliver excellence in every sip.",
      "price": 250,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Filter+Coffee",
      "allergens": []
    },
    {
      "id": 2,
      "name": "Caffe Latte",
      "description": "Rich espresso blended with steamed milk and a light layer of foam.",
      "price": 235,
      "popular": true,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Caffe+Latte",
      "allergens": ["milk"]
    },
    {
      "id": 3,
      "name": "Caffe Mocha",
      "description": "Full-bodied espresso meets bittersweet mocha sauce and freshly steamed milk.",
      "price": 315,
      "category": "coffee",
      "popular": true,
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Caffe+Mocha",
      "allergens": ["milk"]
    },
    {
      "id": 4,
      "name": "Caramel Macchiato",
      "description": "Espresso poured over steamed milk infused with vanilla syrup, topped with caramel drizzle.",
      "price": 335,
      "popular": true,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Caramel+Macchiato",
      "allergens": ["milk"]
    },
    {
      "id": 5,
      "name": "Classic Iced Coffee",
      "description": "Savour our premium coffee made with top 3% Arabica beans in an all new iced avatar.",
      "price": 295,
      "popular": true,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Flat+White",
      "allergens": []
    },
    {
      "id": 6,
      "name": "Doppio Espresso",
      "description": "A double shot of pure intense coffee flavor.",
      "price": 110,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Doppio+Espresso",
      "allergens": []
    },
    {
      "id": 7,
      "name": "Vanilla Latte",
      "description": "Rich espresso, vanilla flavored syrup, and creamy steamed milk.",
      "price": 280,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Vanilla+Latte",
      "allergens": ["milk"]
    },
    {
      "id": 8,
      "name": "Hazelnut Latte",
      "description": "Rich espresso, hazelnut flavored syrup, and creamy steamed milk.",
      "price": 280,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Hazelnut+Latte",
      "allergens": ["milk"]
    },
    {
      "id": 9,
      "name": "Cappuccino",
      "description": "Dark, Rich in flavour espresso lies in wait under a smoothed and stretched layer of thick foam",
      "price": 325,
      "popular": true,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=White+Chocolate+Mocha",
      "allergens": ["milk"]
    },
    {
      "id": 10,
      "name": "Signature Hot Chocolate",
      "description": "A caffeine-free delight created from real chocolate shavings and steamed milk, topped with whipped cream.",
      "price": 255,
      "popular": true,
      "vegan": true,
      "category": "coffee",
      "image": "https://placehold.co/400x300/e2a952/1d1e26/png?text=Signature+Hot+Chocolate",
      "allergens": ["milk"]
    },
    {
      "id": 11,
      "name": "Masala Chai",
      "description": "Traditional Indian masala chai infused with spices and served hot.",
      "price": 190,
      "category": "tea",
      "image": "https://placehold.co/400x300/57a773/1d1e26/png?text=Masala+Chai",
      "allergens": ["milk"]
    },
    {
      "id": 12,
      "name": "Cardamom Chai",
      "description": "A fragrant blend of black tea infused with cardamom and spices.",
      "price": 190,
      "category": "tea",
      "image": "https://placehold.co/400x300/57a773/1d1e26/png?text=Cardamom+Chai",
      "allergens": ["milk"]
    },
    {
      "id": 13,
      "name": "Green Tea Latte",
      "description": "Creamy matcha, lightly sweetened, and paired with steamed milk for a delightful experience.",
      "price": 290,
      "category": "tea",
      "image": "https://placehold.co/400x300/57a773/1d1e26/png?text=Green+Tea+Latte",
      "allergens": ["milk"]
    },
    {
      "id": 14,
      "name": "Chai Tea Latte",
      "description": "Black tea infused with cinnamon, clove, and warming spices, mixed with milk for a comforting beverage.",
      "price": 285,
      "category": "tea",
      "image": "https://placehold.co/400x300/57a773/1d1e26/png?text=Chai+Tea+Latte",
      "allergens": ["milk"]
    },
    {
      "id": 15,
      "name": "Emperor’s Clouds and Mist Green Tea",
      "description": "A delicate and lightly smoky green tea with a smooth finish.",
      "price": 255,
      "category": "tea",
      "vegan": true,
      "image": "https://placehold.co/400x300/57a773/1d1e26/png?text=Emperor's+Clouds+and+Mist+Green+Tea",
      "allergens": []
    },
    {
      "id": 16,
      "name": "Iced Shaken Hibiscus & Passion Lemonade",
      "description": "A refreshing blend of hibiscus and passion fruit flavors, shaken with ice and lemonade.",
      "price": 260,
      "vegan": true,
      "category": "tea",
      "image": "https://placehold.co/400x300/57a773/1d1e26/png?text=Iced+Shaken+Hibiscus+&+Passion+Lemonade",
      "allergens": []
    },
    {
      "id": 17,
      "name": "Murgh Kathi Wrap",
      "description": "Spicy mélange of chicken, onion, peppers, and cheddar cheese wrapped in a soft parantha.",
      "price": 346.5,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Murgh+Kathi+Wrap",
      "allergens": ["milk", "wheat"]
    },
    {
      "id": 18,
      "name": "Butter Croissant",
      "description": "A flaky and buttery French-style pastry served with butter.",
      "price": 288.75,
      "popular": true,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Butter+Croissant",
      "allergens": ["milk", "wheat"]
    },
    {
      "id": 19,
      "name": "Chilli Cheese Toast",
      "description": "Cheesy and fiery snack on a toasted French-style baguette, topped with red, yellow, and green peppers.",
      "price": 372.75,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Chilli+Cheese+Toast",
      "allergens": ["milk", "wheat"]
    },
    {
      "id": 20,
      "name": "Murgh Kathi Wrap",
      "description": "Spicy melange of chicken, onion, peppers, and cheddar cheese wrapped in a soft flatbread.",
      "price": 383.25,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Murgh+Kathi+Wrap",
      "allergens": ["milk", "wheat"]
    },
    {
      "id": 21,
      "name": "Mushroom Cheese Melt Baguette Sandwich",
      "description": "Hearty mushrooms topped with melted yellow cheddar cheese.",
      "price": 472.50,
      "category": "food",
      "vegan": true,
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Kosha+Mangsho+Wrap"
    },
    {
      "id": 22,
      "name": "Tandoori Soya Chaap Wrap",
      "description": "Soft succulent soya chaap in tandoori marinade, cooked to a smoky finish and wrapped in flatbread.",
      "price": 367.50,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Tandoori+Soya+Chaap+Wrap"
    },
    {
      "id": 23,
      "name": "BBQ Chicken Wrap",
      "description": "Smoky chicken with chopped aromatic vegetables tossed in our special BBQ sauce, wrapped in flatbread.",
      "price": 378.00,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=BBQ+Chicken+Wrap"
    },
    {
      "id": 24,
      "name": "Bake In Mushroom Cheese Melt Baguette",
      "description": "Hearty mushrooms topped with melted yellow cheddar cheese in a herbed aioli, served in a baguette.",
      "price": 472.50,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Mushroom+Cheese+Melt+Baguette"
    },
    {
      "id": 25,
      "name": "Bake In Pesto Veggie Sourdough Sandwich",
      "description": "Sautéed broccoli florets and mushroom slices with chopped aromatic vegetables, served in sourdough bread.",
      "price": 430.50,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Pesto+Veggie+Sourdough+Sandwich"
    },
    {
      "id": 26,
      "name": "Bake In Sriracha Chicken Sourdough Sandwich",
      "description": "Spicy and tangy Sriracha grilled chicken shreds with the addition of sautéed vegetables, served in sourdough bread.",
      "price": 441.00,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Sriracha+Chicken+Sourdough+Sandwich"
    },
    {
      "id": 27,
      "name": "Basil Tomato Mozzarella Cheese Sandwich",
      "description": "Tomato and mozzarella slices on a layer of basil sauce sandwiched between bread.",
      "price": 399.00,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Basil+Tomato+Mozzarella+Cheese+Sandwich"
    },
    {
      "id": 28,
      "name": "Spinach & Corn Sandwich",
      "description": "A savory blend of spinach and corn, garlic & herb aioli, melted cheese, and jalapeños, sandwiched between bread.",
      "price": 273.00,
      "category": "food",
      "vegan": true,
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Spinach+%26+Corn+Sandwich"
    },
    {
      "id": 29,
      "name": "Chicken Salad Sandwich",
      "description": "Tender chicken mixed with julienned colored bell peppers, green onions, and a creamy dressing, sandwiched between bread.",
      "price": 294.00,
      "popular": true,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Chicken+Salad+Sandwich"
    },
    {
      "id": 30,
      "name": "Paneer Tikka Sandwich",
      "description": "Marinated tandoori paneer filling, sliced cheese, and whole wheat bread grilled to perfection.",
      "price": 294.00,
      "category": "food",
      "vegan": true,
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Paneer+Tikka+Sandwich"
    },
    {
      "id": 31,
      "name": "Chilli Paneer Sandwich",
      "description": "A tangy chilli paneer filling with chopped spinach tucked between slices of bread.",
      "price": 294.00,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Chilli+Paneer+Sandwich"
    },
    {
      "id": 32,
      "name": "Lebanese Chicken Sandwich",
      "description": "Tender malai chicken tikka, creamy garlic and herb aioli, and pickled vegetables sandwiched between bread.",
      "price": 299.25,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Lebanese+Chicken+Sandwich"
    },
    {
      "id": 33,
      "name": "Tandoori Chicken Panini Sandwich",
      "description": "Succulent chicken tikka, spicy tandoori mayo, red onions, and cheese grilled in soft panini bread.",
      "price": 404.25,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Tandoori+Chicken+Panini"
    },
    {
      "id": 34,
      "name": "Egg White & Cheese Croissant",
      "description": "Flaky croissant stuffed with fluffy egg whites and cheese, perfect for a light and savory bite.",
      "price": 346.50,
      "category": "food",
      "popular": true,
      "allergens": ["egg", "wheat"],
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Egg+White+Croissant"
    },
    {
      "id": 35,
      "name": "Chicken Keema Paratha",
      "description": "Flaky lachha paratha stuffed with spicy chicken keema filling, served warm.",
      "price": 378.00,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Chicken+Keema+Paratha"
    },
    {
      "id": 36,
      "name": "Peach & Yoghurt Parfait",
      "description": "Layered parfait with sweet peach compote, creamy yogurt, and crunchy granola.",
      "price": 273.00,
      "category": "food",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Peach+Yogurt+Parfait"
    },
    {
      "id": 37,
      "name": "Chocolate Cherry Parfait",
      "description": "A rich blend of chocolate mousse, cherry compote, and biscuit crumbs layered into a dessert parfait.",
      "price": 294.00,
      "vegan": true,
      "category": "dessert",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Chocolate+Cherry+Parfait"
    },
    {
      "id": 38,
      "name": "Blueberry Muffin",
      "description": "Classic soft muffin bursting with juicy blueberries, perfect for pairing with your coffee.",
      "price": 288.75,
      "popular": true,
      "category": "dessert",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Blueberry+Muffin"
    },
    {
      "id": 39,
      "name": "Chocolate Muffin",
      "description": "Rich and fluffy chocolate muffin loaded with chocolate chips for an indulgent treat.",
      "price": 288.75,
      "category": "dessert",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Chocolate+Muffin"
    },
    {
      "id": 40,
      "name": "Banana Chocolate Loaf",
      "description": "Moist banana loaf with swirls of chocolate and topped with chocolate chips.",
      "price": 267.75,
      "popular": true,
      "category": "dessert",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Banana+Chocolate+Loaf"
    },
    {
      "id": 41,
      "name": "New York Cheesecake",
      "description": "Creamy and classic New York-style baked cheesecake with a buttery biscuit base.",
      "price": 399.00,
      "popular": true,
      "category": "dessert",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=New+York+Cheesecake"
    },
    {
      "id": 42,
      "name": "Dutch Truffle Cake",
      "description": "Rich chocolate sponge layered with dark chocolate ganache and topped with chocolate flakes.",
      "price": 420.00,
      "category": "dessert",
      "image": "https://placehold.co/400x300/e25252/1d1e26/png?text=Dutch+Truffle+Cake"
    }
];
