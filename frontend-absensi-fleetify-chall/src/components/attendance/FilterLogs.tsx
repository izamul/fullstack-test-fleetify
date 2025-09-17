"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, Filter } from "lucide-react";
import type { Departement } from "@/components/attendance/types";

export default function FilterLogs({
    filterMode,
    setFilterMode,
    date,
    setDate,
    start,
    setStart,
    end,
    setEnd,
    month,
    setMonth,
    year,
    setYear,
    deptId,
    setDeptId,
    departements,
    loadAttendanceLogs,
    loadingLogs,
}: {
    filterMode: "all" | "today" | "date" | "range" | "month" | "year";
    setFilterMode: (v: "all" | "today" | "date" | "range" | "month" | "year") => void;
    date: string;
    setDate: (v: string) => void;
    start: string;
    setStart: (v: string) => void;
    end: string;
    setEnd: (v: string) => void;
    month: string;
    setMonth: (v: string) => void;
    year: string;
    setYear: (v: string) => void;
    deptId: string;
    setDeptId: (v: string) => void;
    departements: Departement[];
    loadAttendanceLogs: () => void;
    loadingLogs: boolean;
}) {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600">
                    <Filter className="h-5 w-5" /> Filter Data Absensi
                </CardTitle>
                <CardDescription>Pilih mode filter untuk melihat data absensi sesuai kebutuhan.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {["all", "today", "date", "range", "month", "year"].map((mode) => (
                        <Button
                            key={mode}
                            size="sm"
                            variant={filterMode === mode ? "default" : "outline"}
                            onClick={() => setFilterMode(mode as typeof filterMode)}
                        >
                            {mode === "all" && "Semua"}
                            {mode === "today" && "Hari Ini"}
                            {mode === "date" && "Tanggal"}
                            {mode === "range" && "Rentang"}
                            {mode === "month" && "Bulanan"}
                            {mode === "year" && "Tahunan"}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {filterMode === "date" && (
                        <div className="space-y-1">
                            <Label>Tanggal</Label>
                            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    )}
                    {filterMode === "range" && (
                        <>
                            <div className="space-y-1">
                                <Label>Dari</Label>
                                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Sampai</Label>
                                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                            </div>
                        </>
                    )}
                    {filterMode === "month" && (
                        <>
                            <div className="space-y-1">
                                <Label>Bulan</Label>
                                <Input type="number" min={1} max={12} value={month} onChange={(e) => setMonth(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Tahun</Label>
                                <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                            </div>
                        </>
                    )}
                    {filterMode === "year" && (
                        <div className="space-y-1">
                            <Label>Tahun</Label>
                            <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                        </div>
                    )}
                    <div className="space-y-1 md:col-span-2">
                        <Label>Departemen</Label>
                        <Select value={deptId} onValueChange={setDeptId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Semua departemen" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                {departements.map((d) => (
                                    <SelectItem key={d.id} value={String(d.id)}>
                                        {d.departement_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Button onClick={loadAttendanceLogs} disabled={loadingLogs} className="gap-2">
                        {loadingLogs && <Loader2 className="h-4 w-4 animate-spin" />}
                        Terapkan Filter
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
