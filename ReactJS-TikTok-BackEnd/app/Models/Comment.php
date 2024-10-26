<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'video_id',
        'user_id',
        'comment_description',
    ];

    // Quan hệ tới model Post (nếu có)
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function user()
{
    return $this->belongsTo(User::class);
}
}
