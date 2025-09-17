<?php

namespace App\Http\Controllers;

use App\Models\{Attendance, AttendanceHistory, Employee};
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AttendanceController extends Controller
{
    public function checkIn(Request $request)
    {
        $data = $request->validate([
            'employee_id' => 'required|exists:employees,employee_id',
        ]);

        $today = now()->toDateString();

        $already = Attendance::where('employee_id', $data['employee_id'])
            ->whereDate('clock_in', $today)
            ->exists();

        if ($already) {
            return response()->json(['message' => 'Sudah absen masuk hari ini'], 409);
        }

        $attendance = Attendance::create([
            'employee_id' => $data['employee_id'],
            'attendance_id' => (string) Str::uuid(),
            'clock_in' => now(),
        ]);

        AttendanceHistory::create([
            'employee_id' => $data['employee_id'],
            'attendance_id' => $attendance->attendance_id,
            'date_attendance' => now(),
            'attendance_type' => 1,
            'description' => 'Check-in',
        ]);

        return response()->json(['message' => 'Check-in berhasil', 'data' => $attendance], 201);
    }

    public function checkOut(Request $request)
{
    $data = $request->validate([
        'employee_id' => 'required|exists:employees,employee_id',
    ]);

    $today = now()->toDateString();

    $attendance = Attendance::where('employee_id', $data['employee_id'])
        ->whereNull('clock_out')
        ->latest('clock_in')
        ->first();

    if (!$attendance) {
        return response()->json(['message' => 'Belum absen masuk / sudah check-out'], 422);
    }

    if ($attendance->clock_in->toDateString() !== $today) {
        return response()->json(['message' => 'Checkout sudah kadaluarsa, lakukan di hari yang sama dengan check-in'], 422);
    }

    $attendance->update(['clock_out' => now()]);

    AttendanceHistory::create([
        'employee_id'     => $data['employee_id'],
        'attendance_id'   => $attendance->attendance_id,
        'date_attendance' => now(),
        'attendance_type' => 2,
        'description'     => 'Check-out',
    ]);

    return response()->json(['message' => 'Check-out berhasil', 'data' => $attendance]);
}


    public function logs(Request $request)
    {
        $request->validate([
            'date' => 'nullable|date_format:Y-m-d',
            'start_date' => 'nullable|date_format:Y-m-d',
            'end_date' => 'nullable|date_format:Y-m-d|after_or_equal:start_date',
            'month' => 'nullable|integer|min:1|max:12',
            'year' => 'nullable|integer|min:2000',
            'departement_id' => 'nullable|exists:departements,id',
        ]);

        $query = Attendance::query()
            ->join('employees', 'employees.employee_id', '=', 'attendances.employee_id')
            ->join('departements', 'departements.id', '=', 'employees.departement_id')
            ->select(
                'attendances.*',
                'employees.name as employee_name',
                'departements.departement_name',
                'departements.max_clock_in_time',
                'departements.max_clock_out_time'
            );
            
        if (
            $request->input('mode') !== 'all' &&
            !$request->filled('date') &&
            !$request->filled('start_date') &&
            !$request->filled('end_date') &&
            !$request->filled('month') &&
            !$request->filled('year')
        ) {
            $query->whereDate('attendances.clock_in', now()->toDateString());
        }


        // Single date
        if ($request->filled('date')) {
            $query->whereDate('attendances.clock_in', $request->date);
        }

        // Range date
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('attendances.clock_in', [$request->start_date, $request->end_date]);
        }

        // Filter by month (optional year too)
        if ($request->filled('month')) {
            $query->whereMonth('attendances.clock_in', $request->month);
        }
        if ($request->filled('year')) {
            $query->whereYear('attendances.clock_in', $request->year);
        }

        // Filter departement
        if ($request->filled('departement_id')) {
            $query->where('employees.departement_id', $request->departement_id);
        }

        $rows = $query->get()->map(function ($row) {
            $statusIn = $row->clock_in && $row->clock_in->format('H:i:s') <= $row->max_clock_in_time
                ? 'Tepat Waktu' : 'Terlambat';

            $statusOut = $row->clock_out
                ? ($row->clock_out->format('H:i:s') >= $row->max_clock_out_time ? 'Normal' : 'Pulang Cepat')
                : 'Belum Checkout';

            return [
                'employee'       => $row->employee_name,
                'departement'    => $row->departement_name,
                'clock_in'       => optional($row->clock_in)->toDateTimeString(),
                'clock_out'      => optional($row->clock_out)->toDateTimeString(),
                'status_masuk'   => $statusIn,
                'status_keluar'  => $statusOut,
            ];
        });

        return response()->json($rows);
    }


}
