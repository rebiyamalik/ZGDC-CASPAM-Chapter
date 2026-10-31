import { useEffect, useMemo, useRef, useState } from 'react'
import { resources as allResources, CATEGORIES, CATEGORY_INFO } from '../data/resources.js'
import { getPublishedResources } from '../lib/notesPublishing.js'
import NotesHero from '../components/notes/NotesHero.jsx'
import CategoryFilters, { ALL } from '../components/notes/CategoryFilters.jsx'
import SortSelect from '../components/notes/SortSelect.jsx'
import ResourceCard from '../components/notes/ResourceCard.jsx'
import NoMatch from '../components/notes/NoMatch.jsx'
import LibraryEmpty from '../components/notes/LibraryEmpty.jsx'
import CategoryPreviews from '../components/notes/CategoryPreviews.jsx'
import './notes.css'

/** Notes & Learning Resources page (route: #/notes).
 *  Data lives in src/data/resources.js. Only approved, complete resources are shown. */

// Runs once. While developing (npm run dev) it explains why an entry was hidden.
const published = getPublishedResources(
  allResources,
  CATEGORIES,
  import.meta.env.DEV
    ? (item, problems) => console.warn(`[Notes] "${item.title ?? item.id}" is hidden: ${problems.join('; ')}`)
    : undefined
)

const categoryCounts = { [ALL]: published.length }
CATEGORIES.forEach((name) => { categoryCounts[name] = published.filter((item) => item.category === name).length })

const sorters = {
  newest: (a, b) => b.addedOn.localeCompare(a.addedOn) || a.title.localeCompare(b.title),
  oldest: (a, b) => a.addedOn.localeCompare(b.addedOn) || a.title.localeCompare(b.title),
  title: (a, b) => a.title.localeCompare(b.title),
  category: (a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || a.title.localeCompare(b.title),
}

const formatDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export default function Notes() {
  const rootRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL)
  const [sortKey, setSortKey] = useState('newest')

  // The site navbar is sticky, so the filter bar sticks just below it.
  useEffect(() => {
    const nav = document.querySelector('header')
    const apply = () => rootRef.current?.style.setProperty('--zr-nav-h', `${nav ? nav.offsetHeight : 0}px`)
    apply()
    if (!nav || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(apply)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  const hasResources = published.length > 0
  const query = searchTerm.trim().toLowerCase()

  // Filtering: a resource must match BOTH the category and the search text.
  const visible = useMemo(() => published
    .filter((item) => selectedCategory === ALL || item.category === selectedCategory)
    .filter((item) => query === '' ||
      item.title.toLowerCase().includes(query) ||
      (item.description || '').toLowerCase().includes(query) ||
      (item.topic || '').toLowerCase().includes(query))
    .sort(sorters[sortKey]), [selectedCategory, query, sortKey])

  const categoryActive = selectedCategory !== ALL
  const filtersActive = query !== '' || categoryActive || sortKey !== 'newest'
  // With no filters, the newest item becomes a large "Latest" card.
  const showFeatured = !query && !categoryActive && sortKey === 'newest' && visible.length >= 4

  const topicCount = new Set(published.map((item) => item.topic).filter(Boolean)).size
  const sessionCount = new Set(published.map((item) => item.session).filter(Boolean)).size
  const lastUpdate = published.map((item) => item.addedOn).sort().pop()

  const resetAll = () => { setSearchTerm(''); setSelectedCategory(ALL); setSortKey('newest') }

  return (
    <div className="zr" ref={rootRef}>
      <NotesHero hasResources={hasResources} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="zr-container zr-main">
        {!hasResources ? (
          <>
            <LibraryEmpty />
            <CategoryPreviews categories={CATEGORIES} info={CATEGORY_INFO} />
          </>
        ) : (
          <>
            <p className="zr-summary">
              <span><strong>{published.length}</strong> resources</span>
              {topicCount > 0 && <span><strong>{topicCount}</strong> topics</span>}
              {sessionCount > 0 && <span><strong>{sessionCount}</strong> sessions</span>}
              {lastUpdate && <span>Updated <time dateTime={lastUpdate}>{formatDate(lastUpdate)}</time></span>}
            </p>

            <div className="zr-toolbar">
              <CategoryFilters categories={CATEGORIES} counts={categoryCounts}
                selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            </div>

            <section aria-labelledby="zr-results-heading" className="zr-results-section">
              <div className="zr-results">
                <h2 id="zr-results-heading" className="zr-results__title">{categoryActive ? selectedCategory : 'All resources'}</h2>
                <div className="zr-results__tools">
                  {/* role=status lets screen readers hear the count change */}
                  <p className="zr-results__count" role="status" aria-live="polite">
                    Showing <strong>{visible.length}</strong> of {published.length}
                  </p>
                  <SortSelect value={sortKey} onChange={setSortKey} />
                  <button type="button" className="zr-link-button" onClick={resetAll} disabled={!filtersActive}>Reset</button>
                </div>
              </div>

              {visible.length > 0 ? (
                <div className="zr-grid">
                  {visible.map((resource, index) => (
                    <ResourceCard key={resource.id} resource={resource} index={index} query={query}
                      featured={showFeatured && index === 0} />
                  ))}
                </div>
              ) : (
                <NoMatch query={searchTerm.trim()} category={categoryActive ? selectedCategory : ''}
                  onClearSearch={() => setSearchTerm('')} onClearCategory={() => setSelectedCategory(ALL)} onClearAll={resetAll} />
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}
