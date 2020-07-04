package com.obliging.twittytweets;

import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
public class NotificationService extends Service {
    Handler handler = new Handler();
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
    public void pushNotify(String type){
        Intent intent = new Intent(this, NotificationView.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,0,intent,0);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this)
                .setContentTitle("Service Status")
                .setContentText("Status:"+type)
                .setSmallIcon(R.drawable.ic_launcher_foreground)
                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);
        NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(this);
        notificationManagerCompat.notify(0,builder.build());
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
//        Toast.makeText(this, "Running Service", Toast.LENGTH_SHORT).show();
        handler.postDelayed(runnable, 1800000);
        return START_STICKY;
    }
   private Runnable runnable = new Runnable() {
       @Override
       public void run() {
           pushNotify("Your Tweets are Waiting");
           handler.postDelayed(this,1800000);
       }
   };


    @Override
    public void onDestroy() {
//        Toast.makeText(this, "Stopping", Toast.LENGTH_SHORT).show();
        handler.removeCallbacks(runnable);
        super.onDestroy();
    }
}
