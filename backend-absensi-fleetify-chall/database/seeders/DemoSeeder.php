<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Departement;
use App\Models\Employee;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Departements
        $ve = Departement::create([
            'departement_name' => 'Vehilcle Engineering',
            'max_clock_in_time' => '09:00:00',
            'max_clock_out_time' => '17:00:00',
        ]);

        $mr = Departement::create([
            'departement_name' => 'Maintenance & Repair',
            'max_clock_in_time' => '08:30:00',
            'max_clock_out_time' => '16:30:00',
        ]);

        // Employees
        Employee::create([
            'employee_id' => 'EMP-001',
            'departement_id' => $ve->id,
            'name' => 'Izamul',
            'address' => 'Malang',
        ]);

        Employee::create([
            'employee_id' => 'EMP-002',
            'departement_id' => $ve->id,
            'name' => 'Fikri',
            'address' => 'Bandung',
        ]);

        Employee::create([
            'employee_id' => 'EMP-003',
            'departement_id' => $mr->id,
            'name' => 'Fahmi',
            'address' => 'Banyuwangi',
        ]);

        Employee::create([
            'employee_id' => 'EMP-004',
            'departement_id' => $mr->id,
            'name' => 'Brando',
            'address' => 'Bekasi',
        ]);
    }
}
