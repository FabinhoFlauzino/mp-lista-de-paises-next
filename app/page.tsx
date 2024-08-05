import Image from "next/image"
import Link from "next/link"

export type Country = {
  name: {
    common: string
  }

  translations: {
    por: {
      common: string
    }
  }

  flags: {
    svg: string
    alt: string
  },

  capital:string
  region:string
  subregion:string
  population: number
  languages?:string

}

async function getCoubtries(): Promise<Country[]> {
  const response = await fetch(`https://restcountries.com/v3.1/all`)
  return response.json()
}

export default async function Home() {
  const countries = await getCoubtries()

  return (
    <section className="grid grid-cols-5 w-full container gap-2 mt-16">
      {countries.map((country) => (
        <Link href={`/pais/${country.name.common}`} key={country.name.common}>
          <article
            className="h-64 min-w-full bg-zinc-50 border-2 rounded-xl p-2 hover:border-indigo-200 transition-all hover:shadow-xl"
          >
            <figure className="relative w-full h-32 p-2 overflow-hidden rounded-xl shadow">
              <Image
                className="object-cover"
                src={country.flags.svg}
                alt={country.flags.alt}
                fill
              />
            </figure>
            <p className="font-bold text-lg text-center mt-1">{country.translations.por.common}</p>
          </article>
        </Link>
      ))}
    </section>
  );
}
