/** Fil d'Ariane visible, doublé d'un BreadcrumbList JSON-LD (seo.js). */
export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Fil d’Ariane">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index < items.length - 1 ? <a href={item.path}>{item.name}</a> : <span aria-current="page">{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
