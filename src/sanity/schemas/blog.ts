import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short description of the blog post",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Important for SEO and accessibility",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Yeni Modellər", value: "Yeni Modellər" },
          { title: "İnfrastruktur", value: "İnfrastruktur" },
          { title: "Müqayisə", value: "Müqayisə" },
          { title: "Baxım", value: "Baxım" },
          { title: "Bazar Analizi", value: "Bazar Analizi" },
          { title: "Texnologiya", value: "Texnologiya" },
          { title: "Davamlılıq", value: "Davamlılıq" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
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
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
        {
          type: "code",
          options: {
            withFilename: true,
          },
        },
        // Table support
        {
          type: "object",
          name: "table",
          title: "Table",
          fields: [
            {
              name: "title",
              title: "Table Title",
              type: "string",
              description: "Optional title for the table",
            },
            {
              name: "rows",
              title: "Table Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "row",
                  title: "Row",
                  fields: [
                    {
                      name: "cells",
                      title: "Cells",
                      type: "array",
                      of: [
                        {
                          type: "string",
                          title: "Cell",
                        },
                      ],
                    },
                    {
                      name: "isHeader",
                      title: "Header Row",
                      type: "boolean",
                      description: "Check if this is a header row",
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      cells: "cells",
                      isHeader: "isHeader",
                    },
                    prepare({ cells, isHeader }) {
                      return {
                        title: isHeader ? "Header Row" : "Data Row",
                        subtitle: cells ? cells.join(" | ") : "Empty row",
                      };
                    },
                  },
                },
              ],
            },
            {
              name: "caption",
              title: "Table Caption",
              type: "text",
              rows: 2,
              description: "Optional caption or description for the table",
            },
            {
              name: "stripedRows",
              title: "Striped Rows",
              type: "boolean",
              description: "Alternate row colors for better readability",
              initialValue: true,
            },
            {
              name: "compactTable",
              title: "Compact Table",
              type: "boolean",
              description: "Use smaller padding for more compact appearance",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "title",
              rows: "rows",
              caption: "caption",
            },
            prepare({ title, rows, caption }) {
              const rowCount = rows ? rows.length : 0;
              const columnCount =
                rows && rows[0] ? rows[0].cells?.length || 0 : 0;

              return {
                title: title || "Table",
                subtitle: `${rowCount} rows × ${columnCount} columns${caption ? ` - ${caption}` : ""}`,
                media: () => "📊", // Table emoji as icon
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'Estimated reading time (e.g., "5 dəqiqə")',
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Mark as featured post to display prominently",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description:
            "Title for search engines (leave empty to use post title)",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Description for search engines",
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          description: "Keywords for SEO",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      category: "category",
      media: "featuredImage",
    },
    prepare(selection) {
      const { author, category } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author} in ${category}`,
      };
    },
  },
  orderings: [
    {
      title: "Publication Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publication Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title, A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
