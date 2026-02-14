import { Client } from "pg";
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dropTables = `DROP TABLE IF EXISTS products, categories;`;

const createCategoriesTable = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) UNIQUE
  );
`;

const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255),
    price NUMERIC(10, 2),
    quantity SMALLINT,
    brand TEXT,
    description TEXT,
    image BYTEA
  );
`;

const createCategories = `
  INSERT INTO categories (category) VALUES
    ('Vegetables'),
    ('Fruits'),
    ('Bakery'),
    ('Dairy'),
    ('Seafood'),
    ('Beverages'),
    ('Meat'),
    ('Frozen Foods'),
    ('Condiments & Spices'),
    ('Snacks & Candy'),
    ('Dry Goods');
`;

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

function getImageBuffer(imagePath) {
  try {
    const fileName = imagePath.replace('/images/', '');
    const filePath = path.join(IMAGES_DIR, fileName);
    return fs.readFileSync(filePath);
  } catch (error) {
    console.error(`Error with reading image ${imagePath}:`, error);
  }
}

const ProductsItems = [
  { category_id: 1, name: 'Carrot', quantity: 70, price: 0.30, brand: 'Nature Own', 
    description: 'Fresh orange carrots, great for cooking or munching raw.', image: '/images/carrot.png' },
  { category_id: 1, name: 'Tomato', quantity: 85, price: 0.85, brand: 'Fresh Farms', 
    description: 'Juicy vine-ripened tomatoes, ideal for salads and sandwiches.', image: '/images/tomato.png' },
  { category_id: 1, name: 'Broccoli', quantity: 45, price: 1.25, brand: 'Fresh Farms', 
    description: 'Organic broccoli florets, perfect for steaming or stir-frying.', image: '/images/broccoli.png' },

  { category_id: 2, name: 'Apple', quantity: 120, price: 0.65, brand: 'Orchard Fresh', 
    description: 'Crisp red delicious apples, sweet and juicy.', image: '/images/apple.png' },
  { category_id: 2, name: 'Banana', quantity: 150, price: 0.25, brand: 'Tropical Gold', 
    description: 'Ripe yellow bananas, perfect for snacking or baking.', image: '/images/banana.png' },
  { category_id: 2, name: 'Orange', quantity: 90, price: 0.75, brand: 'Citrus Grove', 
    description: 'Sweet navel oranges, packed with vitamin C.', image: '/images/orange.png' },  

  { category_id: 3, name: 'Croissant', quantity: 50, price: 2.50, brand: 'Parisian Bakehouse', 
    description: 'Buttery flaky croissants, perfect for breakfast.', image: '/images/croissant.png' },
  { category_id: 3, name: 'Muffin', quantity: 60, price: 2.25, brand: 'Morning Treats', 
    description: 'Blueberry muffins, moist and bursting with berries.', image: '/images/muffin.png' },
  { category_id: 3, name: 'Baguette', quantity: 25, price: 2.80, brand: 'French Artisan', 
    description: 'Traditional French baguette with crispy crust.', image: '/images/baguette.png' },  
    
  { category_id: 4, name: 'Milk', quantity: 80, price: 3.50, brand: 'Farm Fresh', 
    description: 'Whole milk from grass-fed cows, rich and creamy.', image: '/images/milk.png' },
  { category_id: 4, name: 'Butter', quantity: 70, price: 4.20, brand: 'Golden Creamery', 
    description: 'Unsalted butter, perfect for baking and cooking.', image: '/images/butter.png' },
  { category_id: 4, name: 'Eggs', quantity: 95, price: 3.80, brand: 'Happy Hens', 
    description: 'Large free-range eggs, fresh and nutritious.', image: '/images/egg.png' },

  { category_id: 5, name: 'Shrimp', quantity: 45, price: 9.75, brand: 'Coastal Catch', 
    description: 'Large peeled and deveined shrimp, perfect for grilling.', image: '/images/shrimp.png' },
  { category_id: 5, name: 'Scallops', quantity: 20, price: 16.50, brand: 'Premium Seafood', 
    description: 'Dry-packed sea scallops, perfect for pan-searing.', image: '/images/scallops.png' },
  { category_id: 5, name: "Tuna Steaks", quantity: 35, "price": 16.99, brand: "Deep Sea Delights",
     description: "Wild-caught Ahi tuna steaks, sushi-grade and ready to sear.", image: "/images/tuna-steaks.png" },  

  { category_id: 6, name: 'Orange Juice', quantity: 60, price: 4.25, brand: 'Sunshine Citrus', 
    description: 'Freshly squeezed orange juice, no added sugar.', image: '/images/orange-juice.png' },  
  { category_id: 6, name: 'Sparkling Water', quantity: 100, price: 1.25, brand: 'Mountain Spring', 
    description: 'Naturally carbonated sparkling water, refreshing and crisp.', image: '/images/sparkling-water.png' },
  { category_id: 6, name: 'Green Tea', quantity: 75, price: 3.50, brand: 'Zen Garden', 
    description: 'Organic green tea bags, antioxidant-rich.', image: '/images/green-tea.png' },
    
  { category_id: 7, name: 'Pork Chop', quantity: 35, price: 5.90, brand: 'Heritage Pork', 
    description: 'Center-cut pork chops, tender and flavorful.', image: '/images/pork-chop.png' },
  { category_id: 7, name: 'Bacon', quantity: 60, price: 6.75, brand: 'Smoky Mountain', 
    description: 'Applewood smoked bacon, thick-cut and crispy.', image: '/images/bacon.png' },
  { category_id: 7, name: 'Steak', quantity: 25, price: 15.50, brand: 'Premium Angus', 
    description: 'Ribeye steak, well-marbled and juicy.', image: '/images/steak.png' },  

  { category_id: 8, name: 'Ice Cream', quantity: 70, price: 5.50, brand: 'Creamy Delight', 
    description: 'Vanilla bean ice cream, rich and creamy.', image: '/images/ice-cream.png' },
  { category_id: 8, name: 'Frozen Pizza', quantity: 40, price: 8.25, brand: 'Italian Kitchen', 
    description: 'Classic cheese pizza, ready in minutes.', image: '/images/frozen-pizza.png' },
  { category_id: 8, name: 'Frozen Vegetables', quantity: 85, price: 2.75, brand: 'Garden Fresh', 
    description: 'Mixed frozen vegetables, perfect for quick meals.', image: '/images/frozen-vegetables.png' },  

  { category_id: 9, name: 'Black Pepper', quantity: 80, price: 3.80, brand: 'Spice World', 
    description: 'Freshly ground black pepper, aromatic and bold.', image: '/images/black-pepper.png' },
  { category_id: 9, name: 'Olive Oil', quantity: 45, price: 12.50, brand: 'Mediterranean Gold', 
    description: 'Extra virgin olive oil, cold-pressed and aromatic.', image: '/images/olive-oil.png' },
  { category_id: 9, name: 'Ketchup', quantity: 90, price: 3.25, brand: 'Classic Red', 
    description: 'Tomato ketchup, sweet and tangy.', image: '/images/ketchup.png' },    
    
  { category_id: 10, name: 'Cookies', quantity: 75, price: 4.20, brand: 'Home Bakery', 
    description: 'Chocolate chip cookies, soft and chewy.', image: '/images/cookies.png' },
  { category_id: 10, name: 'Chocolate Bar', quantity: 85, price: 2.50, brand: 'Sweet Indulgence', 
    description: 'Dark chocolate bar with 70% cocoa, rich and smooth.', image: '/images/chocolate-bar.png' },
  { category_id: 10, name: 'Potato Chips', quantity: 100, price: 3.25, brand: 'Crunch Time', 
    description: 'Classic salted potato chips, crispy and addictive.', image: '/images/potato-chips.png' },
    
  { category_id: 11, name: 'Rice', quantity: 120, price: 4.50, brand: 'Golden Grain', 
    description: 'Long-grain white rice, versatile and fluffy.', image: '/images/rice.png' },
  { category_id: 11, name: 'Pasta', quantity: 90, price: 2.25, brand: 'Italian Tradition', 
    description: 'Spaghetti pasta, perfect for classic Italian dishes.', image: '/images/pasta.png' },
  { category_id: 11, name: 'Sugar', quantity: 100, price: 2.80, brand: 'Sweet Crystal', 
    description: 'Granulated white sugar, perfect for baking and sweetening.', image: '/images/sugar.png' }    
];

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.NEON_URL || process.env.LOCAL_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query(dropTables);
    await client.query(createCategoriesTable);
    await client.query(createProductsTable);
    console.log("Tables created.");
    await client.query(createCategories);

    console.log("Inserting inventory data...");
    for (const item of ProductsItems) {
      const imageBuffer = getImageBuffer(item.image);
      
      const query = `
        INSERT INTO products 
          (category_id, name, quantity, price, brand,description, image)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
      `;
      
      await client.query(query, [
        item.category_id,
        item.name,
        item.quantity,
        item.price,
        item.brand,
        item.description,
        imageBuffer
      ]);
    }
    
    console.log("Data created successfully.");
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await client.end();
    console.log("Done.");
  }
}

main();