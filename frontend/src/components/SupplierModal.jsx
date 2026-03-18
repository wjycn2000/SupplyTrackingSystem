import { useState, useEffect } from 'react'

const EMPTY = { name: '', contact_person: '', email: '', phone: '', address: '' }

export default function SupplierModal({ supplier, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState(null)

  useEffect(() => {
    setForm(supplier ? { ...supplier } : EMPTY)
  }, [supplier])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) { setError('Name is required.'); return }
    onSave(form)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{supplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} autoFocus />
          </div>
          <div className="form-group">
            <label>Contact Person</label>
            <input name="contact_person" value={form.contact_person || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={form.phone || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea name="address" value={form.address || ''} onChange={handleChange} />
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
