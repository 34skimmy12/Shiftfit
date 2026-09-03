/*
 * ShiftFit Price Database
 *
 * IMPORTANT:
 * These are seeded TEST prices.
 * They are NOT live supermarket prices.
 *
 * The existing Best Basket API remains compatible with this file.
 * Products are generated across all six configured supermarkets from
 * base product definitions so the catalogue can be expanded safely.
 */

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


const retailerIds =
  Object.keys(
    supermarkets
  );


/*
 * =========================================================
 * EXISTING PRODUCTS
 * =========================================================
 *
 * These are the products already in the working database.
 *
 * Their original supermarket prices are preserved exactly.
 */

const existingProducts = [

  [
    "Chicken Breast",
    "1kg"
  ],

  [
    "Lean Beef Mince",
    "500g"
  ],

  [
    "Lean Turkey Mince",
    "500g"
  ],

  [
    "Salmon",
    "400g"
  ],

  [
    "Eggs",
    "12 pack"
  ],

  [
    "Greek Yoghurt",
    "1kg"
  ],

  [
    "Protein Powder",
    "1kg"
  ],

  [
    "Oats",
    "1kg"
  ],

  [
    "Rice",
    "1kg"
  ],

  [
    "Wholewheat Pasta",
    "500g"
  ],

  [
    "Sweet Potatoes",
    "1kg"
  ],

  [
    "Potatoes",
    "2.5kg"
  ],

  [
    "Mixed Vegetables",
    "1kg"
  ],

  [
    "Spinach",
    "240g"
  ],

  [
    "Mixed Berries",
    "500g"
  ],

  [
    "Bananas",
    "1kg"
  ],

  [
    "Avocado",
    "2 pack"
  ],

  [
    "Wholemeal Wraps",
    "8 pack"
  ],

  [
    "Wholegrain Bread",
    "800g"
  ],

  [
    "Rice Cakes",
    "130g"
  ]

];


/*
 * =========================================================
 * EXISTING RETAILER PRICES
 * =========================================================
 *
 * Order:
 *
 * Tesco
 * Sainsbury's
 * Asda
 * Morrisons
 * Waitrose
 * Aldi
 */

const existingRetailerPrices = {

  "Chicken Breast": [
    8.50,
    8.75,
    8.25,
    8.40,
    10.50,
    7.99
  ],

  "Lean Beef Mince": [
    5.75,
    5.95,
    5.50,
    5.65,
    7.50,
    5.06
  ],

  "Lean Turkey Mince": [
    5.25,
    5.45,
    4.95,
    5.10,
    6.75,
    4.49
  ],

  "Salmon": [
    6.50,
    6.75,
    6.25,
    6.40,
    8.50,
    5.99
  ],

  "Eggs": [
    3.25,
    3.30,
    3.00,
    3.10,
    4.25,
    2.20
  ],

  "Greek Yoghurt": [
    3.50,
    3.75,
    3.25,
    3.35,
    4.50,
    2.99
  ],

  "Protein Powder": [
    25.00,
    26.00,
    24.00,
    24.50,
    30.00,
    19.99
  ],

  "Oats": [
    1.75,
    1.80,
    1.60,
    1.65,
    2.50,
    1.39
  ],

  "Rice": [
    2.20,
    2.30,
    2.00,
    2.10,
    3.00,
    1.69
  ],

  "Wholewheat Pasta": [
    1.40,
    1.45,
    1.25,
    1.35,
    1.90,
    0.99
  ],

  "Sweet Potatoes": [
    2.50,
    2.60,
    2.30,
    2.40,
    3.20,
    1.89
  ],

  "Potatoes": [
    2.50,
    2.60,
    2.25,
    2.35,
    3.25,
    1.79
  ],

  "Mixed Vegetables": [
    2.50,
    2.60,
    2.25,
    2.35,
    3.25,
    1.89
  ],

  "Spinach": [
    1.50,
    1.60,
    1.40,
    1.45,
    2.00,
    1.19
  ],

  "Mixed Berries": [
    3.50,
    3.60,
    3.25,
    3.40,
    4.50,
    2.99
  ],

  "Bananas": [
    1.35,
    1.40,
    1.25,
    1.30,
    1.75,
    1.09
  ],

  "Avocado": [
    2.20,
    2.30,
    2.00,
    2.10,
    3.00,
    1.69
  ],

  "Wholemeal Wraps": [
    1.50,
    1.55,
    1.35,
    1.45,
    2.00,
    1.19
  ],

  "Wholegrain Bread": [
    1.60,
    1.65,
    1.45,
    1.55,
    2.25,
    1.19
  ],

  "Rice Cakes": [
    1.50,
    1.55,
    1.35,
    1.45,
    2.00,
    1.19
  ]

};


/*
 * =========================================================
 * EXPANDED FOOD CATALOGUE
 * =========================================================
 *
 * Format:
 *
 * [
 *   name,
 *   packSize,
 *   basePrice
 * ]
 *
 * These are seeded TEST prices.
 * They are NOT live supermarket prices.
 */

const additionalProducts = [
  [
    "Protein Bar",
    "1 pack",
    1.25
  ],

  [
    "Beans",
    "400g",
    0.90
  ],

  [
    "Light Mayonnaise",
    "500ml",
    2.00
  ],

  [
    "Tomato Sauce",
    "500g",
    1.50
  ],
  /*
   * -------------------------------------------------------
   * PROTEIN
   * -------------------------------------------------------
   */

  [
    "Chicken Thighs",
    "1kg",
    7.25
  ],

  [
    "Chicken Mince",
    "500g",
    5.25
  ],

  [
    "Chicken Drumsticks",
    "1kg",
    4.75
  ],

  [
    "Turkey Breast",
    "500g",
    5.75
  ],

  [
    "Turkey Steaks",
    "500g",
    5.95
  ],

  [
    "Lean Beef Steak",
    "400g",
    7.50
  ],

  [
    "Beef Strips",
    "500g",
    6.50
  ],

  [
    "Lean Beef Burgers",
    "4 pack",
    4.75
  ],

  [
    "Pork Loin",
    "500g",
    5.75
  ],

  [
    "Pork Chops",
    "500g",
    5.50
  ],

  [
    "Lean Pork Mince",
    "500g",
    5.25
  ],

  [
    "Lamb Chops",
    "400g",
    7.95
  ],

  [
    "Lamb Mince",
    "500g",
    6.75
  ],

  [
    "Cod",
    "400g",
    5.95
  ],

  [
    "Haddock",
    "400g",
    5.95
  ],

  [
    "White Fish",
    "400g",
    5.50
  ],

  [
    "Tuna",
    "4 pack",
    4.50
  ],

  [
    "Tinned Tuna",
    "145g",
    1.25
  ],

  [
    "Prawns",
    "300g",
    4.50
  ],

  [
    "Mackerel",
    "400g",
    4.25
  ],

  [
    "Sardines",
    "120g",
    1.20
  ],

  [
    "Smoked Salmon",
    "200g",
    5.50
  ],

  [
    "Trout",
    "400g",
    6.50
  ],

  [
    "Sea Bass",
    "300g",
    6.95
  ],

  [
    "Fish Fingers",
    "10 pack",
    2.75
  ],

  [
    "Egg Whites",
    "500ml",
    3.00
  ],


  /*
   * -------------------------------------------------------
   * DAIRY
   * -------------------------------------------------------
   */

  [
    "Skimmed Milk",
    "2 pints",
    1.25
  ],

  [
    "Semi Skimmed Milk",
    "2 pints",
    1.25
  ],

  [
    "Whole Milk",
    "2 pints",
    1.30
  ],

  [
    "Almond Milk",
    "1L",
    1.80
  ],

  [
    "Oat Milk",
    "1L",
    1.80
  ],

  [
    "Soy Milk",
    "1L",
    1.70
  ],

  [
    "Natural Yoghurt",
    "500g",
    1.80
  ],

  [
    "Skyr",
    "450g",
    2.50
  ],

  [
    "Cottage Cheese",
    "300g",
    1.80
  ],

  [
    "Light Cottage Cheese",
    "300g",
    1.90
  ],

  [
    "Cheddar Cheese",
    "400g",
    3.75
  ],

  [
    "Light Cheddar",
    "400g",
    4.00
  ],

  [
    "Mozzarella",
    "125g",
    1.50
  ],

  [
    "Feta",
    "200g",
    2.50
  ],

  [
    "Parmesan",
    "100g",
    2.50
  ],

  [
    "Cream Cheese",
    "200g",
    2.00
  ],


  /*
   * -------------------------------------------------------
   * PLANT PROTEIN
   * -------------------------------------------------------
   */

  [
    "Chickpeas",
    "400g",
    0.90
  ],

  [
    "Kidney Beans",
    "400g",
    0.90
  ],

  [
    "Black Beans",
    "400g",
    1.00
  ],

  [
    "Baked Beans",
    "400g",
    0.90
  ],

  [
    "Cannellini Beans",
    "400g",
    1.00
  ],

  [
    "Butter Beans",
    "400g",
    1.00
  ],

  [
    "Green Lentils",
    "400g",
    1.10
  ],

  [
    "Red Lentils",
    "500g",
    1.50
  ],

  [
    "Puy Lentils",
    "400g",
    1.75
  ],

  [
    "Tofu",
    "280g",
    2.25
  ],

  [
    "Tempeh",
    "200g",
    3.00
  ],

  [
    "Edamame",
    "400g",
    2.50
  ],

  [
    "Falafel",
    "200g",
    2.00
  ],

  [
    "Seitan",
    "250g",
    3.00
  ],

  [
    "Plant Based Mince",
    "500g",
    3.50
  ],


  /*
   * -------------------------------------------------------
   * CARBOHYDRATES
   * -------------------------------------------------------
   */

  [
    "Brown Rice",
    "1kg",
    2.50
  ],

  [
    "Basmati Rice",
    "1kg",
    2.40
  ],

  [
    "Jasmine Rice",
    "1kg",
    2.50
  ],

  [
    "Wild Rice",
    "500g",
    3.00
  ],

  [
    "Quinoa",
    "500g",
    3.25
  ],

  [
    "Couscous",
    "500g",
    1.50
  ],

  [
    "Bulgur Wheat",
    "500g",
    1.75
  ],

  [
    "Pearl Barley",
    "500g",
    1.50
  ],

  [
    "Wholewheat Noodles",
    "300g",
    1.75
  ],

  [
    "Rice Noodles",
    "300g",
    2.00
  ],

  [
    "Wholewheat Spaghetti",
    "500g",
    1.40
  ],

  [
    "Pasta",
    "500g",
    1.25
  ],

  [
    "Brown Pasta",
    "500g",
    1.50
  ],

  [
    "Wholemeal Pitta",
    "6 pack",
    1.50
  ],

  [
    "Pitta Bread",
    "6 pack",
    1.35
  ],

  [
    "Wholemeal Bagels",
    "5 pack",
    1.75
  ],

  [
    "Bagels",
    "5 pack",
    1.60
  ],

  [
    "Wholemeal English Muffins",
    "4 pack",
    1.50
  ],

  [
    "Tortilla Wraps",
    "8 pack",
    1.50
  ],

  [
    "Corn Tortillas",
    "8 pack",
    1.75
  ],

  [
    "Wholegrain Crackers",
    "250g",
    1.75
  ],

  [
    "Corn Cakes",
    "120g",
    1.50
  ],

  [
    "Granola",
    "500g",
    3.00
  ],

  [
    "Muesli",
    "1kg",
    3.00
  ],

  [
    "Bran Flakes",
    "500g",
    2.25
  ],

  [
    "Corn Flakes",
    "500g",
    1.75
  ],


  /*
   * -------------------------------------------------------
   * VEGETABLES
   * -------------------------------------------------------
   */

  [
    "Mushrooms",
    "400g",
    1.25
  ],

  [
    "Closed Cup Mushrooms",
    "400g",
    1.30
  ],

  [
    "Onions",
    "1kg",
    1.20
  ],

  [
    "Red Onions",
    "500g",
    1.25
  ],

  [
    "Spring Onions",
    "100g",
    0.90
  ],

  [
    "Garlic",
    "3 pack",
    0.90
  ],

  [
    "Peppers",
    "3 pack",
    1.75
  ],

  [
    "Red Peppers",
    "3 pack",
    1.80
  ],

  [
    "Green Peppers",
    "3 pack",
    1.70
  ],

  [
    "Yellow Peppers",
    "3 pack",
    1.80
  ],

  [
    "Tomatoes",
    "500g",
    1.75
  ],

  [
    "Cherry Tomatoes",
    "300g",
    1.50
  ],

  [
    "Cucumber",
    "1 pack",
    0.90
  ],

  [
    "Carrots",
    "1kg",
    0.75
  ],

  [
    "Broccoli",
    "1 head",
    1.25
  ],

  [
    "Cauliflower",
    "1 head",
    1.50
  ],

  [
    "Courgette",
    "3 pack",
    1.50
  ],

  [
    "Aubergine",
    "1 pack",
    1.25
  ],

  [
    "Cabbage",
    "1 head",
    1.25
  ],

  [
    "Red Cabbage",
    "1 head",
    1.50
  ],

  [
    "Kale",
    "200g",
    1.50
  ],

  [
    "Green Beans",
    "200g",
    1.50
  ],

  [
    "Peas",
    "900g",
    1.75
  ],

  [
    "Petit Pois",
    "900g",
    2.00
  ],

  [
    "Sweetcorn",
    "340g",
    1.00
  ],

  [
    "Corn on the Cob",
    "4 pack",
    2.00
  ],

  [
    "Asparagus",
    "250g",
    2.25
  ],

  [
    "Celery",
    "1 pack",
    1.00
  ],

  [
    "Leeks",
    "500g",
    1.50
  ],

  [
    "Beetroot",
    "500g",
    1.25
  ],

  [
    "Turnip",
    "500g",
    1.00
  ],

  [
    "Swede",
    "1 pack",
    1.00
  ],

  [
    "Butternut Squash",
    "1kg",
    2.00
  ],

  [
    "Pumpkin",
    "1 pack",
    2.00
  ],

  [
    "Rocket",
    "70g",
    1.25
  ],

  [
    "Lettuce",
    "1 head",
    1.00
  ],

  [
    "Mixed Salad",
    "250g",
    1.50
  ],

  [
    "Watercress",
    "80g",
    1.20
  ],

  [
    "Pak Choi",
    "2 pack",
    1.50
  ],

  [
    "Tenderstem Broccoli",
    "200g",
    2.00
  ],

  [
    "Brussels Sprouts",
    "500g",
    1.50
  ],

  [
    "Spinach Leaves",
    "240g",
    1.50
  ],

  [
    "Frozen Broccoli",
    "1kg",
    1.75
  ],

  [
    "Frozen Peas",
    "1kg",
    1.75
  ],

  [
    "Frozen Sweetcorn",
    "1kg",
    1.75
  ],

  [
    "Frozen Mixed Vegetables",
    "1kg",
    1.75
  ],


  /*
   * -------------------------------------------------------
   * FRUIT
   * -------------------------------------------------------
   */

  [
    "Apples",
    "6 pack",
    2.00
  ],

  [
    "Green Apples",
    "6 pack",
    2.25
  ],

  [
    "Pears",
    "4 pack",
    1.75
  ],

  [
    "Oranges",
    "6 pack",
    2.25
  ],

  [
    "Mandarins",
    "600g",
    2.00
  ],

  [
    "Clementines",
    "600g",
    2.00
  ],

  [
    "Grapes",
    "500g",
    2.25
  ],

  [
    "Strawberries",
    "400g",
    2.50
  ],

  [
    "Blueberries",
    "150g",
    2.00
  ],

  [
    "Raspberries",
    "150g",
    2.25
  ],

  [
    "Blackberries",
    "150g",
    2.25
  ],

  [
    "Cherries",
    "300g",
    3.00
  ],

  [
    "Pineapple",
    "1 pack",
    2.00
  ],

  [
    "Mango",
    "1 pack",
    1.50
  ],

  [
    "Kiwi",
    "6 pack",
    2.00
  ],

  [
    "Melon",
    "1 pack",
    2.00
  ],

  [
    "Watermelon",
    "1 pack",
    3.00
  ],

  [
    "Peaches",
    "4 pack",
    2.25
  ],

  [
    "Nectarines",
    "4 pack",
    2.25
  ],

  [
    "Plums",
    "6 pack",
    2.00
  ],

  [
    "Grapefruit",
    "3 pack",
    2.00
  ],

  [
    "Lemon",
    "4 pack",
    1.50
  ],

  [
    "Lime",
    "4 pack",
    1.50
  ],

  [
    "Pomegranate",
    "1 pack",
    1.50
  ],

  [
    "Passion Fruit",
    "3 pack",
    2.50
  ],

  [
    "Dried Dates",
    "200g",
    2.00
  ],

  [
    "Raisins",
    "500g",
    2.00
  ],

  [
    "Dried Apricots",
    "250g",
    2.50
  ],

  [
    "Frozen Strawberries",
    "500g",
    2.50
  ],

  [
    "Frozen Blueberries",
    "500g",
    3.00
  ],

  [
    "Frozen Raspberries",
    "500g",
    3.00
  ],

  [
    "Frozen Fruit",
    "500g",
    3.00
  ],


  /*
   * -------------------------------------------------------
   * NUTS / SEEDS / HEALTHY FATS
   * -------------------------------------------------------
   */

  [
    "Almonds",
    "200g",
    2.75
  ],

  [
    "Walnuts",
    "200g",
    3.00
  ],

  [
    "Cashews",
    "200g",
    3.00
  ],

  [
    "Peanuts",
    "500g",
    2.50
  ],

  [
    "Mixed Nuts",
    "300g",
    3.50
  ],

  [
    "Pistachios",
    "200g",
    3.50
  ],

  [
    "Brazil Nuts",
    "200g",
    3.25
  ],

  [
    "Hazelnuts",
    "200g",
    3.25
  ],

  [
    "Chia Seeds",
    "300g",
    3.50
  ],

  [
    "Flaxseed",
    "300g",
    2.50
  ],

  [
    "Pumpkin Seeds",
    "250g",
    2.50
  ],

  [
    "Sunflower Seeds",
    "250g",
    1.75
  ],

  [
    "Sesame Seeds",
    "250g",
    1.75
  ],

  [
    "Peanut Butter",
    "340g",
    2.50
  ],

  [
    "Smooth Peanut Butter",
    "340g",
    2.50
  ],

  [
    "Crunchy Peanut Butter",
    "340g",
    2.50
  ],

  [
    "Almond Butter",
    "250g",
    4.50
  ],

  [
    "Tahini",
    "300g",
    3.00
  ],

  [
    "Olive Oil",
    "500ml",
    5.00
  ],

  [
    "Extra Virgin Olive Oil",
    "500ml",
    6.50
  ],

  [
    "Rapeseed Oil",
    "1L",
    3.50
  ],

  [
    "Coconut Oil",
    "500ml",
    4.50
  ],


  /*
   * -------------------------------------------------------
   * TINNED / JARRED / COOKING
   * -------------------------------------------------------
   */

  [
    "Chopped Tomatoes",
    "400g",
    0.85
  ],

  [
    "Tinned Tomatoes",
    "400g",
    0.85
  ],

  [
    "Passata",
    "500g",
    1.00
  ],

  [
    "Tomato Puree",
    "200g",
    0.90
  ],

  [
    "Baked Beans",
    "4 pack",
    2.50
  ],

  [
    "Sweetcorn",
    "3 pack",
    2.50
  ],

  [
    "Tinned Peas",
    "400g",
    0.90
  ],

  [
    "Tinned Kidney Beans",
    "400g",
    0.90
  ],

  [
    "Tinned Chickpeas",
    "400g",
    0.90
  ],

  [
    "Tinned Lentils",
    "400g",
    1.00
  ],

  [
    "Salsa",
    "300g",
    1.75
  ],

  [
    "Hummus",
    "200g",
    1.50
  ],

  [
    "Light Hummus",
    "200g",
    1.60
  ],

  [
    "Pesto",
    "190g",
    2.00
  ],

  [
    "Low Fat Mayonnaise",
    "500ml",
    2.00
  ],

  [
    "Mayonnaise",
    "500ml",
    2.00
  ],

  [
    "Tomato Ketchup",
    "500ml",
    1.75
  ],

  [
    "Soy Sauce",
    "150ml",
    1.50
  ],

  [
    "Hot Sauce",
    "150ml",
    1.50
  ],

  [
    "Balsamic Vinegar",
    "500ml",
    2.50
  ],


  /*
   * -------------------------------------------------------
   * HERBS / SPICES
   * -------------------------------------------------------
   */

  [
    "Salt",
    "750g",
    0.60
  ],

  [
    "Black Pepper",
    "100g",
    1.50
  ],

  [
    "Paprika",
    "50g",
    1.00
  ],

  [
    "Smoked Paprika",
    "50g",
    1.25
  ],

  [
    "Chilli Powder",
    "50g",
    1.00
  ],

  [
    "Cumin",
    "40g",
    1.00
  ],

  [
    "Turmeric",
    "40g",
    1.00
  ],

  [
    "Cinnamon",
    "40g",
    1.00
  ],

  [
    "Mixed Herbs",
    "15g",
    0.90
  ],

  [
    "Oregano",
    "15g",
    0.90
  ],

  [
    "Basil",
    "15g",
    0.90
  ],

  [
    "Curry Powder",
    "100g",
    1.25
  ],

  [
    "Ginger",
    "150g",
    1.00
  ],

  [
    "Fresh Coriander",
    "30g",
    0.90
  ],

  [
    "Fresh Parsley",
    "30g",
    0.90
  ],


  /*
   * -------------------------------------------------------
   * BREAKFAST / SNACKS
   * -------------------------------------------------------
   */

  [
    "Porridge Oats",
    "1kg",
    1.75
  ],

  [
    "Protein Bars",
    "4 pack",
    4.00
  ],

  [
    "Popcorn",
    "100g",
    1.25
  ],

  [
    "Dark Chocolate",
    "100g",
    1.75
  ],

  [
    "Rice Pudding",
    "400g",
    1.50
  ],

  [
    "Low Sugar Cereal",
    "500g",
    2.50
  ],

  [
    "Greek Yoghurt 0%",
    "500g",
    2.25
  ],

  [
    "Protein Yoghurt",
    "400g",
    2.50
  ],

  [
    "Fruit Yoghurt",
    "4 pack",
    2.00
  ],


  /*
   * -------------------------------------------------------
   * VEGETARIAN / VEGAN
   * -------------------------------------------------------
   */

  [
    "Vegetarian Sausages",
    "8 pack",
    3.00
  ],

  [
    "Vegetarian Burgers",
    "4 pack",
    3.00
  ],

  [
    "Vegan Sausages",
    "6 pack",
    3.25
  ],

  [
    "Vegan Burgers",
    "2 pack",
    3.00
  ],

  [
    "Vegan Nuggets",
    "300g",
    3.00
  ],

  [
    "Plant Based Chicken",
    "300g",
    3.50
  ]

];


/*
 * =========================================================
 * SEEDED RETAILER MULTIPLIERS
 * =========================================================
 *
 * These are TEST values only.
 *
 * They allow Best Basket to demonstrate supermarket
 * comparison without claiming to use live pricing.
 */

const retailerMultiplier = {

  tesco:
    1.00,

  sainsburys:
    1.03,

  asda:
    0.96,

  morrisons:
    0.99,

  waitrose:
    1.25,

  aldi:
    0.88

};


const seededUpdatedAt =
  "2026-09-02";


/* =========================================================
   INTERNAL HELPERS
   ========================================================= */

function makeId(
  retailer,
  name
){

  return (

    retailer +

    "-" +

    clean(
      name
    )
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-|-$/g,
        ""
      )

  );

}


function seededPrice(
  basePrice,
  retailer
){

  return Math.round(

    basePrice *

    retailerMultiplier[
      retailer
    ] *

    100

  ) / 100;

}


/* =========================================================
   BUILD EXISTING PRODUCTS
   ========================================================= */

const existingGeneratedProducts =

  existingProducts.flatMap(

    ([name,packSize]) =>

      retailerIds.map(

        (
          retailer,
          index
        ) => ({

          id:
            makeId(
              retailer,
              name
            ),

          retailer:
            retailer,

          name:
            name,

          packSize:
            packSize,

          price:
            existingRetailerPrices[
              name
            ][
              index
            ],

          updatedAt:
            seededUpdatedAt

        })

      )

  );


/* =========================================================
   BUILD EXPANDED PRODUCTS
   ========================================================= */

const generatedAdditionalProducts =

  additionalProducts.flatMap(

    (
      [
        name,
        packSize,
        basePrice
      ]
    ) =>

      retailerIds.map(

        retailer => ({

          id:
            makeId(
              retailer,
              name
            ),

          retailer:
            retailer,

          name:
            name,

          packSize:
            packSize,

          price:
            seededPrice(
              basePrice,
              retailer
            ),

          updatedAt:
            seededUpdatedAt

        })

      )

  );


/* =========================================================
   PUBLIC PRODUCT DATABASE
   ========================================================= */

export const products = [

  ...existingGeneratedProducts,

  ...generatedAdditionalProducts

];


/* =========================================================
   TEXT NORMALISATION
   ========================================================= */

export function clean(
  value
){

  return String(
    value || ""
  )

    .toLowerCase()

    .trim()

    .replace(
      /\s+/g,
      " "
    );

}


/* =========================================================
   PRODUCT MATCHING
   =========================================================
 *
 * IMPORTANT:
 *
 * The matcher NEVER guesses when a request is ambiguous.
 *
 * Exact:
 *
 * "Pork"
 *
 * only matches a product actually named:
 *
 * "Pork"
 *
 * It will NOT silently select:
 *
 * "Pork Loin"
 *
 * or:
 *
 * "Lean Pork Mince"
 *
 * If a request could refer to multiple products,
 * an empty result is returned so Best Basket can show
 * the item as unavailable/ambiguous rather than giving
 * the customer the wrong food.
 */


/*
 * Examples:
 *
 * "Potatoes"
 *
 * -> Potatoes
 *
 *
 * "Sweet Potatoes"
 *
 * -> Sweet Potatoes
 *
 *
 * "Mushrooms"
 *
 * -> Mushrooms
 *
 *
 * "Chicken Breast 1kg"
 *
 * -> Chicken Breast
 *
 *
 * "Pork"
 *
 * -> ambiguous
 * -> []
 */

export function findProducts(
  itemName,
  retailerIds=[]
){

  const query =
    clean(
      itemName
    );


  /*
   * Empty query.
   */

  if(
    !query
  ){

    return [];

  }


  /*
   * Restrict search to requested retailers
   * when retailer IDs are supplied.
   */

  const allowedRetailers =

    Array.isArray(
      retailerIds
    ) &&

    retailerIds.length

      ? new Set(

          retailerIds.map(

            id =>
              clean(id)

          )

        )

      : null;


  /*
   * Candidate products.
   */

  const candidates =

    products.filter(

      product => {

        if(
          !allowedRetailers
        ){

          return true;

        }


        return allowedRetailers.has(

          clean(
            product.retailer
          )

        );

      }

    );


  /*
   * =======================================================
   * 1. EXACT MATCH
   * =======================================================
   *
   * Exact match always wins.
   */

  const exactMatches =

    candidates.filter(

      product =>

        clean(
          product.name
        ) === query

    );


  if(
    exactMatches.length
  ){

    return exactMatches;

  }


  /*
   * =======================================================
   * 2. WHOLE WORD MATCH
   * =======================================================
   *
   * This allows:
   *
   * "Chicken Breast 1kg"
   *
   * to match:
   *
   * "Chicken Breast"
   *
   * BUT only when exactly ONE product matches.
   */

  const queryWords =

    query
      .split(" ")
      .filter(Boolean);


  const wordMatches =

    candidates.filter(

      product => {

        const productWords =

          clean(
            product.name
          )
            .split(" ")
            .filter(Boolean);


        return queryWords.every(

          word =>

            productWords.includes(
              word
            )

        );

      }

    );


  /*
   * One unique whole-word match is safe.
   */

  if(
    wordMatches.length === 1
  ){

    return wordMatches;

  }


  /*
   * More than one result means ambiguity.
   *
   * DO NOT GUESS.
   *
   * Example:
   *
   * Pork
   *
   * could potentially refer to:
   *
   * Pork Loin
   * Pork Chops
   * Lean Pork Mince
   */

  if(
    wordMatches.length > 1
  ){

    return [];

  }


  /*
   * =======================================================
   * 3. PARTIAL MATCH
   * =======================================================
   *
   * Last resort.
   *
   * Again, only accept a single unique result.
   */

  const partialMatches =

    candidates.filter(

      product => {

        const productName =

          clean(
            product.name
          );


        return (

          productName.includes(
            query
          ) ||

          query.includes(
            productName
          )

        );

      }

    );


  /*
   * One unique partial result is acceptable.
   */

  if(
    partialMatches.length === 1
  ){

    return partialMatches;

  }


  /*
   * Multiple partial matches are ambiguous.
   *
   * Return nothing instead of choosing the wrong food.
   */

  return [];

}