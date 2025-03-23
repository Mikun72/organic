
export interface Product {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'dairy' | 'herbs';
  price: number;
  unit: string;
  image: string;
  description: string;
  organic: boolean;
  local: boolean;
  inSeason: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Fresh, seasonal fruits from local Indian farms',
    image: '/fruits.jpg'
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    description: 'Organic vegetables harvested at peak freshness',
    image: '/vegetables.jpg'
  },
  {
    id: 'dairy',
    name: 'Dairy',
    description: 'Farm-fresh dairy products from pasture-raised animals',
    image: '/dairy.jpg'
  },
  {
    id: 'herbs',
    name: 'Herbs',
    description: 'Aromatic fresh herbs to elevate your cooking',
    image: '/herbs.jpg'
  }
];

export const products: Product[] = [
  // FRUITS - with accurate Indian market prices and specific images
  {
    id: 'apple-kashmir',
    name: 'Kashmir Apples',
    category: 'fruits',
    price: 120,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet and crisp apples grown in Kashmir orchards without pesticides.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'banana-golden',
    name: 'Golden Bananas',
    category: 'fruits',
    price: 75,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Perfectly ripe organic bananas with a rich, sweet flavor profile from Kerala.',
    organic: true,
    local: true,
    inSeason: true
  },
  
  {
    id: 'mango-jucy',
    name: 'Juicy Mangoes',
    category: 'fruits',
    price: 200,
    unit: 'kg',
    image: 'https://ichef.bbci.co.uk/images/ic/1200x675/p06hk0h6.jpg',
    description: 'Premium juicy mangoes from Ratnagiri, known for their rich flavor and aroma.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'papaya-tropical',
    name: 'Tropical Papaya',
    category: 'fruits',
    price: 80,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A Taste of the Tropics! A name that represents sweetness, vibrancy, and the refreshing goodness of natures golden fruit',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'guava-sweet',
    name: 'Sweet Guava',
    category: 'fruits',
    price: 120,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1693399991519-bef70bed19a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet and aromatic pink guavas rich in vitamin C and antioxidants.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'pomegranate-ruby',
    name: 'Ruby Pomegranates',
    category: 'fruits',
    price: 85,
    unit: 'kg',
    image: 'https://plus.unsplash.com/premium_photo-1668076515507-c5bc223c99a4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Ruby red pomegranates from Maharashtra farms, packed with antioxidants.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'Strawberries-sweet',
    name: 'Sweet Strawberries',
    category: 'fruits',
    price: 200,
    unit: 'Pack',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet, Juicy, and Refreshing! A name that represents vibrant color, luscious flavor, and natural goodness in every bite.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'chikoo-fresh',
    name: 'Fresh Chikoo',
    category: 'fruits',
    price: 100,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1699863164935-633665c05731?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sapodilla (Chikoo) with malty sweet flavor, rich in dietary fiber.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'watermelon-juicy',
    name: 'Juicy Watermelons',
    category: 'fruits',
    price: 60,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1675346980561-66d6231f8bf7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Juicy, sweet watermelon perfect for hot summer days.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'pineapple-golden',
    name: 'Golden Pineapples',
    category: 'fruits',
    price: 75,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1565623513508-ffe2588e327c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Juicy, Tropical, and Zesty! A name that represents golden sweetness, refreshing flavor, and a burst of tropical goodness.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'orange-tangy',
    name: 'Tangy Oranges',
    category: 'fruits',
    price: 110,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1607455701762-7ea9ccd3bf53?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A Burst of Sunshine! A name that represents freshness, zest, and the perfect balance of sweet and tangy flavors.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'Lychees-lush',
    name: 'Lush Lychees',
    category: 'fruits',
    price: 120,
    unit: 'Bunch',
    image: 'https://images.unsplash.com/photo-1705335834319-92a152363ea1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Juicy, Sweet, and Exotic! A name that represents refreshing tropical flavor, fragrant aroma, and a burst of natural goodness.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'jamun-fresh',
    name: 'Fresh Jamun',
    category: 'fruits',
    price: 129,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1425934398893-310a009a77f9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet-sour jamun (black plum) known for its antioxidant properties.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'Dragon Fruit-exotic',
    name: 'Exotic Dragon Fruit',
    category: 'fruits',
    price: 189,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1740759781409-9d1d6985c866?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Exotic, Vibrant, and Refreshing! A name that represents tropical sweetness, striking colors, and a burst of natural goodness.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'kiwi-tangy',
    name: 'Tangy Kiwi',
    category: 'fruits',
    price: 199,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1616684000067-36952fde56ec?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Tangy kiwi fruit rich in vitamin C and dietary fiber.',
    organic: true,
    local: false,
    inSeason: true
  },
  {
    id: 'Jackfruit-hearty',
    name: 'Hearty Jackfruit',
    category: 'fruits',
    price: 120,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1593441040270-7e4a9f75091e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet, Hearty, and Tropical! A name that represents rich flavor, meaty texture, and natural goodness in every bite.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'grapes-black',
    name: 'Black Grapes',
    category: 'fruits',
    price: 70,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1600680675135-e040e468c82d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet and seedless black grapes from Nashik vineyards.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'muskmelon-fresh',
    name: 'Fresh Muskmelon',
    category: 'fruits',
    price: 59,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1646992121887-b86f863dfb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet, aromatic muskmelon (kharbooja) perfect for summer refreshment.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'Peaches-velvety',
    name: 'Velvety Peaches',
    category: 'fruits',
    price: 169,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1438274754346-45322cac87e4?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Juicy, Sweet, and Velvety! A name that represents rich flavor, golden freshness, and a taste of natural indulgence.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'cherry-kashmir',
    name: 'Kashmir Cherries',
    category: 'fruits',
    price: 399,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1621763668206-b9a47fc8727a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet, succulent cherries from Kashmir valleys, hand-picked at perfect ripeness.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'coconut-tender',
    name: 'Tender Coconut',
    category: 'fruits',
    price: 45,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Refreshing tender coconuts from Kerala beaches, perfect for hydration.',
    organic: true,
    local: true,
    inSeason: true
  },

  // VEGETABLES - with accurate Indian market prices and specific images
  {
    id: 'tomato-local',
    name: 'Local Tomatoes',
    category: 'vegetables',
    price: 29,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fresh, ripe tomatoes perfect for curries, sabzis and salads.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'potato-organic',
    name: 'Organic Potatoes',
    category: 'vegetables',
    price: 35,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Versatile potatoes perfect for curries, fries, and numerous Indian dishes.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'onion-red',
    name: 'Red Onions',
    category: 'vegetables',
    price: 39,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Essential red onions for your daily cooking needs.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'bhindi-organic',
    name: 'Organic Bhindi',
    category: 'vegetables',
    price: 49,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fresh and tender ladies finger (okra) perfect for Indian dishes.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'brinjal-purple',
    name: 'Purple Brinjal',
    category: 'vegetables',
    price: 39,
    unit: 'kg',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS5e0FxA3jFaeIcqhXM7kEew6qq1dQmPh9DvyWCdBXR02aISeVvvMvuphiGUYyn213yDbyDrDPLTHqewSu3_1NNZg',
    description: 'Glossy purple eggplants, ideal for bhartha, curries and baingan dishes.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'bitter-gourd',
    name: 'Bitter Gourd',
    category: 'vegetables',
    price: 59,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1676994174279-102e0abff98f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fresh karela known for its unique bitter taste and health benefits.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'drumstick-fresh',
    name: 'Fresh Drumsticks',
    category: 'vegetables',
    price: 69,
    unit: 'bunch',
    image: 'https://punjabigroceries.com/cdn/shop/products/image_51c4db66-ec94-4b4a-9c0e-52456d9df47d.jpg?v=1626222111',
    description: 'Tender moringa pods, perfect for sambar and other South Indian dishes.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'cauliflower-fresh',
    name: 'Fresh Cauliflower',
    category: 'vegetables',
    price: 29,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Crisp white cauliflower perfect for gobi dishes and stir-fries.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'cabbage-organic',
    name: 'Organic Cabbage',
    category: 'vegetables',
    price: 25,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Crisp, round cabbage for salads, stir-fries, and sabzi.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'carrot-orange',
    name: 'Orange Carrots',
    category: 'vegetables',
    price: 39,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet, crunchy carrots perfect for salads, gajar ka halwa, and cooking.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'green-peas',
    name: 'Green Peas',
    category: 'vegetables',
    price: 69,
    unit: '500g',
    image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/plant-seed/g/n/u/100-vegetable-green-peas-seeds-for-home-gardening-winter-100-original-imagkdfztehvzhkz.jpeg?q=20&crop=false',
    description: 'Fresh green peas, sweet and tender for pulao, curries, and mixed vegetables.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'spinach-fresh',
    name: 'Fresh Spinach',
    category: 'vegetables',
    price: 25,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Nutrient-rich spinach leaves, perfect for palak dishes and salads.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'cucumber-green',
    name: 'Green Cucumber',
    category: 'vegetables',
    price: 40,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Crisp, juicy cucumbers perfect for salads, raita, and refreshing snacks.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'capsicum-green',
    name: 'Green Capsicum',
    category: 'vegetables',
    price: 69,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1663500004095-a7482241694c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Crisp green bell peppers for adding color and flavor to dishes.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'capsicum-red',
    name: 'Red Capsicum',
    category: 'vegetables',
    price: 89,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1669863347362-1630fe821708?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet red bell peppers perfect for stuffing, salads, and stir-fries.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'ridge-gourd',
    name: 'Ridge Gourd',
    category: 'vegetables',
    price: 39,
    unit: '500g',
    image: 'https://mtseedbank.in/wp-content/uploads/2019/12/himalayan_ridge_gourd_in_vine.jpg',
    description: 'Fresh turai (ridge gourd) for traditional Indian sabzi preparations.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'bottle-gourd',
    name: 'Bottle Gourd',
    category: 'vegetables',
    price: 29,
    unit: 'each',
    image: 'https://freshleafuae.com/wp-content/uploads/2024/10/bottle-gourd-india-freshleaf-dubai-uae-img03.jpg',
    description: 'Light, nutritious lauki (bottle gourd) for curries and healthy dishes.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'cluster-beans',
    name: 'Cluster Beans',
    category: 'vegetables',
    price: 59,
    unit: '500g',
    image: 'https://images.unsplash.com/uploads/141143339879512fe9b0d/f72e2c85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fresh gavar (cluster beans) for traditional Indian cuisine.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'white-radish',
    name: 'White Radish',
    category: 'vegetables',
    price: 29,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1585369496178-144fd937f249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Crisp white mooli (radish) for salads, parathas, and more.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'green-chilli',
    name: 'Green Chillies',
    category: 'vegetables',
    price: 15,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1597115580039-b849ed2d6398?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Spicy green chilies to add heat to your dishes.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'ginger-fresh',
    name: 'Fresh Ginger',
    category: 'vegetables',
    price: 99,
    unit: 'kg',
    image: 'https://cdn.britannica.com/19/231119-050-35483892/Indian-ginger-Zingiber-officinale.jpg',
    description: 'Aromatic ginger root essential for Indian cooking.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'garlic-fresh',
    name: 'Fresh Garlic',
    category: 'vegetables',
    price: 129,
    unit: 'kg',
    image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/08/is-garlic-a-vegetable-732x548-thumbnail-732x549.jpg',
    description: 'Flavorful garlic bulbs for enhancing your dishes.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'snake-gourd',
    name: 'Snake Gourd',
    category: 'vegetables',
    price: 45,
    unit: '500g',
    image: 'https://farmfreshorganics.com.bd/wp-content/uploads/1723890954068.jpg',
    description: 'Unique looking snake gourd, perfect for South Indian dishes and stir-fries.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'pumpkin-red',
    name: 'Red Pumpkin',
    category: 'vegetables',
    price: 30,
    unit: 'kg',
    image: 'https://alnoorexim.com/img/Pumpkin.jpg',
    description: 'Sweet pumpkin for delicious curries, soups, and halwa.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'tindora-fresh',
    name: 'Fresh Tindora',
    category: 'vegetables',
    price: 59,
    unit: '500g',
    image: 'https://m.media-amazon.com/images/I/51UFMF6fMgL.jpg',
    description: 'Crisp, small tindora (ivy gourd) perfect for traditional gujarati preparations.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'turnip-white',
    name: 'White Turnip',
    category: 'vegetables',
    price: 35,
    unit: 'kg',
    image: 'https://www.daringgourmet.com/wp-content/uploads/2016/08/Pickled-Turnips-6.jpg',
    description: 'Crisp turnips for curries, stews, and parathas.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'vegetables',
    price: 39,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1570723735746-c9bd51bd7c40?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Nutritious sweet potatoes for chaat, curries, and healthy snacks.',
    organic: true,
    local: true,
    inSeason: true
  },
  
  // Dairy products
  {
    id: 'milk-whole',
    name: 'Whole Milk',
    category: 'dairy',
    price: 60,
    unit: 'liter',
    image: 'https://images.unsplash.com/photo-1634141510639-d691d86f47be?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Creamy, non-homogenized whole milk from grass-fed cows.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'cheese-paneer',
    name: 'Fresh Paneer',
    category: 'dairy',
    price: 250,
    unit: 'kg',
    image: 'https://dww3ueizok6z0.cloudfront.net/food/banner/959-1cf8f793726e958ba699d71e2a39851a88aebd7a',
    description: 'Hand-crafted fresh paneer, perfect for curries and snacks.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'curd-fresh',
    name: 'Fresh Curd',
    category: 'dairy',
    price: 45,
    unit: '500g',
    image: 'https://enjoyinfourseason.com/wp-content/uploads/2022/05/Fourseason-PLAIN-CURD.jpg',
    description: 'Thick, creamy curd (dahi) made from farm-fresh milk.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'ghee-desi',
    name: 'Desi Ghee',
    category: 'dairy',
    price: 1000,
    unit: 'liter',
    image: 'https://www.livehindustan.com/lh-img/smart/img/2024/11/05/1200x900/desi_ghee_1730795224863_1730795233483.jpg',
    description: 'Traditional clarified butter made from organic milk.',
    organic: true,
    local: true,
    inSeason: true
  },
  
  // Herbs
  {
    id: 'basil-fresh',
    name: 'Fresh Basil',
    category: 'herbs',
    price: 20,
    unit: 'bunch',
    image: 'https://hillviewfarms.com.au/cdn/shop/products/Basil-Herbs_0cca92c4-1526-4a77-8d31-327f273b6766_grande.png?v=1631603528',
    description: 'Aromatic fresh basil leaves, perfect for Italian dishes and pesto.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'cilantro-organic',
    name: 'Organic Cilantro',
    category: 'herbs',
    price: 10,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1535189487909-a262ad10c165?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Vibrant, fresh cilantro with a distinctive citrusy aroma.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'curry-leaves',
    name: 'Curry Leaves',
    category: 'herbs',
    price: 10,
    unit: 'bunch',
    image: 'https://mangaalharvest.com/cdn/shop/products/Curryleaves.jpg?crop=center&height=2048&v=1595610614&width=2048',
    description: 'Aromatic curry leaves, essential for South Indian cooking.',
    organic: true,
    local: true,
    inSeason: true
  },
  {
    id: 'mint-fresh',
    name: 'Fresh Mint',
    category: 'herbs',
    price: 10,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1622576454275-729fbf6aa6eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fragrant mint leaves for chutneys, raitas, and refreshing beverages.',
    organic: true,
    local: true,
    inSeason: true,
    featured: true
  },
  {
    id: 'fenugreek-leaves',
    name: 'Fenugreek Leaves',
    category: 'herbs',
    price: 15,
    unit: 'bunch',
    image: 'https://www.trustbasket.com/cdn/shop/articles/Methi.webp?v=1680170581',
    description: 'Fresh methi leaves, perfect for parathas, curries, and theplas.',
    organic: true,
    local: true,
    inSeason: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getAllProducts = (): Product[] => {
  return products;
};
