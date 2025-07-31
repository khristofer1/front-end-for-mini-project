// src/components/EventCard.tsx
type EventCardProps = {
  name: string
  location: string
  date: string
  time: string
  price: number
}

export default function EventCard({
  name,
  location,
  date,
  time,
  price,
}: EventCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm space-y-2">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-600">
        📍 {location} | 🕒 {date} {time}
      </p>
      <p className="text-lg">
        {price === 0 ? 'Gratis' : `Rp ${price.toLocaleString('id-ID')}`}
      </p>
      <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
        Lihat Detail
      </button>
    </div>
  )
}
