import { useMemo, useState } from 'react'

const columns = ['name', 'email', 'phone', 'roll', 'dept', 'semester', 'event', 'eventId', 'createdAt']

function csvCell(value) {
  const text = String(value ?? '')
  return '"' + text.replace(/"/g, '""') + '"'
}

function downloadCsv(rows) {
  const csv = [columns, ...rows.map(row => columns.map(key => row[key] ?? ''))]
    .map(row => row.map(csvCell).join(',')).join('\r\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'zgdc-caspam-registrations.csv'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  async function loadRecords(event) {
    event?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await fetch('/api/admin-registrations', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + password },
      })
      const data = await result.json()
      if (!result.ok) throw new Error(data.message || 'Could not load registrations.')
      setRecords(data.registrations || [])
      setAuthenticated(true)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setAuthenticated(false)
      setRecords([])
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return records
    return records.filter(row => columns.some(key => String(row[key] ?? '').toLowerCase().includes(q)))
  }, [records, search])

  return (
    <section style={{ minHeight:'70vh', background:'#F8F9FA', padding:'64px 20px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <p style={{ color:'#4285F4', fontSize:12, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' }}>ZGDC–CASPAM</p>
        <h1 style={{ fontSize:'clamp(28px,4vw,40px)', margin:'8px 0 10px' }}>Registration Admin</h1>
        <p style={{ color:'#5F6368', marginBottom:28 }}>Private access to event registration records.</p>

        {!authenticated && (
          <form onSubmit={loadRecords} style={{ background:'#fff', border:'1px solid #E8EAED', borderRadius:16, padding:24, maxWidth:480 }}>
            <label htmlFor="admin-password" style={{ display:'block', fontWeight:600, color:'#202124', marginBottom:8 }}>Admin password</label>
            <input id="admin-password" type="password" autoComplete="current-password" value={password}
              onChange={e=>setPassword(e.target.value)} required
              style={{ width:'100%', padding:'12px 14px', border:'1px solid #DADCE0', borderRadius:9, fontSize:15, marginBottom:14 }} />
            <button disabled={loading} className="btn btn-primary" type="submit">{loading ? 'Checking…' : 'Open registrations'}</button>
          </form>
        )}

        {error && <p role="alert" style={{ color:'#C5221F', marginTop:16 }}>{error}</p>}

        {authenticated && (
          <div style={{ background:'#fff', border:'1px solid #E8EAED', borderRadius:16, padding:20, marginTop:22 }}>
            <div style={{ display:'flex', gap:12, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', marginBottom:18 }}>
              <div>
                <h2 style={{ fontSize:20 }}>Registrations</h2>
                <p style={{ color:'#5F6368', fontSize:14 }}>{filtered.length} shown · {records.length} total</p>
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button className="btn btn-primary" onClick={()=>downloadCsv(filtered)} disabled={!filtered.length}>Export Excel-compatible CSV</button>
                <button className="btn btn-ghost" onClick={()=>{setAuthenticated(false);setRecords([]);setPassword('')}}>Log out</button>
              </div>
            </div>
            <input aria-label="Search registrations" placeholder="Search name, email, roll number, department…" value={search}
              onChange={e=>setSearch(e.target.value)}
              style={{ width:'100%', padding:'11px 13px', border:'1px solid #DADCE0', borderRadius:9, marginBottom:16, fontSize:14 }} />
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, textAlign:'left', whiteSpace:'nowrap' }}>
                <thead><tr>{columns.map(key=><th key={key} style={{ padding:'11px 10px', background:'#F8F9FA', borderBottom:'1px solid #E8EAED', color:'#5F6368', textTransform:'capitalize' }}>{key === 'createdAt' ? 'Registered at' : key}</th>)}</tr></thead>
                <tbody>
                  {filtered.map((row,index)=><tr key={row.email || index}>{columns.map(key=><td key={key} style={{ padding:'11px 10px', borderBottom:'1px solid #F1F3F4', color:'#202124' }}>{row[key] ?? '—'}</td>)}</tr>)}
                  {!filtered.length && <tr><td colSpan={columns.length} style={{ padding:24, textAlign:'center', color:'#5F6368' }}>No matching registrations found.</td></tr>}
                </tbody>
              </table>
            </div>
            <p style={{ color:'#80868B', fontSize:12, marginTop:14 }}>Keep this page and exported files private because they contain students’ personal information.</p>
          </div>
        )}
      </div>
    </section>
  )
}
