import Image from "next/image";
import Link from "next/link";

export default function CountryCard({
  name,
  ptName,
  flag,
  flagAlt
}: {
  name: string ,
  ptName: string ,
  flag: string ,
  flagAlt?: string | undefined
}) {
  return (
    <Link href={`/pais/${name}`} key={name}>
      <article
        className="h-64 min-w-full bg-zinc-50 border-2 rounded-xl p-2 hover:border-indigo-200 transition-all hover:shadow-xl"
      >
        <figure className="relative w-full h-32 p-2 overflow-hidden rounded-xl shadow">
          <Image
            className="object-cover"
            src={flag}
            alt={flagAlt ? flagAlt : "Imagem" }
            fill
          />
        </figure>
        <p className="font-bold text-lg text-center mt-1">{ptName}</p>
      </article>
    </Link>
  )
}