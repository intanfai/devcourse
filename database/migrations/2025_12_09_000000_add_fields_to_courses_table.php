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
        Schema::table('courses', function (Blueprint $table) {
            if (!Schema::hasColumn('courses', 'category')) {
                $table->string('category')->nullable()->after('title');
            }

            if (!Schema::hasColumn('courses', 'level')) {
                $table->string('level')->nullable()->after('category');
            }

            if (!Schema::hasColumn('courses', 'status')) {
                $table->string('status')->default('Pending')->after('price');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            if (Schema::hasColumn('courses', 'status')) {
                $table->dropColumn('status');
            }

            if (Schema::hasColumn('courses', 'level')) {
                $table->dropColumn('level');
            }

            if (Schema::hasColumn('courses', 'category')) {
                $table->dropColumn('category');
            }
        });
    }
};
