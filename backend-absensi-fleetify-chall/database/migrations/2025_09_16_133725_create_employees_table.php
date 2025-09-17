<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id', 50)->unique(); 
            $table->foreignId('departement_id')->constrained('departements')->cascadeOnUpdate()->restrictOnDelete();
            $table->string('name', 255);
            $table->text('address')->nullable();
            $table->timestamps();
            $table->index(['departement_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void { 
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('employees'); 
        Schema::enableForeignKeyConstraints();
    }
};
