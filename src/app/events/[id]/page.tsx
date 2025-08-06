'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type Event = {
  id: string
  name: string
  location: string
  date: string
  time: string
  price: number
  description: string
}

export default function EventDetailsPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${params.id}`)
        const data = await res.json()
        setEvent(data)
      } catch (error) {
        console.error('Failed to fetch event details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  if (loading) {
    return <p className="text-center mt-8">Loading event details...</p>
  }

  if (!event) {
    return <p className="text-center mt-8">Event tidak ditemukan.</p>
  }

  return (
    <main className="p-6 md:p-10 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

      <div className="flex items-center gap-6 mb-4 text-gray-600">
        <p>📍 {event.location}</p>
        <p>📅 {event.date}</p>
        <p>⏰ {event.time}</p>
      </div>

      <p className="text-lg font-semibold text-blue-600 mb-6">
        {event.price > 0 ? `Rp ${event.price.toLocaleString()}` : 'Gratis'}
      </p>

      <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

      <div className="flex justify-between mt-6">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Kembali ke Daftar Event
        </Link>
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          Beli Tiket
        </button>
      </div>
    </main>
  )
}
