export function formatTime(ts?: string | null) {
    if (!ts) return "-";
    const d = new Date(ts.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return ts;
    return d.toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function nowHHMMSS() {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function formatDiff(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h} jam ${m} menit`;
    return `${m} menit`;
}

export function toSeconds(hms: string) {
    const [h, m, s] = hms.split(":").map(Number);
    return h * 3600 + m * 60 + (s || 0);
}