import React from 'react';

const Section3 = () => {
    return (
        <div className="w-full py-12 bg-white text-center">
            {/* Section 3: Layanan Kami */}
            <h2 className="text-xl font-bold mb-5 text-black">Layanan Kami</h2>
            <p className="text-black mb-10">
                Solusi lengkap untuk berbagai kebutuhan perbaikan gadget Anda
                dengan standar layanan profesional.
            </p>

            {/* Cards */}
            <div className="flex justify-center flex-wrap gap-6">
                {/* Card 1 */}
                <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                    <div className="flex justify-center mb-8">
                        {/* Tempat untuk Asset Gambar */}
                        <img
                            src="/assets/smartphone.png"
                            alt="Service Smartphone"
                            className="w-24 h-auto"
                        />
                    </div>
                    <h3 className="text-lg font-bold mb-6 text-black">
                        📱 Service Smartphone
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-black mb-4">
                        <li>Ganti LCD & Touchscreen</li>
                        <li>Perbaikan Hardware</li>
                        <li>Software & OS</li>
                        <li>Water Damage</li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                        Lihat Detail →
                    </button>
                </div>

                {/* Card 2 */}
                <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                    <div className="flex justify-center mb-4">
                        {/* Tempat untuk Asset Gambar */}
                        <img
                            src="/assets/laptop.png"
                            alt="Service Laptop"
                            className="w-25 h-auto"
                        />
                    </div>
                    <h3 className="text-lg font-bold mb-5 text-black">
                        💻 Service Laptop
                    </h3>
                    <ul className="list-disc pl-10 text-sm text-black mb-4">
                        <li>Perbaikan Motherboard</li>
                        <li>Upgrade Hardware</li>
                        <li>Install Ulang OS</li>
                        <li>Data Recovery</li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                        Lihat Detail →
                    </button>
                </div>

                {/* Card 3 */}
                <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                    <div className="flex justify-center mb-5">
                        {/* Tempat untuk Asset Gambar */}
                        <img
                            src="/assets/tablet.png"
                            alt="Service Tablet"
                            className="w-24 h-auto"
                        />
                    </div>
                    <h3 className="text-lg font-bold mb-5 text-black">
                        📱 Service Tablet
                    </h3>
                    <ul className="list-disc pl-12 text-sm text-black mb-5">
                        <li>Ganti LCD iPad</li>
                        <li>Perbaikan Charging</li>
                        <li>Upgrade Storage</li>
                        <li>Battery Replacement</li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                        Lihat Detail →
                    </button>
                </div>

                {/* Card 4 */}
                <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                    <div className="flex justify-center mb-2">
                        {/* Tempat untuk Asset Gambar */}
                        <img
                            src="/assets/aksesoris.png"
                            alt="Service Aksesoris"
                            className="w-25 h-auto"
                        />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-black">
                        🎧 Service Aksesoris
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-black mb-5">
                        <li>Headphone & TWS</li>
                        <li>Smartwatch</li>
                        <li>Power Bank</li>
                        <li>Game Console</li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                        Lihat Detail →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Section3;
