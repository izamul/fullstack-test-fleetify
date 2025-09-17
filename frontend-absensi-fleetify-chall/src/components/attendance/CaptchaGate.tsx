"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, ShieldCheck, Loader2 } from "lucide-react";

// ======== HELPER ========
const genCaptcha = () =>
    Array.from({ length: 5 }, () =>
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[
        Math.floor(Math.random() * 32)
        ]
    ).join("");

// ======== COMPONENT ========
export default function CaptchaGate({
    open,
    setOpen,
    onPass,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    onPass: () => Promise<void> | void;
}) {
    const [code, setCode] = useState(genCaptcha());
    const [value, setValue] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const refresh = () => {
        setCode(genCaptcha());
        setValue("");
    };

    const handleVerify = async () => {
        if (value.trim().toUpperCase() !== code) {
            alert("Captcha salah, coba lagi ya");
            return;
        }
        try {
            setSubmitting(true);
            await onPass();
            setOpen(false);
        } finally {
            setSubmitting(false);
            refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                        Verifikasi Keamanan
                    </DialogTitle>
                    <DialogDescription>
                        Mohon selesaikan verifikasi berikut ini.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Captcha Box */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 select-none text-center text-2xl font-bold py-4 rounded-lg border-2 bg-gray-50">
                            {code}
                        </div>
                        <Button variant="outline" size="icon" onClick={refresh}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Input */}
                    <div className="space-y-2">
                        <Label htmlFor="captcha">Ketik ulang kode di atas</Label>
                        <Input
                            id="captcha"
                            placeholder="Masukkan 5 karakter..."
                            value={value}
                            onChange={(e) => setValue(e.target.value.toUpperCase())}
                            className="text-center tracking-widest"
                            maxLength={5}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        disabled={submitting || value.length !== 5}
                        onClick={handleVerify}
                    >
                        {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                        Verifikasi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
