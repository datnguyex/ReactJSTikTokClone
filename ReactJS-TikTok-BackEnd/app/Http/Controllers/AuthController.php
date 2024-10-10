<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Models\VerifyRegister;
use App\Jobs\DeleteVerificationData;
use Carbon\Carbon;
use App\Jobs\DeletePropertyJob;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function sendEmailCreateAccount(Request $request) {
        if ($request->code == null) {
            $code = rand(1000, 9999);
    
         
            $verification = VerifyRegister::create([
                'email' => $request->email, 
                'verification_code' => $code, 
                'expires_at' => Carbon::now()->addMinutes(5),
            ]);
    
            Mail::send('emails.test', compact('code'), function($email) use ($request) {
              $email->to($request->email, 'ReactJSTikTok');
            });
            
           
                DeletePropertyJob::dispatch($request->email)->delay(now()->addMinutes(20));
                $verificationCount = VerifyRegister::where('email', $request->email)->count();
                if($verificationCount >=2) {
                    $oldVerification = VerifyRegister::where('email', $request->email)->first();
                    if ($oldVerification) {
                        $oldVerification->delete();
                    }
                }
                return response()->json([
                    'message' => 'Email sent',
                ]);
          
           
           
        } else {
          
            $maxCodeRecord = VerifyRegister::where('email', $request->email)->first();
          
           
            if ($maxCodeRecord && $request->code == $maxCodeRecord->verification_code) {
                $oldVerification = VerifyRegister::where('email', $request->email)->first();
                if ($oldVerification) {
                    $oldVerification->delete();
                }
                return response()->json([
                    'message' => 'Sent successfully',
                   
                ]);
            } else {
                return response()->json([
                    'message' => 'Sent failed',
                ]);
            }   
        }      
    }
    public function suggestNickName(Request $request) {
        $nicknameSuggest = [];
        for ($i = 0; $i < 4; $i++) {
            do {
                $nickNameRand = rand(100000000000, 999999999999);
                $nickNameUser = 'user' . $nickNameRand;
            } while (User::where('nickname', $nickNameUser)->exists());
            
            $nicknameSuggest[] = ['title' => $nickNameUser];
        }
        
        return response()->json([
            'message' => 'Suggest Nickname',
            'data' => $nicknameSuggest,
        ]);
    }
    
    public function register(Request $request) {

        $dob = $request->day . '/' . $request->month . '/' . $request->year;
    
        if($request->nickNameOption1 == "") {

            $user = User::create([
                'email' => $request->input('email'),
                'nickname' => $request->input('nickNameOption2'),
                'full_name'=> $request->input('nickNameOption2'),
                'DOB' => $dob,
                'password' => Hash::make($request->input('password')),
            ]);
            return response([
                'message' => 'create succesfully 2',
                'user' => $user,
              ]);
        } else {
            $user = User::create([
                'email' => $request->input('email'),
                'nickname' => $request->input('nickNameOption1'),
                'full_name'=> $request->input('nickNameOption1'),
                'DOB' => $dob,
                'password' => Hash::make($request->input('password')),
            ]);
            return response([
                'message' => 'create succesfully 1',
                'user' => $user,
              ]);
        }
    }
    public function login(Request $request){
        if(!Auth::attempt($request->only('email','password'))) {
              return response([
                  'message' => 'Invalid credentials',
              ],Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();;
        $token = $user->createToken('token')->plainTextToken;
        $cookie = cookie('jwt', $token, 60 * 3, null, null, false, true);
        return response([
          'message' => 'sucessed login',
          'token' => $token,
        ])->withCookie($cookie);
      }
    public function user(Request $request){
        $user = Auth::user();;
        return response([
            'message' => 'get succesful Information',
            'data' => $user,
        ],200);
    }
    public function logout() {
    
        $cookie = Cookie::forget('jwt');
        return response()->json([
            'message' => 'Successfully logged out', 
        ])->withCookie($cookie);
    }
   
}
