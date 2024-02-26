export const sampleData = [
  {
    id: 1,
    name: "Pizza Cheese",
    preparingTime: "10-20",
    price: 75000,
    favorite: true,
    origins: ["italy"],
    stars: 4.8,
    imageUrl: "pizza.jpg",
    tags: ["fast-food", "lunch", "pizza"],
  },
  {
    id: 2,
    name: "Ratatouille",
    preparingTime: "15-20",
    price: 50000,
    favorite: false,
    origins: ["france", "italy", "germany"],
    stars: 4.0,
    imageUrl: "ratatoullie.jpg",
    tags: ["vegetable", "lunch", "vegan"],
  },
  {
    id: 3,
    name: "Sushi",
    preparingTime: "10-15",
    price: 100000,
    favorite: true,
    origins: ["Japan"],
    stars: 4.9,
    imageUrl: "sushi.jpg",
    tags: ["asia", "fish"],
  },
  {
    id: 4,
    name: "Nasi Goreng",
    preparingTime: "15-25",
    price: 50000,
    favorite: true,
    origins: ["Indonesia"],
    stars: 4.9,
    imageUrl: "nasigoreng.jpg",
    tags: ["slow-food", "lunch", "asia"],
  },
  {
    id: 5,
    name: "Pasta",
    preparingTime: "15-25",
    price: 35000,
    favorite: true,
    origins: ["Italy", "China"],
    stars: 4.9,
    imageUrl: "pasta.jpg",
    tags: ["fast-food", "lunch"],
  },
  {
    id: 6,
    name: "Pizza Canberra",
    preparingTime: "15-25",
    price: 35000,
    favorite: true,
    origins: ["Italy"],
    stars: 4.8,
    imageUrl: "pizza.jpg",
    tags: ["fast-food", "lunch"],
  },
];

export const SampleCarts = [
  {
    id: 2,
    name: "Ratatouille",
    preparingTime: "15-20",
    price: 50000,
    totalPrice: 100000,
    favorite: false,
    origins: ["france", "italy", "germany"],
    stars: 4.0,
    imageUrl: "ratatoullie.jpg",
    tags: ["vegetable", "lunch", "vegan"],
    quantity: 2,
  },
  {
    id: 3,
    name: "Sushi",
    preparingTime: "10-15",
    price: 100000,
    totalPrice: 100000,
    favorite: true,
    origins: ["Japan"],
    stars: 4.9,
    imageUrl: "sushi.jpg",
    tags: ["asia", "fish"],
    quantity: 1,
  },
  {
    id: 5,
    name: "Pasta",
    preparingTime: "15-25",
    price: 35000,
    totalPrice: 105000,
    favorite: true,
    origins: ["Italy", "China"],
    stars: 4.9,
    imageUrl: "pasta.jpg",
    tags: ["fast-food", "lunch"],
    quantity: 3,
  },
  {
    id: 1,
    name: "Pizza Canberra",
    preparingTime: "15-25",
    price: 35000,
    totalPrice: 105000,
    favorite: true,
    origins: ["Italy"],
    stars: 4.8,
    imageUrl: "pizza.jpg",
    tags: ["FastFood", "lunch"],
    quantity: 3,
  },
];

export const sampleTags = [
  "pizza",
  "vegetable",
  "vegan",
  "fish",
  "slow-food",
  "asia",
  "fast-food",
  "lunch",
];

export const SampleUsers = [
  {
    id: 1,
    username: "Aerith Gainsborough",
    email: "aerith@example.com",
    password: "123",
    isAdmin: false,
    address: "Seven Star No.7",
  },
  {
    id: 2,
    username: "Violet Evergarden",
    email: "violet@example.com",
    password: "123",
    isAdmin: true,
    address: "Evergarden No.12",
  },
];
