package com.kubaapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.graphics.Color;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.audiofx.Equalizer;
import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;

import com.bullhead.equalizer.EqualizerFragment;
import com.bullhead.equalizer.Settings;

public class EqualizerActivity extends AppCompatActivity {

  FrameLayout eqContainer;
  Equalizer equalizer;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_equalizer);

    eqContainer = findViewById(R.id.eqFrame);

    MediaPlayer mediaPlayer = new MediaPlayer();
    mediaPlayer.start();

    AudioManager audioManager = (AudioManager) getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
    mediaPlayer.setAudioSessionId(audioManager.generateAudioSessionId());
    mediaPlayer.setLooping(true);

    if(eqContainer.getVisibility() == View.GONE) {
      eqContainer.setVisibility(View.VISIBLE);
    }

    final int sessionId = mediaPlayer.getAudioSessionId();

    equalizer = new Equalizer(0, sessionId);
    equalizer.setEnabled(true);

    Settings.isEditing = false;
    EqualizerFragment equalizerFragment = EqualizerFragment.newBuilder()
      .setAccentColor(Color.parseColor("#D4BD85"))
      .setAudioSessionId(sessionId)
      .build();
    getSupportFragmentManager().beginTransaction()
      .replace(R.id.eqFrame, equalizerFragment)
      .commit();
  }
}