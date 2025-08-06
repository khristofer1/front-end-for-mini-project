'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import EventCard from '@/components/EventCard'

type Event = {
  id: string
  name: string
  location: string
  date: string
  time: string
  price: number
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')

  const [page, setPage] = useState(1)
  const limit = 6

  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, category, location])

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      const query = new URLSearchParams({
        search: debouncedSearch,
        category,
        location,
        page: page.toString(),
        limit: limit.toString(),
      })

      const res = await fetch(`http://localhost:5000/api/events?${query.toString()}`)
      const data: Event[] = await res.json()
      setEvents(data)
      setHasMore(data.length === limit)
      setIsLoading(false)
    }

    fetchEvents()
  }, [debouncedSearch, category, location, page])

  return (
    <main className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Cari Event</h1>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau lokasi..."
          className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          <option value="music">🎵 Music</option>
          <option value="technology">💻 Technology</option>
          <option value="education">📚 Education</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Semua Lokasi</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
          <option value="Surabaya">Surabaya</option>
        </select>
      </div>

      {/* Event Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">Tidak ada event ditemukan.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isLoading}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="py-2">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore || isLoading}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  )
}
