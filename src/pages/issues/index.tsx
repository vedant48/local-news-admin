import { useList } from "@refinedev/core";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, FilePlus } from "lucide-react";
import type { BadgeProps } from "@/components/ui/badge";

function getStatusVariant(status: string): BadgeProps["variant"] {
  const s = (status ?? "").toLowerCase();
  if (s === "resolved" || s === "closed") return "success";
  if (s === "in_progress" || s === "in progress") return "info";
  if (s === "open" || s === "pending") return "warning";
  return "secondary";
}

export default function Issues() {
  const { result, query } = useList({
    resource: "issues",
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Issues</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Community-reported local issues
            </p>
          </div>
          <Button asChild size="sm">
            <a href="/issues/create">
              <FilePlus className="h-4 w-4" />
              Report Issue
            </a>
          </Button>
        </div>

        {/* Loading skeleton */}
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
                    <div className="h-24 bg-muted rounded mt-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!query.isLoading && (!result.data || result.data.length === 0) && (
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">No issues reported</p>
            <p className="text-xs text-muted-foreground mt-1">
              Community issues will appear here once submitted.
            </p>
            <Button asChild size="sm" className="mt-4">
              <a href="/issues/create">Report an Issue</a>
            </Button>
          </Card>
        )}

        {/* Issues grid */}
        {!query.isLoading && result.data && result.data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {result.data.map((issue: any, i: number) => (
              <Card
                key={i}
                className="group hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {issue.imageUrl && (
                  <div className="h-40 w-full overflow-hidden bg-muted">
                    <img
                      src={issue.imageUrl}
                      alt={issue.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm leading-snug line-clamp-2">
                      {issue.title ?? "Untitled Issue"}
                    </CardTitle>
                    <Badge
                      variant={getStatusVariant(issue.status)}
                      className="shrink-0 capitalize text-[10px]"
                    >
                      {issue.status ?? "Unknown"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {issue.description ?? "No description provided."}
                  </p>
                  {issue.location && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{issue.location}</span>
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
