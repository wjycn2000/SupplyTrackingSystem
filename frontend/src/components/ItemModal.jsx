import { useState, useEffect } from 'react'

const EMPTY = { name: '', description: '', category: '', quantity: 0, unit: '' }

export default function ItemModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState(null)

  useEffect(() => {
    setForm(item ? { ...item } : EMPTY)
  }, [item])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'quantity' ? Number(value) : value }))
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
            <label>Unit</label>
            <input name="unit" value={form.unit || ''} onChange={handleChange} placeholder="e.g. pcs, kg, litre" />
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
