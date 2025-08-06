'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Event = {
  id: string
  name: string
  location: string
  date: string
  time: string
  price: number
  description: string
}

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`)
        const data = await res.json()
        setEvent(data)
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchEvent()
  }, [id])

  if (loading) return <p className="p-4">Loading...</p>
  if (!event) return <p className="p-4">Event tidak ditemukan</p>

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-600 mb-2">Lokasi: {event.location}</p>
      <p className="text-gray-600 mb-2">Tanggal: {event.date}</p>
      <p className="text-gray-600 mb-2">Waktu: {event.time}</p>
      <p className="text-gray-800 mb-4">
        Harga: {event.price === 0 ? 'Gratis' : `Rp ${event.price.toLocaleString()}`}
      </p>
      <p>{event.description}</p>
    </main>
  )
}
