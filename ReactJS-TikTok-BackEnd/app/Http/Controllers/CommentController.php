<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function commentVideo(Request $request) {
        $comment = Comment::create([
            'video_id' => $request->video_id, 
            'user_id' => $request->user_id, 
            'comment_description' => $request->comment_description,
        ]);
        if($comment) {
            return response([
                'message' => 'comment succesful',
                'data' => $comment,
            ],200);
        }
    }
    public function getCommentVideo(Request $request) {
        $comments = Comment::with('user')->where("video_id", $request->video_id)->orderBy('created_at', 'desc')->get();
        if($comments) {
            return response([
                'message' => 'get comments succesful',
                'data' => $comments,
            ],200);
        }
    }
}
