import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Car,
  Star,
  ChevronRight,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { getCategoryColor, getCategoryIcon } from "@/utils/getCategoryInfo";
import { formatToAzerbaijaniDate } from "@/utils/formatToAzerbaijaniDate";

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  author->{name},
  publishedAt,
  readTime,
  categories[]->{
    _id,
    title,
    slug
  },
  mainImage,
  featured
}`;

export default async function BlogPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  const featuredPost = posts.find((post: SanityDocument) => post.featured);
  const regularPosts = posts.filter((post: SanityDocument) => !post.featured);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-slate-50 border-b">
          <div className="container mx-auto px-4 py-16">
            <div className=" mx-auto text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium">
                <span>Bloq və xəbərlər</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                Elektrik və hibrid avtomobillər haqqında faydalı məlumatlar, yeniliklər və
                xəbərlər
              </h1>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="bg-slate-800 text-white overflow-hidden rounded-lg">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="space-y-4 md:space-y-6">
                    <div className="inline-flex items-center px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full">
                      <Star className="w-4 h-4 mr-2" />
                      Əsas Yazı
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    {/* Mobile-first responsive metadata */}
                    <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-4 lg:gap-6 text-slate-400 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {featuredPost.author?.name || "Procar.az"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {new Date(
                            featuredPost.publishedAt
                          ).toLocaleDateString("az-AZ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {featuredPost?.categories?.map(
                          (category: SanityDocument) => {
                            const CategoryIcon = getCategoryIcon(
                              category.title
                            );
                            return (
                              <Badge
                                key={category._id}
                                className={`${getCategoryColor(category.title)} text-white hover:opacity-90 text-xs`}
                              >
                                {CategoryIcon && (
                                  <CategoryIcon className="w-3 h-3 mr-1" />
                                )}
                                {category.title}
                              </Badge>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <Link href={`/blog/${featuredPost.slug.current}`}>
                      <Button className="bg-white text-slate-900 hover:bg-slate-100 w-full md:w-fit cursor-pointer">
                        Ətraflı Oxu
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Responsive image container */}
                <div className="relative overflow-hidden order-1 lg:order-2">
                  <div className="aspect-video md:aspect-square lg:aspect-auto lg:min-h-[400px] bg-slate-700">
                    <Image
                      src={urlFor(featuredPost.mainImage)
                        .width(800)
                        .height(600)
                        .url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post: SanityDocument) => (
              <Link href={`/blog/${post.slug.current}`} key={post._id}>
                <Card className="group hover:shadow-lg rounded-sm transition-all duration-300 border-slate-200 overflow-hidden">
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage)
                          .width(400)
                          .height(225)
                          .url()}
                        alt={post.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Car className="w-16 h-16 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <div className="flex gap-2 flex-wrap">
                        {post?.categories?.map((category: SanityDocument) => {
                          const CategoryIcon = getCategoryIcon(category.title);
                          return (
                            <Badge
                              key={category._id}
                              className={`${getCategoryColor(category.title)} text-white hover:opacity-90`}
                            >
                              {CategoryIcon && (
                                <CategoryIcon className="w-3 h-3 mr-1" />
                              )}
                              {category.title}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-slate-700 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex justify-center items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author?.name || "Procar.az"}
                        </div>
                        <div className="flex justify-center items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatToAzerbaijaniDate(post.publishedAt)}
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug.current}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-900 hover:text-slate-700 hover:bg-slate-50 p-0 cursor-pointer"
                        >
                          Oxu
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-slate-50 border-t">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900">
                  Yeni Yazılardan Xəbərdar Olun
                </h2>
                <p className="text-slate-600 text-lg">
                  Elektrik avtomobillər haqqında ən son xəbərləri və yenilikləri
                  əldə edin
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="E-mail ünvanınız"
                  className="flex-1 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                />
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                  Abunə Ol
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
