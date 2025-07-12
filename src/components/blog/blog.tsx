import { PortableText } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type SanityDocument } from "next-sanity";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { sanityBlocks } from "../sanityBlocks/sanityBlocks";
import { client } from "@/sanity/lib/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import imageUrlBuilder from "@sanity/image-url";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;
  return (
    <article className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-900 hover:text-slate-700 hover:bg-slate-100 p-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog
              </Button>
              <ChevronRight className="w-4 h-4" />
              <span>{post.category}</span>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <Badge className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2">
                {post.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center space-x-6 text-slate-600 mb-8 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.publishedAt).toLocaleDateString("az-AZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button className="bg-slate-900 text-white hover:bg-slate-800">
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Yadda Saxla
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
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
              src={postImageUrl || "/placeholder.svg"}
              alt={""}
              className="w-full h-auto border border-slate-200"
            />
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="mb-8 p-6 bg-slate-50 border-l-4 border-slate-900">
                <p className="text-lg text-slate-700 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.content} components={sanityBlocks} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Teqlər:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className="w-5 h-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Şərhlər
                </h3>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-8 text-center">
                <p className="text-slate-600">
                  Şərhlər bölməsi tezliklə aktiv olacaq
                </p>
              </div>
            </div>

            {/* Author Bio Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="bg-slate-50 p-6 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      {post.author.name}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Elektrik avtomobillər və davamlı nəqliyyat həlləri üzrə
                      ekspert. Avtomobil sənayesində 10+ il təcrübə.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Oxşar Məqalələr
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-slate-100 mb-4 flex items-center justify-center">
                      <span className="text-slate-500 text-sm">
                        Məqalə şəkli
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Elektrik Avtomobillərin Gələcəyi
                    </h4>
                    <p className="text-slate-600 text-sm">
                      2025-ci ildə elektrik avtomobil bazarında gözlənilən
                      yeniliklər...
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-slate-100 mb-4 flex items-center justify-center">
                      <span className="text-slate-500 text-sm">
                        Məqalə şəkli
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Şarj Stansiyalarının İnkişafı
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Azərbaycanda şarj infrastrukturunun genişləndirilməsi
                      planları...
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
