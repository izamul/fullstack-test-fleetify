"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Users, Building2, LogIn, LogOut, Sparkles, Search } from "lucide-react";
import type { LogRow } from "@/components/attendance/types";
import { formatTime } from "@/components/attendance/utils";

export default function LogTable({ logs, loadingLogs }: { logs: LogRow[]; loadingLogs: boolean }) {
    return (
        <>
            <Separator className="my-4" />
            <div className="overflow-hidden rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="text-left p-3 font-semibold text-sm">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" /> Karyawan
                                    </div>
                                </th>
                                <th className="text-left p-3 font-semibold text-sm">
                                    <div className="flex items-center gap-1">
                                        <Building2 className="h-3 w-3" /> Departemen
                                    </div>
                                </th>
                                <th className="text-left p-3 font-semibold text-sm">
                                    <div className="flex items-center gap-1">
                                        <LogIn className="h-3 w-3" /> Waktu Masuk
                                    </div>
                                </th>
                                <th className="text-left p-3 font-semibold text-sm">
                                    <div className="flex items-center gap-1">
                                        <LogOut className="h-3 w-3" /> Waktu Keluar
                                    </div>
                                </th>
                                <th className="text-left p-3 font-semibold text-sm">
                                    <div className="flex items-center gap-1">
                                        <Sparkles className="h-3 w-3" /> Status
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingLogs ? (
                                <tr>
                                    <td className="p-6 text-center" colSpan={5}>
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                            <span>Memuat data...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td className="p-6 text-center text-gray-500" colSpan={5}>
                                        <div className="flex flex-col items-center gap-2">
                                            <Search className="h-8 w-8 text-gray-400" />
                                            <div>Tidak ada data absensi</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                logs.map((r, i) => (
                                    <tr key={i} className="hover:bg-gray-50 border-b">
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                    {r.employee.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium">{r.employee}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-1">
                                                <Building2 className="h-3 w-3 text-blue-600" />
                                                <span className="text-sm">{r.departement}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <span className="font-mono text-xs">{formatTime(r.clock_in)}</span>
                                        </td>
                                        <td className="p-3">
                                            <span className="font-mono text-xs">{formatTime(r.clock_out)}</span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                <Badge variant={r.status_masuk === "Terlambat" ? "destructive" : "default"} className="text-xs px-2 py-0">
                                                    {r.status_masuk}
                                                </Badge>
                                                <Badge
                                                    variant={
                                                        r.status_keluar === "Pulang Cepat"
                                                            ? "destructive"
                                                            : r.status_keluar === "Belum Checkout"
                                                                ? "secondary"
                                                                : "default"
                                                    }
                                                    className="text-xs px-2 py-0"
                                                >
                                                    {r.status_keluar}
                                                </Badge>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
