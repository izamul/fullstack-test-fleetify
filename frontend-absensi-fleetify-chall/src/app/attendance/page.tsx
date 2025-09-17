"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Clock, Users } from "lucide-react";

import AttendanceDashboard from "@/components/attendance/AttendanceDashboard";
import DepartmentManagement from "@/components/departments/DepartmentsManagement";
import EmployeeManagement from "@/components/employees/EmployeeManagement";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import type { Departement, Employee } from "@/components/attendance/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export default function AttendancePage() {
    const [departements, setDepartements] = useState<Departement[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [activeTab, setActiveTab] = useState("dashboard");

    const loadData = async () => {
        try {
            const [deptRes, empRes] = await Promise.all([
                fetch(`${API_BASE}/departements`),
                fetch(`${API_BASE}/employees`),
            ]);

            const deptJson = await deptRes.json();
            const empJson = await empRes.json();

            setDepartements(Array.isArray(deptJson) ? deptJson : deptJson.data ?? []);
            setEmployees(Array.isArray(empJson) ? empJson : empJson.data ?? []);
        } catch (e) {
            console.error("Failed to load data:", e);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50">

            <Header />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto p-6 h-full flex flex-col">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full flex-1 flex flex-col"
                    >
                        <TabsList className="w-full flex overflow-x-auto scrollbar-hide space-x-2">
                            <TabsTrigger
                                value="dashboard"
                                className="flex items-center gap-2 whitespace-nowrap"
                            >
                                <Clock className="h-4 w-4 shrink-0" />
                                Dashboard Absensi
                            </TabsTrigger>
                            <TabsTrigger
                                value="employees"
                                className="flex items-center gap-2 whitespace-nowrap"
                            >
                                <Users className="h-4 w-4 shrink-0" />
                                Kelola Karyawan
                            </TabsTrigger>
                            <TabsTrigger
                                value="departments"
                                className="flex items-center gap-2 whitespace-nowrap"
                            >
                                <Building2 className="h-4 w-4 shrink-0" />
                                Kelola Departemen
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex-1">
                            <TabsContent value="dashboard" className="h-full space-y-6">
                                <AttendanceDashboard
                                    departements={departements}
                                    employees={employees}
                                    loadLogs={loadData}
                                />
                            </TabsContent>

                            <TabsContent value="employees" className="h-full space-y-6">
                                <EmployeeManagement
                                    employees={employees}
                                    setEmployees={setEmployees}
                                    departements={departements}
                                />
                            </TabsContent>

                            <TabsContent value="departments" className="h-full space-y-6">
                                <DepartmentManagement
                                    departements={departements}
                                    setDepartements={setDepartements}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </main>

            {/* ✅ pakai Footer modular */}
            <Footer />
        </div>
    );
}
