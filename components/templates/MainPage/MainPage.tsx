'use client'
import Categories from "@/components/modules/MainPage/Categories/Categories"
import Hero from "@/components/modules/MainPage/Hero/Hero"
import { useGate } from "effector-react"
import { MainPageGate } from '@/context/goods'
import BestsellerGoods from "@/components/modules/MainPage/BestsellerGoods"

const MainPage = () => {
  useGate(MainPageGate)
  return (
    <main>
      <Hero />
      <Categories />
      <BestsellerGoods />
    </main>
  )
}

export default MainPage
