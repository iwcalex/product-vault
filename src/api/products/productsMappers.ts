import type { DummyJsonProduct, DummyJsonCategory, Product, Category } from './productsTypes';

export function mapDummyJsonProductToProduct(dto: DummyJsonProduct): Product {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    category: dto.category,
    price: dto.price,
    discountPercentage: dto.discountPercentage,
    rating: dto.rating,
    thumbnail: dto.thumbnail,
    images: dto.images ?? [],
  };
}

export function mapDummyJsonCategoryToCategory(dto: DummyJsonCategory): Category {
  return {
    slug: dto.slug,
    name: dto.name,
  };
}
