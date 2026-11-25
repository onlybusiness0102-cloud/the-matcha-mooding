import { useEffect, useState } from 'react'
import { SHOP } from './data/shop'
import { categories } from './data/menu'
import CategoryNav from './components/CategoryNav'
import MenuSection from './components/MenuSection'
import ExtrasSection from './components/ExtrasSection'
import OrderModal from './components/OrderModal'
import FloatingCartBar from './components/FloatingCartBar'
import CartModal from './components/CartModal'
import Footer from './components/Footer'

const CART_STORAGE_KEY = 'tmm_cart_v1'
const NOTE_STORAGE_KEY = 'tmm_customer_note_v1'

function buildCartKey(entry) {
  return JSON.stringify({
    name: entry.name,
    size: entry.size,
    milk: entry.milk?.id || 'standard',
    freePicks: [...(entry.freePicks || [])].sort(),
    toppings: [...(entry.toppings || [])].map((t) => t.name).sort(),
    extras: [...(entry.extras || [])].map((e) => e.name).sort(),
    note: (entry.note || '').trim().toLowerCase(),
  })
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadNote() {
  try {
    return localStorage.getItem(NOTE_STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export default function App() {
  const [selected, setSelected] = useState(null) // { item, category }
  const [cart, setCart] = useState(loadCart)
  const [customerNote, setCustomerNote] = useState(loadNote)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem(NOTE_STORAGE_KEY, customerNote)
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  }, [customerNote])

  const addEntryToCart = (entry) => {
    const key = buildCartKey(entry)
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.key === key)
      if (idx === -1) return [...prev, { ...entry, key }]
      return prev.map((item, i) => (i === idx ? { ...item, qty: item.qty + entry.qty } : item))
    })
  }

  const handleAddToCart = (entry) => {
    addEntryToCart(entry)
    setSelected(null)
  }

  const handleOrderNow = (entry) => {
    addEntryToCart(entry)
    setSelected(null)
    setCartOpen(true)
  }

  const handleUpdateQty = (key, nextQty) => {
    setCart((prev) =>
      nextQty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty: nextQty } : i))
    )
  }

  const handleRemoveItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key))
  const handleClearCart = () => setCart([])

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0)
  const totalAmount = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0)

  return (
    <div className={`min-h-screen ${totalQty > 0 ? 'pb-20' : ''}`}>
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
            <a href={SHOP.instagramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-cream-50/60 px-6 py-2.5 text-sm font-semibold hover:bg-cream-50/10">
              Nhắn Instagram
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

      <FloatingCartBar totalQty={totalQty} totalAmount={totalAmount} onOpen={() => setCartOpen(true)} />

      {selected && (
        <OrderModal
          {...selected}
          onClose={() => setSelected(null)}
          onAddToCart={handleAddToCart}
          onOrderNow={handleOrderNow}
        />
      )}

      {cartOpen && (
        <CartModal
          cart={cart}
          customerNote={customerNote}
          onChangeCustomerNote={setCustomerNote}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </div>
  )
}
