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
        Schema::create('supports', function (Blueprint $table) {
            $table->id();
            $table->enum('company',['ARSI','HTA','TTA','DCM','RMU','GBJ'])->nullable();
            $table->string('code',25)->unique();
            $table->string('serial_number')->nullable();
            $table->string('brand')->nullable();
            $table->string('description')->nullable();
            $table->string('type')->nullable();
            $table->string('capacity')->nullable();
            $table->date('purchase_date')->nullable();
            $table->date('warranty_expiry_date')->nullable();
            $table->float('price')->nullable();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('supplier_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('CASCADE');
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('CASCADE');

            $table->timestamps();
            $table->softDeletes();

            $table->index('code');
            $table->index('serial_number');
            $table->index('brand');
            $table->index('category_id');
            $table->index('supplier_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accessories');
    }
};
