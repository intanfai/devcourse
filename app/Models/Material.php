<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'course_id', 'chapter_id', 'title', 'content', 'video_url', 'order'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class, 'chapter_id');
    }

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}
