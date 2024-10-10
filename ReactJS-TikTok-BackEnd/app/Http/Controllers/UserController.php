<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Models\VerifyRegister;
use App\Models\VerifyResetPassword;
use App\Jobs\DeleteVerificationData;
use Carbon\Carbon;
use App\Jobs\DeletePropertyJob;
use App\Models\User;
use App\Models\Video;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;


class UserController extends Controller
{
    function updateUser(Request $request) {
        $user = User::find($request->id);
        $user->full_name = $request->username;
        $user->nickname = $request->nickname;
        $user->bio = $request->bio;
       
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $user->image = $path; 
        }
        $user->save();
        return response()->json([
            'message' => 'updated succesfully',
            'data' => $user,
        ]);
    }
    function sendCodeResetPassword(Request $request) {
        if ($request->code == null) {
            $emailExist = User::where('email', $request->email)->first();
            if($emailExist) {
                $code = rand(1000, 9999);
                $verification = VerifyResetPassword::create([
                    'email' => $request->email, 
                    'verification_code' => $code, 
                    'expires_at' => Carbon::now()->addMinutes(5),
                ]);
                Mail::send('emails.resetPassword', compact('code'), function($email) use ($request) {
                    $email->to($request->email, 'ReactJSTikTok');
                  });
                  DeletePropertyJob::dispatch($request->email)->delay(now()->addMinutes(20));
                  $verificationCount = VerifyResetPassword::where('email', $request->email)->count();
                  if($verificationCount >=2) {
                    $oldVerification = VerifyResetPassword::where('email', $request->email)->first();
                    if ($oldVerification) {
                        $oldVerification->delete();
                    }
                }
                  return response()->json([
                    'message' => 'Email sent',
                    'code' => $code,
                ]);     
            } else {
                return response()->json([
                    'message' => 'Account not existx',
                ]);
            }
           
        } else {
          
            $maxCodeRecord = VerifyResetPassword::where('email', $request->email)->first(); 
            if ($maxCodeRecord && $request->code == $maxCodeRecord->verification_code) {
                $oldVerification = VerifyResetPassword::where('email', $request->email)->first();
                if ($oldVerification) {
                    $oldVerification->delete();
                }
                $emailExist = User::where('email', $request->email)->first();
                if($emailExist) {
                    $emailExist->password = hash::make($request->password);
                    $emailExist->save();
                    return response()->json([
                        'message' => 'password reset successfully',
                        'user'=> $emailExist,
                    ]);
                }
                else {
                    return response()->json([
                        'message' => 'Account not exist',
                    ]);
                }
            } else {
                return response()->json([
                    'message' => 'Sent failed',
                ]);
            } 
        }      
    }
    public function uploadVideo(Request $request) {
        $path = $request->file('video')->store('videos', 'public');
        if($path) {
            Video::create([
                'user_id' => $request->user_id,
                'description' => $request->description,
                'path' => $path,
            ]);
        }
        return response()->json([
        'message' => 'upload sussesfully',    
        'path' => $path], 201);
    }
    public function getUserInfo(Request $request) {
        $user = User::where('nickname',$request->nickname)->first();
        $user_id = $user->id;
        $videos = Video::where('user_id',$user_id)->get();
        return response()->json([
            'message' => 'get info succesfully',    
            'request' => $request->nickname,
            'data' => $user,
            'videos' => $videos,
        ]);
    }
}
