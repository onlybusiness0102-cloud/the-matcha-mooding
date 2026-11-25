import { useEffect, useMemo, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { SHOP } from '../data/shop'
import { formatPrice } from '../data/menu'

export default function CartModal({
  cart,
  customerNote,
  onChangeCustomerNote,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onClose,
}) {
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

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0)
  const totalAmount = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0)

  const message = useMemo(() => {
    if (!cart.length) return ''
    const lines = [`Chào ${SHOP.name}, mình muốn đặt đơn (${totalQty} cốc):`]
    cart.forEach((c, idx) => {
      lines.push(`${idx + 1}. ${c.qty} x ${c.name} (Size ${c.size}) - ${formatPrice(c.basePrice)}/cốc`)
      if (c.milk && !c.milk.isDefault) {
        lines.push(`   + Sữa: ${c.milk.name} (+${formatPrice(c.milk.price)})`)
      }
      if (c.hasFreeOption) {
        lines.push(`   + Topping free: ${c.freePicks?.length ? c.freePicks.join(', ') : 'shop chọn giúp mình'}`)
      }
      if (c.toppings?.length) {
        lines.push(`   + Topping: ${c.toppings.map((t) => `${t.name} (+${formatPrice(t.price)})`).join(', ')}`)
      }
      if (c.extras?.length) {
        lines.push(`   + Extra: ${c.extras.map((e) => `${e.name} (+${formatPrice(e.price)})`).join(', ')}`)
      }
      if (c.note) {
        lines.push(`   + Ghi chú: ${c.note}`)
      }
      lines.push(`   = ${formatPrice(c.unitPrice * c.qty)}`)
    })
    if (customerNote.trim()) {
      lines.push(`Thông tin nhận hàng: ${customerNote.trim()}`)
    }
    lines.push(`Tổng tạm tính (${totalQty} cốc): ${formatPrice(totalAmount)}`)
    return lines.join('\n')
  }, [cart, customerNote, totalQty, totalAmount])

  const copy = async () => {
    if (!message) return
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.prompt('Sao chép tin nhắn đặt đơn:', message)
    }
  }

  const copyThenOpen = () => {
    if (!message) return
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
        className="flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-cream-50 shadow-2xl md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-cream-200 px-5 py-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-matcha-700">Giỏ hàng của bạn</h3>
            <p className="text-xs text-matcha-900/60">
              {totalQty > 0 ? `${totalQty} cốc · Tạm tính ${formatPrice(totalAmount)}` : 'Chưa có món nào trong giỏ'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="rounded-full px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
              >
                Xóa hết
              </button>
            )}
            <button onClick={onClose} aria-label="Đóng" className="rounded-full bg-matcha-50 px-3 py-1 text-matcha-700 hover:bg-matcha-100">
              ✕
            </button>
          </div>
        </div>

        {/* Nội dung giỏ hàng */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-matcha-900/70">Giỏ hàng đang trống. Hãy chọn món từ thực đơn nhé!</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-full bg-matcha-700 px-6 py-2.5 text-sm font-semibold text-cream-50"
              >
                Quay lại chọn món
              </button>
            </div>
          ) : (
            <>
              {/* Danh sách từng dòng cốc */}
              <div className="space-y-3">
                {cart.map((c) => (
                  <div key={c.key} className="rounded-2xl border border-cream-200 bg-white p-3.5 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-matcha-700">
                          {c.name} <span className="font-sans text-xs font-semibold text-matcha-500">· Size {c.size}</span>
                        </h4>
                        <ul className="mt-1 space-y-0.5 text-xs text-matcha-900/70">
                          {c.milk && !c.milk.isDefault && (
                            <li>Sữa: {c.milk.name} (+{formatPrice(c.milk.price)})</li>
                          )}
                          {c.hasFreeOption && (
                            <li>Topping free: {c.freePicks?.length ? c.freePicks.join(', ') : 'Shop chọn giúp'}</li>
                          )}
                          {c.toppings?.length > 0 && (
                            <li>Topping: {c.toppings.map((t) => `${t.name} (+${formatPrice(t.price)})`).join(', ')}</li>
                          )}
                          {c.extras?.length > 0 && (
                            <li>Extra: {c.extras.map((e) => `${e.name} (+${formatPrice(e.price)})`).join(', ')}</li>
                          )}
                          {c.note && <li className="italic text-matcha-700">Ghi chú: {c.note}</li>}
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(c.key)}
                        aria-label={`Xóa ${c.name}`}
                        className="shrink-0 rounded-full px-2 py-0.5 text-xs text-matcha-900/40 hover:bg-red-50 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-cream-100 pt-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(c.key, c.qty - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-matcha-50 text-sm font-semibold text-matcha-700 hover:bg-matcha-100"
                          aria-label="Giảm"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{c.qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(c.key, c.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-matcha-50 text-sm font-semibold text-matcha-700 hover:bg-matcha-100"
                          aria-label="Tăng"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-bold text-matcha-700">
                        {formatPrice(c.unitPrice * c.qty)}
                        {c.qty > 1 && (
                          <span className="ml-1 text-xs font-normal text-matcha-900/50">({formatPrice(c.unitPrice)}/cốc)</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Thông tin nhận hàng / ghi chú chung */}
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase tracking-widest text-matcha-500">
                  Thông tin nhận hàng <span className="normal-case tracking-normal text-matcha-900/50">(tuỳ chọn)</span>
                </label>
                <input
                  value={customerNote}
                  onChange={(e) => onChangeCustomerNote(e.target.value)}
                  placeholder="SĐT, địa chỉ giao hoặc giờ qua lấy..."
                  className="mt-1.5 w-full rounded-xl border border-matcha-100 bg-white px-3 py-2 text-sm outline-none focus:border-matcha-500"
                />
              </div>

              {/* Xem trước tin nhắn đơn hàng ghép tự động */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-matcha-500">Tin nhắn đơn hàng</span>
                  <span className="font-serif text-base font-bold text-matcha-700">Tổng: {formatPrice(totalAmount)}</span>
                </div>
                <div className="mt-1.5 whitespace-pre-line rounded-xl bg-cream-100 p-3 text-xs leading-relaxed text-matcha-900/85">
                  {message}
                </div>
              </div>

              {/* Nút gửi đơn */}
              <div className="mt-4 grid gap-2">
                <a
                  href={SHOP.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={copyThenOpen}
                  className="rounded-full bg-matcha-700 py-3 text-center text-sm font-semibold text-cream-50 shadow hover:bg-matcha-900"
                >
                  {copied ? '✓ Đã sao chép – dán vào Instagram' : 'Sao chép đơn & nhắn Instagram'}
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={SHOP.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={copyThenOpen}
                    className="rounded-full border border-matcha-700 py-2.5 text-center text-sm font-semibold text-matcha-700 hover:bg-matcha-50"
                  >
                    Sao chép & nhắn Zalo
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-full border border-matcha-700 py-2.5 text-sm font-semibold text-matcha-700 hover:bg-matcha-50"
                  >
                    {copied ? '✓ Đã sao chép' : 'Chỉ sao chép đơn'}
                  </button>
                </div>
                <p className="text-center text-[11px] text-matcha-900/60">
                  Sau khi mở Instagram / Zalo, bạn chỉ cần Dán (Paste) tin nhắn và gửi cho shop.
                </p>
              </div>

              {/* Mã QR */}
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-matcha-50 p-1 text-sm font-medium">
                {[['ig', 'QR Instagram'], ['zalo', 'QR Zalo']].map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTab(k)}
                    className={`rounded-full py-1.5 ${tab === k ? 'bg-matcha-700 text-cream-50' : 'text-matcha-700'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-col items-center">
                <div className="rounded-2xl border border-matcha-100 bg-white p-3">
                  <QRCodeSVG value={qrValue} size={140} fgColor="#2a3d1c" />
                </div>
                <p className="mt-2 text-sm font-semibold text-matcha-700">
                  {tab === 'zalo' ? `Zalo: ${SHOP.phone}` : `IG: @${SHOP.instagram}`}
                </p>
                <a href={`tel:${SHOP.phone}`} className="mt-1 text-xs text-matcha-500 underline">
                  Hoặc gọi {SHOP.phone}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
