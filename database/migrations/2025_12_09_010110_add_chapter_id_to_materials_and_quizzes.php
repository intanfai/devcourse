<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('materials', function (Blueprint $table) {
            $table->foreignId('chapter_id')->nullable()->after('course_id')->constrained('chapters')->nullOnDelete();
        });

        Schema::table('quizzes', function (Blueprint $table) {
            $table->foreignId('chapter_id')->nullable()->after('course_id')->constrained('chapters')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('materials', function (Blueprint $table) {
            $table->dropConstrainedForeignId('chapter_id');
        });

        Schema::table('quizzes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('chapter_id');
        });
    }
};
