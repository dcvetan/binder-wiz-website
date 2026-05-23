import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="BinderWiz logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-text-primary">
                BinderWiz
              </span>
            </Link>
            <p className="text-text-muted text-sm">
              The ultimate Pokémon TCG app.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-text-muted text-sm">
              &copy; {new Date().getFullYear()} BinderWiz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
