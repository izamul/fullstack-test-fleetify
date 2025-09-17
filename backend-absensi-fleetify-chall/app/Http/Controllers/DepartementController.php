<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    public function index()
    {
        return Departement::paginate(20);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'departement_name' => 'required|string|max:255',
            'max_clock_in_time' => 'required|date_format:H:i:s',
            'max_clock_out_time' => 'required|date_format:H:i:s',
        ]);
        return response()->json(Departement::create($data), 201);
    }

    public function show(Departement $departement)
    {
        return $departement;
    }

    public function update(Request $request, Departement $departement)
    {
        $data = $request->validate([
            'departement_name' => 'sometimes|string|max:255',
            'max_clock_in_time' => 'sometimes|date_format:H:i:s',
            'max_clock_out_time' => 'sometimes|date_format:H:i:s',
        ]);
        $departement->update($data);
        return $departement;
    }

    public function destroy(Departement $departement)
    {
        $departement->delete();
        return response()->noContent();
    }
}
