/*
 * ShiftFit Price Database
 *
 * This is the internal price layer for Best Basket.
 *
 * Each product contains:
 * - id
 * - supermarket
 * - name
 * - category
 * - pack size
 * - price
 * - currency
 * - updatedAt
 *
 * Prices here are SEED DATA for development.
 * They are not represented as live supermarket prices.
 */

const UPDATED_AT = "2026-09-02";

export const supermarkets = {
  tesco: {
    id: "tesco",
    name: "Tesco"
  },

  sainsburys: {
    id: "sainsburys",
    name: "Sainsbury's"
  },

  asda: {
    id: "asda",
    name: "Asda"
  },

  morrisons: {
    id: "morrisons",
    name: "Morrisons"
  },

  waitrose: {
    id: "waitrose",
    name: "Waitrose"
  },

  aldi: {
    id: "aldi",
    name: "Aldi"
  }
};

/*
 * Seed products.
 *
 * Prices are deliberately kept in one central structure so that
 * future price imports can replace/update these records without
 * changing the Best Basket calculation engine.
 */

export const products = [
  // CHICKEN
  {
    id: "chicken-breast-tesco",
    retailer: "tesco",
    name: "Chicken breast",
    category: "meat",
    packSize: "1kg",
    price: 8.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "chicken-breast-sainsburys",
    retailer: "sainsburys",
    name: "Chicken breast",
    category: "meat",
    packSize: "1kg",
    price: 8.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "chicken-breast-asda",
    retailer: "asda",
    name: "Chicken breast",
    category: "meat",
    packSize: "1kg",
    price: 7.75,
    updatedAt: UPDATED_AT
  },
  {
    id: "chicken-breast-morrisons",
    retailer: "morrisons",
    name: "Chicken breast",
    category: "meat",
    packSize: "1kg",
    price: 8.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "chicken-breast-waitrose",
    retailer: "waitrose",
    name: "Chicken breast",
    category: "meat",
    packSize: "1kg",
    price: 10.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "chicken-breast-aldi",
    retailer: "aldi",
    name: "Chicken breast",
    category: "meat",
    packSize: "1kg",
    price: 7.49,
    updatedAt: UPDATED_AT
  },

  // LEAN BEEF MINCE
  {
    id: "beef-mince-tesco",
    retailer: "tesco",
    name: "Lean beef mince",
    category: "meat",
    packSize: "500g",
    price: 5.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "beef-mince-sainsburys",
    retailer: "sainsburys",
    name: "Lean beef mince",
    category: "meat",
    packSize: "500g",
    price: 5.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "beef-mince-asda",
    retailer: "asda",
    name: "Lean beef mince",
    category: "meat",
    packSize: "500g",
    price: 5.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "beef-mince-morrisons",
    retailer: "morrisons",
    name: "Lean beef mince",
    category: "meat",
    packSize: "500g",
    price: 5.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "beef-mince-waitrose",
    retailer: "waitrose",
    name: "Lean beef mince",
    category: "meat",
    packSize: "500g",
    price: 6.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "beef-mince-aldi",
    retailer: "aldi",
    name: "Lean beef mince",
    category: "meat",
    packSize: "500g",
    price: 4.49,
    updatedAt: UPDATED_AT
  },

  // TURKEY
  {
    id: "turkey-tesco",
    retailer: "tesco",
    name: "Lean turkey mince",
    category: "meat",
    packSize: "500g",
    price: 4.75,
    updatedAt: UPDATED_AT
  },
  {
    id: "turkey-sainsburys",
    retailer: "sainsburys",
    name: "Lean turkey mince",
    category: "meat",
    packSize: "500g",
    price: 4.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "turkey-asda",
    retailer: "asda",
    name: "Lean turkey mince",
    category: "meat",
    packSize: "500g",
    price: 4.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "turkey-morrisons",
    retailer: "morrisons",
    name: "Lean turkey mince",
    category: "meat",
    packSize: "500g",
    price: 4.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "turkey-waitrose",
    retailer: "waitrose",
    name: "Lean turkey mince",
    category: "meat",
    packSize: "500g",
    price: 5.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "turkey-aldi",
    retailer: "aldi",
    name: "Lean turkey mince",
    category: "meat",
    packSize: "500g",
    price: 3.99,
    updatedAt: UPDATED_AT
  },

  // SALMON
  {
    id: "salmon-tesco",
    retailer: "tesco",
    name: "Salmon",
    category: "fish",
    packSize: "300g",
    price: 5.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "salmon-sainsburys",
    retailer: "sainsburys",
    name: "Salmon",
    category: "fish",
    packSize: "300g",
    price: 5.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "salmon-asda",
    retailer: "asda",
    name: "Salmon",
    category: "fish",
    packSize: "300g",
    price: 5.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "salmon-morrisons",
    retailer: "morrisons",
    name: "Salmon",
    category: "fish",
    packSize: "300g",
    price: 5.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "salmon-waitrose",
    retailer: "waitrose",
    name: "Salmon",
    category: "fish",
    packSize: "300g",
    price: 6.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "salmon-aldi",
    retailer: "aldi",
    name: "Salmon",
    category: "fish",
    packSize: "300g",
    price: 4.49,
    updatedAt: UPDATED_AT
  },

  // EGGS
  {
    id: "eggs-tesco",
    retailer: "tesco",
    name: "Eggs",
    category: "dairy",
    packSize: "12",
    price: 2.75,
    updatedAt: UPDATED_AT
  },
  {
    id: "eggs-sainsburys",
    retailer: "sainsburys",
    name: "Eggs",
    category: "dairy",
    packSize: "12",
    price: 2.70,
    updatedAt: UPDATED_AT
  },
  {
    id: "eggs-asda",
    retailer: "asda",
    name: "Eggs",
    category: "dairy",
    packSize: "12",
    price: 2.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "eggs-morrisons",
    retailer: "morrisons",
    name: "Eggs",
    category: "dairy",
    packSize: "12",
    price: 2.65,
    updatedAt: UPDATED_AT
  },
  {
    id: "eggs-waitrose",
    retailer: "waitrose",
    name: "Eggs",
    category: "dairy",
    packSize: "12",
    price: 3.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "eggs-aldi",
    retailer: "aldi",
    name: "Eggs",
    category: "dairy",
    packSize: "12",
    price: 2.29,
    updatedAt: UPDATED_AT
  },

  // GREEK YOGHURT
  {
    id: "yoghurt-tesco",
    retailer: "tesco",
    name: "Greek yoghurt",
    category: "dairy",
    packSize: "500g",
    price: 1.90,
    updatedAt: UPDATED_AT
  },
  {
    id: "yoghurt-sainsburys",
    retailer: "sainsburys",
    name: "Greek yoghurt",
    category: "dairy",
    packSize: "500g",
    price: 1.85,
    updatedAt: UPDATED_AT
  },
  {
    id: "yoghurt-asda",
    retailer: "asda",
    name: "Greek yoghurt",
    category: "dairy",
    packSize: "500g",
    price: 1.80,
    updatedAt: UPDATED_AT
  },
  {
    id: "yoghurt-morrisons",
    retailer: "morrisons",
    name: "Greek yoghurt",
    category: "dairy",
    packSize: "500g",
    price: 1.85,
    updatedAt: UPDATED_AT
  },
  {
    id: "yoghurt-waitrose",
    retailer: "waitrose",
    name: "Greek yoghurt",
    category: "dairy",
    packSize: "500g",
    price: 2.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "yoghurt-aldi",
    retailer: "aldi",
    name: "Greek yoghurt",
    category: "dairy",
    packSize: "500g",
    price: 1.49,
    updatedAt: UPDATED_AT
  },

  // OATS
  {
    id: "oats-tesco",
    retailer: "tesco",
    name: "Oats",
    category: "grains",
    packSize: "1kg",
    price: 1.70,
    updatedAt: UPDATED_AT
  },
  {
    id: "oats-sainsburys",
    retailer: "sainsburys",
    name: "Oats",
    category: "grains",
    packSize: "1kg",
    price: 1.65,
    updatedAt: UPDATED_AT
  },
  {
    id: "oats-asda",
    retailer: "asda",
    name: "Oats",
    category: "grains",
    packSize: "1kg",
    price: 1.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "oats-morrisons",
    retailer: "morrisons",
    name: "Oats",
    category: "grains",
    packSize: "1kg",
    price: 1.55,
    updatedAt: UPDATED_AT
  },
  {
    id: "oats-waitrose",
    retailer: "waitrose",
    name: "Oats",
    category: "grains",
    packSize: "1kg",
    price: 2.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "oats-aldi",
    retailer: "aldi",
    name: "Oats",
    category: "grains",
    packSize: "1kg",
    price: 1.29,
    updatedAt: UPDATED_AT
  },

  // RICE
  {
    id: "rice-tesco",
    retailer: "tesco",
    name: "Rice",
    category: "grains",
    packSize: "1kg",
    price: 2.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-sainsburys",
    retailer: "sainsburys",
    name: "Rice",
    category: "grains",
    packSize: "1kg",
    price: 1.90,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-asda",
    retailer: "asda",
    name: "Rice",
    category: "grains",
    packSize: "1kg",
    price: 1.80,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-morrisons",
    retailer: "morrisons",
    name: "Rice",
    category: "grains",
    packSize: "1kg",
    price: 1.85,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-waitrose",
    retailer: "waitrose",
    name: "Rice",
    category: "grains",
    packSize: "1kg",
    price: 2.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-aldi",
    retailer: "aldi",
    name: "Rice",
    category: "grains",
    packSize: "1kg",
    price: 1.49,
    updatedAt: UPDATED_AT
  },

  // PASTA
  {
    id: "pasta-tesco",
    retailer: "tesco",
    name: "Wholewheat pasta",
    category: "grains",
    packSize: "500g",
    price: 1.30,
    updatedAt: UPDATED_AT
  },
  {
    id: "pasta-sainsburys",
    retailer: "sainsburys",
    name: "Wholewheat pasta",
    category: "grains",
    packSize: "500g",
    price: 1.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "pasta-asda",
    retailer: "asda",
    name: "Wholewheat pasta",
    category: "grains",
    packSize: "500g",
    price: 1.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "pasta-morrisons",
    retailer: "morrisons",
    name: "Wholewheat pasta",
    category: "grains",
    packSize: "500g",
    price: 1.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "pasta-waitrose",
    retailer: "waitrose",
    name: "Wholewheat pasta",
    category: "grains",
    packSize: "500g",
    price: 1.70,
    updatedAt: UPDATED_AT
  },
  {
    id: "pasta-aldi",
    retailer: "aldi",
    name: "Wholewheat pasta",
    category: "grains",
    packSize: "500g",
    price: 0.99,
    updatedAt: UPDATED_AT
  },

  // SWEET POTATOES
  {
    id: "sweet-potatoes-tesco",
    retailer: "tesco",
    name: "Sweet potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 2.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "sweet-potatoes-sainsburys",
    retailer: "sainsburys",
    name: "Sweet potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 1.90,
    updatedAt: UPDATED_AT
  },
  {
    id: "sweet-potatoes-asda",
    retailer: "asda",
    name: "Sweet potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 1.75,
    updatedAt: UPDATED_AT
  },
  {
    id: "sweet-potatoes-morrisons",
    retailer: "morrisons",
    name: "Sweet potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 1.80,
    updatedAt: UPDATED_AT
  },
  {
    id: "sweet-potatoes-waitrose",
    retailer: "waitrose",
    name: "Sweet potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 2.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "sweet-potatoes-aldi",
    retailer: "aldi",
    name: "Sweet potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 1.49,
    updatedAt: UPDATED_AT
  },

  // POTATOES
  {
    id: "potatoes-tesco",
    retailer: "tesco",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "potatoes-sainsburys",
    retailer: "sainsburys",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.40,
    updatedAt: UPDATED_AT
  },
  {
    id: "potatoes-asda",
    retailer: "asda",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "potatoes-morrisons",
    retailer: "morrisons",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.30,
    updatedAt: UPDATED_AT
  },
  {
    id: "potatoes-waitrose",
    retailer: "waitrose",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 3.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "potatoes-aldi",
    retailer: "aldi",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 1.79,
    updatedAt: UPDATED_AT
  },

  // VEGETABLES
  {
    id: "vegetables-tesco",
    retailer: "tesco",
    name: "Mixed vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 2.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "vegetables-sainsburys",
    retailer: "sainsburys",
    name: "Mixed vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 2.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "vegetables-asda",
    retailer: "asda",
    name: "Mixed vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 1.80,
    updatedAt: UPDATED_AT
  },
  {
    id: "vegetables-morrisons",
    retailer: "morrisons",
    name: "Mixed vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 1.90,
    updatedAt: UPDATED_AT
  },
  {
    id: "vegetables-waitrose",
    retailer: "waitrose",
    name: "Mixed vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 2.75,
    updatedAt: UPDATED_AT
  },
  {
    id: "vegetables-aldi",
    retailer: "aldi",
    name: "Mixed vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 1.49,
    updatedAt: UPDATED_AT
  },

  // SPINACH
  {
    id: "spinach-tesco",
    retailer: "tesco",
    name: "Spinach",
    category: "vegetables",
    packSize: "200g",
    price: 1.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "spinach-sainsburys",
    retailer: "sainsburys",
    name: "Spinach",
    category: "vegetables",
    packSize: "200g",
    price: 1.45,
    updatedAt: UPDATED_AT
  },
  {
    id: "spinach-asda",
    retailer: "asda",
    name: "Spinach",
    category: "vegetables",
    packSize: "200g",
    price: 1.30,
    updatedAt: UPDATED_AT
  },
  {
    id: "spinach-morrisons",
    retailer: "morrisons",
    name: "Spinach",
    category: "vegetables",
    packSize: "200g",
    price: 1.35,
    updatedAt: UPDATED_AT
  },
  {
    id: "spinach-waitrose",
    retailer: "waitrose",
    name: "Spinach",
    category: "vegetables",
    packSize: "200g",
    price: 1.80,
    updatedAt: UPDATED_AT
  },
  {
    id: "spinach-aldi",
    retailer: "aldi",
    name: "Spinach",
    category: "vegetables",
    packSize: "200g",
    price: 1.19,
    updatedAt: UPDATED_AT
  },

  // BERRIES
  {
    id: "berries-tesco",
    retailer: "tesco",
    name: "Mixed berries",
    category: "fruit",
    packSize: "500g",
    price: 3.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "berries-sainsburys",
    retailer: "sainsburys",
    name: "Mixed berries",
    category: "fruit",
    packSize: "500g",
    price: 3.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "berries-asda",
    retailer: "asda",
    name: "Mixed berries",
    category: "fruit",
    packSize: "500g",
    price: 3.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "berries-morrisons",
    retailer: "morrisons",
    name: "Mixed berries",
    category: "fruit",
    packSize: "500g",
    price: 3.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "berries-waitrose",
    retailer: "waitrose",
    name: "Mixed berries",
    category: "fruit",
    packSize: "500g",
    price: 4.25,
    updatedAt: UPDATED_AT
  },
  {
    id: "berries-aldi",
    retailer: "aldi",
    name: "Mixed berries",
    category: "fruit",
    packSize: "500g",
    price: 2.69,
    updatedAt: UPDATED_AT
  },

  // BANANAS
  {
    id: "bananas-tesco",
    retailer: "tesco",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "bananas-sainsburys",
    retailer: "sainsburys",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.15,
    updatedAt: UPDATED_AT
  },
  {
    id: "bananas-asda",
    retailer: "asda",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.10,
    updatedAt: UPDATED_AT
  },
  {
    id: "bananas-morrisons",
    retailer: "morrisons",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.15,
    updatedAt: UPDATED_AT
  },
  {
    id: "bananas-waitrose",
    retailer: "waitrose",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "bananas-aldi",
    retailer: "aldi",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 0.99,
    updatedAt: UPDATED_AT
  },

  // AVOCADO
  {
    id: "avocado-tesco",
    retailer: "tesco",
    name: "Avocado",
    category: "fruit",
    packSize: "2",
    price: 1.80,
    updatedAt: UPDATED_AT
  },
  {
    id: "avocado-sainsburys",
    retailer: "sainsburys",
    name: "Avocado",
    category: "fruit",
    packSize: "2",
    price: 1.75,
    updatedAt: UPDATED_AT
  },
  {
    id: "avocado-asda",
    retailer: "asda",
    name: "Avocado",
    category: "fruit",
    packSize: "2",
    price: 1.60,
    updatedAt: UPDATED_AT
  },
  {
    id: "avocado-morrisons",
    retailer: "morrisons",
    name: "Avocado",
    category: "fruit",
    packSize: "2",
    price: 1.70,
    updatedAt: UPDATED_AT
  },
  {
    id: "avocado-waitrose",
    retailer: "waitrose",
    name: "Avocado",
    category: "fruit",
    packSize: "2",
    price: 2.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "avocado-aldi",
    retailer: "aldi",
    name: "Avocado",
    category: "fruit",
    packSize: "2",
    price: 1.49,
    updatedAt: UPDATED_AT
  },

  // WRAPS
  {
    id: "wraps-tesco",
    retailer: "tesco",
    name: "Wholemeal wraps",
    category: "bakery",
    packSize: "8",
    price: 1.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "wraps-sainsburys",
    retailer: "sainsburys",
    name: "Wholemeal wraps",
    category: "bakery",
    packSize: "8",
    price: 1.45,
    updatedAt: UPDATED_AT
  },
  {
    id: "wraps-asda",
    retailer: "asda",
    name: "Wholemeal wraps",
    category: "bakery",
    packSize: "8",
    price: 1.30,
    updatedAt: UPDATED_AT
  },
  {
    id: "wraps-morrisons",
    retailer: "morrisons",
    name: "Wholemeal wraps",
    category: "bakery",
    packSize: "8",
    price: 1.35,
    updatedAt: UPDATED_AT
  },
  {
    id: "wraps-waitrose",
    retailer: "waitrose",
    name: "Wholemeal wraps",
    category: "bakery",
    packSize: "8",
    price: 1.80,
    updatedAt: UPDATED_AT
  },
  {
    id: "wraps-aldi",
    retailer: "aldi",
    name: "Wholemeal wraps",
    category: "bakery",
    packSize: "8",
    price: 1.19,
    updatedAt: UPDATED_AT
  },

  // BREAD
  {
    id: "bread-tesco",
    retailer: "tesco",
    name: "Wholegrain bread",
    category: "bakery",
    packSize: "800g",
    price: 1.60,
    updatedAt: UPDATED_AT
  },
  {
    id: "bread-sainsburys",
    retailer: "sainsburys",
    name: "Wholegrain bread",
    category: "bakery",
    packSize: "800g",
    price: 1.55,
    updatedAt: UPDATED_AT
  },
  {
    id: "bread-asda",
    retailer: "asda",
    name: "Wholegrain bread",
    category: "bakery",
    packSize: "800g",
    price: 1.45,
    updatedAt: UPDATED_AT
  },
  {
    id: "bread-morrisons",
    retailer: "morrisons",
    name: "Wholegrain bread",
    category: "bakery",
    packSize: "800g",
    price: 1.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "bread-waitrose",
    retailer: "waitrose",
    name: "Wholegrain bread",
    category: "bakery",
    packSize: "800g",
    price: 2.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "bread-aldi",
    retailer: "aldi",
    name: "Wholegrain bread",
    category: "bakery",
    packSize: "800g",
    price: 1.29,
    updatedAt: UPDATED_AT
  },

  // RICE CAKES
  {
    id: "rice-cakes-tesco",
    retailer: "tesco",
    name: "Rice cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.20,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-cakes-sainsburys",
    retailer: "sainsburys",
    name: "Rice cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.15,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-cakes-asda",
    retailer: "asda",
    name: "Rice cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.10,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-cakes-morrisons",
    retailer: "morrisons",
    name: "Rice cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.15,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-cakes-waitrose",
    retailer: "waitrose",
    name: "Rice cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.50,
    updatedAt: UPDATED_AT
  },
  {
    id: "rice-cakes-aldi",
    retailer: "aldi",
    name: "Rice cakes",
    category: "snacks",
    packSize: "130g",
    price: 0.89,
    updatedAt: UPDATED_AT
  },

  // PROTEIN POWDER
  {
    id: "protein-tesco",
    retailer: "tesco",
    name: "Protein powder",
    category: "supplements",
    packSize: "1kg",
    price: 24.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "protein-sainsburys",
    retailer: "sainsburys",
    name: "Protein powder",
    category: "supplements",
    packSize: "1kg",
    price: 24.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "protein-asda",
    retailer: "asda",
    name: "Protein powder",
    category: "supplements",
    packSize: "1kg",
    price: 22.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "protein-morrisons",
    retailer: "morrisons",
    name: "Protein powder",
    category: "supplements",
    packSize: "1kg",
    price: 23.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "protein-waitrose",
    retailer: "waitrose",
    name: "Protein powder",
    category: "supplements",
    packSize: "1kg",
    price: 27.00,
    updatedAt: UPDATED_AT
  },
  {
    id: "protein-aldi",
    retailer: "aldi",
    name: "Protein powder",
    category: "supplements",
    packSize: "1kg",
    price: 19.99,
    updatedAt: UPDATED_AT
  }
];

export function clean(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function findProducts(itemName, retailerIds = []) {
  const query = clean(itemName);

  const allowed =
    Array.isArray(retailerIds) &&
    retailerIds.length
      ? new Set(retailerIds)
      : new Set(Object.keys(supermarkets));

  return products.filter(product => {
    if (!allowed.has(product.retailer)) {
      return false;
    }

    const productName = clean(product.name);

    return (
      productName === query ||
      productName.includes(query) ||
      query.includes(productName)
    );
  });
}