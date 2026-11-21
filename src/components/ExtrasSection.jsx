import { extras, formatPrice } from '../data/menu'

function Block({ title, rows }) {
  return (
    <div className="rounded-2xl border border-cream-200 bg-white p-4">
      <h3 className="mb-2 font-serif text-lg font-semibold uppercase tracking-widest text-matcha-700">{title}</h3>
      <ul className="space-y-1.5 text-sm">
        {rows.map((r) => (
          <li key={r.name} className="flex justify-between gap-3">
            <span>{r.name}{r.note && <em className="ml-1 text-xs text-matcha-500">({r.note})</em>}</span>
            <span className="font-medium text-matcha-700">{r.price ? `+${formatPrice(r.price)}` : '—'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ExtrasSection() {
  const b = extras.bottle
  return (
    <section id="extras" className="scroll-mt-16 pt-10">
      <h2 className="mb-4 font-serif text-2xl font-semibold uppercase tracking-widest text-matcha-700 md:text-3xl">Toppings & Tuỳ chọn</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <Block title="Toppings" rows={extras.toppings} />
        <Block title="Milk" rows={extras.milk} />
        <Block title="Options" rows={extras.options} />
        <Block title="Extra Shot" rows={extras.extraShot} />
      </div>
      <div className="mt-3 rounded-2xl bg-matcha-700 p-5 text-cream-50">
        <h3 className="font-serif text-xl font-semibold uppercase tracking-widest">{b.title}</h3>
        <p className="text-xs text-matcha-100">{b.note}</p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {b.items.map((r) => (
            <li key={r.name} className="flex justify-between gap-3">
              <span>{r.name}</span><span className="font-semibold">{formatPrice(r.price)}</span>
            </li>
          ))}
          {extras.others.map((r) => (
            <li key={r.name} className="flex justify-between gap-3 text-matcha-100">
              <span>{r.name}</span><span>{formatPrice(r.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
