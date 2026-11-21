import { SHOP } from '../data/shop'

export default function Footer() {
  return (
    <footer className="bg-matcha-900 px-5 py-10 text-center text-sm text-cream-100">
      <h2 className="font-serif text-2xl font-bold">{SHOP.name}</h2>
      <p className="italic text-matcha-100">{SHOP.slogan}</p>
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
