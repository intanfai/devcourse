<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $fillable = ['course_id', 'title', 'description', 'order'];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }
}
