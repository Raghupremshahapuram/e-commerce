import { Product } from '../context/AppContext';
import gheeProduct from '../assets/ghee-product.jpg';
import cowDungDiyas from '../assets/cow-dung-diyas.jpg';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pure A2 Cow Ghee',
    description: 'Traditional Vedic ghee made from indigenous desi cow milk using ancient bilona method',
    price: 899,
    originalPrice: 1199,
    image: gheeProduct,
    category: 'Cow Ghee',
    inStock: true,
    weight: '500g',
    featured: true,
    benefits: [
      'Rich in Omega-3 fatty acids',
      'Aids digestion and immunity', 
      'Sacred for Vedic rituals',
      'Made from A2 milk only'
    ],
    ingredients: ['100% Pure Desi Cow Milk', 'No additives or preservatives']
  },
  {
    id: '2',
    name: 'Handmade Cow Dung Diyas (Set of 12)',
    description: 'Traditional oil lamps crafted from pure cow dung for festivals and daily puja',
    price: 299,
    image: cowDungDiyas,
    category: 'Cow Dung Crafts',
    inStock: true,
    featured: true,
    benefits: [
      'Purifies air naturally',
      'Eco-friendly and biodegradable',
      'Traditional festival essential',
      'Handcrafted by village artisans'
    ],
    ingredients: ['Pure Cow Dung', 'Natural clay', 'Organic binding agents']
  },
  {
    id: '3',
    name: 'Organic Cow Dung Fertilizer',
    description: 'Premium organic fertilizer for kitchen gardens and farming',
    price: 199,
    image: cowDungDiyas,
    category: 'Organic Farming Aids',
    inStock: true,
    weight: '1kg',
    benefits: [
      'Improves soil health naturally',
      'Chemical-free nutrition for plants',
      'Enhances crop yield organically',
      'Rich in essential minerals'
    ]
  },
  {
    id: '4',
    name: 'Agnihotra Kit Complete Set',
    description: 'Complete copper pyramid kit for Vedic fire ceremony with cow dung cakes',
    price: 2499,
    originalPrice: 2999,
    image: gheeProduct,
    category: 'Ayurvedic Home Essentials',
    inStock: true,
    featured: true,
    benefits: [
      'Purifies environment through sacred fire',
      'Authentic copper pyramid design',
      'Includes cow dung cakes and organic rice',
      'Complete instruction manual included'
    ]
  },
  {
    id: '5',
    name: 'Cow Dung Incense Sticks',
    description: 'Natural incense made from cow dung and herbs for spiritual ambiance',
    price: 149,
    image: cowDungDiyas,
    category: 'Cow Dung Crafts',
    inStock: true,
    benefits: [
      'Natural air purification',
      'Calming aromatic experience',
      'Made with traditional methods',
      'Chemical-free and safe'
    ]
  },
  {
    id: '6',
    name: 'Bilona Method Ghee 1kg',
    description: 'Large pack of premium ghee made using traditional wooden churning method',
    price: 1699,
    originalPrice: 2099,
    image: gheeProduct,
    category: 'Cow Ghee',
    inStock: true,
    weight: '1kg',
    benefits: [
      'Made using ancient bilona method',
      'Higher nutritional value',
      'Rich golden color and aroma',
      'Perfect for large families'
    ]
  }
];

export const categories = [
  {
    id: 'cow-ghee',
    name: 'Cow Ghee',
    description: 'Pure A2 ghee from indigenous cows',
    image: gheeProduct
  },
  {
    id: 'cow-dung-crafts',
    name: 'Cow Dung Crafts',
    description: 'Handmade eco-friendly products',
    image: cowDungDiyas
  },
  {
    id: 'organic-farming',
    name: 'Organic Farming Aids',
    description: 'Natural fertilizers and soil enhancers',
    image: cowDungDiyas
  },
  {
    id: 'ayurvedic-essentials',
    name: 'Ayurvedic Home Essentials',
    description: 'Traditional wellness products',
    image: gheeProduct
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'California, USA',
    text: 'The ghee quality is exceptional! You can taste the purity and tradition in every spoon. My entire family loves it.',
    rating: 5
  },
  {
    id: '2',
    name: 'Priya Patel',
    location: 'London, UK',
    text: 'These cow dung diyas are beautiful and authentic. They burn perfectly and create such a peaceful atmosphere during our evening prayers.',
    rating: 5
  },
  {
    id: '3',
    name: 'David Chen',
    location: 'Toronto, Canada',
    text: 'Amazing products! Fast international shipping and everything arrived in perfect condition. The ghee is the best I have ever tasted.',
    rating: 5
  }
];

export const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' }
];

export const languages = [
  { code: 'EN', name: 'English' },
  { code: 'HI', name: 'हिंदी' }
];