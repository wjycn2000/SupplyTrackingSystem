import { useEffect, useState, useMemo } from 'react'
import api from '../api/client'
import ItemModal from '../components/ItemModal'

export default function Items() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  async function load() {
    try {
      const r = await api.get('/api/items')
      setItems(r.data)
    } catch {
      setError('Failed to load items.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openAdd() { setEditing(null); setModalOpen(true) }
  function openEdit(item) { setEditing(item); setModalOpen(true) }
  function closeModal() { setModalOpen(false); setEditing(null) }

  async function handleSave(form) {
    try {
      if (editing) {
        await api.put(`/api/items/${editing.id}`, form)
      } else {
        await api.post('/api/items', form)
      }
      closeModal()
      load()
    } catch {
      setError('Failed to save item.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this item?')) return
    try {
      await api.delete(`/api/items/${id}`)
      load()
    } catch {
      setError('Failed to delete item.')
    }
  }

  const categories = useMemo(() => {
    return [...new Set(items.map(i => i.category).filter(Boolean))].sort()
  }, [items])

  const filtered = useMemo(() => {
    return items.filter(item => {
      if (categoryFilter && item.category !== categoryFilter) return false
      if (search) {
        const term = search.toLowerCase()
        if (
          !item.name.toLowerCase().includes(term) &&
          !(item.description || '').toLowerCase().includes(term)
        ) return false
      }
      return true
    })
  }, [items, search, categoryFilter])

  function isLowStock(item) {
    return item.min_quantity > 0 && item.quantity <= item.min_quantity
  }

  return (
    <>
      <div className="page-header">
        <h1>Items</h1>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Item</button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="filters">
        <input
          className="filter-input"
          placeholder="Search by name or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No items found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className={isLowStock(item) ? 'row-low-stock' : ''}>
                  <td>
                    <strong>{item.name}</strong>
                    {item.description && <div style={{fontSize:'0.8rem',color:'#94a3b8'}}>{item.description}</div>}
                  </td>
                  <td>{item.category || '—'}</td>
                  <td>
                    {item.quantity}
                    {isLowStock(item) && <span className="low-stock-badge">Low</span>}
                  </td>
                  <td>{item.unit || '—'}</td>
                  <td>{item.supplier ? item.supplier.name : '—'}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary" onClick={() => openEdit(item)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <ItemModal item={editing} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  )
}
