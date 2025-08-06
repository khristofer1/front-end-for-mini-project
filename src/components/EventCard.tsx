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
    <Link href={`/events/${id}`} className="block border rounded-lg p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-500">{location}</p>
      <p className="text-gray-500">{date} | {time}</p>
      <p className="text-blue-600 font-bold">
        {price > 0 ? `Rp ${price.toLocaleString()}` : 'Gratis'}
      </p>
    </Link>
  )
}
