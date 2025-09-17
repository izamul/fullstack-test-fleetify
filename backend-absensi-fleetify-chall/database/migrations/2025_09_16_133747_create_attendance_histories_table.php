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
        Schema::create('attendance_histories', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id', 50);
            $table->string('attendance_id', 100);
            $table->timestamp('date_attendance');
            $table->tinyInteger('attendance_type'); // 1=In, 2=Out
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('employee_id')->references('employee_id')->on('employees')
                  ->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('attendance_id')->references('attendance_id')->on('attendances')
                  ->cascadeOnUpdate()->cascadeOnDelete();

            $table->index(['employee_id','attendance_id','attendance_type'], 'idx_histories_emp_att_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
    Schema::disableForeignKeyConstraints();
    Schema::dropIfExists('attendance_histories');
    Schema::enableForeignKeyConstraints();
}

};
