import type { TicketPriority, TicketStatus } from '../data/tickets.ts'

export type StatusFilter = TicketStatus | 'all'
export type PriorityFilter = TicketPriority | 'all'

interface TicketFiltersProps {
  search: string
  status: StatusFilter
  priority: PriorityFilter
  onSearchChange: (search: string) => void
  onStatusChange: (status: StatusFilter) => void
  onPriorityChange: (priority: PriorityFilter) => void
  onClear: () => void
}

export default function TicketFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onClear,
}: TicketFiltersProps) {
  return (
    <div className="filters">
      <label>
        Search tickets
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        Status
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>

      <label>
        Priority
        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as PriorityFilter)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <button type="button" onClick={onClear}>
        Clear filters
      </button>
    </div>
  )
}
