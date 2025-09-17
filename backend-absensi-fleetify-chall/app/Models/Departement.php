<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Departement extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
