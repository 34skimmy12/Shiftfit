// ShiftFit supermarket price database
// Seed data for the Best Basket system.
// These are NOT live supermarket prices.

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
=========================================================
PRODUCT DATABASE
=========================================================

Each product has:

- id
- retailer
- name
- category
- packSize
- price
- updatedAt

The price is the price of ONE pack.

Best Basket multiplies this by the quantity requested
by the user.
*/

export const products = [

  // =====================================================
  // CHICKEN BREAST
  // =====================================================

  {
    id: "tesco-chicken-breast",
    retailer: "tesco",
    name: "Chicken Breast",
    category: "meat",
    packSize: "1kg",
    price: 8.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-chicken-breast",
    retailer: "sainsburys",
    name: "Chicken Breast",
    category: "meat",
    packSize: "1kg",
    price: 8.75,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-chicken-breast",
    retailer: "asda",
    name: "Chicken Breast",
    category: "meat",
    packSize: "1kg",
    price: 8.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-chicken-breast",
    retailer: "morrisons",
    name: "Chicken Breast",
    category: "meat",
    packSize: "1kg",
    price: 8.40,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-chicken-breast",
    retailer: "waitrose",
    name: "Chicken Breast",
    category: "meat",
    packSize: "1kg",
    price: 10.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-chicken-breast",
    retailer: "aldi",
    name: "Chicken Breast",
    category: "meat",
    packSize: "1kg",
    price: 7.99,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // LEAN BEEF MINCE
  // =====================================================

  {
    id: "tesco-beef-mince",
    retailer: "tesco",
    name: "Lean Beef Mince",
    category: "meat",
    packSize: "500g",
    price: 5.75,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-beef-mince",
    retailer: "sainsburys",
    name: "Lean Beef Mince",
    category: "meat",
    packSize: "500g",
    price: 5.95,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-beef-mince",
    retailer: "asda",
    name: "Lean Beef Mince",
    category: "meat",
    packSize: "500g",
    price: 5.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-beef-mince",
    retailer: "morrisons",
    name: "Lean Beef Mince",
    category: "meat",
    packSize: "500g",
    price: 5.65,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-beef-mince",
    retailer: "waitrose",
    name: "Lean Beef Mince",
    category: "meat",
    packSize: "500g",
    price: 7.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-beef-mince",
    retailer: "aldi",
    name: "Lean Beef Mince",
    category: "meat",
    packSize: "500g",
    price: 5.06,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // LEAN TURKEY MINCE
  // =====================================================

  {
    id: "tesco-turkey-mince",
    retailer: "tesco",
    name: "Lean Turkey Mince",
    category: "meat",
    packSize: "500g",
    price: 5.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-turkey-mince",
    retailer: "sainsburys",
    name: "Lean Turkey Mince",
    category: "meat",
    packSize: "500g",
    price: 5.45,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-turkey-mince",
    retailer: "asda",
    name: "Lean Turkey Mince",
    category: "meat",
    packSize: "500g",
    price: 4.95,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-turkey-mince",
    retailer: "morrisons",
    name: "Lean Turkey Mince",
    category: "meat",
    packSize: "500g",
    price: 5.10,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-turkey-mince",
    retailer: "waitrose",
    name: "Lean Turkey Mince",
    category: "meat",
    packSize: "500g",
    price: 6.75,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-turkey-mince",
    retailer: "aldi",
    name: "Lean Turkey Mince",
    category: "meat",
    packSize: "500g",
    price: 4.49,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // SALMON
  // =====================================================

  {
    id: "tesco-salmon",
    retailer: "tesco",
    name: "Salmon",
    category: "fish",
    packSize: "400g",
    price: 6.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-salmon",
    retailer: "sainsburys",
    name: "Salmon",
    category: "fish",
    packSize: "400g",
    price: 6.75,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-salmon",
    retailer: "asda",
    name: "Salmon",
    category: "fish",
    packSize: "400g",
    price: 6.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-salmon",
    retailer: "morrisons",
    name: "Salmon",
    category: "fish",
    packSize: "400g",
    price: 6.40,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-salmon",
    retailer: "waitrose",
    name: "Salmon",
    category: "fish",
    packSize: "400g",
    price: 8.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-salmon",
    retailer: "aldi",
    name: "Salmon",
    category: "fish",
    packSize: "400g",
    price: 5.99,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // EGGS
  // =====================================================

  {
    id: "tesco-eggs",
    retailer: "tesco",
    name: "Eggs",
    category: "dairy",
    packSize: "12 pack",
    price: 3.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-eggs",
    retailer: "sainsburys",
    name: "Eggs",
    category: "dairy",
    packSize: "12 pack",
    price: 3.30,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-eggs",
    retailer: "asda",
    name: "Eggs",
    category: "dairy",
    packSize: "12 pack",
    price: 3.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-eggs",
    retailer: "morrisons",
    name: "Eggs",
    category: "dairy",
    packSize: "12 pack",
    price: 3.10,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-eggs",
    retailer: "waitrose",
    name: "Eggs",
    category: "dairy",
    packSize: "12 pack",
    price: 4.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-eggs",
    retailer: "aldi",
    name: "Eggs",
    category: "dairy",
    packSize: "12 pack",
    price: 2.20,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // GREEK YOGHURT
  // =====================================================

  {
    id: "tesco-greek-yoghurt",
    retailer: "tesco",
    name: "Greek Yoghurt",
    category: "dairy",
    packSize: "1kg",
    price: 3.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-greek-yoghurt",
    retailer: "sainsburys",
    name: "Greek Yoghurt",
    category: "dairy",
    packSize: "1kg",
    price: 3.75,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-greek-yoghurt",
    retailer: "asda",
    name: "Greek Yoghurt",
    category: "dairy",
    packSize: "1kg",
    price: 3.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-greek-yoghurt",
    retailer: "morrisons",
    name: "Greek Yoghurt",
    category: "dairy",
    packSize: "1kg",
    price: 3.35,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-greek-yoghurt",
    retailer: "waitrose",
    name: "Greek Yoghurt",
    category: "dairy",
    packSize: "1kg",
    price: 4.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-greek-yoghurt",
    retailer: "aldi",
    name: "Greek Yoghurt",
    category: "dairy",
    packSize: "1kg",
    price: 2.99,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // PROTEIN POWDER
  // =====================================================

  {
    id: "tesco-protein-powder",
    retailer: "tesco",
    name: "Protein Powder",
    category: "supplement",
    packSize: "1kg",
    price: 25.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-protein-powder",
    retailer: "sainsburys",
    name: "Protein Powder",
    category: "supplement",
    packSize: "1kg",
    price: 26.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-protein-powder",
    retailer: "asda",
    name: "Protein Powder",
    category: "supplement",
    packSize: "1kg",
    price: 24.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-protein-powder",
    retailer: "morrisons",
    name: "Protein Powder",
    category: "supplement",
    packSize: "1kg",
    price: 24.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-protein-powder",
    retailer: "waitrose",
    name: "Protein Powder",
    category: "supplement",
    packSize: "1kg",
    price: 30.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-protein-powder",
    retailer: "aldi",
    name: "Protein Powder",
    category: "supplement",
    packSize: "1kg",
    price: 19.99,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // OATS
  // =====================================================

  {
    id: "tesco-oats",
    retailer: "tesco",
    name: "Oats",
    category: "carbs",
    packSize: "1kg",
    price: 1.75,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-oats",
    retailer: "sainsburys",
    name: "Oats",
    category: "carbs",
    packSize: "1kg",
    price: 1.80,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-oats",
    retailer: "asda",
    name: "Oats",
    category: "carbs",
    packSize: "1kg",
    price: 1.60,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-oats",
    retailer: "morrisons",
    name: "Oats",
    category: "carbs",
    packSize: "1kg",
    price: 1.65,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-oats",
    retailer: "waitrose",
    name: "Oats",
    category: "carbs",
    packSize: "1kg",
    price: 2.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-oats",
    retailer: "aldi",
    name: "Oats",
    category: "carbs",
    packSize: "1kg",
    price: 1.39,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // RICE
  // =====================================================

  {
    id: "tesco-rice",
    retailer: "tesco",
    name: "Rice",
    category: "carbs",
    packSize: "1kg",
    price: 2.20,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-rice",
    retailer: "sainsburys",
    name: "Rice",
    category: "carbs",
    packSize: "1kg",
    price: 2.30,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-rice",
    retailer: "asda",
    name: "Rice",
    category: "carbs",
    packSize: "1kg",
    price: 2.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-rice",
    retailer: "morrisons",
    name: "Rice",
    category: "carbs",
    packSize: "1kg",
    price: 2.10,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-rice",
    retailer: "waitrose",
    name: "Rice",
    category: "carbs",
    packSize: "1kg",
    price: 3.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-rice",
    retailer: "aldi",
    name: "Rice",
    category: "carbs",
    packSize: "1kg",
    price: 1.69,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // WHOLEWHEAT PASTA
  // =====================================================

  {
    id: "tesco-wholewheat-pasta",
    retailer: "tesco",
    name: "Wholewheat Pasta",
    category: "carbs",
    packSize: "500g",
    price: 1.40,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-wholewheat-pasta",
    retailer: "sainsburys",
    name: "Wholewheat Pasta",
    category: "carbs",
    packSize: "500g",
    price: 1.45,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-wholewheat-pasta",
    retailer: "asda",
    name: "Wholewheat Pasta",
    category: "carbs",
    packSize: "500g",
    price: 1.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-wholewheat-pasta",
    retailer: "morrisons",
    name: "Wholewheat Pasta",
    category: "carbs",
    packSize: "500g",
    price: 1.35,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-wholewheat-pasta",
    retailer: "waitrose",
    name: "Wholewheat Pasta",
    category: "carbs",
    packSize: "500g",
    price: 1.90,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-wholewheat-pasta",
    retailer: "aldi",
    name: "Wholewheat Pasta",
    category: "carbs",
    packSize: "500g",
    price: 0.99,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // SWEET POTATOES
  // =====================================================

  {
    id: "tesco-sweet-potatoes",
    retailer: "tesco",
    name: "Sweet Potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 2.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-sweet-potatoes",
    retailer: "sainsburys",
    name: "Sweet Potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 2.60,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-sweet-potatoes",
    retailer: "asda",
    name: "Sweet Potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 2.30,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-sweet-potatoes",
    retailer: "morrisons",
    name: "Sweet Potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 2.40,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-sweet-potatoes",
    retailer: "waitrose",
    name: "Sweet Potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 3.20,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-sweet-potatoes",
    retailer: "aldi",
    name: "Sweet Potatoes",
    category: "vegetables",
    packSize: "1kg",
    price: 1.89,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // POTATOES
  // =====================================================

  {
    id: "tesco-potatoes",
    retailer: "tesco",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-potatoes",
    retailer: "sainsburys",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.60,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-potatoes",
    retailer: "asda",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-potatoes",
    retailer: "morrisons",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 2.35,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-potatoes",
    retailer: "waitrose",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 3.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-potatoes",
    retailer: "aldi",
    name: "Potatoes",
    category: "vegetables",
    packSize: "2.5kg",
    price: 1.79,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // MIXED VEGETABLES
  // =====================================================

  {
    id: "tesco-mixed-vegetables",
    retailer: "tesco",
    name: "Mixed Vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 2.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-mixed-vegetables",
    retailer: "sainsburys",
    name: "Mixed Vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 2.60,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-mixed-vegetables",
    retailer: "asda",
    name: "Mixed Vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 2.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-mixed-vegetables",
    retailer: "morrisons",
    name: "Mixed Vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 2.35,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-mixed-vegetables",
    retailer: "waitrose",
    name: "Mixed Vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 3.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-mixed-vegetables",
    retailer: "aldi",
    name: "Mixed Vegetables",
    category: "vegetables",
    packSize: "1kg",
    price: 1.89,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // SPINACH
  // =====================================================

  {
    id: "tesco-spinach",
    retailer: "tesco",
    name: "Spinach",
    category: "vegetables",
    packSize: "240g",
    price: 1.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-spinach",
    retailer: "sainsburys",
    name: "Spinach",
    category: "vegetables",
    packSize: "240g",
    price: 1.60,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-spinach",
    retailer: "asda",
    name: "Spinach",
    category: "vegetables",
    packSize: "240g",
    price: 1.40,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-spinach",
    retailer: "morrisons",
    name: "Spinach",
    category: "vegetables",
    packSize: "240g",
    price: 1.45,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-spinach",
    retailer: "waitrose",
    name: "Spinach",
    category: "vegetables",
    packSize: "240g",
    price: 2.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-spinach",
    retailer: "aldi",
    name: "Spinach",
    category: "vegetables",
    packSize: "240g",
    price: 1.19,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // MIXED BERRIES
  // =====================================================

  {
    id: "tesco-mixed-berries",
    retailer: "tesco",
    name: "Mixed Berries",
    category: "fruit",
    packSize: "500g",
    price: 3.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-mixed-berries",
    retailer: "sainsburys",
    name: "Mixed Berries",
    category: "fruit",
    packSize: "500g",
    price: 3.60,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-mixed-berries",
    retailer: "asda",
    name: "Mixed Berries",
    category: "fruit",
    packSize: "500g",
    price: 3.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-mixed-berries",
    retailer: "morrisons",
    name: "Mixed Berries",
    category: "fruit",
    packSize: "500g",
    price: 3.40,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-mixed-berries",
    retailer: "waitrose",
    name: "Mixed Berries",
    category: "fruit",
    packSize: "500g",
    price: 4.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-mixed-berries",
    retailer: "aldi",
    name: "Mixed Berries",
    category: "fruit",
    packSize: "500g",
    price: 2.99,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // BANANAS
  // =====================================================

  {
    id: "tesco-bananas",
    retailer: "tesco",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.35,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-bananas",
    retailer: "sainsburys",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.40,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-bananas",
    retailer: "asda",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-bananas",
    retailer: "morrisons",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.30,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-bananas",
    retailer: "waitrose",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.75,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-bananas",
    retailer: "aldi",
    name: "Bananas",
    category: "fruit",
    packSize: "1kg",
    price: 1.09,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // AVOCADO
  // =====================================================

  {
    id: "tesco-avocado",
    retailer: "tesco",
    name: "Avocado",
    category: "fruit",
    packSize: "2 pack",
    price: 2.20,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-avocado",
    retailer: "sainsburys",
    name: "Avocado",
    category: "fruit",
    packSize: "2 pack",
    price: 2.30,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-avocado",
    retailer: "asda",
    name: "Avocado",
    category: "fruit",
    packSize: "2 pack",
    price: 2.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-avocado",
    retailer: "morrisons",
    name: "Avocado",
    category: "fruit",
    packSize: "2 pack",
    price: 2.10,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-avocado",
    retailer: "waitrose",
    name: "Avocado",
    category: "fruit",
    packSize: "2 pack",
    price: 3.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-avocado",
    retailer: "aldi",
    name: "Avocado",
    category: "fruit",
    packSize: "2 pack",
    price: 1.69,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // WHOLEMEAL WRAPS
  // =====================================================

  {
    id: "tesco-wholemeal-wraps",
    retailer: "tesco",
    name: "Wholemeal Wraps",
    category: "bread",
    packSize: "8 pack",
    price: 1.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-wholemeal-wraps",
    retailer: "sainsburys",
    name: "Wholemeal Wraps",
    category: "bread",
    packSize: "8 pack",
    price: 1.55,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-wholemeal-wraps",
    retailer: "asda",
    name: "Wholemeal Wraps",
    category: "bread",
    packSize: "8 pack",
    price: 1.35,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-wholemeal-wraps",
    retailer: "morrisons",
    name: "Wholemeal Wraps",
    category: "bread",
    packSize: "8 pack",
    price: 1.45,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-wholemeal-wraps",
    retailer: "waitrose",
    name: "Wholemeal Wraps",
    category: "bread",
    packSize: "8 pack",
    price: 2.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-wholemeal-wraps",
    retailer: "aldi",
    name: "Wholemeal Wraps",
    category: "bread",
    packSize: "8 pack",
    price: 1.19,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // WHOLEGRAIN BREAD
  // =====================================================

  {
    id: "tesco-wholegrain-bread",
    retailer: "tesco",
    name: "Wholegrain Bread",
    category: "bread",
    packSize: "800g",
    price: 1.60,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-wholegrain-bread",
    retailer: "sainsburys",
    name: "Wholegrain Bread",
    category: "bread",
    packSize: "800g",
    price: 1.65,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-wholegrain-bread",
    retailer: "asda",
    name: "Wholegrain Bread",
    category: "bread",
    packSize: "800g",
    price: 1.45,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-wholegrain-bread",
    retailer: "morrisons",
    name: "Wholegrain Bread",
    category: "bread",
    packSize: "800g",
    price: 1.55,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-wholegrain-bread",
    retailer: "waitrose",
    name: "Wholegrain Bread",
    category: "bread",
    packSize: "800g",
    price: 2.25,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-wholegrain-bread",
    retailer: "aldi",
    name: "Wholegrain Bread",
    category: "bread",
    packSize: "800g",
    price: 1.19,
    updatedAt: "2026-09-02"
  },


  // =====================================================
  // RICE CAKES
  // =====================================================

  {
    id: "tesco-rice-cakes",
    retailer: "tesco",
    name: "Rice Cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.50,
    updatedAt: "2026-09-02"
  },

  {
    id: "sainsburys-rice-cakes",
    retailer: "sainsburys",
    name: "Rice Cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.55,
    updatedAt: "2026-09-02"
  },

  {
    id: "asda-rice-cakes",
    retailer: "asda",
    name: "Rice Cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.35,
    updatedAt: "2026-09-02"
  },

  {
    id: "morrisons-rice-cakes",
    retailer: "morrisons",
    name: "Rice Cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.45,
    updatedAt: "2026-09-02"
  },

  {
    id: "waitrose-rice-cakes",
    retailer: "waitrose",
    name: "Rice Cakes",
    category: "snacks",
    packSize: "130g",
    price: 2.00,
    updatedAt: "2026-09-02"
  },

  {
    id: "aldi-rice-cakes",
    retailer: "aldi",
    name: "Rice Cakes",
    category: "snacks",
    packSize: "130g",
    price: 1.19,
    updatedAt: "2026-09-02"
  }

];


/*
=========================================================
TEXT CLEANING
=========================================================
*/

export function clean(value){

  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

}


/*
=========================================================
PRODUCT MATCHING
=========================================================
*/

export function findProducts(
  itemName,
  retailerIds=[]
){

  const query=
    clean(itemName);

  const allowed=
    Array.isArray(retailerIds) &&
    retailerIds.length
      ?retailerIds
      :Object.keys(supermarkets);


  return products.filter(
    product=>{

      if(
        !allowed.includes(
          product.retailer
        )
      ){

        return false;

      }

      const productName=
        clean(product.name);

      return(
        productName===query ||
        productName.includes(query) ||
        query.includes(productName)
      );

    }
  );

}