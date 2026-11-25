import { useState } from 'react'
import { SHOP } from './data/shop'
import { categories } from './data/menu'
import CategoryNav from './components/CategoryNav'
import MenuSection from './components/MenuSection'
import ExtrasSection from './components/ExtrasSection'
import OrderModal from './components/OrderModal'
import Footer from './components/Footer'

export default function App() {
  const [selected, setSelected] = useState(null) // { item, category }

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden bg-matcha-700 text-cream-50">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-matcha-500/40" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-matcha-900/40" />
        <div className="relative mx-auto max-w-5xl px-5 py-10 text-center md:py-16">
          <p className="text-xs uppercase tracking-[0.35em] text-matcha-100">Take away · Delivery</p>
          <img
            src="/logo.png"
            alt={SHOP.name}
            className="mx-auto mt-5 h-24 w-auto object-contain brightness-0 invert md:h-32"
          />
          <h1 className="sr-only">{SHOP.name}</h1>
          <p className="mt-4 font-serif text-lg italic text-cream-200 md:text-2xl">{SHOP.slogan}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#menu" className="rounded-full bg-cream-50 px-6 py-2.5 text-sm font-semibold text-matcha-700 shadow hover:bg-cream-200">
              Xem menu
            </a>
            <a href={SHOP.zaloUrl} target="_blank" rel="noreferrer" className="rounded-full border border-cream-50/60 px-6 py-2.5 text-sm font-semibold hover:bg-cream-50/10">
              Đặt qua Zalo
            </a>
          </div>
          <p className="mt-6 text-xs text-matcha-100">Quán chỉ bán mang đi / giao hàng – không có chỗ ngồi</p>
        </div>
      </header>

      <CategoryNav categories={categories} />

      <main id="menu" className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
        {categories.map((c) => (
          <MenuSection key={c.id} category={c} onSelect={(item) => setSelected({ item, category: c })} />
        ))}
        <ExtrasSection />
      </main>

      <Footer />
      {selected && <OrderModal {...selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
