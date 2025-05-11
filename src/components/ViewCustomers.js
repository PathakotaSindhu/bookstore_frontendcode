import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function ViewCustomers() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/books/allusers')
        setUsers(res.data)
      } catch (err) {
        setError('Failed to fetch users. Please try again.')
      }
    }

    fetchUsers()
  }, [])

  // Filter out admin users
  const filteredUsers = users.filter(user => user.role !== 'ADMIN')

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">👥 Registered Users</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 border border-gray-300">Id</th>
                  <th className="p-3 border border-gray-300">Full Name</th>
                  <th className="p-3 border border-gray-300">Email</th>
                  <th className="p-3 border border-gray-300">Address</th>
                  <th className="p-3 border border-gray-300">City</th>
                  {/* <th className="p-3 border border-gray-300">Role</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-300">{index + 1}</td>
                    <td className="p-3 border border-gray-300">{user.fullName}</td>
                    <td className="p-3 border border-gray-300">{user.email}</td>
                    <td className="p-3 border border-gray-300">{user.address}</td>
                    <td className="p-3 border border-gray-300">{user.city}</td>
                    {/* <td className="p-3 border border-gray-300">{user.role}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
