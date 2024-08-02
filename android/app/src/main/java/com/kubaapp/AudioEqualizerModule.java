package com.kubaapp;

import android.content.Context;
import android.media.MediaPlayer;
import android.media.audiofx.DynamicsProcessing;
import android.media.audiofx.Equalizer;
import android.media.AudioManager;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import android.content.Context;

public class AudioEqualizerModule extends ReactContextBaseJavaModule {

  private static final String MODULE_NAME = "AudioEqualizerModule";
  private MediaPlayer mMediaPlayer;
  private int sessionId = 0;
  private static final int EQ_MAX_VALUE = 24;
  private static final int HALF_EQ_MAX_VALUE = EQ_MAX_VALUE / 2;
  private boolean totalEnable = true;
  private static final int PRIORITY = Integer.MAX_VALUE;
  private DynamicsProcessing dp;
  private DynamicsProcessing.Eq eq;
  private static final int mVariant = 0;
  private static final int mChannelCount = 1;
  private static final int[] bandVal = { 31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000 };
  private static final int maxBandCount = bandVal.length;

  private int[] currentEqualizerValues;
  private DynamicsProcessing.Mbc mbc;
  private DynamicsProcessing.Limiter limiter;
  private Equalizer equalizer;
  private AudioManager audioManager;
  private boolean isAudioPlaying = false;

  // Limiter
  private static final boolean LIMITER_DEFAULT_ENABLED = true;
  private static final int LIMITER_DEFAULT_LINK_GROUP = 0;// ;
  private static final float LIMITER_DEFAULT_ATTACK_TIME = 1; // ms
  private static final float LIMITER_DEFAULT_RELEASE_TIME = 60; // ms
  private static final float LIMITER_DEFAULT_RATIO = 10; // N:1
  private static final float LIMITER_DEFAULT_THRESHOLD = -2; // dB
  private static final float LIMITER_DEFAULT_POST_GAIN = 0; // dB

  public AudioEqualizerModule(ReactApplicationContext reactContext) {
    super(reactContext);

    audioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
    checkIfAudioIsPlaying();

    startMediaPlayer(reactContext);

    equalizer = new Equalizer(PRIORITY, 0);
    equalizer.setEnabled(false);

    setEffectEnable(totalEnable);

    initializeEqualizer();
  }

  @NonNull
  @Override
  public String getName() {
    return MODULE_NAME;
  }

  private void startMediaPlayer(ReactApplicationContext reactContext) {
    try {
      if (isAudioPlaying) {
        mMediaPlayer = MediaPlayer.create(reactContext, sessionId);
        mMediaPlayer.start();
        initDynamicsProcessing();
      }
    } catch (Exception e) {
      // TODO: handle exception
    }
  }

  private void initializeEqualizer() {
    if (Build.VERSION.SDK_INT >= 28) {
      currentEqualizerValues = new int[maxBandCount];
      for (int i = 0; i < maxBandCount; i++) {
        currentEqualizerValues[i] = 0;
      }
      // Inicializar DynamicsProcessing e Eq
      // DynamicsProcessing.Config.Builder builder = new
      // DynamicsProcessing.Config.Builder(0, 1, true, maxBandCount, true,
      // maxBandCount, true, maxBandCount, true);
      // dp = new DynamicsProcessing(0, sessionId, builder.build());
      // eq = new DynamicsProcessing.Eq(true, true, maxBandCount);
    }
  }

  private void checkIfAudioIsPlaying() {
    // Verifica se há áudio sendo reproduzido
    isAudioPlaying = audioManager.isMusicActive();

    // Se houver áudio em reprodução, obtém o sessionId
    if (isAudioPlaying) {
      sessionId = audioManager.generateAudioSessionId();
      Log.d("MainActivity", "Audio is playing. sessionId: " + sessionId);
    } else {
      Log.d("MainActivity", "No audio playing.");
    }
  }

  @ReactMethod
  public void setBandGain(int band, int level, Promise promise) {
    if (currentEqualizerValues == null) {
      promise.reject("set_band_gain_error", "currentEqualizerValues is null");
      return;
    }
    if (Build.VERSION.SDK_INT >= 28) {
      currentEqualizerValues[band] = level;
      if (dp != null && eq != null) {
        try {
          eq.getBand(band).setEnabled(true);
          eq.getBand(band).setGain(currentEqualizerValues[band]);
          dp.setPreEqBandAllChannelsTo(band, eq.getBand(band));
          dp.setPostEqBandAllChannelsTo(band, eq.getBand(band));
          promise.resolve(true);
          return;
        } catch (UnsupportedOperationException e) {
          Log.e("TAGF", "setBandGain_Exception2!");
          e.printStackTrace();
          promise.reject("set_band_gain_error", e);
          return;
        }
      }
    }
    promise.reject("set_band_gain_error", "dp or eq is null, or SDK version < 28");
  }

  @ReactMethod
  private void setInputGain(float val, Promise promise) {
    if (Build.VERSION.SDK_INT >= 28) {
      if (dp != null) {
        try {
          dp.setInputGainAllChannelsTo(val);
          promise.resolve("gain => " + val);
        } catch (Error e) {
          e.printStackTrace();
          promise.reject("set_input_gain_error", e);
        }
      }
    }

    promise.reject("set_input_gain_error", "dp or eq is null, or SDK version < 28");
  }

  public boolean setBandGain(int band, int level) {
    if (currentEqualizerValues == null)
      return false;
    if (Build.VERSION.SDK_INT >= 28) {
      currentEqualizerValues[band] = level;
      if (dp != null && eq != null) {
        try {
          eq.getBand(band).setEnabled(true);
          eq.getBand(band).setGain(currentEqualizerValues[band]);
          dp.setPreEqBandAllChannelsTo(band, eq.getBand(band));
          dp.setPostEqBandAllChannelsTo(band, eq.getBand(band));
          return true;
        } catch (UnsupportedOperationException e) {
          Log.e("TAGF", "setBandGain_Exception2!");
          e.printStackTrace();
        }
      }
    }
    return false;
  }

  @ReactMethod
  private void getBands(Promise promise) {
    try {
      WritableArray bandList = Arguments.createArray();
      for (int band : bandVal) {
        bandList.pushInt(band);
      }
      promise.resolve(bandList);
    } catch (Exception e) {
      promise.reject("get bands", e);
    }
  }

  @ReactMethod
  private void getCurrentEqualizerValues(Promise promise) {
    try {
      WritableArray equalizerValuesList = Arguments.createArray();
      for (int value : currentEqualizerValues) {
        equalizerValuesList.pushInt(value);
      }
      promise.resolve(equalizerValuesList);
    } catch (Exception e) {
      promise.reject("get currentEqualizerValues", e);
    }
  }

  private void initDynamicsProcessing() {
    if (Build.VERSION.SDK_INT >= 28) {
      if (dp == null) {
        DynamicsProcessing.Config.Builder builder = new DynamicsProcessing.Config.Builder(mVariant, mChannelCount, true,
            maxBandCount, true, maxBandCount, true, maxBandCount, true);
        dp = new DynamicsProcessing(PRIORITY, sessionId, builder.build());
        dp.setEnabled(totalEnable);

        eq = new DynamicsProcessing.Eq(true, true, maxBandCount);
        eq.setEnabled(totalEnable);

        mbc = new DynamicsProcessing.Mbc(true, true, maxBandCount);
        mbc.setEnabled(totalEnable);

        limiter = new DynamicsProcessing.Limiter(true, LIMITER_DEFAULT_ENABLED, LIMITER_DEFAULT_LINK_GROUP,
            LIMITER_DEFAULT_ATTACK_TIME, LIMITER_DEFAULT_RELEASE_TIME, LIMITER_DEFAULT_RATIO, LIMITER_DEFAULT_THRESHOLD,
            LIMITER_DEFAULT_POST_GAIN);
        limiter.setEnabled(totalEnable);
      }
      try {
        for (int i = 0; i < maxBandCount; i++) {
          eq.getBand(i).setCutoffFrequency(bandVal[i]);
          setBandGain(i, currentEqualizerValues[i]);

          mbc.getBand(i).setCutoffFrequency(bandVal[i]);

        }
        dp.setPreEqAllChannelsTo(eq);
        dp.setMbcAllChannelsTo(mbc);
        dp.setPostEqAllChannelsTo(eq);
        dp.setLimiterAllChannelsTo(limiter);
      } catch (Exception e) {
        Log.e("TAGF", "initDynamicsProcessing Exception");
        e.printStackTrace();
      }
    }
  }

  private void setEffectEnable(boolean isEnable) {
    if (Build.VERSION.SDK_INT >= 28) {
      if (dp != null) {
        dp.setEnabled(isEnable);// isEnable
        dp.release();
        dp = null;
      }
      if (isEnable) {
        DynamicsProcessing.Config.Builder builder = new DynamicsProcessing.Config.Builder(mVariant, mChannelCount, true,
            maxBandCount, true, maxBandCount, true, maxBandCount, true);
        dp = new DynamicsProcessing(PRIORITY, sessionId, builder.build());
        dp.setEnabled(true);// true

        setEffectEnableBase(true);// true
      }
    }
  }

  private void setEffectEnableBase(boolean isEnable) {
    if (Build.VERSION.SDK_INT >= 28) {
      if (dp != null) {
        dp.setEnabled(isEnable);// isEnable
        dp.release();
        dp = null;
      }
      if (isEnable) {
        DynamicsProcessing.Config.Builder builder = new DynamicsProcessing.Config.Builder(mVariant, mChannelCount, true,
            maxBandCount, true, maxBandCount, true, maxBandCount, true);
        dp = new DynamicsProcessing(PRIORITY, sessionId, builder.build());
        dp.setEnabled(true);// true

        if (dp != null) {
          dp.setEnabled(false);// false
          dp.release();
          dp = null;
        }
        initDynamicsProcessing();
      }
    }
  }

}