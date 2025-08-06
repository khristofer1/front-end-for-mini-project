import Link from 'next/link'

type EventCardProps = {
  id: string
  name: string
  location: string
  date: string
  time: string
  price: number
}

export default function EventCard({ id, name, location, date, time, price }: EventCardProps) {
  return (
    <Link href={`/events/${id}`}>
      <div className="border rounded p-4 hover:shadow-lg cursor-pointer">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">📍 {location}</p>
        <p className="text-gray-600">🕒 {date} {time}</p>
        <p className="text-lg">{price === 0 ? 'Gratis' : `Rp ${price.toLocaleString()}`}</p>
      </div>
    </Link>
  )
}
