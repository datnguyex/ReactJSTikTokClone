<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerifyRegister extends Model
{
    use HasFactory;

    protected $table = 'verify_register'; 

    protected $fillable = ['email', 'verification_code', 'expires_at'];
}

