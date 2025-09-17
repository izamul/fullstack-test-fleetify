"use client";
import { Building2 } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                            Fleetify Absensi
                        </h1>
                        <p className="text-sm text-gray-600">by Izamul Fikri (bismillah keterima kerja)</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
