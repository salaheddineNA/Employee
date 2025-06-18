import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowLeft, Edit, Mail, Phone, Calendar, DollarSign, Building, User, CreditCard, Circle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"

const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-orange-100 text-orange-800 border-orange-200"
        case "inactive":
            return "bg-yellow-100 text-yellow-800"
        case "terminated":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export default async function EmployeeDetailsPage({ params }: { params: { id: string } }) {
    const employee = await prisma.employee.findUnique({
        where: { id: Number(params.id) },
    })

    if (!employee) {
        notFound()
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Profile Header */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-6">
                                {employee.photoUrl ? (
                                    <img
                                        src={employee.photoUrl}
                                        alt={`${employee.firstName} ${employee.lastName}`}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                        {employee.firstName[0]}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold">
                                            {employee.firstName} {employee.lastName}
                                        </h2>
                                        <Badge className={getStatusColor(employee.status) + " flex items-center gap-1"}>
                                            <Circle className="h-3 w-3 fill-orange-500 text-orange-500" />
                                            {employee.status}
                                        </Badge>
                                    </div>
                                    <p className="text-lg text-muted-foreground mb-1">{employee.position}</p>
                                    <p className="text-sm text-muted-foreground">{employee.department} Department</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-orange-600" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{employee.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Phone</p>
                                        <p className="font-medium">{employee.phoneNumber || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CreditCard className="h-4 w-4 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">ID Card Number</p>
                                        <p className="font-medium">{employee.idCardNumber}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Employment Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-orange-600" />
                                    Employment Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Position</p>
                                        <p className="font-medium">{employee.position}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building className="h-4 w-4 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Department</p>
                                        <p className="font-medium">{employee.department || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-4 w-4 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Salary</p>
                                        <p className="font-medium">${employee.salary.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Hired Date</p>
                                        <p className="font-medium">{formatDate(employee.hiredAt)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Notes */}
                    {employee.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notes</CardTitle>
                                <CardDescription>Internal notes and comments</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed">{employee.notes}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>System Information</CardTitle>
                            <CardDescription>Record creation and modification details</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">Created At</p>
                                <p className="font-medium">{formatDate(employee.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Last Updated</p>
                                <p className="font-medium">{formatDate(employee.updatedAt)}</p>
                            </div>
                        </CardContent>
                        <div className="flex justify-center pb-6">
                            <Button
                                asChild
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                <Link href={`/employees/employee/${employee.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4 text-white" />
                                    Edit Employee
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}