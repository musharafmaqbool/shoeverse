export const products = [
  // Running Shoes
  {
    id: 1,
    name: 'Nike Air Max 270',
    category: 'running',
    brand: 'Nike',
    image: '/images/shoe1-removebg-preview.png',
    originalPrice: 9000,
    discountedPrice: 7500,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Black', 'White', 'Red'],
    description: 'Maximum comfort with Air Max technology. Perfect for daily running and casual wear.',
    features: ['Air Max technology', 'Breathable mesh', 'Cushioned sole'],
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 22',
    category: 'running',
    brand: 'Adidas',
    image: '/images/shoe2-removebg-preview.png',
    originalPrice: 13500,
    discountedPrice: 10500,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Blue', 'White', 'Grey'],
    description: 'Revolutionary Boost technology for ultimate energy return and comfort.',
    features: ['Boost technology', 'Primeknit upper', 'Continental rubber'],
    inStock: true,
    rating: 4.8,
    reviews: 95
  },
  {
    id: 3,
    name: 'Puma RS-X',
    category: 'casual',
    brand: 'Puma',
    image: '/images/shoe3-removebg-preview.png',
    originalPrice: 7500,
    discountedPrice: 6000,
    sizes: [7, 8, 9, 10, 11],
    colors: ['White', 'Black', 'Pink'],
    description: 'Retro-inspired design with modern comfort. Perfect for street style.',
    features: ['Retro design', 'Cushioned midsole', 'Durable upper'],
    inStock: true,
    rating: 4.3,
    reviews: 67
  },
  {
    id: 4,
    name: 'Converse Chuck Taylor All Star',
    category: 'casual',
    brand: 'Converse',
    image: '/images/shoe4-removebg-preview.png',
    originalPrice: 4500,
    discountedPrice: 3800,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ['White', 'Black', 'Navy', 'Red'],
    description: 'Classic canvas sneaker that never goes out of style.',
    features: ['Canvas upper', 'Rubber sole', 'Classic design'],
    inStock: true,
    rating: 4.6,
    reviews: 234
  },
  {
    id: 5,
    name: 'New Balance 990v5',
    category: 'running',
    brand: 'New Balance',
    image: '/images/shoe5-removebg-preview.png',
    originalPrice: 12800,
    discountedPrice: 9800,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Grey', 'Black', 'Navy'],
    description: 'Premium comfort with ENCAP technology for superior support.',
    features: ['ENCAP technology', 'Pigskin upper', 'Dual density collar'],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 6,
    name: 'Reebok Classic Leather',
    category: 'casual',
    brand: 'Reebok',
    image: '/images/shoe6-removebg-preview.png',
    originalPrice: 6000,
    discountedPrice: 4900,
    sizes: [7, 8, 9, 10, 11],
    colors: ['White', 'Black', 'Grey'],
    description: 'Timeless leather sneaker with classic Reebok styling.',
    features: ['Leather upper', 'Rubber sole', 'Classic design'],
    inStock: true,
    rating: 4.4,
    reviews: 156
  },
  // Basketball Shoes
  {
    id: 7,
    name: 'Nike Air Jordan 1',
    category: 'basketball',
    brand: 'Nike',
    image: '/images/shoe1-removebg-preview.png',
    originalPrice: 15000,
    discountedPrice: 12000,
    sizes: [7, 8, 9, 10, 11, 12, 13],
    colors: ['Red', 'Black', 'White'],
    description: 'Iconic basketball shoe with premium materials and classic design.',
    features: ['Leather upper', 'Air-Sole unit', 'Rubber outsole'],
    inStock: true,
    rating: 4.9,
    reviews: 312
  },
  {
    id: 8,
    name: 'Adidas Harden Vol. 6',
    category: 'basketball',
    brand: 'Adidas',
    image: '/images/shoe2-removebg-preview.png',
    originalPrice: 11000,
    discountedPrice: 8500,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Black', 'White', 'Red'],
    description: 'Performance basketball shoe designed for quick movements and stability.',
    features: ['Boost technology', 'Torsion system', 'Non-marking outsole'],
    inStock: true,
    rating: 4.6,
    reviews: 78
  },
  // Formal Shoes
  {
    id: 9,
    name: 'Clarks Desert Boot',
    category: 'formal',
    brand: 'Clarks',
    image: '/images/shoe3-removebg-preview.png',
    originalPrice: 8500,
    discountedPrice: 6800,
    sizes: [7, 8, 9, 10, 11],
    colors: ['Brown', 'Black', 'Tan'],
    description: 'Classic desert boot with premium suede leather construction.',
    features: ['Suede leather', 'Cushioned footbed', 'Crepe sole'],
    inStock: true,
    rating: 4.5,
    reviews: 92
  },
  {
    id: 10,
    name: 'Cole Haan GrandPro',
    category: 'formal',
    brand: 'Cole Haan',
    image: '/images/shoe4-removebg-preview.png',
    originalPrice: 12000,
    discountedPrice: 9500,
    sizes: [8, 9, 10, 11, 12],
    colors: ['Black', 'Brown', 'Navy'],
    description: 'Professional oxford with modern comfort technology.',
    features: ['Leather upper', 'Grand.ØS technology', 'Rubber sole'],
    inStock: true,
    rating: 4.7,
    reviews: 45
  },
  // Sports Shoes
  {
    id: 11,
    name: 'Nike ZoomX Vaporfly',
    category: 'sports',
    brand: 'Nike',
    image: '/images/shoe5-removebg-preview.png',
    originalPrice: 25000,
    discountedPrice: 20000,
    sizes: [7, 8, 9, 10, 11],
    colors: ['White', 'Black', 'Green'],
    description: 'Elite racing shoe with ZoomX foam for maximum energy return.',
    features: ['ZoomX foam', 'Carbon fiber plate', 'Vaporweave upper'],
    inStock: true,
    rating: 4.9,
    reviews: 67
  },
  {
    id: 12,
    name: 'Adidas Adizero Adios',
    category: 'sports',
    brand: 'Adidas',
    image: '/images/shoe6-removebg-preview.png',
    originalPrice: 18000,
    discountedPrice: 14500,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['White', 'Black', 'Blue'],
    description: 'Lightweight racing shoe designed for speed and efficiency.',
    features: ['Lightweight mesh', 'Boost midsole', 'Continental rubber'],
    inStock: true,
    rating: 4.8,
    reviews: 89
  }
];

export const categories = [
  { id: 'all', name: 'All Shoes', count: products.length },
  { id: 'running', name: 'Running', count: products.filter(p => p.category === 'running').length },
  { id: 'casual', name: 'Casual', count: products.filter(p => p.category === 'casual').length },
  { id: 'basketball', name: 'Basketball', count: products.filter(p => p.category === 'basketball').length },
  { id: 'formal', name: 'Formal', count: products.filter(p => p.category === 'formal').length },
  { id: 'sports', name: 'Sports', count: products.filter(p => p.category === 'sports').length }
];

export const brands = [
  'Nike', 'Adidas', 'Puma', 'Converse', 'New Balance', 'Reebok', 'Clarks', 'Cole Haan'
];

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}; 