export type MenuAvailability = "available" | "unavailable";

export type MenuImage = {
  src: string;
  alt: string;
};

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  availability: MenuAvailability | null;
  image: MenuImage | null;
  tags: string[];
  sortOrder: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type Menu = {
  brand: string;
  tagline: string;
  title: string;
  categories: MenuCategory[];
  footer: string;
};
