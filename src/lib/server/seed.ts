import { db } from './db.js';
import { categories } from './schema.js';
import { eq } from 'drizzle-orm';

// Initial categories based on the luxury home selections hierarchy
const initialCategories = [
  // Top-level categories
  { name: 'Hardware', parentId: null, order: 1 },
  { name: 'Plumbing Fixtures', parentId: null, order: 2 },
  { name: 'Cabinetry & Built-ins', parentId: null, order: 3 },
  { name: 'Flooring', parentId: null, order: 4 },
  { name: 'Trim & Molding', parentId: null, order: 5 },
  { name: 'Surface Treatments', parentId: null, order: 6 },
  { name: 'Doors', parentId: null, order: 7 },
  { name: 'Windows', parentId: null, order: 8 },
  { name: 'Shades & Screens', parentId: null, order: 9 },
  { name: 'Lighting', parentId: null, order: 10 },
  { name: 'Electrical Components', parentId: null, order: 11 },
  { name: 'Appliances', parentId: null, order: 12 },
  { name: 'Furniture', parentId: null, order: 13 },
  { name: 'Smart Home Systems', parentId: null, order: 14 },
];

// Subcategories for Hardware
const hardwareSubcategories = [
  { name: 'Cabinet Hardware', order: 1 },
  { name: 'Door Hardware', order: 2 },
  { name: 'Window Hardware', order: 3 },
  { name: 'Bathroom Hardware', order: 4 },
  { name: 'Specialty Hardware', order: 5 },
];

// Subcategories for Plumbing Fixtures
const plumbingSubcategories = [
  { name: 'Sinks', order: 1 },
  { name: 'Faucets', order: 2 },
  { name: 'Tubs', order: 3 },
  { name: 'Tub Fillers', order: 4 },
  { name: 'Showers', order: 5 },
  { name: 'Shower Controls', order: 6 },
  { name: 'Toilets', order: 7 },
  { name: 'Drains & Disposal', order: 8 },
];

// Subcategories for Cabinetry & Built-ins
const cabinetrySubcategories = [
  { name: 'Cabinet Types', order: 1 },
  { name: 'Built-ins', order: 2 },
];

// Subcategories for Flooring
const flooringSubcategories = [
  { name: 'Hard Flooring', order: 1 },
  { name: 'Soft Flooring', order: 2 },
  { name: 'Flooring Transitions', order: 3 },
];

// Subcategories for Trim & Molding
const trimSubcategories = [
  { name: 'Baseboard', order: 1 },
  { name: 'Crown Molding', order: 2 },
  { name: 'Wall Trim', order: 3 },
  { name: 'Door & Window Trim', order: 4 },
  { name: 'Ceiling Trim', order: 5 },
];

// Subcategories for Surface Treatments
const surfaceSubcategories = [
  { name: 'Wall Treatments', order: 1 },
  { name: 'Ceiling Treatments', order: 2 },
];

// Subcategories for Doors
const doorSubcategories = [
  { name: 'Interior Doors', order: 1 },
  { name: 'Exterior Doors', order: 2 },
];

// Subcategories for Windows
const windowSubcategories = [
  { name: 'Window Types', order: 1 },
];

// Subcategories for Shades & Screens
const shadeSubcategories = [
  { name: 'Window Shades', order: 1 },
  { name: 'Window Blinds', order: 2 },
  { name: 'Shutters', order: 3 },
  { name: 'Drapery', order: 4 },
  { name: 'Screens', order: 5 },
];

// Subcategories for Lighting
const lightingSubcategories = [
  { name: 'Light Fixtures', order: 1 },
  { name: 'Lighting Controls', order: 2 },
];

// Subcategories for Electrical Components
const electricalSubcategories = [
  { name: 'Electrical Outlets', order: 1 },
  { name: 'Electrical Switches', order: 2 },
  { name: 'Low Voltage', order: 3 },
];

// Subcategories for Appliances
const applianceSubcategories = [
  { name: 'Refrigeration', order: 1 },
  { name: 'Cooking', order: 2 },
  { name: 'Cleanup', order: 3 },
  { name: 'Laundry', order: 4 },
];

// Subcategories for Furniture
const furnitureSubcategories = [
  { name: 'Seating', order: 1 },
  { name: 'Tables', order: 2 },
  { name: 'Storage', order: 3 },
  { name: 'Beds', order: 4 },
  { name: 'Outdoor Furniture', order: 5 },
];

// Subcategories for Smart Home Systems
const smartHomeSubcategories = [
  { name: 'Climate Control', order: 1 },
  { name: 'Security', order: 2 },
  { name: 'Entertainment', order: 3 },
  { name: 'Automation', order: 4 },
];

// Map subcategories to their parent categories
const subcategories = {
  'Hardware': hardwareSubcategories,
  'Plumbing Fixtures': plumbingSubcategories,
  'Cabinetry & Built-ins': cabinetrySubcategories,
  'Flooring': flooringSubcategories,
  'Trim & Molding': trimSubcategories,
  'Surface Treatments': surfaceSubcategories,
  'Doors': doorSubcategories,
  'Windows': windowSubcategories,
  'Shades & Screens': shadeSubcategories,
  'Lighting': lightingSubcategories,
  'Electrical Components': electricalSubcategories,
  'Appliances': applianceSubcategories,
  'Furniture': furnitureSubcategories,
  'Smart Home Systems': smartHomeSubcategories,
};

export async function seedCategories() {
  try {
    console.log('Seeding categories...');
    
    // Check if categories already exist
    const existingCategories = await db.query.categories.findMany();
    if (existingCategories.length > 0) {
      console.log('Categories already exist. Skipping seed.');
      return;
    }
    
    // First, insert all top-level categories
    const topLevelInserts = await db.insert(categories)
      .values(initialCategories)
      .returning({ id: categories.id, name: categories.name });
    
    console.log(`Inserted ${topLevelInserts.length} top-level categories`);
    
    // Create a mapping from category name to ID for easier lookup
    const categoryNameToId = new Map();
    topLevelInserts.forEach(cat => {
      categoryNameToId.set(cat.name, cat.id);
    });
    
    // Now insert all subcategories with the correct parentId
    let totalSubcategoriesInserted = 0;
    
    for (const [parentName, subs] of Object.entries(subcategories)) {
      const parentId = categoryNameToId.get(parentName);
      
      if (!parentId) {
        console.warn(`Parent category "${parentName}" not found. Skipping subcategories.`);
        continue;
      }
      
      const subcatsWithParent = subs.map(sub => ({
        ...sub,
        parentId,
      }));
      
      const insertedSubs = await db.insert(categories)
        .values(subcatsWithParent)
        .returning({ id: categories.id });
      
      totalSubcategoriesInserted += insertedSubs.length;
    }
    
    console.log(`Inserted ${totalSubcategoriesInserted} subcategories`);
    console.log('Category seeding complete!');
    
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

// If this file is run directly, seed the database
if (require.main === module) {
  seedCategories()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
} 