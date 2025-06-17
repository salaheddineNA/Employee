"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Plus, Edit, Eye, LoaderPinwheel } from "lucide-react"
import Link from "next/link"
import { DeleteEmployeeButton } from "@/AppComponents/DeleteEmployee"
import { Employees } from "../types/types"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employees[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/employees?query=${encodeURIComponent(searchTerm)}`)
        const data = await response.json()
        setEmployees(data)
      } catch (error) {
        console.error("Failed to fetch employees:", error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchEmployees()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-yellow-100 text-yellow-800"
      case "terminated": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="h-[100px] flex items-center px-6 bg-white shadow-md">
          <div className="w-full relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search employees by name..."
              className="pl-10 w-full h-12 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>


        {loading ? (
          <div className="text-center py-12">
            <div className="flex items-center justify-center h-full p-6">
              <LoaderPinwheel className="text-black animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2"> {/* 2 colonnes dès sm */}
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow border-0 rounded-2xl bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {employee.photoUrl ? (
                        <img
                          src={employee.photoUrl}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          {employee.firstName} {employee.lastName}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">{employee.position}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(employee.status)} rounded-full text-xs font-medium px-3 py-1`}>
                      {employee.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800">{employee.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-800">{employee.department || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="text-sm font-medium text-gray-800">${employee.salary?.toLocaleString() || 0}</p>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/employees/employee/${employee.id}`}>
                        <Eye className="mr-1 h-3 w-3" /> View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/employees/employee/${employee.id}/edit`}>
                        <Edit className="mr-1 h-3 w-3" /> Edit
                      </Link>
                    </Button>
                    <DeleteEmployeeButton id={employee.id} employeeName={`${employee.firstName} ${employee.lastName}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && employees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No matching employees found' : 'No employees found'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
