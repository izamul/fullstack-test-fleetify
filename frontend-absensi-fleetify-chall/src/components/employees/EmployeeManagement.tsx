"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Edit, Trash2, Building2, Home, UserPlus, Loader2 } from "lucide-react";
import type { Employee, Departement } from "@/components/attendance/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export default function EmployeeManagement({
    employees,
    setEmployees,
    departements,
}: {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    departements: Departement[];
}) {
    const [formOpen, setFormOpen] = useState(false);
    const [editingEmp, setEditingEmp] = useState<Employee | null>(null);
    const [form, setForm] = useState({
        employee_id: "",
        name: "",
        departement_id: "",
        address: "",
    });
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setForm({ employee_id: "", name: "", departement_id: "", address: "" });
        setEditingEmp(null);
    };

    const openForm = (emp?: Employee) => {
        if (emp) {
            setEditingEmp(emp);
            setForm({
                employee_id: emp.employee_id,
                name: emp.name,
                departement_id: String(emp.departement_id),
                address: emp.address || "",
            });
        } else {
            resetForm();
        }
        setFormOpen(true);
    };

    const handleSubmit = async () => {
        if (!form.employee_id || !form.name || !form.departement_id) {
            alert("Field Employee ID, Nama, dan Departemen harus diisi!");
            return;
        }

        setLoading(true);
        try {
            const payload = { ...form, departement_id: parseInt(form.departement_id) };
            const url = editingEmp ? `${API_BASE}/employees/${editingEmp.id}` : `${API_BASE}/employees`;
            const method = editingEmp ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const data = await res.json();
                if (editingEmp) {
                    setEmployees((prev) => prev.map((e) => (e.id === editingEmp.id ? { ...e, ...payload } : e)));
                } else {
                    setEmployees((prev) => [...prev, data]);
                }
                setFormOpen(false);
                resetForm();
                alert("Berhasil menyimpan karyawan!");
            } else {
                const error = await res.json();
                alert("Gagal menyimpan karyawan: " + (error.message || "Unknown error"));
            }
        } catch (e) {
            alert("Error: " + e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus karyawan ini?")) return;

        try {
            const res = await fetch(`${API_BASE}/employees/${id}`, { method: "DELETE" });
            if (res.ok) {
                setEmployees((prev) => prev.filter((e) => e.id !== id));
                alert("Karyawan berhasil dihapus!");
            } else {
                alert("Gagal menghapus karyawan");
            }
        } catch (e) {
            alert("Error: " + e);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manajemen Karyawan</h2>
                <Button onClick={() => openForm()} className="gap-2">
                    <UserPlus className="h-4 w-4" /> Tambah Karyawan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((emp) => {
                    const dept = departements.find((d) => d.id === emp.departement_id);
                    return (
                        <Card key={emp.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {emp.name.charAt(0).toUpperCase()}
                                    </div>
                                    {emp.name}
                                </CardTitle>
                                <CardDescription>ID: {emp.employee_id}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Building2 className="h-4 w-4 text-blue-600" />
                                    <span>{dept?.departement_name || "Unknown Department"}</span>
                                </div>
                                {emp.address && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Home className="h-4 w-4" />
                                        <span className="truncate">{emp.address}</span>
                                    </div>
                                )}
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" onClick={() => openForm(emp)} className="flex-1">
                                        <Edit className="h-4 w-4 mr-1" /> Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(emp.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingEmp ? "Edit Karyawan" : "Tambah Karyawan Baru"}</DialogTitle>
                        <DialogDescription>Isi informasi lengkap karyawan.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Employee ID</Label>
                            <Input placeholder="Contoh: EMP001" value={form.employee_id} onChange={(e) => setForm((prev) => ({ ...prev, employee_id: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Nama Lengkap</Label>
                            <Input placeholder="Masukkan nama lengkap" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Departemen</Label>
                            <Select value={form.departement_id} onValueChange={(value) => setForm((prev) => ({ ...prev, departement_id: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih departemen" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departements.map((dept) => (
                                        <SelectItem key={dept.id} value={String(dept.id)}>
                                            {dept.departement_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Alamat (Opsional)</Label>
                            <Input placeholder="Masukkan alamat" value={form.address} onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setFormOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                            {editingEmp ? "Update" : "Simpan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
