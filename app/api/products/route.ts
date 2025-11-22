import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const productsFilePath = path.join(process.cwd(), "data/products.json");

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  unit: string;
  vendorId: number;
};

// POST - add or edit
export async function POST(req: NextRequest) {
  try {
    const productData: Partial<Product> = await req.json();

    const data = fs.readFileSync(productsFilePath, "utf-8");
    let products: Product[] = JSON.parse(data);

    let productWithId: Product;

    if (productData.id) {
      // EDIT existing product
      const index = products.findIndex((p) => p.id === productData.id);
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      products[index] = { ...products[index], ...productData } as Product;
      productWithId = products[index];
    } else {
      // ADD new product
      const id = products.length
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1;
      productWithId = { ...productData, id } as Product;
      products.push(productWithId);
    }

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
    return NextResponse.json({ success: true, product: productWithId });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to save product" },
      { status: 500 }
    );
  }
}

// DELETE - remove product
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing product id" },
        { status: 400 }
      );
    }

    const data = fs.readFileSync(productsFilePath, "utf-8");
    let products: Product[] = JSON.parse(data);

    const filteredProducts = products.filter((p) => p.id !== id);

    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(filteredProducts, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
