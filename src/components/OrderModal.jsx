import { useEffect, useMemo, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { SHOP } from '../data/shop'
import { extras, formatPrice } from '../data/menu'

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

export default function OrderModal({ item, category, onClose }) {
  const sizes = item.sizes || category.sizes
  const freeList = category.freeToppings || []
  const freeMax = item.freeToppingCount || 1

  const [size, setSize] = useState(sizes[0])
  const [qty, setQty] = useState(1)
  const [freePicks, setFreePicks] = useState([])
  const [toppings, setToppings] = useState([]) // tên topping trả phí
  const [note, setNote] = useState('')
  const [tab, setTab] = useState('ig')
  const [copied, setCopied] = useState(false)

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

  const toggleTopping = (name) =>
    setToppings((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  const basePrice = item.prices[sizes.indexOf(size)]
  const chosenToppings = extras.toppings.filter((t) => toppings.includes(t.name))
  const toppingTotal = chosenToppings.reduce((s, t) => s + t.price, 0)
  const total = (basePrice + toppingTotal) * qty

  const message = useMemo(() => {
    const lines = [`Chào ${SHOP.name}, mình muốn đặt:`, `• ${qty} x ${item.name} (size ${size}) - ${formatPrice(basePrice)}`]
    if (freeList.length) {
      lines.push(`• Topping free: ${freePicks.length ? freePicks.join(', ') : 'shop chọn giúp mình'}`)
    }
    if (chosenToppings.length) {
      lines.push(`• Thêm topping: ${chosenToppings.map((t) => `${t.name} (+${formatPrice(t.price)})`).join(', ')}`)
    }
    if (note.trim()) lines.push(`• Ghi chú: ${note.trim()}`)
    lines.push(`Tổng tạm tính: ${formatPrice(total)}`)
    return lines.join('\n')
  }, [qty, item.name, size, basePrice, freeList.length, freePicks, chosenToppings, note, total])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
      return true
    } catch {
      window.prompt('Sao chép tin nhắn đặt món:', message)
      return false
    }
  }

  // Sao chép ngay trong lúc bấm (giữ "user gesture") rồi để thẻ <a> mở app
  const copyThenOpen = () => {
    navigator.clipboard?.writeText(message).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      },
      () => {}
    )
  }

  const qrValue = tab === 'zalo' ? SHOP.zaloUrl : SHOP.instagramUrl

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 md:items-center md:p-4" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream-50 p-5 shadow-2xl md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Tiêu đề */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-matcha-700">{item.name}</h3>
            <p className="text-xs text-matcha-900/60">{item.desc}</p>
          </div>
          <button onClick={onClose} aria-label="Đóng" className="rounded-full bg-matcha-50 px-3 py-1 text-matcha-700">✕</button>
        </div>

        {/* Size */}
        <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-matcha-500">Chọn size</h4>
        <div className="mt-2 flex items-center gap-2">
          {sizes.map((s, i) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${
                size === s ? 'border-matcha-700 bg-matcha-700 text-cream-50' : 'border-matcha-100 bg-white text-matcha-700'
              }`}
            >
              {s} · {formatPrice(item.prices[i])}
            </button>
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
          Thêm topping <span className="normal-case tracking-normal text-matcha-900/50">(không bắt buộc)</span>
        </h4>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {extras.toppings.map((t) => (
            <Chip key={t.name} active={toppings.includes(t.name)} onClick={() => toggleTopping(t.name)}>
              <span>{t.name}</span>
              <span className="shrink-0 font-semibold">+{formatPrice(t.price)}</span>
            </Chip>
          ))}
        </div>

        {/* Ghi chú + số lượng */}
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ghi chú (ít đá, ít ngọt...)"
          className="mt-4 w-full rounded-xl border border-matcha-100 bg-white px-3 py-2 text-sm outline-none focus:border-matcha-500"
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-9 w-9 rounded-full bg-matcha-50 text-lg text-matcha-700" aria-label="Giảm">−</button>
            <span className="w-6 text-center font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="h-9 w-9 rounded-full bg-matcha-50 text-lg text-matcha-700" aria-label="Tăng">+</button>
          </div>
          <p className="text-right">
            <span className="block text-[11px] text-matcha-900/60">Tạm tính</span>
            <span className="font-serif text-xl font-bold text-matcha-700">{formatPrice(total)}</span>
          </p>
        </div>

        {/* Tin nhắn đặt món */}
        <div className="mt-4 whitespace-pre-line rounded-xl bg-cream-100 p-3 text-xs leading-relaxed text-matcha-900/80">{message}</div>

        <div className="mt-3 grid gap-2">
          <a
            href={SHOP.instagramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={copyThenOpen}
            className="rounded-full bg-matcha-700 py-3 text-center text-sm font-semibold text-cream-50 hover:bg-matcha-900"
          >
            {copied ? '✓ Đã sao chép – dán vào Instagram' : 'Sao chép đơn & nhắn Instagram'}
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={SHOP.zaloUrl}
              target="_blank"
              rel="noreferrer"
              onClick={copyThenOpen}
              className="rounded-full border border-matcha-700 py-2.5 text-center text-sm font-semibold text-matcha-700"
            >
              Sao chép & mở Zalo
            </a>
            <button onClick={copy} className="rounded-full border border-matcha-700 py-2.5 text-sm font-semibold text-matcha-700">
              Chỉ sao chép
            </button>
          </div>
          <p className="text-center text-[11px] text-matcha-900/60">Sau khi mở Instagram/Zalo, bạn chỉ cần dán (Paste) tin nhắn và gửi cho shop.</p>
        </div>

        {/* QR */}
        <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-matcha-50 p-1 text-sm font-medium">
          {[['ig', 'Instagram'], ['zalo', 'Zalo']].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full py-1.5 ${tab === k ? 'bg-matcha-700 text-cream-50' : 'text-matcha-700'}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-col items-center">
          <div className="rounded-2xl border border-matcha-100 bg-white p-3">
            <QRCodeSVG value={qrValue} size={150} fgColor="#2a3d1c" />
          </div>
          <p className="mt-2 text-sm font-semibold text-matcha-700">
            {tab === 'zalo' ? `Zalo: ${SHOP.phone}` : `IG: @${SHOP.instagram}`}
          </p>
          <a href={`tel:${SHOP.phone}`} className="mt-1 text-xs text-matcha-500 underline">Hoặc gọi {SHOP.phone}</a>
        </div>
      </div>
    </div>
  )
}
