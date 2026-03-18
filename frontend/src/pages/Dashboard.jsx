import { useEffect, useState } from 'react'
import api from '../api/client'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/api/dashboard')
      .then(r => setStats(r.data))
      .catch(() => setError('Failed to load dashboard data.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error-msg">{error}</div>

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>
      <div className="cards">
        <div className="card blue">
          <div className="card-label">Total Item Types</div>
          <div className="card-value">{stats.total_item_types}</div>
        </div>
        <div className="card green">
          <div className="card-label">Total Suppliers</div>
          <div className="card-value">{stats.total_suppliers}</div>
        </div>
        <div className="card purple">
          <div className="card-label">Total Quantity in Stock</div>
          <div className="card-value">{stats.total_quantity}</div>
        </div>
      </div>
    </>
  )
}
