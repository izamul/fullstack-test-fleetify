<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::with('departement')->paginate(20);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'employee_id'    => 'required|string|max:50|unique:employees,employee_id',
            'departement_id' => 'required|exists:departements,id',
            'name'           => 'required|string|max:255',
            'address'        => 'nullable|string',
        ]);
        return response()->json(Employee::create($data), 201);
    }

    public function show(Employee $employee)
    {
        return $employee->load('departement');
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'employee_id'    => 'sometimes|string|max:50|unique:employees,employee_id,' . $employee->id,
            'departement_id' => 'sometimes|exists:departements,id',
            'name'           => 'sometimes|string|max:255',
            'address'        => 'nullable|string',
        ]);
        $employee->update($data);
        return $employee->fresh('departement');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->noContent();
    }
}
