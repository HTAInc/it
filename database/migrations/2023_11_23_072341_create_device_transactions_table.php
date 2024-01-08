<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('device_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->date('transaction_date');
            $table->enum('status', ['Available', 'Installed','Damaged','Under Repair','Replacement'])->default('Available');
            $table->string('ip')->nullable();
            $table->string('note')->nullable();
            $table->boolean('active')->default(true);
            $table->integer('number')->nullable();
            $table->unsignedBigInteger('device_id')->nullable();
            $table->unsignedBigInteger('work_order_spare_part_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('department_id')->nullable();
            $table->foreign('device_id')->references('id')->on('devices')->onDelete('CASCADE');
            $table->foreign('work_order_spare_part_id')->references('id')->on('work_order_spare_parts')->onDelete('CASCADE');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('CASCADE');
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('CASCADE');
            $table->timestamps();
            $table->softDeletes();

            $table->index('name');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_installations');
    }
};
