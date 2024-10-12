<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

  
    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'full_name',
        'nickname',
        'avatar',
        'bio',
        'DOB',
        'image',   
        'tick',
        'followings_count',
        'likes_count',
        'website_url',
        'facebook_url',
        'twitter_url',
        'instagram_url',
        'password',
    ];

 
    protected $hidden = [
        'password',
    ];

       
}
