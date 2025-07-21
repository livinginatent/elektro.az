"use client";

import { ArrowRight, Calendar, Clock, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { az } from "date-fns/locale";
import { type SanityDocument } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";







export function BlogSection({ posts, featuredPost }:SanityDocument ) {
  // Get recent posts (excluding featured post)
  const recentPosts = posts.filter((post:SanityDocument) => !post.featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy", { locale: az });
    } catch {
      return dateString;
    }
  };



  return (
    <section className=" px-12 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          EV Dünyasından Xəbərlər
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elektrik avtomobil dünyasındaki ən son yeniliklər, məsləhətlər və
          analitik məqalələr
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="lg:col-span-2">
            <Card className="rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
              <div className="relative">
                <div className="h-96">
                  <Image
                    src={urlFor(featuredPost.mainImage)
                                            .width(400)
                                            .height(300)
                                            .url()}
                    alt={featuredPost.mainImage?.alt || featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    Seçilmiş Məqalə
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Categories */}
                  {featuredPost.categories &&
                    featuredPost.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.categories.slice(0, 2).map((category:SanityDocument) => (
                          <Badge
                            key={category._id}
                            variant="outline"
                            className="text-xs"
                          >
                            {category.title}
                          </Badge>
                        ))}
                      </div>
                    )}

                  {/* Title and Excerpt */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime} dəqiqə</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/blog/${featuredPost.slug.current}`}>
                    <Button className="w-full sm:w-auto rounded-sm">
                      Oxumağa davam et
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Posts */}
        <div className={`space-y-6 ${!featuredPost ? "lg:col-span-3" : ""}`}>
          <h3 className="text-xl font-bold text-gray-900">Son Məqalələr</h3>

          {recentPosts.length > 0 ? (
            <div
              className={`grid gap-6 ${!featuredPost ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {recentPosts.map((post:SanityDocument) => (
                <Card
                  key={post._id}
                  className="rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-video relative">
                    <Image
                     src={urlFor(featuredPost.mainImage)
                        .width(800)
                        .height(600)
                        .url()}
                      alt={post.mainImage?.alt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.categories.slice(0, 1).map((category:SanityDocument) => (
                            <Badge
                              key={category._id}
                              variant="secondary"
                              className="text-xs"
                            >
                              {category.title}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="font-bold text-gray-900 line-clamp-2 leading-tight">
                        {post.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime} dəq</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Oxu
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Hələ ki məqalə yoxdur</p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="rounded-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold mb-4">Daha Çox Məqalə Oxuyun</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              EV dünyasındaki ən son yeniliklər, texniki məsləhətlər, model
              müqayisələri və daha çoxu üçün blogumuzu ziyarət edin
            </p>
            <Link href="/blog">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 rounded-sm hover:bg-white hover:text-blue-600 transition-colors"
              >
                Bütün Məqalələr
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
