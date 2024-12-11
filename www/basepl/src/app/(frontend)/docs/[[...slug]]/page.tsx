import "@/style/mdx.css"
import { absoluteUrl, cn } from "@/lib/utils"
import { allDocs } from "contentlayer/generated"
import { Metadata } from "next"
import { siteConfig } from "../../site"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Mdx } from "@/components/mdx-compoents"
import TableOfContents from "@/components/toc"

type Args = {
    params: Promise<{ slug: string[] }>
}

async function getDocFromParams(slug: string[]) {
    const path = slug.join("/") || "";
    const doc = allDocs.find((doc) => doc.slugAsParams === path)
    if (!doc) {
        return null
    }

    return doc
}

export async function generateMetadata(params: Args): Promise<Metadata> {
  const path = await params.params;
    const doc = await getDocFromParams(path.slug)

    if (!doc) {
        return {}
    }

    return {
        title: doc.title,
        description: doc.description,
        openGraph: {
            title: doc.title,
            description: doc.description,
            type: "article",
            url: absoluteUrl(doc.slug),
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: siteConfig.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: doc.title,
            description: doc.description,
            images: [siteConfig.ogImage],
            creator: "@devsub",
        },
    }
}

export default async function Page(params: Args) {
    const docName = await params.params;
    console.log('in page', docName.slug);
    const doc = await getDocFromParams(docName.slug);

    if (!doc) {
        notFound();
    }

    return (
        <main className="py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0">
                <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
                    <div className="truncate">Docs</div>
                    <ChevronRight className="size-3.5" />
                    <div className="text-foreground">{doc.title}</div>
                </div>
                <div className="space-y-2">
                    <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
                        {doc.title}
                    </h1>
                    {doc.description && (
                        <p className="text-base text-muted-foreground">
                            {doc.description}
                        </p>
                    )}
                </div>

                <div className="pb-12 pt-8">
                    <Mdx code={doc.body.code} />
                </div>

              <div className="hidden text-sm xl:block">
                <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
                  <div className="no-scrollbar h-full overflow-auto pb-10">
                    {doc.toc && <TableOfContents rawBody={doc.body.raw} />}
                  </div>
                </div>
              </div>
            </div>
        </main>
    )

}
