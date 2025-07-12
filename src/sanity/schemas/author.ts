import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "A short biography of the author",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description:
        'Author\'s role or title (e.g., "EV Specialist", "Automotive Journalist")',
    }),
    defineField({
      name: "expertise",
      title: "Areas of Expertise",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Electric Vehicles", value: "Electric Vehicles" },
          { title: "Hybrid Cars", value: "Hybrid Cars" },
          {
            title: "Charging Infrastructure",
            value: "Charging Infrastructure",
          },
          { title: "Battery Technology", value: "Battery Technology" },
          {
            title: "Sustainable Transportation",
            value: "Sustainable Transportation",
          },
          { title: "Automotive Industry", value: "Automotive Industry" },
          { title: "Market Analysis", value: "Market Analysis" },
          { title: "Technical Reviews", value: "Technical Reviews" },
        ],
      },
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
        },
        {
          name: "website",
          title: "Website",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "active",
      title: "Active Author",
      type: "boolean",
      description: "Whether this author is currently active and writing posts",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      role: "role",
      media: "image",
    },
    prepare(selection) {
      const { role } = selection;
      return {
        ...selection,
        subtitle: role && `${role}`,
      };
    },
  },
});
