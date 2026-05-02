import { useList } from "@refinedev/core";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PenLine, Newspaper } from "lucide-react";

export default function Blogs() {
  const { result, query } = useList({
    resource: "blogs",
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Blogs</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and review all published blog posts
            </p>
          </div>
          <Button asChild size="sm">
            <a href="/create">
              <PenLine className="h-4 w-4" />
              New Blog
            </a>
          </Button>
        </div>

        {/* Loading */}
        {query.isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!query.isLoading && (!result.data || result.data.length === 0) && (
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <Newspaper className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">No blogs yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Generate your first blog from a video URL.
            </p>
            <Button asChild size="sm" className="mt-4">
              <a href="/create">Create Blog</a>
            </Button>
          </Card>
        )}

        {/* Blog grid */}
        {!query.isLoading && result.data && result.data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {result.data.map((b: any, i: number) => (
              <Card
                key={i}
                className="group hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm leading-snug line-clamp-2">
                      {b.title ?? "Untitled"}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      Blog
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {b.content ?? "No content available."}
                  </p>
                  {b.tags && b.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {b.tags.map((tag: string, ti: number) => (
                        <Badge key={ti} variant="outline" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
