
export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  featured: boolean;
  darkImage: boolean;
  weight: string;
  origin: string;
  chefRecommended?: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "特级松露橄榄油",
    category: "调味品",
    description: "采用意大利托斯卡纳地区的有机橄榄和当季松露，冷压萃取制成的高级调味油。",
    price: 468,
    image: "/placeholder.svg",
    featured: true,
    darkImage: false,
    weight: "250ml",
    origin: "意大利",
    chefRecommended: true
  },
  {
    id: "p2",
    name: "日本A5和牛肋眼",
    category: "肉类",
    description: "来自日本宫崎县的顶级和牛，雪花纹理完美，入口即化。",
    price: 1280,
    image: "/placeholder.svg",
    featured: true,
    darkImage: true,
    weight: "300g",
    origin: "日本",
    chefRecommended: true
  },
  {
    id: "p3",
    name: "野生阿拉斯加帝王蟹",
    category: "海鲜",
    description: "深海捕捞的野生帝王蟹，肉质鲜甜，营养丰富。",
    price: 1580,
    image: "/placeholder.svg",
    featured: true,
    darkImage: false,
    weight: "1.5kg",
    origin: "阿拉斯加"
  },
  {
    id: "p4",
    name: "法国勃艮第松露",
    category: "食材",
    description: "来自法国勃艮第地区的黑松露，香气浓郁，口感独特。",
    price: 3600,
    image: "/placeholder.svg",
    featured: true,
    darkImage: true,
    weight: "100g",
    origin: "法国"
  },
  {
    id: "p5",
    name: "有机金奇异果",
    category: "水果",
    description: "新西兰特有的金奇异果，果肉金黄，口感香甜。",
    price: 128,
    image: "/placeholder.svg",
    featured: false,
    darkImage: false,
    weight: "4个装",
    origin: "新西兰"
  },
  {
    id: "p6",
    name: "西班牙伊比利亚火腿",
    category: "熟食",
    description: "西班牙伊比利亚黑猪腿制成的火腿，风干36个月，口感独特。",
    price: 2980,
    image: "/placeholder.svg",
    featured: true,
    darkImage: true,
    weight: "1kg",
    origin: "西班牙",
    chefRecommended: true
  },
];
