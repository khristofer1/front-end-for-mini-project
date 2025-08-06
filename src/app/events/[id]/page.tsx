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
  const params = useParams()
  const id = params.id as string

  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`http://localhost:5000/api/events/${id}`)
      const data = await res.json()
      setEvent(data)
    }

    fetchEvent()
  }, [id])

  if (!event) {
    return <p className='p-8 text-gray-500'>Loading...</p>
  }

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600">
        📍 {event.location} | 🗓 {event.date} | ⏰ {event.time}
      </p>
      <p className="text-lg font-semibold">
        {event.price === 0 ? 'Gratis' : `Rp ${event.price.toLocaleString()}`}
      </p>
      <p>{event.description}</p>
    </main>
  )
}
