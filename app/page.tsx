import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Footer } from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 flex-grow">
        <Hero />
      </div>
      <Footer />
    </main>
  )
}

