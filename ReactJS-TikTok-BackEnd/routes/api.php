<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('sendEmailCreateAccount', [AuthController::class, 'sendEmailCreateAccount']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});
Route::get('suggestNickName', [AuthController::class, 'suggestNickName']);
Route::post('updateUser', [UserController::class, 'updateUser']);
Route::post('sendCodeResetPassword', [UserController::class, 'sendCodeResetPassword']);
Route::post('uploadVideo', [UserController::class, 'uploadVideo']);
Route::post('getUserInfo', [UserController::class, 'getUserInfo']);
Route::get('getAllUser', [UserController::class, 'getAllUser']);
Route::post('FollowUSer', [UserController::class, 'FollowUSer']);
Route::get('checkFollowing', [UserController::class, 'checkFollowing']);
Route::get('getFollowingUsers', [UserController::class, 'getFollowingUsers']);
Route::get('getSuggestedUsers', [UserController::class, 'getSuggestedUsers']);
Route::get('getVideoFollowingUsers', [UserController::class, 'getVideoFollowingUsers']);
Route::get('getVideoSuggested', [UserController::class, 'getVideoSuggested']);
Route::post('commentVideo', [CommentController::class, 'commentVideo']);
Route::get('getCommentVideo', [CommentController::class, 'getCommentVideo']);
Route::post('likeVideo', [LikeController::class, 'likeVideo']);
Route::get('getTotalLikeVideo', [LikeController::class, 'getTotalLikeVideo']);
Route::post('checkLikeVideo', [LikeController::class, 'checkLikeVideo']);
Route::get('getTotalCommentVideo', [CommentController::class, 'getTotalCommentVideo']);
Route::get('getLikedVideo', [LikeController::class, 'getLikedVideo']);