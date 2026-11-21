import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { SHOP } from '../data/shop'
import { formatPrice } from '../data/menu'

export default function OrderModal({ item, category, onClose }) {
  const sizes = item.sizes || category.sizes
  const [size, setSize] = useState(sizes[0])
  const [tab, setTab] = useState('zalo')
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

  const price = item.prices[sizes.indexOf(size)]
  const message = `Chào ${SHOP.name}, mình muốn đặt: ${item.name} (size ${size}) - ${formatPrice(price)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Sao chép tin nhắn đặt món:', message)
    }
  }

  const qrValue = tab === 'zalo' ? SHOP.zaloUrl : SHOP.instagramProfile

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 md:items-center md:p-4" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream-50 p-5 shadow-2xl md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-matcha-700">{item.name}</h3>
            <p className="text-xs text-matcha-900/60">{item.desc}</p>
          </div>
          <button onClick={onClose} aria-label="Đóng" className="rounded-full bg-matcha-50 px-3 py-1 text-matcha-700">✕</button>
        </div>

        <div className="mt-4 flex items-center gap-2">
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

        <p className="mt-5 text-center text-sm font-medium">Quét mã QR hoặc bấm nút để gửi đơn cho shop</p>
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-full bg-matcha-50 p-1 text-sm font-medium">
          {[['zalo', 'Zalo'], ['ig', 'Instagram']].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full py-1.5 ${tab === k ? 'bg-matcha-700 text-cream-50' : 'text-matcha-700'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center">
          <div className="rounded-2xl border border-matcha-100 bg-white p-3">
            <QRCodeSVG value={qrValue} size={168} fgColor="#2a3d1c" />
          </div>
          <p className="mt-2 text-sm font-semibold text-matcha-700">
            {tab === 'zalo' ? `Zalo: ${SHOP.phone}` : `IG: @${SHOP.instagram}`}
          </p>
        </div>

        <div className="mt-4 rounded-xl bg-cream-100 p-3 text-xs text-matcha-900/80">{message}</div>

        <div className="mt-3 grid gap-2">
          <button onClick={copy} className="rounded-full bg-matcha-700 py-3 text-sm font-semibold text-cream-50 hover:bg-matcha-900">
            {copied ? '✓ Đã sao chép' : 'Sao chép tin nhắn đặt món'}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <a href={SHOP.zaloUrl} target="_blank" rel="noreferrer" className="rounded-full border border-matcha-700 py-2.5 text-center text-sm font-semibold text-matcha-700">
              Mở Zalo
            </a>
            <a href={SHOP.instagramProfile} target="_blank" rel="noreferrer" className="rounded-full border border-matcha-700 py-2.5 text-center text-sm font-semibold text-matcha-700">
              Mở Instagram
            </a>
          </div>
          <a href={`tel:${SHOP.phone}`} className="text-center text-xs text-matcha-500 underline">Hoặc gọi {SHOP.phone}</a>
        </div>
      </div>
    </div>
  )
}
