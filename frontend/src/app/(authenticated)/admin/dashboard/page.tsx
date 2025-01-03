import React from 'react'

const DashboardPageAdmin = () => {
  return (
    <div className="p-4 bg-base-100">
      <div className="container mx-auto">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <p className="text-lg font-semibold text-base-content">
              {`You're logged in as admin!`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPageAdmin
