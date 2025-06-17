"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LoaderPinwheel, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function NewEmployeePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    idCardNumber: "",
    position: "",
    department: "",
    salary: "",
    status: "active",
    notes: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create employee")
      }

      toast.success("Employee created successfully!")
      router.push("/employees")
    } catch (err: any) {
      toast.error(err.message || "Failed to create employee")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6">
        <div>
          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card className="w-[100%] mx-auto border border-orange-500 bg-orange-50 shadow-md">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic employee details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      className="w-full"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      className="w-full"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-full"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    className="w-full"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idCardNumber">ID Card Number</Label>
                  <Input
                    id="idCardNumber"
                    className="w-full"
                    value={formData.idCardNumber}
                    onChange={(e) => handleInputChange("idCardNumber", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card className="w-[100%] mx-auto border border-orange-500 bg-orange-50 shadow-md">
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
                <CardDescription>Job-related details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    className="w-full"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleInputChange("department", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    className="w-full"
                    value={formData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="w-[100%] mx-auto border border-orange-500 bg-orange-50 shadow-md">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Notes and comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    className="w-full"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Internal notes about the employee..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 w-[80%] mx-auto">
              <Button
                type="button"
                variant="outline"
                asChild
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                <Link href="/employees">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLoading ? (
                  <LoaderPinwheel className="text-white animate-spin" />
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Employee
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
