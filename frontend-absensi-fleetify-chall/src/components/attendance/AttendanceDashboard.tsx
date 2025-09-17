"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogIn, LogOut, ShieldCheck, TrendingUp, AlertTriangle, Building2, Clock, Eye, Users } from "lucide-react";
import CaptchaGate from "./CaptchaGate";

import type { Departement, Employee, LogRow } from "@/components/attendance/types";
import { nowHHMMSS, toSeconds, formatDiff } from "@/components/attendance/utils";
import FilterLogs from "@/components/attendance/FilterLogs";
import LogTable from "@/components/attendance/LogTable";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export default function AttendanceDashboard({
    departements,
    employees,
    loadLogs,
}: {
    departements: Departement[];
    employees: Employee[];
    loadLogs: () => void;
}) {
    const [logs, setLogs] = useState<LogRow[]>([]);
    const [allLogs, setAllLogs] = useState<LogRow[]>([]);
    const [filterMode, setFilterMode] = useState<"all" | "today" | "date" | "range" | "month" | "year">("today");
    const [date, setDate] = useState<string>("");
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());
    const [deptId, setDeptId] = useState<string>("");
    const [loadingLogs, setLoadingLogs] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
    const [captchaOpen, setCaptchaOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<"in" | "out" | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const selectedEmployee = useMemo(() => employees.find((e) => e.employee_id === selectedEmployeeId), [employees, selectedEmployeeId]);
    const selectedDepartement = useMemo(
        () => departements.find((d) => d.id === (selectedEmployee?.departement_id ?? -1)),
        [departements, selectedEmployee]
    );

    const [nowTime, setNowTime] = useState(nowHHMMSS());
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intv = setInterval(() => {
            setNowTime(nowHHMMSS());
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(intv);
    }, []);

    const predictedStatus = useMemo(() => {
        if (!selectedDepartement) return null;

        const nowSec = toSeconds(nowTime);
        const inSec = toSeconds(selectedDepartement.max_clock_in_time);
        const outSec = toSeconds(selectedDepartement.max_clock_out_time);

        let masuk = "Tepat Waktu";
        let keluar = "Normal";

        if (nowSec > inSec) {
            const diff = nowSec - inSec;
            masuk = `Terlambat ${formatDiff(diff)}`;
        }

        if (nowSec < outSec) {
            const diff = outSec - nowSec;
            keluar = `Pulang Cepat ${formatDiff(diff)}`;
        } else if (nowSec > outSec) {
            const diff = nowSec - outSec;
            keluar = `Lembur ${formatDiff(diff)}`;
        }

        return { now: nowTime, masuk, keluar };
    }, [selectedDepartement, nowTime]);

    const buildQuery = () => {
        const q = new URLSearchParams();
        if (filterMode === "today") {
            const today = new Date();
            const pad = (n: number) => String(n).padStart(2, "0");
            const localDate = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
            q.set("date", localDate);
        }
        if (filterMode === "date" && date) q.set("date", date);
        if (filterMode === "range" && start && end) {
            q.set("start_date", start);
            q.set("end_date", end);
        }
        if (filterMode === "month" && month) {
            q.set("month", month);
            if (year) q.set("year", year);
        }
        if (filterMode === "year" && year) q.set("year", year);
        if (filterMode === "all") q.set("mode", "all");
        if (deptId && deptId !== "all") q.set("departement_id", deptId);
        return q.toString();
    };

    const loadAttendanceLogs = async () => {
        setLoadingLogs(true);
        try {
            const qs = buildQuery();
            const res = await fetch(`${API_BASE}/attendance/logs${qs ? `?${qs}` : ""}`);
            const json: LogRow[] = await res.json();
            setLogs(json);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingLogs(false);
        }
    };

    const loadAllLogs = async () => {
        try {
            const res = await fetch(`${API_BASE}/attendance/logs?mode=all`);
            const json: LogRow[] = await res.json();
            setAllLogs(json);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadAttendanceLogs();
        loadAllLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const triggerWithCaptcha = (action: "in" | "out") => {
        if (!selectedEmployeeId) return alert("Pilih karyawan dulu ya");
        setPendingAction(action);
        setCaptchaOpen(true);
    };

    const doSubmit = async () => {
        if (!pendingAction || !selectedEmployeeId) return;
        setSubmitting(true);
        try {
            const url = `${API_BASE}/attendance/${pendingAction === "in" ? "check-in" : "check-out"}`;
            const res = await fetch(url, {
                method: pendingAction === "in" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ employee_id: selectedEmployeeId }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({} as Record<string, unknown>));
                alert(err?.message || `Gagal ${pendingAction === "in" ? "check-in" : "check-out"}`);
            } else {
                const ok = await res.json();
                alert(ok?.message || "Berhasil!");
                await loadAttendanceLogs();
                loadLogs();
            }
        } catch (e) {
            alert("Terjadi error jaringan. Cek API_BASE & CORS ya.");
        } finally {
            setSubmitting(false);
            setPendingAction(null);
        }
    };

    const kpi = useMemo(() => {
        const late = allLogs.filter((r) => r.status_masuk === "Terlambat").length;
        const early = allLogs.filter((r) => r.status_keluar === "Pulang Cepat").length;
        const present = allLogs.filter((r) => r.clock_in && r.clock_out).length;
        const onTime = allLogs.filter((r) => r.status_masuk === "Tepat Waktu").length;
        return { total: allLogs.length, late, early, present, onTime };
    }, [allLogs]);

    return (
        <div className="space-y-6">
            {/* Time Display */}
            <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0">
                <CardContent className="p-6 text-center">
                    <div className="text-sm opacity-90 mb-2">
                        {mounted && currentDate.toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </div>

                    <div className="text-4xl md:text-6xl font-mono font-bold tracking-wider mb-2">
                        {mounted ? nowTime : "--:--:--"}
                    </div>
                </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="flex flex-wrap justify-center gap-4">
                <Card className="w-60 bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" /> Terlambat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.late}</div>
                        <div className="text-xs opacity-80">Late arrival</div>
                    </CardContent>
                </Card>

                <Card className="w-60 bg-gradient-to-br from-rose-500 to-pink-500 text-white border-0">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" /> Pulang Cepat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.early}</div>
                        <div className="text-xs opacity-80">Early departure</div>
                    </CardContent>
                </Card>

                <Card className="w-60 bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Users className="h-4 w-4" /> Lengkap
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.present}</div>
                        <div className="text-xs opacity-80">In & Out</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Action Card */}
                <Card className="xl:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-indigo-600" /> Aksi Absensi
                        </CardTitle>
                        <CardDescription>Pilih karyawan dan lakukan check-in atau check-out.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Pilih Karyawan</Label>
                            <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Cari dan pilih karyawan..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {employees.map((e) => (
                                        <SelectItem key={e.employee_id} value={e.employee_id}>
                                            {e.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedDepartement && (
                            <Card className="border-2 border-indigo-200 bg-indigo-50/50">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Eye className="h-4 w-4 text-indigo-600" />
                                        <h4 className="font-semibold text-indigo-900">Preview Status</h4>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                                            <Building2 className="h-4 w-4 text-blue-600" />
                                            <span className="font-medium">{selectedDepartement.departement_name}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
                                                <div className="text-xs text-emerald-700">Max Masuk</div>
                                                <div className="font-bold text-emerald-800">{selectedDepartement.max_clock_in_time}</div>
                                            </div>
                                            <div className="p-2 bg-rose-50 rounded-lg border border-rose-200 text-center">
                                                <div className="text-xs text-rose-700">Max Keluar</div>
                                                <div className="font-bold text-rose-800">{selectedDepartement.max_clock_out_time}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className={`p-3 rounded-lg border-2 ${predictedStatus?.masuk.includes("Terlambat")
                                                ? "bg-red-50 border-red-200 text-red-800"
                                                : "bg-green-50 border-green-200 text-green-800"
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    {predictedStatus?.masuk.includes("Terlambat") ?
                                                        <AlertTriangle className="h-4 w-4" /> :
                                                        <Clock className="h-4 w-4" />
                                                    }
                                                    <div>
                                                        <div className="font-semibold text-sm">Status Masuk</div>
                                                        <div className="text-xs">{predictedStatus?.masuk}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`p-3 rounded-lg border-2 ${predictedStatus?.keluar.includes("Pulang Cepat")
                                                ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                                                : "bg-blue-50 border-blue-200 text-blue-800"
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="h-4 w-4" />
                                                    <div>
                                                        <div className="font-semibold text-sm">Status Keluar</div>
                                                        <div className="text-xs">{predictedStatus?.keluar}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                            <Button disabled={!selectedEmployeeId || submitting} onClick={() => triggerWithCaptcha("in")}>
                                <LogIn className="h-4 w-4 mr-2" /> Check-In
                            </Button>
                            <Button disabled={!selectedEmployeeId || submitting} onClick={() => triggerWithCaptcha("out")} variant="secondary">
                                <LogOut className="h-4 w-4 mr-2" /> Check-Out
                            </Button>
                        </div>

                        <CaptchaGate open={captchaOpen} setOpen={setCaptchaOpen} onPass={doSubmit} />
                    </CardContent>
                </Card>

                {/* Filters + Logs */}
                <Card className="xl:col-span-2">
                    <CardContent>
                        <FilterLogs
                            filterMode={filterMode}
                            setFilterMode={setFilterMode}
                            date={date}
                            setDate={setDate}
                            start={start}
                            setStart={setStart}
                            end={end}
                            setEnd={setEnd}
                            month={month}
                            setMonth={setMonth}
                            year={year}
                            setYear={setYear}
                            deptId={deptId}
                            setDeptId={setDeptId}
                            departements={departements}
                            loadAttendanceLogs={loadAttendanceLogs}
                            loadingLogs={loadingLogs}
                        />
                        <LogTable logs={logs} loadingLogs={loadingLogs} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
