'use client'

import { useEffect, useState } from 'react'
import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { ServiceList } from '@/components/service/ServiceList'
import { ServiceOrder } from '@/types/serviceOrder'
import { ServiceData } from '@/types/Service'

export default function Dashboard() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])
  const [services, setServices] = useState<ServiceData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [ordersRes, servicesRes] = await Promise.all([
          fetch('/api/service-orders'),
          fetch('/api/services'),
        ])

        const ordersData = await ordersRes.json()
        const servicesData = await servicesRes.json()

        setOrders(ordersData)
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalOrders = orders.length
  const totalServices = services.length

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-primary text-primary-content shadow-sm">
          <div className="card-body">
            <h2 className="text-lg font-bold">Total Orders</h2>
            <p className="text-4xl font-bold">{totalOrders}</p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-sm">
          <div className="card-body">
            <h2 className="text-lg font-bold">Total Services</h2>
            <p className="text-4xl font-bold">{totalServices}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <ServiceOrderList orders={orders.slice(0, 5)} isLoading={isLoading} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Services</h2>
        <ServiceList
          services={services.slice(0, 5)}
          onDelete={id => console.log(`Delete service with id: ${id}`)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
