import { TagIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Product Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "inStock",
      type: "number",
      title: "Stock Quantity",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Product Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "vendor",
      type: "reference",
      title: "Vendor",
      to: [{ type: "vendor" }], // link to vendorType
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }], // link to categoryType
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Description",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        }),
      ],
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [defineArrayMember({ type: "string" })],
      description: "Optional keywords to help users filter products",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "category.name",
    },
  },
});
