<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['course_id', 'title'];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }
}
