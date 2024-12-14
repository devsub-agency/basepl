import "@/style/mdx.css"
import { absoluteUrl, cn } from "@/lib/utils"
import { allDocs } from "contentlayer/generated"
import { Metadata } from "next"
import { siteConfig } from "../../site"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Mdx } from "@/components/mdx-components"
import {TableOfContents} from "@/components/toc"
import { getNavigation } from "@/lib/navigation"
import { DocsNav } from "@/components/simple-navigation"

type Args = {
    params: Promise<{ slug: string[] }>
}

async function getDocFromParams(slug: string[]) {
    const path = slug.join("/") || "";
    console.log('path', path);
    console.log('allDocs', allDocs);
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
    const navigation = getNavigation();
    if (!doc) {
        notFound();
    }

    console.log('doc toc', doc.toc);

    return (
        <main className="flex h-[90%] py-6 lg:gap-10 lg:py-8">
            <div className="flex ">
                <DocsNav items={navigation} />
            </div>
            <div className="mx-auto w-full min-w-0">
                <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm leading-none">
                    <div className="truncate">Docs</div>
                    <ChevronRight className="size-3.5" />
                    <div className="text-foreground">{doc.title}</div>
                </div>
                <div className="space-y-2">
                    <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
                        {doc.title}
                    </h1>
                    {doc.description && (
                        <p className="text-muted-foreground text-base">
                            {doc.description}
                        </p>
                    )}
                </div>
                <div className="pb-12 pt-8">
                    <Mdx code={doc.body.code} />
                </div>
            </div>
            <div className="sticky flex">
                <TableOfContents rawBody={doc.body.raw} />
            </div>
        </main>
    )

}
