// app/partners/[id]/page.tsx
import VendorDetailClient from "@/components/VendorDetailClient";

export default async function VendorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // If your params comes as Promise (rare, but some setups do):
  const unwrappedParams = await params; // unwrap the promise if needed
  const vendorId = unwrappedParams.id;

  return <VendorDetailClient vendorId={vendorId} />;
}
