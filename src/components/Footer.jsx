import { SHOP } from '../data/shop'

export default function Footer() {
  return (
    <footer className="bg-matcha-900 px-5 py-10 text-center text-sm text-cream-100">
      <div className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 shadow">
        <img src="/logo.png" alt={SHOP.name} className="h-12 w-auto object-contain" />
      </div>
      <p className="mt-3 italic text-matcha-100">{SHOP.slogan}</p>
      <div className="mt-5 space-y-1.5">
        <p>📍 {SHOP.address}</p>
        <a href={SHOP.mapsUrl} target="_blank" rel="noreferrer" className="underline">Xem trên Google Maps</a>
        <p>🕒 {SHOP.hours}</p>
        <p>
          ☎ Hotline / Zalo: <a href={`tel:${SHOP.phone}`} className="font-semibold underline">{SHOP.phone}</a>
        </p>
        <p>
          Instagram: <a href={SHOP.instagramProfile} target="_blank" rel="noreferrer" className="underline">@{SHOP.instagram}</a>
        </p>
      </div>
      <p className="mt-6 text-xs text-matcha-300">© {new Date().getFullYear()} {SHOP.name}. Chỉ bán mang đi / giao hàng.</p>
    </footer>
  )
}
