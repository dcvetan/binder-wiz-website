import Artwork3D from "@/components/ui/Artwork3D";

export default function CardShowcaseSection() {
  return (
    <section aria-label="Pokemon card showcase" className="relative w-full pb-12 sm:pb-16">
      <Artwork3D
        src="/images/pokemon-card-back.png"
        alt="Pokemon card"
        aspect={1080 / 1496}
        spin
        className="h-[480px] w-full sm:h-[600px]"
      />
    </section>
  );
}
