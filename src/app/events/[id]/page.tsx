'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

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
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`)
        if (!res.ok) throw new Error('Event not found')
        const data = await res.json()
        setEvent(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading event details...</div>
    )
  }

  if (!event) {
    return (
      <div className="p-8 text-center text-red-500">Event not found.</div>
    )
  }

  return (
    <main className="p-4 md:p-8 max-w-xl mx-auto space-y-6">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Kembali
      </button>

      {/* Detail Event */}
      <h1 className="text-2xl md:text-3xl font-bold">{event.name}</h1>

      <div className="text-gray-600 space-y-1">
        <p><span className="font-medium">Tanggal:</span> {event.date}</p>
        <p><span className="font-medium">Waktu:</span> {event.time}</p>
        <p><span className="font-medium">Lokasi:</span> {event.location}</p>
        <p>
          <span className="font-medium">Harga:</span>{' '}
          {event.price > 0 ? `Rp ${event.price.toLocaleString()}` : 'Gratis'}
        </p>
      </div>

      <p className="text-gray-800 leading-relaxed">{event.description}</p>

      {/* Tombol Aksi */}
      <button
        className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
      >
        Daftar Sekarang
      </button>
    </main>
  )
}
