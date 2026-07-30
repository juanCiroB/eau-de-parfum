import { getCatalogService } from '@infrastructure/container';
import { Hero } from '@presentation/components/home/Hero';
import { BrandsBanner } from '@presentation/components/home/BrandsBanner';
import { FeaturedProducts } from '@presentation/components/home/FeaturedProducts';
import { Benefits } from '@presentation/components/home/Benefits';

export default async function HomePage() {
  const catalog = getCatalogService();
  const featured = await catalog.featuredProducts(8);

  return (
    <>
      <Hero />
      <BrandsBanner />
      <FeaturedProducts products={featured} />
      <Benefits />
    </>
  );
}
