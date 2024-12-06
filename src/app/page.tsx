import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
}
export default function HomePage() {
  return (
    <div className="w-screen flex flex-col justify-center items-center min-h-[calc(100vh-200px)] cards-effect relative">
      <div className="cards-effect absolute top-0 left-0 w-full h-full"></div>
      <div className="flex flex-col items-center justify-end z-10 h-[80vh]">
        <h1 className="text-[13vw] text-custom font-black">Gastronogeek</h1>
      </div>
    </div>
  )
}
