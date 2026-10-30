import { useState } from 'react'
import StatusRing from './components/StatusRing.tsx'
import TicketFilters, {
  type PriorityFilter,
  type StatusFilter,
} from './components/TicketFilters.tsx'
import TicketList from './components/TicketList.tsx'
import { tickets } from './data/tickets.ts'

export default function App() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [priority, setPriority] = useState<PriorityFilter>('all')

  const normalizedSearch = search.trim().toLowerCase()
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      normalizedSearch === '' ||
      ticket.title.toLowerCase().includes(normalizedSearch) ||
      ticket.requester.toLowerCase().includes(normalizedSearch)
    const matchesStatus = status === 'all' || ticket.status === status
    const matchesPriority = priority === 'all' || ticket.priority === priority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const clearFilters = () => {
    setSearch('')
    setStatus('all')
    setPriority('all')
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>SupportFlow</h1>
        <p>Track and triage customer support tickets.</p>
      </header>
      <StatusRing />
      <main>
        <TicketFilters
          search={search}
          status={status}
          priority={priority}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onClear={clearFilters}
        />
        <p className="result-count" data-testid="result-count">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </p>
        {filteredTickets.length > 0 ? (
          <TicketList tickets={filteredTickets} />
        ) : (
          <p className="empty">No tickets match your filters.</p>
        )}
      </main>
    </div>
  )
}
