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
        Schema::create('work_orders', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->text('request');
            $table->enum('category',['REPAIR','CHANGE','REQUEST DATA','other'])->nullable();
            $table->string('other')->nullable();
            $table->text('action')->nullable();
            $table->enum('status',['CREATED','APPROVED','PROGRESS','DONE'])->default('CREATED');
            $table->datetime('approved_at')->nullable();
            $table->datetime('progress_at')->nullable();
            $table->datetime('done_at')->nullable();
            $table->unsignedBigInteger('device_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('leader_id')->nullable();
            $table->unsignedBigInteger('pic_id')->nullable();
            $table->unsignedBigInteger('know_id')->nullable();

            $table->foreign('device_id')->references('id')->on('devices')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('leader_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('pic_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('know_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();

            $table->index('code');
            $table->index('category');
            $table->index('status');
            $table->index('user_id');
            $table->index('pic_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_orders');
    }
};
