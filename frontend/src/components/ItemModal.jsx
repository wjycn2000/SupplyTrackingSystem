import { useState, useEffect } from 'react'
import api from '../api/client'

const EMPTY = { name: '', description: '', category: '', quantity: 0, unit: '', supplier_id: null, min_quantity: 0 }

export default function ItemModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [suppliers, setSuppliers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setForm(item ? { ...item, supplier_id: item.supplier_id ?? null } : EMPTY)
  }, [item])

  useEffect(() => {
    api.get('/api/suppliers').then(r => setSuppliers(r.data)).catch(() => {})
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'quantity' || name === 'min_quantity') {
      setForm(f => ({ ...f, [name]: Number(value) }))
    } else if (name === 'supplier_id') {
      setForm(f => ({ ...f, supplier_id: value === '' ? null : Number(value) }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) { setError('Name is required.'); return }
    onSave(form)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{item ? 'Edit Item' : 'Add Item'}</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} autoFocus />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input name="category" value={form.category || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Min Quantity (low stock threshold)</label>
            <input type="number" name="min_quantity" value={form.min_quantity} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input name="unit" value={form.unit || ''} onChange={handleChange} placeholder="e.g. pcs, kg, litre" />
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <select name="supplier_id" value={form.supplier_id ?? ''} onChange={handleChange}>
              <option value="">— None —</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
