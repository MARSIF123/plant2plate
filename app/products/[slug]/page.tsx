import ProductDetail from "@/components/ProductDetail";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Render ProductDetail (client component) safely
  return (
    <div className="min-h-screen">
      <ProductDetail slug={slug} />
    </div>
  );
}
