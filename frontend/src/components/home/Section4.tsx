import React from 'react'

const Section4 = () => {
  return (
    <div className="w-full py-12 bg-accent/10 text-center">
      <h2 className="text-xl font-bold mb-5 text-base-content">
        Testimoni Pelanggan
      </h2>
      <p className="text-base-content mb-10">
        Apa kata mereka tentang layanan ReparaTech
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 max-w-[800px] mx-auto">
        {[1, 2, 3, 4].map(num => (
          <div
            key={num}
            className="bg-base-100 border rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src="/assets/testimoni.png"
                alt={`Pelanggan ${num}`}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-sm font-bold text-base-content">
                  Pelanggan {num}
                </h3>
                <p className="text-xs text-base-content/60">Location</p>
              </div>
            </div>
            <p className="text-sm text-base-content">
              "Testimonial content here"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section4
