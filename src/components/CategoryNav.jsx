import { useEffect, useState } from 'react'

export default function CategoryNav({ categories }) {
  const [active, setActive] = useState(categories[0].id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    )
    categories.forEach((c) => {
      const el = document.getElementById(c.id)
      el && obs.observe(el)
    })
    return () => obs.disconnect()
  }, [categories])

  return (
    <nav className="sticky top-0 z-30 border-b border-cream-200 bg-cream-50/90 backdrop-blur">
      <div className="no-scrollbar mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === c.id ? 'bg-matcha-700 text-cream-50' : 'bg-matcha-50 text-matcha-700 hover:bg-matcha-100'
            }`}
          >
            {c.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
