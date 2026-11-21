import { formatPrice } from '../data/menu'

export const themeColor = {
  matcha: 'text-matcha-700 bg-matcha-700',
  hoji: 'text-hoji bg-hoji',
  cacao: 'text-[#5a1f1f] bg-[#5a1f1f]',
  tea: 'text-[#7a3e1d] bg-[#7a3e1d]',
}

export default function MenuSection({ category, onSelect }) {
  const [text, bg] = themeColor[category.theme].split(' ')
  return (
    <section id={category.id} className="scroll-mt-16 pt-10">
      <div className="mb-4 flex items-center gap-3">
        <h2 className={`font-serif text-2xl font-semibold uppercase tracking-widest md:text-3xl ${text}`}>{category.name}</h2>
        <div className={`h-px flex-1 opacity-30 ${bg}`} />
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-cream-50 ${bg}`}>
          {category.sizes.join(' / ')}
        </span>
      </div>
      {category.note && (
        <p className="mb-4 rounded-xl bg-cream-100 p-3 text-xs leading-relaxed text-matcha-900/80">{category.note}</p>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {category.items.map((item) => (
          <button
            key={item.name}
            onClick={() => onSelect(item)}
            className="group flex items-start justify-between gap-3 rounded-2xl border border-cream-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
          >
            <div className="min-w-0">
              <h3 className={`font-serif text-base font-semibold ${text}`}>
                {item.name} {item.hot && <span className="text-amber-500">✦</span>}
              </h3>
              <p className="mt-1 text-xs text-matcha-900/60">{item.desc}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className={`text-sm font-semibold ${text}`}>{item.prices.map(formatPrice).join(' / ')}</p>
              <p className="mt-1 text-[11px] text-matcha-500 group-hover:underline">Đặt món →</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
