import { formatPrice } from '../data/menu'

export default function FloatingCartBar({ totalQty, totalAmount, onOpen }) {
  if (totalQty <= 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4">
      <div className="mx-auto max-w-md">
        <button
          type="button"
          onClick={onOpen}
          className="pointer-events-auto flex w-full items-center justify-between gap-3 rounded-full bg-matcha-700 px-5 py-3.5 text-cream-50 shadow-xl ring-2 ring-cream-50/80 transition hover:bg-matcha-900 active:scale-[0.99]"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-cream-50 px-2 text-xs font-bold text-matcha-700">
              {totalQty}
            </span>
            <span className="text-sm font-semibold">Giỏ hàng ({totalQty} cốc)</span>
          </span>
          <span className="flex items-center gap-2 text-sm font-bold">
            <span>{formatPrice(totalAmount)}</span>
            <span aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </div>
  )
}
