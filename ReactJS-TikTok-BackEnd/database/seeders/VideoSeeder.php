<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run()
    {
        // Dữ liệu mẫu
        $videos = [
            [
                'user_id' => 1,
                'description' => 'Video cua nhan 1',
                'path' => 'videos/7aHTencwGHHM4Bs9R1wSWeWXRbriZW2ApnVy3Grx.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'description' => 'Video cua nhan 2',
                'path' => 'videos/hqUZdRcfbZiwlofrdR2zEPtEeVjpO8VJIaxeFdD1.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'description' => 'Video cua tuan 1',
                'path' => 'videos/m3CaU6t5kNFu0NVxyfmtAEJFOkPnwhoqZXOuHy3u.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'description' => 'Video cua tuan 2',
                'path' => 'videos/D8gqDMtInf2YFngih8WqIHFkZaQnT47VAuxPXszs.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Chèn dữ liệu vào bảng videos
        Video::insert($videos);
    }
}
