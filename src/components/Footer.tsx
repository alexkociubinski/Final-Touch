import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/shop" },
        { name: "Flags", href: "/shop?category=flags" },
        { name: "Crosses", href: "/shop?category=crosses" },
        { name: "Numbers", href: "/shop?category=numbers" },
        { name: "Symbols", href: "/shop?category=symbols" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Athletes", href: "/athletes" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Shipping", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <Image
                src="/BlackLogo.png"
                alt="Final Touch Logo"
                width={36}
                height={26}
              />
              <span className="font-display text-lg font-bold uppercase tracking-tight">
                Final Touch
              </span>
            </Link>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed">
              Premium adhesive decals for athletes who care about the details. 
              Engineered for game day performance.
            </p>
          </div>

          {/* Nav Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {currentYear} Final Touch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
