import { useState } from 'react'

/**
 * Questions fréquentes dépliables. Les réponses restent dans le HTML même
 * repliées : Google les lit, et elles sont aussi publiées en FAQPage.
 */
export default function Faq({ items, idPrefix = 'faq' }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => (
        <article className={open === index ? 'active' : ''} key={question}>
          <h3>
            <button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={`${idPrefix}-${index}`}>
              {question}<b aria-hidden="true">+</b>
            </button>
          </h3>
          <div className="faq-answer" id={`${idPrefix}-${index}`}>
            <p>{answer}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
