import type { Country } from "@/app/page"
import CountryCard from "@/components/country-cards"
import Image from "next/image"
import Link from "next/link"
import { RiArrowLeftLine } from "react-icons/ri"

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(`https://restcountries.com/v3.1/all`)
  const countries: Country[] = await response.json()
  return countries.find((country: Country) => country.name.common === name)!
}

async function getCountryBordersByName(name: string) {
  const response = await fetch(`https://restcountries.com/v3.1/all`)
  const countries: Country[] = await response.json()
  const country = countries.find((country: Country) => country.name.common === name)!

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border)
    return {
      name: borderCountry?.name.common,
      ptName: borderCountry?.translations.por.common,
      flag: borderCountry?.flags.svg,
      FlagAlt: borderCountry?.flags.alt
    }
  })
}

export default async function CountryPage({ params: { name } }: { params: { name: string } }) {
  const country = await getCountryByName(decodeURI(name))
  const borderCountries = await getCountryBordersByName(decodeURI(name))

  const formatter = Intl.NumberFormat("en", {
    notation: "compact"
  })

  return (
    <section className="flex flex-col container text-zinc-800 p-4">
      <h1 className="text-center text-5xl font-bold my-16">{country.name.common}</h1>

      <Link href="/" className="flex items-center gap-2 mb-4">
        <RiArrowLeftLine width={24} height={24} />
        Voltar
      </Link>

      <article className="flex flex-col md:flex-row gap-10 items-center justify-between min-w-full p-4 md:p-10 bg-white rounded-xl">
        <section>
          {country.capital && <h2 className="text-xl"><span className="font-bold">🏙️ Capital: </span>{country.capital}</h2>}
          <h2 className="text-xl"><span className="font-bold">🗺️ Continente: </span>{country.region} {country.subregion && `- ${country.subregion}`}</h2>
          <h2 className="text-xl"><span className="font-bold">👨‍👩‍👧‍👦 População: </span>{formatter.format(country.population)}</h2>
          {country.languages && <h2 className="text-xl"><span className="font-bold block">🗣️ Línguas faladas: </span> {Object.values(country.languages).map((language, index) => (
            <span key={index} className="inline-block p-1 bg-indigo-700 mr-2 text-white text-sm rounded-full">{language}</span>
          ))}</h2>}
        </section>

        <div className="relative h-48 md:h-52 w-full md:w-96 rounded-xl overflow-hidden shadow-xl border border-zinc-400 order-first md:order-last">
          <Image src={country.flags.svg} alt={country.flags.alt} fill className="object-cover" />
        </div>
      </article>

      <section>
        <h3 className="mt-12 text-2xl font-semibold">Países que fazem fronteira</h3>

        {borderCountries && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 my-10">
          {borderCountries.map((border, index) => (
            <CountryCard key={index}
              {...border}
            />
          ))}
        </div>}
      </section>
    </section>
  )
}