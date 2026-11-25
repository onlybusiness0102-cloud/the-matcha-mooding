import { useEffect, useState } from 'react'
import { extraChoices, extras, formatPrice } from '../data/menu'

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-xs font-medium transition ${
        active ? 'border-matcha-700 bg-matcha-700 text-cream-50' : 'border-matcha-100 bg-white text-matcha-900 hover:border-matcha-300'
      }`}
    >
      {children}
    </button>
  )
}

export default function OrderModal({ item, category, onClose, onAddToCart, onOrderNow }) {
  const sizes = item.sizes || category.sizes
  const freeList = category.freeToppings || []
  const freeMax = item.freeToppingCount || 1
  const defaultMilk = extras.milk.find((m) => m.isDefault) || extras.milk[0]

  const [size, setSize] = useState(sizes[0])
  const [milkId, setMilkId] = useState(defaultMilk.id)
  const [freePicks, setFreePicks] = useState([])
  const [toppings, setToppings] = useState([]) // danh sách tên topping trả phí
  const [extraNames, setExtraNames] = useState([]) // danh sách tên extra đã chọn
  const [note, setNote] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const toggleFree = (name) =>
    setFreePicks((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name)
      const next = [...prev, name]
      return next.length > freeMax ? next.slice(next.length - freeMax) : next
    })

  const toggleItem = (setter, name) =>
    setter((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  const basePrice = item.prices[sizes.indexOf(size)]
  const chosenMilk = extras.milk.find((m) => m.id === milkId) || defaultMilk
  const chosenToppings = extras.toppings.filter((t) => toppings.includes(t.name))
  const chosenExtras = extraChoices.filter((e) => extraNames.includes(e.name))

  const unitPrice =
    basePrice +
    chosenMilk.price +
    chosenToppings.reduce((s, t) => s + t.price, 0) +
    chosenExtras.reduce((s, e) => s + e.price, 0)

  const total = unitPrice * qty

  const buildEntry = () => ({
    name: item.name,
    size,
    basePrice,
    unitPrice,
    qty,
    milk: { id: chosenMilk.id, name: chosenMilk.name, price: chosenMilk.price, isDefault: !!chosenMilk.isDefault },
    hasFreeOption: freeList.length > 0,
    freePicks: [...freePicks],
    toppings: chosenToppings.map((t) => ({ name: t.name, price: t.price })),
    extras: chosenExtras.map((e) => ({ name: e.name, price: e.price })),
    note: note.trim(),
  })

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 md:items-center md:p-4" onClick={onClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-cream-50 shadow-2xl md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header cố định */}
        <div className="flex items-start justify-between gap-3 border-b border-cream-200 px-5 py-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-matcha-700">{item.name}</h3>
            <p className="text-xs text-matcha-900/60">{item.desc}</p>
          </div>
          <button onClick={onClose} aria-label="Đóng" className="rounded-full bg-matcha-50 px-3 py-1 text-matcha-700 hover:bg-matcha-100">
            ✕
          </button>
        </div>

        {/* Nội dung cuộn */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Size */}
          <h4 className="text-xs font-semibold uppercase tracking-widest text-matcha-500">Chọn size</h4>
          <div className="mt-2 flex items-center gap-2">
            {sizes.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  size === s ? 'border-matcha-700 bg-matcha-700 text-cream-50' : 'border-matcha-100 bg-white text-matcha-700 hover:border-matcha-300'
                }`}
              >
                {s} · {formatPrice(item.prices[i])}
              </button>
            ))}
          </div>

          {/* Loại sữa (chọn 1) */}
          <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-matcha-500">
            Loại sữa <span className="normal-case tracking-normal text-matcha-900/50">(chọn 1)</span>
          </h4>
          <div className="mt-2 grid gap-2">
            {extras.milk.map((m) => (
              <Chip key={m.id} active={milkId === m.id} onClick={() => setMilkId(m.id)}>
                <span>
                  {m.name}
                  {m.note && <em className="ml-1 opacity-70">({m.note})</em>}
                </span>
                <span className="shrink-0 font-semibold">{m.price ? `+${formatPrice(m.price)}` : '0K'}</span>
              </Chip>
            ))}
          </div>

          {/* Topping miễn phí (trà sữa) */}
          {freeList.length > 0 && (
            <>
              <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-matcha-500">
                Topping FREE <span className="normal-case tracking-normal text-matcha-900/50">(chọn tối đa {freeMax})</span>
              </h4>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {freeList.map((name) => (
                  <Chip key={name} active={freePicks.includes(name)} onClick={() => toggleFree(name)}>
                    <span>{name}</span>
                    <span className="shrink-0 opacity-70">Free</span>
                  </Chip>
                ))}
              </div>
            </>
          )}

          {/* Topping thêm (trả phí) */}
          <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-matcha-500">
            Thêm topping <span className="normal-case tracking-normal text-matcha-900/50">(chọn nhiều)</span>
          </h4>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {extras.toppings.map((t) => (
              <Chip key={t.name} active={toppings.includes(t.name)} onClick={() => toggleItem(setToppings, t.name)}>
                <span>{t.name}</span>
                <span className="shrink-0 font-semibold">+{formatPrice(t.price)}</span>
              </Chip>
            ))}
          </div>

          {/* Extra (chọn nhiều) */}
          <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-matcha-500">
            Extra <span className="normal-case tracking-normal text-matcha-900/50">(chọn nhiều)</span>
          </h4>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {extraChoices.map((e) => (
              <Chip key={e.name} active={extraNames.includes(e.name)} onClick={() => toggleItem(setExtraNames, e.name)}>
                <span>{e.name}</span>
                <span className="shrink-0 font-semibold">+{formatPrice(e.price)}</span>
              </Chip>
            ))}
          </div>

          {/* Ghi chú */}
          <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-matcha-500">Ghi chú cho cốc này</h4>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ít đá, 50% đường, để riêng đá..."
            className="mt-2 w-full rounded-xl border border-matcha-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-matcha-500"
          />
        </div>

        {/* Chân modal cố định: số lượng + Thêm vào giỏ */}
        <div className="border-t border-cream-200 bg-white px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-matcha-50 text-lg font-medium text-matcha-700 hover:bg-matcha-100"
                aria-label="Giảm số lượng"
              >
                −
              </button>
              <span className="w-6 text-center text-base font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-matcha-50 text-lg font-medium text-matcha-700 hover:bg-matcha-100"
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(buildEntry())}
              className="flex-1 rounded-full bg-matcha-700 px-5 py-3 text-sm font-semibold text-cream-50 shadow hover:bg-matcha-900 active:scale-[0.99]"
            >
              Thêm vào giỏ hàng · {formatPrice(total)}
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOrderNow(buildEntry())}
            className="mt-2 w-full rounded-full py-1.5 text-xs font-medium text-matcha-700 underline-offset-2 hover:underline"
          >
            Hoặc đặt ngay cốc này →
          </button>
        </div>
      </div>
    </div>
  )
}
