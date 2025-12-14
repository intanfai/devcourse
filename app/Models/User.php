<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\ResetPasswordNotification;


class User extends Authenticatable
{
public function sendPasswordResetNotification($token)
{
    $this->notify(new ResetPasswordNotification($token));
}



    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'role_id',
        'bio',
        'phone',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
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
