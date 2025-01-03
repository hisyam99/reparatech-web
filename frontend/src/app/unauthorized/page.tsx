// app/unauthorized/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Lock, ShieldX, AlertTriangle } from 'lucide-react'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            {/* Animated Icon Section */}
            <div className="relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                  <Lock className="w-16 h-16 text-error" />
                </div>
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20">
                <ShieldX className="w-24 h-24 text-error" />
              </div>
            </div>

            {/* Content Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-error mb-2">
                Akses Ditolak!
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <p className="text-warning font-semibold">401 Unauthorized</p>
              </div>
              <p className="text-base-content/80 mb-6">
                Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
                Silakan hubungi administrator jika Anda yakin ini adalah
                kesalahan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push('/')}
                  className="btn btn-primary w-full">
                  Kembali ke Beranda
                </button>
                <button
                  onClick={() => router.back()}
                  className="btn btn-outline btn-neutral w-full">
                  Kembali ke Halaman Sebelumnya
                </button>
              </div>

              {/* Help Section */}
              <div className="divider mt-6">Butuh Bantuan?</div>
              <div className="text-sm text-base-content/70">
                <p>Hubungi tim support kami di:</p>
                <a
                  href="mailto:support@example.com"
                  className="link link-primary">
                  support@reparatech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
