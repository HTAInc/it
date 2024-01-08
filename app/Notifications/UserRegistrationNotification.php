<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\HtmlString;

class UserRegistrationNotification extends Notification
{
    use Queueable;
    protected $user;
    protected $password;
    protected $role;

    /**
     * Create a new notification instance.
     */
    public function __construct($user, $password, $role)
    {
        $this->user = $user;
        $this->password = $password;
        $this->role = $role;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $appUrl = Config::get('app.url');
        return (new MailMessage)
            ->subject('Account Registration for Work Order IT Application - No Reply')
            ->greeting('Dear '. $this->user->name)
            ->line('We are pleased to inform you that your account for the Work Order IT application has been successfully registered.')
            ->line('Below are your account details:')
            ->line('Name        : ' . $this->user->name)
            ->line('Email       : ' . $this->user->email)
            ->line('Role        : ' . $this->role)
            ->line('Password    : '.$this->password)
            ->line('For security reasons, we recommend changing your password immediately after logging in.')
            ->line(new HtmlString('To access the application, please visit the following URL : <a href="http://hesk.hta.co.id/login">LOGIN</a>'))
            ->line(new HtmlString('This automated email is sent by the system. Should you require further assistance, please contact the IT Department via email: <a href="mailto:it-arsi@arai-indonesia.co.id">it-arsi@arai-indonesia.co.id</a>'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
