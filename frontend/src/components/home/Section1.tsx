import React from 'react'
import { Phone } from 'lucide-react'

const Section1 = () => {
  return (
    <div className="flex items-center justify-between px-5 py-12 bg-base-100">
      <div className="max-w-[45%] ml-10">
        <h1 className="text-4xl font-bold mb-2 text-base-content leading-tight">
          Need repairs for your <br /> electronic gadgets?
        </h1>
        <p className="text-base-content mb-4 text-lg">
          We provide professional repair services <br /> for all your tech
          devices!
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-accent text-accent-content font-bold rounded hover:bg-accent-focus">
            Temukan Layanan Kami
          </button>
          <button className="flex items-center px-6 py-2 bg-transparent text-accent font-bold border-2 border-accent rounded hover:bg-accent hover:text-accent-content">
            Kontak
            <Phone className='ml-4'/>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center max-w-[50%]">
        <img
          src="/assets/home.png"
          alt="Electronic devices"
          className="w-full max-w-[500px] h-auto object-cover"
        />
      </div>
    </div>
  )
}

export default Section1
