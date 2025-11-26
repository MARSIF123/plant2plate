import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const vendorType = defineType({
  name: "vendor",
  title: "Vendor",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", title: "Full Name" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name" },
    }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "password", type: "string", title: "Password" }),
    defineField({ name: "farmName", type: "string", title: "Farm Name" }),
    defineField({ name: "farmAddress", type: "string", title: "Farm Address" }),

    // ✅ Single image for certificate
    defineField({
      name: "certificate",
      type: "image",
      title: "Certificate",
      options: { hotspot: true },
    }),

    defineField({ name: "distance", type: "string", title: "Distance" }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "location",
      type: "object",
      title: "Location",
      fields: [
        defineField({ name: "lat", type: "number", title: "Latitude" }),
        defineField({ name: "lng", type: "number", title: "Longitude" }),
      ],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Description",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
