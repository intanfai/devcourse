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
        Schema::table('certificates', function (Blueprint $table) {
            $table->renameColumn('class_id', 'course_id');
        });
    }
    /**
     * Reverse the migrations.
     */

    public function down()
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->renameColumn('course_id', 'class_id');
        });
    }
};
