import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "Men" | "Women" | "Accessories";
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Classic Blazer",
    price: 129.99,
    image: "/clothes1.jpg",
    category: "Men",
    description:
      "A tailored classic blazer that exudes sophistication. Crafted from premium fabric, it perfectly balances tradition with modern design.",
  },
  {
    id: 2,
    name: "Elegant Dress",
    price: 159.99,
    image: "/clothes2.jpg",
    category: "Women",
    description:
      "An elegant dress that combines refined style with a contemporary twist. Perfect for upscale occasions and special events.",
  },
  {
    id: 3,
    name: "Modern Trousers",
    price: 89.99,
    image: "/clothes3.jpg",
    category: "Men",
    description:
      "Modern trousers designed with a slim fit and high-quality fabric, ensuring a comfortable yet stylish look for everyday wear.",
  },
  {
    id: 4,
    name: "Stylish Jacket",
    price: 199.99,
    image: "/clothes4.jpg",
    category: "Men",
    description:
      "A stylish jacket featuring a contemporary cut and versatile design, ideal for both casual outings and formal occasions.",
  },
  {
    id: 5,
    name: "Trendy Shirt",
    price: 69.99,
    image: "/clothes5.jpg",
    category: "Women",
    description:
      "A trendy shirt that combines comfort and style. Its chic design is perfect for updating your everyday wardrobe.",
  },
  {
    id: 6,
    name: "Chic Top",
    price: 49.99,
    image: "/clothes6.jpg",
    category: "Women",
    description:
      "A chic top with a modern edge, designed to bring a touch of sophistication to any outfit.",
  },
  {
    id: 7,
    name: "Designer Jeans",
    price: 109.99,
    image: "/clothes7.jpg",
    category: "Men",
    description:
      "Premium designer jeans crafted with attention to detail. Enjoy the perfect blend of comfort and cutting-edge style.",
  },
  {
    id: 8,
    name: "Casual Hoodie",
    price: 79.99,
    image: "/clothes8.jpg",
    category: "Accessories",
    description:
      "A casual hoodie made from soft, durable fabric. Its relaxed fit and modern design make it a versatile addition to any wardrobe.",
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const productId = parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return notFound();
  }

  return <ProductDetail product={product} />;
}
