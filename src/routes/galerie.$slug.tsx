import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles } from "@/lib/data";

export const Route = createFileRoute("/galerie/$slug")({
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-earth">Article introuvable</h1>
      <Link to="/galerie" className="mt-6 inline-block text-accent underline">Retour à la galerie</Link>
    </div>
  ),
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const art = articles.find((a) => a.slug === slug);
  if (!art) throw notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <nav className="mb-8 text-xs tracking-brand text-muted-foreground">
        <Link to="/galerie" className="hover:text-accent">CULTURE</Link> ›{" "}
        <span className="text-earth">{art.title.toUpperCase()}</span>
      </nav>
      <span className="ornament text-xs tracking-brand">ARTICLE</span>
      <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{art.title}</h1>
      <img src={art.image} alt={art.title} width={1200} height={800} loading="lazy" className="mt-10 aspect-[3/2] w-full object-cover" />
      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85">
        {art.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-12 border-t border-border pt-6">
        <Link to="/galerie" className="text-xs tracking-brand text-accent hover:underline">← TOUS LES ARTICLES</Link>
      </div>
    </article>
  );
}
