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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('full_name')->nullable();
            $table->string('nickname');
            $table->string('image')->nullable();
            $table->string('DOB');
            $table->string('avatar')->nullable();
            $table->string('bio')->nullable();
            $table->Boolean('tick')->nullable();
            $table->Integer('followings_count')->nullable();
            $table->Integer('follwers_count')->nullable();
            $table->Integer('likes_count')->nullable();
            $table->string('website_url')->nullable(); 
            $table->string('facebook_url')->nullable(); 
            $table->string('twitter_url')->nullable(); 
            $table->string('instagram_url')->nullable(); 
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
