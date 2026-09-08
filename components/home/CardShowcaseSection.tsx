import Artwork3D from "@/components/ui/Artwork3D";

export default function CardShowcaseSection() {
  return (
    <section aria-label="Pokemon card showcase" className="relative w-full overflow-hidden border-y border-divider py-10 sm:py-14">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-3 text-sm font-medium text-primary-light">The collection is yours.</p>
        <h2 className="text-3xl font-bold text-white sm:text-5xl">Make every card count.</h2>
      </div>
      <Artwork3D
        src="/images/pokemon-card-back.webp"
        alt="Pokemon card"
        aspect={1080 / 1496}
        spin
        className="h-[360px] w-full sm:h-[480px]"
      />
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 px-4 text-center sm:gap-8">
        {[{ label: "Know its value", href: "#features", color: "#e9c65c" }, { label: "Find its match", href: "#color-matching", color: "#bb9aff" }, { label: "Complete the set", href: "#expansions", color: "#8cd0b0" }].map(item => <a key={item.href} href={item.href} className="border-t border-divider py-4 text-xs font-medium transition-colors hover:text-white sm:text-base" style={{ color: item.color }}>{item.label}</a>)}
      </div>
    </section>
  );
}
