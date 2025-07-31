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

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`http://localhost:5000/api/events?search=${debouncedSearch}`)
      const data = await res.json()
      setEvents(data)
    }
    fetchEvents()
  }, [debouncedSearch])

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Cari Event</h1>

      <input
        type="text"
        placeholder="Cari berdasarkan nama atau lokasi..."
        className="w-full border rounded p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">Tidak ada event ditemukan.</p>
        )}
      </div>
    </main>
  )
}
