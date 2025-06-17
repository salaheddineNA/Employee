import { prisma } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  // Récupérer tous les employés, sans limite
  const employees = await prisma.employee.findMany({
    orderBy: { hiredAt: "desc" },
  })

  const totalEmployees = await prisma.employee.count()
  const newHires = await prisma.employee.count({
    where: {
      hiredAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
  })
  const avgSalary = await prisma.employee.aggregate({
    _avg: { salary: true },
  })

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "New Hires",
      value: newHires.toString(),
      change: "+8%",
      changeType: "positive" as const,
      icon: UserPlus,
    },
    {
      title: "Average Salary",
      value: `$${(avgSalary._avg.salary || 0).toFixed(0)}`,
      change: "+5.2%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Retention Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-orange-50">
      <main className="flex-1 space-y-10 px-8 py-10">
        <Card className="shadow-lg border border-orange-100 rounded-3xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Employees</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              List of all employees in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      {employee.department || "N/A"}
                    </Badge>
                    <Badge variant="outline">{employee.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            {/* Le bouton "View All Employees" a été supprimé */}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
