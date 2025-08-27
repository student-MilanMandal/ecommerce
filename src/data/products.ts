export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  rating?: number;
  oldPrice?: number;
  discount?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    featured: true,
    rating: 4.5,
    oldPrice: 129.99,
    discount: 23,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Feature-rich smartwatch with health tracking',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    featured: true,
    rating: 4.8,
    oldPrice: 249.99,
    discount: 20,
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 79.99,
    description: 'Comfortable running shoes for athletes',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
    category: 'Sports',
    featured: false,
    rating: 4.3,
    oldPrice: 99.99,
    discount: 20,
  },
  {
    id: 4,
    name: 'Coffee Maker',
    price: 149.99,
    description: 'Premium coffee maker for the perfect brew',
    imageUrl:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center',
    category: 'Home & Kitchen',
    featured: true,
    rating: 4.6,
    oldPrice: 199.99,
    discount: 25,
  },
  {
    id: 5,
    name: 'Laptop Backpack',
    price: 59.99,
    description: 'Durable laptop backpack with multiple compartments',
    imageUrl:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
    category: 'Accessories',
    featured: false,
    rating: 4.2,
  },
  {
    id: 6,
    name: 'Yoga Mat',
    price: 29.99,
    description: 'Non-slip yoga mat for comfortable workouts',
    imageUrl:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
    category: 'Sports',
    featured: false,
    rating: 4.4,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 49.99,
    description: 'Portable bluetooth speaker with excellent sound quality',
    imageUrl:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    featured: true,
    rating: 4.5,
    oldPrice: 69.99,
    discount: 29,
  },
  {
    id: 8,
    name: 'Gaming Mouse',
    price: 39.99,
    description: 'High-precision gaming mouse with RGB lighting',
    imageUrl:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    featured: false,
    rating: 4.7,
  },
  {
    id: 9,
    name: 'Water Bottle',
    price: 24.99,
    description: 'Insulated stainless steel water bottle',
    imageUrl:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center',
    category: 'Sports',
    featured: false,
    rating: 4.1,
  },
  {
    id: 10,
    name: 'Desk Lamp',
    price: 34.99,
    description: 'LED desk lamp with adjustable brightness',
    imageUrl:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&crop=center',
    category: 'Home & Kitchen',
    featured: false,
    rating: 4.3,
  },
  {
    id: 11,
    name: 'Wireless Charger',
    price: 25.99,
    description: 'Fast wireless charging pad for smartphones',
    imageUrl:
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    featured: true,
    rating: 4.4,
    oldPrice: 35.99,
    discount: 28,
  },

  {
    id: 13,
    name: 'Fitness Tracker',
    price: 69.99,
    description: 'Activity tracker with heart rate monitoring',
    imageUrl:
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    featured: true,
    rating: 4.2,
    oldPrice: 89.99,
    discount: 22,
  },
  {
    id: 14,
    name: 'Travel Mug',
    price: 19.99,
    description: 'Insulated travel mug with leak-proof lid',
    imageUrl:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center',
    category: 'Home & Kitchen',
    featured: false,
    rating: 4.0,
  },
  {
    id: 15,
    name: 'Phone Case',
    price: 14.99,
    description: 'Protective phone case with shock absorption',
    imageUrl:
      'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop&crop=center',
    category: 'Accessories',
    featured: false,
    rating: 4.1,
  },
  {
    id: 16,
    name: 'Sunglasses',
    price: 45.99,
    description: 'Stylish sunglasses with UV protection',
    imageUrl:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center',
    category: 'Accessories',
    featured: true,
    rating: 4.5,
    oldPrice: 59.99,
    discount: 23,
  },
  {
    id: 17,
    name: 'Tablet Stand',
    price: 22.99,
    description: 'Adjustable tablet stand for desk or table',
    imageUrl:
      'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=400&fit=crop&crop=center',
    category: 'Accessories',
    featured: false,
    rating: 4.3,
  },
  {
    id: 18,
    name: 'Resistance Bands',
    price: 16.99,
    description: 'Set of resistance bands for home workouts',
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    category: 'Sports',
    featured: false,
    rating: 4.2,
  },
  {
    id: 19,
    name: 'Essential Oil Diffuser',
    price: 39.99,
    description: 'Ultrasonic essential oil diffuser with LED lights',
    imageUrl:
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center',
    category: 'Home & Kitchen',
    featured: true,
    rating: 4.6,
    oldPrice: 54.99,
    discount: 27,
  },
  {
    id: 20,
    name: 'Portable Charger',
    price: 29.99,
    description: 'High-capacity portable power bank',
    imageUrl:
      'https://images.unsplash.com/photo-1609592194067-ac86ba97eb44?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    featured: false,
    rating: 4.4,
  },
];
