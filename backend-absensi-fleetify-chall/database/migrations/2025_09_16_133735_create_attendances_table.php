<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id', 50); 
            $table->string('attendance_id', 100)->unique(); 
            $table->timestamp('clock_in')->nullable();
            $table->timestamp('clock_out')->nullable();

            $table->date('attendance_date')->storedAs('DATE(clock_in)');

            $table->timestamps();

            $table->foreign('employee_id')
                ->references('employee_id')
                ->on('employees')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->unique(['employee_id', 'attendance_date'], 'uniq_employee_per_day');
        });

        try {
            if (DB::getDriverName() === 'mysql') {
                $version = DB::selectOne('select version() as v')->v ?? '';
                if (!str_contains(strtolower($version), 'mariadb')) {
                    DB::statement(
                        'ALTER TABLE `attendances` ADD CONSTRAINT chk_out_after_in CHECK (clock_out IS NULL OR clock_out >= clock_in)'
                    );
                }
            }
        } catch (\Throwable $e) {
            logger()->warning($e->getMessage());
        }
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('attendances');
        Schema::enableForeignKeyConstraints();
    }

};
