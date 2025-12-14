<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';

use Illuminate\Support\Facades\DB;

$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Get latest 5 materials
$materials = DB::table('materials')
    ->latest()
    ->limit(5)
    ->get(['id', 'title', 'video_url', 'chapter_id']);

foreach ($materials as $m) {
    echo "Material {$m->id}: {$m->title}\n";
    echo "  video_url: {$m->video_url}\n";
    echo "  chapter_id: {$m->chapter_id}\n\n";
}
