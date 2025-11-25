<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['name', 'email', 'password', 'role'];

    public function role()
    {
        return $this->belongsTo(\App\Models\Role::class);
    }


    // Jika user = instruktur
    public function courses()
    {
        return $this->hasMany(Course::class, 'instructor_id');
    }

    // Jika user = student
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
