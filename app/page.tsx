"use client"

import Image from 'next/image'
import Button from './components/navigation/navbar/Button';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-between"> {/* New div for text box and image */}
          <div className="w-1/2"> {/* Text box on the left */}
            <h2 className="w-full h-32 p-2" style={{ color: '#0047ab', fontFamily:'Gilroy Extrabold'}}>Quadra en Privado, Quadra Seguro</h2>
            <Button onClick={() => {router.push('/search');}} text="Escríbele a QuadBot!" />
          </div>
          <div className="w-1/2">
            <Image src="/images/Casita.png" alt="Image description" width={500} height={300} />
          </div>
          </div>
      </div>
    </>
  );
}