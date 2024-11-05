<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Video;


class LikeController extends Controller
{
    public function likeVideo(Request $request) {
        $like = Like::where('video_id', $request->video_id)
            ->where('user_id', $request->user_id)
            ->first();
        if($like) {
            $like->delete(); 
            return response(['message' => 'Unliked successfull'], 200);
        } else {
            Like::create([
                'video_id' => $request->video_id,
                'user_id' => $request->user_id,
            ]);
            return response(['message' => 'Liked successfull'], 200);
        }
    }
    public function getTotalLikeVideo(Request $request) {
        $likeCount = Like::where('video_id', $request->video_id)->count();
      
            return response()->json([
                'message' => 'get likes video succesfull',
                'data' => $likeCount,
            ], 200);
        
    }
    public function checkLikeVideo(Request $request)
    {
        $liked = Like::where('video_id', $request->video_id)
            ->where('user_id', $request->user_id)
            ->exists();
    
        return response()->json(['liked' => $liked], 200);
    }
    public function getLikedVideo(Request $request) {
        $userId = $request->user_id;
        $likedVideos = Video::with('likes')
        ->whereHas('likes', function($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->get();
        return response()->json([
            'liked_videos' => $likedVideos,
        ]);
    }
}
