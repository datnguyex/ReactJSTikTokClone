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
use App\Models\Follow;
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
    public function getAllUser(Request $request) {
        $users = User::all();
        return response()->json([
            'message' => 'get all user sussesfully',
            'data' => $users
        ]);
    }
    //following
    public function FollowUSer(Request $request) {
        $follower = User::where('nickname', $request->nicknameFollower)->first();
        $followed = User::where('nickname', $request->nicknameFollowed)->first();
    
        $followCheck = Follow::where('follower_id', $follower->id)
        ->where('followed_id', $followed->id)
        ->first();
    
        if ($followCheck) {
            $followCheck->delete();
            $follower->followings_count -= 1;
            $followed->follwers_count -= 1;
            $follower->save();
            $followed->save();
            return response()->json(['message' => 'unfollow sussess'], 200);
        } else {
            $follow = Follow::create([
                'follower_id' => $follower->id, 
                'followed_id' => $followed->id, 
            ]);
            $follower->followings_count += 1;
            $followed->follwers_count += 1;
            $follower->save();
            $followed->save();
            return response()->json([
                'message' => 'follow success',
                'follower' => $follower,
                'followed' => $followed,
            ], 200);
        }
    }
    
    public function checkFollowing(Request $request) {
        $follower = User::where('nickname', $request->nicknameFollower)->first();
        $followed = User::where('nickname', $request->nicknameFollowed)->first();
    
      
        // if (!$follower) {
        //     return response()->json(['message' => 'Follower not found'], 404);
        // }
    
        // if (!$followed) {
        //     return response()->json(['message' => 'Followed user not found'], 404);
        // }
    
        $exists = Follow::where('follower_id', $follower->id)
            ->where('followed_id', $followed->id)
            ->exists();
    
        if ($exists) {
            return response()->json(['message' => 'You have already followed this person'
            ,' $follower->id' =>  $follower->id
            , ' $followed->id' => $followed->id], 200);
        } else {
            return response()->json(['message' => 'You have not followed this person'
            ,' $follower->id' =>  $follower->id
            , ' $followed->id' => $followed->id
        ], 200);
        }
    }
    public function getFollowingUsers(Request $request) {
        $users = Follow::where('follower_id', $request->user_id)->get();
    
        $followedIds = $users->pluck('followed_id');
    
        $followedUsers = User::whereIn('id', $followedIds)->get();
    
        return response()->json([
            'message' => 'Get following users successful',
            'data' => $followedUsers
        ], 200);
    }
    public function getSuggestedUsers(Request $request) {
        $users = Follow::where('follower_id', $request->user_id)->get();
        $followedIds = $users->pluck('followed_id');
        $followedUsers = User::whereNotIn('id', $followedIds)->get();
        return response()->json([
            'message' => 'get all user sussesfully',
            'data' => $followedUsers
        ]);
    }
    public function getVideoFollowingUsers(Request $request) {
        $users = Follow::where('follower_id', $request->user_id)->get();
        $followedIds = $users->pluck('followed_id');
    
        $videos = Video::with('user')->whereIn('user_id',$followedIds)->get();
        return response()->json([
            'message' => 'get following video sussesfull',
            'data' => $videos
        ]);
    }
    public function getVideoSuggested(Request $request) {
        $users = Follow::where('follower_id', $request->user_id)->get();
        $followedIds = $users->pluck('followed_id');
    
        $videos = Video::with('user')->whereNotIn('user_id', $followedIds)->get();
    
        return response()->json([
            'message' => 'get suggested videos successfully',
            'data' => $videos
        ]);
    }
    

}
