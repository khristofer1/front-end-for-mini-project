// src/app/events/[id]/page.tsx

type Params = {
  params: {
    id: string
  }
}

export default async function EventDetailPage({ params }: Params) {
  const res = await fetch(`http://localhost:5000/api/events/${params.id}`)

  if (!res.ok) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Event tidak ditemukan</h1>
        <p className="mt-2">Coba cek lagi ID event-nya.</p>
      </main>
    )
  }

  const event = await res.json()

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-4 border rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600">
        📍 {event.location} | 🗓️ {event.date} | 🕒 {event.time}
      </p>
      <p className="text-lg">
        {event.price === 0 ? 'Gratis' : `Rp ${event.price.toLocaleString('id-ID')}`}
      </p>
      <p className="text-justify">{event.description}</p>
      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Beli Tiket
      </button>
    </main>
  )
}
