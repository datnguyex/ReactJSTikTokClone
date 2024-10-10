<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerifyResetPassword extends Model
{
    use HasFactory;
    protected $table = 'verify_reset_password';
    protected $fillable = ['email', 'verification_code', 'expires_at'];
}
