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
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,

} from "lucide-react";
import { FaBolt, FaCar, FaLeaf, FaChargingStation } from "react-icons/fa";
import { sanityBlocks } from "@/components/sanityBlocks/sanityBlocks";

export const metadata: Metadata = {
  title: "Blog Yazısı - Procar.az | Elektrik Avtomobil Xəbərləri",
  description:
    "Elektrik və hibrid avtomobillər haqqında ən son xəbərlər və texnologiya yenilikləri.",
};

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };



const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Yeni Modellər":
      return FaCar;
    case "İnfrastruktur":
      return FaChargingStation;
    case "Texnologiya":
      return FaBolt;
    case "Davamlılıq":
      return FaLeaf;
    default:
      return FaCar;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Yeni Modellər":
      return "bg-blue-500";
    case "İnfrastruktur":
      return "bg-green-500";
    case "Müqayisə":
      return "bg-purple-500";
    case "Baxım":
      return "bg-orange-500";
    case "Bazar Analizi":
      return "bg-red-500";
    case "Texnologiya":
      return "bg-yellow-500";
    case "Davamlılıq":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);
console.log(post)
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

  const CategoryIcon = getCategoryIcon(post.category);
  const categoryColor = getCategoryColor(post.category);
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : null;

  return (
    <>
      <Header />
      <article className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <Link href="/blog">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Blog
                  </Button>
                </Link>
                <span>/</span>
                <span>{post.category}</span>
              </div>

              {/* Category Badge */}
              <div className="mb-6">
                <Badge
                  className={`${categoryColor} text-white px-4 py-2 text-lg`}
                >
                  <CategoryIcon className="mr-2" />
                  {post.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {post.author?.name || "Procar.az"}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {new Date(post.publishedAt).toLocaleDateString("az-AZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {post.readTime}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-8">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>
                <Button variant="outline">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Yadda Saxla
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Bəyən
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {postImageUrl && (
          <section className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Image
                src={postImageUrl}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
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
                  <PortableText
                    value={post.body}
                    components={sanityBlocks}
                  />
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
