"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Building2, Loader2 } from "lucide-react";
import type { Departement } from "@/components/attendance/types";

const API_BASE = "http://127.0.0.1:8000/api";

export default function DepartmentsManagement({
    departements,
    setDepartements,
}: {
    departements: Departement[];
    setDepartements: React.Dispatch<React.SetStateAction<Departement[]>>;
}) {
    const [formOpen, setFormOpen] = useState(false);
    const [editingDept, setEditingDept] = useState<Departement | null>(null);
    const [form, setForm] = useState({
        departement_name: "",
        max_clock_in_time: "",
        max_clock_out_time: "",
    });
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setForm({
            departement_name: "",
            max_clock_in_time: "",
            max_clock_out_time: "",
        });
        setEditingDept(null);
    };

    const openForm = (dept?: Departement) => {
        if (dept) {
            setEditingDept(dept);
            setForm({
                departement_name: dept.departement_name,
                max_clock_in_time: dept.max_clock_in_time,
                max_clock_out_time: dept.max_clock_out_time,
            });
        } else {
            resetForm();
        }
        setFormOpen(true);
    };

    const handleSubmit = async () => {
        if (!form.departement_name || !form.max_clock_in_time || !form.max_clock_out_time) {
            alert("Semua field harus diisi!");
            return;
        }

        const toSeconds = (t: string) => {
            const [h, m, s] = t.split(":").map(Number);
            return h * 3600 + m * 60 + (s || 0);
        };

        if (toSeconds(form.max_clock_out_time) <= toSeconds(form.max_clock_in_time)) {
            alert("Jam keluar harus lebih besar dari jam masuk!");
            return;
        }

        setLoading(true);
        try {
            const url = editingDept ? `${API_BASE}/departements/${editingDept.id}` : `${API_BASE}/departements`;
            const method = editingDept ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                const data = await res.json();
                if (editingDept) {
                    setDepartements((prev) => prev.map((d) => (d.id === editingDept.id ? { ...d, ...form } : d)));
                } else {
                    setDepartements((prev) => [...prev, data]);
                }
                setFormOpen(false);
                resetForm();
                alert("Berhasil menyimpan departemen!");
            } else {
                alert("Gagal menyimpan departemen");
            }
        } catch (e) {
            alert("Error: " + e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus departemen ini?")) return;

        try {
            const res = await fetch(`${API_BASE}/departements/${id}`, { method: "DELETE" });
            if (res.ok) {
                setDepartements((prev) => prev.filter((d) => d.id !== id));
                alert("Departemen berhasil dihapus!");
            } else {
                alert("Gagal menghapus departemen");
            }
        } catch (e) {
            alert("Error: " + e);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manajemen Departemen</h2>
                <Button onClick={() => openForm()} className="gap-2">
                    <Plus className="h-4 w-4" /> Tambah Departemen
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departements.map((dept) => (
                    <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-blue-600" /> {dept.departement_name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Max Masuk:</span>
                                <span className="font-mono font-semibold">{dept.max_clock_in_time}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Max Keluar:</span>
                                <span className="font-mono font-semibold">{dept.max_clock_out_time}</span>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" onClick={() => openForm(dept)} className="flex-1">
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(dept.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingDept ? "Edit Departemen" : "Tambah Departemen Baru"}</DialogTitle>
                        <DialogDescription>Isi informasi departemen dan jadwal kerja.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nama Departemen</Label>
                            <Input
                                placeholder="Contoh: IT, HR, Finance"
                                value={form.departement_name}
                                onChange={(e) => setForm((prev) => ({ ...prev, departement_name: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Waktu Maksimal Masuk</Label>
                            <Input
                                type="time"
                                value={form.max_clock_in_time}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const normalized = val.length === 5 ? `${val}:00` : val;
                                    setForm((prev) => ({ ...prev, max_clock_in_time: normalized }));
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Waktu Maksimal Keluar</Label>
                            <Input
                                type="time"
                                value={form.max_clock_out_time}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const normalized = val.length === 5 ? `${val}:00` : val;
                                    setForm((prev) => ({ ...prev, max_clock_out_time: normalized }));
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setFormOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                            {editingDept ? "Update" : "Simpan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
