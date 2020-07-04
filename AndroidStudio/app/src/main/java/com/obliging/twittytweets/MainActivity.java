package com.obliging.twittytweets;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ListView;
import android.widget.SearchView;

public class MainActivity extends AppCompatActivity {
    SearchView searchView;
    ListView listView;
    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        stopService(new Intent(this,NotificationService.class));
        super.onCreate(savedInstanceState);
        stopService(new Intent(this, NotificationService.class));
        setContentView(R.layout.activity_main);
        searchView = (SearchView) findViewById(R.id.mySearch);
        listView = (ListView) findViewById(R.id.myTweets);
        webView = (WebView) findViewById(R.id.webViewHome);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                String url = ("https://twitter.com/search?q=%23"+query+"&src=typed_query");
                webView.setWebViewClient(new WebViewClient()
                {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, String url)
                    {
                        return false;
                    }
                });
                webView.loadUrl(url);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });
    }

    @Override
    protected void onStop() {
        startService(new Intent(this, NotificationService.class));
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        startService(new Intent(this, NotificationService.class));
        super.onDestroy();
    }
}
