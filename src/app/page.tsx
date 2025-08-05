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

  useEffect(() => {
    const fetchEvents = async () => {
      const query = new URLSearchParams({
        search: debouncedSearch,
        category,
        location,
        page: page.toString(),
        limit: limit.toString(),
      })

      const res = await fetch(`http://localhost:5000/api/events?${query.toString()}`)
      const data = await res.json()
      setEvents(data)
      setHasMore(data.length === limit)
    }

    fetchEvents()
  }, [debouncedSearch, category, location, page])

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Cari Event</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau lokasi..."
          className="flex-1 border rounded p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          <option value="music">🎵 Music</option>
          <option value="technology">💻 Technology</option>
          <option value="education">📚 Education</option>
        </select>

        <select
          className="border rounded p-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Semua Lokasi</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
          <option value="Surabaya">Surabaya</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">Tidak ada event ditemukan.</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="py-2">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </main>
  )
}
