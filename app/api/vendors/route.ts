import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const vendorsFilePath = path.join(process.cwd(), "data/vendors.json");

export async function POST(req: Request) {
  try {
    const newVendor = await req.json();

    // Read existing vendors
    let vendors = [];
    try {
      const data = await fs.readFile(vendorsFilePath, "utf-8");
      vendors = JSON.parse(data);
    } catch (err) {
      // file might not exist, ignore
    }

    // Assign ID and add vendor
    newVendor.id = vendors.length + 1;
    vendors.push(newVendor);

    // Write back to file
    await fs.writeFile(
      vendorsFilePath,
      JSON.stringify(vendors, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true, vendor: newVendor });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to save vendor" },
      { status: 500 }
    );
  }
}
