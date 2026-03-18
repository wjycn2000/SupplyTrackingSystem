import { useEffect, useState } from 'react'
import api from '../api/client'
import SupplierModal from '../components/SupplierModal'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  async function load() {
    try {
      const r = await api.get('/api/suppliers')
      setSuppliers(r.data)
    } catch {
      setError('Failed to load suppliers.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openAdd() { setEditing(null); setModalOpen(true) }
  function openEdit(s) { setEditing(s); setModalOpen(true) }
  function closeModal() { setModalOpen(false); setEditing(null) }

  async function handleSave(form) {
    try {
      if (editing) {
        await api.put(`/api/suppliers/${editing.id}`, form)
      } else {
        await api.post('/api/suppliers', form)
      }
      closeModal()
      load()
    } catch {
      setError('Failed to save supplier.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this supplier?')) return
    try {
      await api.delete(`/api/suppliers/${id}`)
      load()
    } catch {
      setError('Failed to delete supplier.')
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Suppliers</h1>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Supplier</button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="table-wrap">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : suppliers.length === 0 ? (
          <div className="empty-state">No suppliers yet. Add one to get started.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.contact_person || '—'}</td>
                  <td>{s.email || '—'}</td>
                  <td>{s.phone || '—'}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary" onClick={() => openEdit(s)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <SupplierModal supplier={editing} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  )
}
