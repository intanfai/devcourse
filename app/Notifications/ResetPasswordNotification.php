<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends BaseResetPassword
{
    use Queueable;

    public function toMail($notifiable)
{
    $frontendUrl = "http://127.0.0.1:8000/reset-password?token={$this->token}&email={$notifiable->email}";

    return (new MailMessage)
        ->subject('Reset Password')
        ->line('Click the button below to reset your password:')
        ->action('Reset Password', $frontendUrl)
        ->line('If you did not request a password reset, ignore this email.');
}

}
