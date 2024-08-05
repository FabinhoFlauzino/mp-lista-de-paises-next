'use client'
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

export default function Error() {
  return (
    <section className="flex flex-col container">
       <h1 className="text-center text-5xl font-bold my-16">
        Ops, ocorreu um erro ao exibir esse país!
       </h1>

       <Link href="/" className="flex items-center gap-2 mb-4">
        <RiArrowLeftLine width={24} height={24} />
        Voltar
      </Link>
    </section>
  )
}