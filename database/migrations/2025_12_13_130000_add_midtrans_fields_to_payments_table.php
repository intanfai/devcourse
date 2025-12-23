<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            if (!Schema::hasColumn('payments', 'order_id')) {
                $table->string('order_id')->nullable()->unique();
            }
            if (!Schema::hasColumn('payments', 'qr_string')) {
                $table->text('qr_string')->nullable();
            }
            if (!Schema::hasColumn('payments', 'qr_url')) {
                $table->text('qr_url')->nullable();
            }
            if (!Schema::hasColumn('payments', 'expires_at')) {
                $table->timestamp('expires_at')->nullable();
            }
            if (!Schema::hasColumn('payments', 'raw_response')) {
                $table->json('raw_response')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            if (Schema::hasColumn('payments', 'order_id')) {
                $table->dropUnique(['order_id']);
                $table->dropColumn('order_id');
            }
            if (Schema::hasColumn('payments', 'qr_string')) {
                $table->dropColumn('qr_string');
            }
            if (Schema::hasColumn('payments', 'qr_url')) {
                $table->dropColumn('qr_url');
            }
            if (Schema::hasColumn('payments', 'expires_at')) {
                $table->dropColumn('expires_at');
            }
            if (Schema::hasColumn('payments', 'raw_response')) {
                $table->dropColumn('raw_response');
            }
        });
    }
};
