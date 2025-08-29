import type { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'outerwear', 
    name: 'Outerwear', 
    imageUrl: 'https://i.ibb.co/Xz9d7Jj/denim-jacket.png' 
  },
  { 
    id: 'tops', 
    name: 'Tops', 
    imageUrl: 'https://i.ibb.co/dKqY7bV/tshirt.png'
  },
    { 
    id: 'bottoms', 
    name: 'Bottoms', 
    imageUrl: 'https://i.ibb.co/bFqY9xS/jeans.png' 
  },
  { 
    id: 'dresses', 
    name: 'Dresses', 
    imageUrl: 'https://i.ibb.co/mS2gTzJ/dress.png' 
  },
  { 
    id: 'footwear', 
    name: 'Footwear', 
    imageUrl: 'https://i.ibb.co/7jX0951/sneakers.png' 
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    imageUrl: 'https://i.ibb.co/b3sJzM2/sunglasses.png' 
  },
  { 
    id: 'hats', 
    name: 'Hats', 
    imageUrl: 'https://i.ibb.co/P9zYfT8/beanie.png' 
  },
  { 
    id: 'makeup', 
    name: 'Makeup', 
    imageUrl: 'https://i.ibb.co/Y0FrNqf/lipstick.png' 
  },
];

export const PRODUCTS: Product[] = [
  // Outerwear
  {
    id: 1,
    name: 'Levi\'s Trucker Jacket',
    categoryId: 'outerwear',
    imageUrl: 'https://i.ibb.co/F8bJ47F/levis-jacket.png',
    prompt: 'Digitally dress the person in a classic Levi\'s blue denim trucker jacket. The fit, drape, and lighting should look realistic and match the person\'s posture.',
    buyUrl: 'https://www.amazon.com/Levis-Trucker-Jacket-Twill-X-Large/dp/B002475J2E/',
  },
  {
    id: 2,
    name: 'AllSaints Biker Jacket',
    categoryId: 'outerwear',
    imageUrl: 'https://i.ibb.co/fY6fQjB/allsaints-jacket.png',
    prompt: 'Digitally dress the person in a black leather AllSaints biker jacket. Pay attention to realistic textures, reflections, and shadows to match the person\'s body and the environment.',
    buyUrl: 'https://www.us.allsaints.com/men/leathers/allsaints-milo-biker-jacket/US03210001-5.html',
  },
  {
    id: 3,
    name: 'Everlane Trench Coat',
    categoryId: 'outerwear',
    imageUrl: 'https://i.ibb.co/Tmg4y41/trench-coat.png',
    prompt: 'Place a classic tan Everlane trench coat on the person. The coat should be open, showing the outfit underneath, and drape naturally.',
    buyUrl: 'https://www.everlane.com/products/womens-modern-trench-coat-khaki',
  },
   {
    id: 4,
    name: 'Patagonia Puffer Vest',
    categoryId: 'outerwear',
    imageUrl: 'https://i.ibb.co/hZJzYJ7/puffer-vest.png',
    prompt: 'Add a stylish black Patagonia puffer vest over the person\'s current top. Make it look puffy but well-fitted.',
    buyUrl: 'https://www.patagonia.com/product/mens-down-sweater-vest/84623.html',
  },
  // Tops
  {
    id: 5,
    name: 'Beatles Graphic Tee',
    categoryId: 'tops',
    imageUrl: 'https://i.ibb.co/dKqY7bV/tshirt.png',
    prompt: 'Digitally dress the person in a white t-shirt with a vintage Beatles graphic on the front. Make sure the shirt fits realistically on their body.',
    buyUrl: 'https://www.target.com/p/men-s-the-beatles-abbey-road-short-sleeve-graphic-t-shirt-white/-/A-54593597',
  },
  {
    id: 6,
    name: 'H&M Knit Sweater',
    categoryId: 'tops',
    imageUrl: 'https://i.ibb.co/w0dYQ5x/sweater.png',
    prompt: 'Dress the person in a cozy, chunky-knit cream-colored sweater from H&M. The texture and fit should appear soft and comfortable.',
    buyUrl: 'https://www2.hm.com/en_us/productpage.0974263003.html',
  },
  // Bottoms
  {
    id: 8,
    name: 'Levi\'s 501 Jeans',
    categoryId: 'bottoms',
    imageUrl: 'https://i.ibb.co/bFqY9xS/jeans.png',
    prompt: 'Digitally place a pair of classic, straight-leg blue Levi\'s 501 jeans on the person. Ensure the fit looks natural around the waist and legs.',
    buyUrl: 'https://www.levi.com/US/en_US/clothing/men/jeans/501-original-fit-mens-jeans/p/005010193',
  },
  {
    id: 9,
    name: 'Zara Pleated Skirt',
    categoryId: 'bottoms',
    imageUrl: 'https://i.ibb.co/4Z5sC6b/skirt.png',
    prompt: 'Dress the person in a high-waisted, black pleated skirt from Zara that ends just above the knee.',
    buyUrl: 'https://www.zara.com/us/en/pleated-mini-skirt-p04387226.html',
  },
  // Dresses
  {
    id: 11,
    name: 'Reformation Dress',
    categoryId: 'dresses',
    imageUrl: 'https://i.ibb.co/mS2gTzJ/dress.png',
    prompt: 'Dress the person in an elegant, sleeveless little black dress from Reformation. The fit should be flattering and the fabric should have a subtle, realistic texture.',
    buyUrl: 'https://www.thereformation.com/products/kourtney-dress/1304323BLK.html',
  },
  // Footwear
  {
    id: 13,
    name: 'Adidas Stan Smith',
    categoryId: 'footwear',
    imageUrl: 'https://i.ibb.co/7jX0951/sneakers.png',
    prompt: 'Place a pair of clean, classic white Adidas Stan Smith sneakers on the person\'s feet. Ensure they are correctly sized and positioned.',
    buyUrl: 'https://www.adidas.com/us/stan-smith-shoes/FX5502.html',
  },
  // Accessories
  {
    id: 15,
    name: 'Ray-Ban Aviators',
    categoryId: 'accessories',
    imageUrl: 'https://i.ibb.co/b3sJzM2/sunglasses.png',
    prompt: 'Realistically place sleek, black Ray-Ban aviator sunglasses onto the person\'s face. Ensure they fit naturally and the lighting and reflections match the environment.',
    buyUrl: 'https://www.ray-ban.com/usa/sunglasses/RB3025%20UNISEX%20aviator%20classic-gold/805289602057',
  },
  {
    id: 17,
    name: 'Fossil Wristwatch',
    categoryId: 'accessories',
    imageUrl: 'https://i.ibb.co/L84kPqF/watch.png',
    prompt: 'Add a classic silver Fossil wristwatch with a metal band to the person\'s left wrist. It should look sleek and fit comfortably.',
    buyUrl: 'https://www.fossil.com/en-us/products/carraway-three-hand-stainless-steel-watch/FS6008.html',
  },
  // Hats
  {
    id: 19,
    name: 'Nike Baseball Cap',
    categoryId: 'hats',
    imageUrl: 'https://i.ibb.co/7jWqT2M/hat.png',
    prompt: 'Place a simple black Nike baseball cap on the person\'s head. Ensure the lighting, fit, and shadows look natural with their hair and head shape.',
    buyUrl: 'https://www.nike.com/t/sportswear-heritage86-futures-cap-gXv2v1/913011-010',
  },
  {
    id: 20,
    name: 'Carhartt Beanie',
    categoryId: 'hats',
    imageUrl: 'https://i.ibb.co/P9zYfT8/beanie.png',
    prompt: 'Place a snug, dark grey Carhartt knit beanie on the person\'s head, slightly covering their ears for a cozy look.',
    buyUrl: 'https://www.carhartt.com/product/A18/acrylic-watch-hat',
  },
  // Makeup
  {
    id: 21,
    name: 'Fenty Beauty Lipstick',
    categoryId: 'makeup',
    imageUrl: 'https://i.ibb.co/Y0FrNqf/lipstick.png',
    prompt: 'Apply Fenty Beauty\'s "The MVP" bold, matte red lipstick to the person\'s lips. The application should be clean, precise, and look natural.',
    buyUrl: 'https://fentybeauty.com/products/stunna-lip-paint-longwear-fluid-lip-color-the-mvp',
  },
  {
    id: 22,
    name: 'Urban Decay Eyeshadow',
    categoryId: 'makeup',
    imageUrl: 'https://i.ibb.co/D8R2Z0S/eyeshadow.png',
    prompt: 'Apply a smokey eyeshadow look using shades of charcoal and silver from an Urban Decay palette to the person\'s eyelids. Blend it smoothly for a dramatic yet realistic effect.',
    buyUrl: 'https://www.urbandecay.com/naked-palettes/naked2-basics-eyeshadow-palette/347.html',
  },
];