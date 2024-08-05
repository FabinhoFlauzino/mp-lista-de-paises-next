import type { Country } from "@/app/page"
import Image from "next/image"
import Link from "next/link"
import { RiArrowLeftLine } from "react-icons/ri"

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  )
  const data = await response.json()
  return data[0]
}

export default async function CountryPage({ params: { name } }: { params: { name: string } }) {
  const country = await getCountryByName(name)

  const formatter = Intl.NumberFormat("en", {
    notation: "compact"
  })

  return (
    <section className="flex flex-col container text-zinc-800">
      <h1 className="text-center text-5xl font-bold my-16">{country.name.common}</h1>

      <Link href="/" className="flex items-center gap-2 mb-4">
        <RiArrowLeftLine width={24} height={24} />
        Voltar
      </Link>

      <article className="flex items-center justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country.capital && <h2 className="text-xl"><span className="font-bold">🏙️ Capital: </span>{country.capital}</h2>}
          <h2 className="text-xl"><span className="font-bold">🗺️ Continente: </span>{country.region} {country.subregion && `- ${country.subregion}`}</h2>
          <h2 className="text-xl"><span className="font-bold">👨‍👩‍👧‍👦 População: </span>{formatter.format(country.population)}</h2>
          {country.languages && <h2 className="text-xl"><span className="font-bold block">🗣️ Línguas faladas: </span> {Object.values(country.languages).map((language, index) => (
            <span key={index} className="inline-block p-1 bg-indigo-700 mr-2 text-white text-sm rounded-full">{language}</span>
          ))}</h2>}
        </section>

        <div className="relative h-52 w-52 shadow-md rounded-xl overflow-hidden">
          <Image src={country.flags.svg} alt={country.flags.alt} fill className="object-cover" />
        </div>
      </article>
    </section>
  )
}