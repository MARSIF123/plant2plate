// app/products/[id]/page.tsx

import ProductDetail from "@/components/ProductDetail";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const unwrappedParams = await params;
  const productId = Number(unwrappedParams.id); // convert string to number
  return <ProductDetail productId={productId} />;
}
