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

// Topics coming soon — shown as "Basics" cards when library is empty
import { BrainIcon, SparkleIcon, CodeIcon, GlobeIcon, TerminalIcon, RocketIcon } from '../components/Icons'

const comingSoonTopics = [
  { color:"#4285F4", Icon:BrainIcon,    title:"Artificial Intelligence",
    desc:"Foundational AI concepts, machine learning basics, and how AI is transforming modern technology.",
    tags:["AI Basics","Machine Learning","Deep Learning","Applications"] },
  { color:"#EA4335", Icon:SparkleIcon,  title:"Prompt Engineering",
    desc:"How to write effective prompts, communicate with AI tools, and get better results from AI-generated content.",
    tags:["ChatGPT","Gemini","Best Practices","Techniques"] },
  { color:"#FBBC05", Icon:GlobeIcon,    title:"Google AI Studio",
    desc:"Introduction to Google's AI development platform — experimenting with AI models and building AI-powered applications.",
    tags:["Gemini API","AI Models","Google Tools","Prototyping"] },
  { color:"#34A853", Icon:CodeIcon,     title:"App Development",
    desc:"Core concepts of designing and building modern applications — from wireframing to deployment.",
    tags:["Mobile","Web","Flutter","React Native"] },
  { color:"#9C27B0", Icon:TerminalIcon, title:"Programming & Development",
    desc:"Programming fundamentals, coding best practices, version control, and developer resources.",
    tags:["Python","JavaScript","Git","GitHub"] },
  { color:"#FF6D00", Icon:RocketIcon,   title:"Emerging Technologies",
    desc:"Cloud computing, IoT, blockchain, and new technology trends shaping the future.",
    tags:["Cloud","IoT","Blockchain","Trends"] },
]

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

            {/* ── Basics & Coming Soon section ── */}
            <section style={{ marginTop:56, paddingBottom:64 }}>
              <div style={{ textAlign:"center", marginBottom:40 }}>
                <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(22px,3vw,30px)", color:"#202124", marginBottom:10 }}>
                  Topics We'll Cover
                </h2>
                <p style={{ fontSize:15, color:"#5F6368", maxWidth:540, margin:"0 auto" }}>
                  Notes and resources for these topics will be added after AI Baithak and future sessions.
                </p>
                <div style={{ marginTop:14, padding:"10px 18px", background:"rgba(66,133,244,.07)",
                  border:"1px solid rgba(66,133,244,.2)", borderRadius:10, display:"inline-block",
                  fontSize:13, color:"#4285F4", fontWeight:500 }}>
                  📌 Content will be updated after AI Baithak and future events.
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
                {comingSoonTopics.map(({ color, Icon, title, desc, tags }) => (
                  <article key={title} style={{
                    background:"#fff", border:"1px solid #E8EAED",
                    borderLeft:`4px solid ${color}`, borderRadius:16,
                    padding:24, boxShadow:"0 1px 3px rgba(60,64,67,.1)",
                    transition:"transform .25s, box-shadow .25s",
                    display:"flex", flexDirection:"column", gap:12,
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 4px 16px rgba(60,64,67,.14)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 3px rgba(60,64,67,.1)";}}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:`${color}15`,
                        display:"grid", placeItems:"center", color, flexShrink:0 }}>
                        <Icon size={20}/>
                      </div>
                      <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:"#202124" }}>
                        {title}
                      </h3>
                    </div>
                    <p style={{ fontSize:13, color:"#5F6368", lineHeight:1.65 }}>{desc}</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:"auto" }}>
                      {tags.map(t => (
                        <span key={t} style={{
                          fontSize:11, fontWeight:600, padding:"3px 9px",
                          borderRadius:999, background:`${color}10`, color,
                          border:`1px solid ${color}20`,
                        }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ borderTop:"1px solid #E8EAED", paddingTop:10 }}>
                      <span style={{ fontSize:12, color:"#9AA0A6", fontWeight:500 }}>
                        📖 Notes coming after AI Baithak
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
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
