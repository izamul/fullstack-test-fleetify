"use client";
import { Building2, Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-blue-400" />
                    <div>
                        <div className="font-bold">© 2025 Fleetify Absensi</div>
                        <div className="text-sm text-blue-200">Attendance Management System</div>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-blue-200">
                    <div className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> React + Tailwind</div>
                    <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Captcha Security</div>
                </div>
            </div>
        </footer>
    );
}
