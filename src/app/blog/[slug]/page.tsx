import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, Calendar } from "lucide-react";
import { sanityBlocks } from "@/components/sanityBlocks/sanityBlocks";
import { getCategoryColor, getCategoryIcon } from "@/utils/getCategoryInfo";

export const metadata: Metadata = {
  title: "Blog Yazısı - Procar.az | Elektrik Avtomobil Xəbərləri",
  description:
    "Elektrik və hibrid avtomobillər haqqında ən son xəbərlər və texnologiya yenilikləri.",
};

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  author->{
    name,
    slug,
    image,
    bio
  },
  publishedAt,
  readTime,
  body,
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  featured,
  _createdAt,
  _updatedAt
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug: slug },
    options
  );
  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Blog yazısı tapılmadı
            </h1>
            <Link href="/blog">
              <Button className="bg-slate-900 text-white hover:bg-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog-a qayıt
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : null;

  return (
    <>
      <Header />
      <article className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        {/* Hero Section */}

        <section className="relative  overflow-hidden">
          <div className="absolute inset-0 "></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <span>{post.category}</span>
              </div>

              {/* Category Badge */}

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="mb-4 space-y-3 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-4 lg:gap-6 text-slate-400 text-sm">
                <div className="flex items-center">
                  <User className="w-6 h-6 mr-2 flex-shrink-0" />
                  <span className="truncate text-black">
                    {post.author?.name || "Procar.az"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2 flex-shrink-0" />
                  <span className="truncate text-black">
                    {new Date(post.publishedAt).toLocaleDateString("az-AZ")}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {post?.categories?.map((category: SanityDocument) => {
                    const CategoryIcon = getCategoryIcon(category.title);
                    return (
                      <Badge
                        key={category._id}
                        className={`${getCategoryColor(category.title)} text-white hover:opacity-90 text-xs`}
                      >
                        {CategoryIcon && (
                          <CategoryIcon className="w-5 h-5 mr-1" />
                        )}
                        {category.title}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {postImageUrl && (
          <section className=" container mx-auto px-4 py-8">
            <div className=" max-w-4xl mx-auto">
              <Image
                src={postImageUrl}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-sm shadow-2xl"
              />
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className=" container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="rounded-sm bg-white shadow-xl  overflow-hidden">
              <CardContent className="p-8 md:p-12">
                {/* Excerpt */}
                {post.excerpt && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-l-4 border-blue-500">
                    <p className="text-lg text-gray-700 italic">
                      {post.excerpt}
                    </p>
                  </div>
                )}

                {/* Main Content */}
                <div className="prose prose-lg max-w-none">
                  <PortableText value={post.body} components={sanityBlocks} />
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Teqlər:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}

                {/* Author Bio Section */}
                {/* {post.author && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="bg-gray-50 p-6 border border-gray-200">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {post.author.name}
                          </h4>
                          {post.author.role && (
                            <p className="text-gray-600 text-sm mb-2">
                              {post.author.role}
                            </p>
                          )}
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {post.author.bio ||
                              "Elektrik avtomobillər və davamlı nəqliyyat həlləri üzrə ekspert."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
