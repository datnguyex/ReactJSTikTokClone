<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\VerifyRegister; // Ensure you import the model

class DeletePropertyJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $email; // Store email instead of modelId

    public function __construct($email)
    {
        $this->email = $email; // Initialize the email property
    }

    public function handle()
    {
        $verification = VerifyRegister::where('email', $this->email)->first();
        if ($verification) {
            $verification->delete(); 
        }
    }
}
