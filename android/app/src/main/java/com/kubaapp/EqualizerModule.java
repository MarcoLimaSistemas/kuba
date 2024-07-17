package com.kubaapp;

import android.media.audiofx.Equalizer;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class EqualizerModule extends ReactContextBaseJavaModule {
  private Equalizer equalizer;

  public EqualizerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "EqualizerModule";
  }

  @ReactMethod
  public void createEqualizer(int audioSessionId, Callback successCallback) {
    try {
      equalizer = new Equalizer(0, audioSessionId);
      equalizer.setEnabled(true);
      successCallback.invoke(true);
    } catch (Exception e) {
      successCallback.invoke(false, e.getMessage());
    }
  }

  @ReactMethod
  public void setBandLevel(int band, int level) {
    if (equalizer != null) {
      equalizer.setBandLevel((short) band, (short) level);
    }
  }

  @ReactMethod
  public void getBandLevelRange(Callback callback) {
    if (equalizer != null) {
      short[] range = equalizer.getBandLevelRange();
      WritableMap map = Arguments.createMap();
      map.putInt("min", range[0]);
      map.putInt("max", range[1]);
      callback.invoke(map);
    }
  }

  @ReactMethod
  public void getNumberOfBands(Callback callback) {
    if (equalizer != null) {
      callback.invoke(equalizer.getNumberOfBands());
    }
  }

  @ReactMethod
  public void getCenterFreq(int band, Callback callback) {
    if (equalizer != null) {
      callback.invoke(equalizer.getCenterFreq((short) band));
    }
  }

  @ReactMethod
  public void releaseEqualizer() {
    if (equalizer != null) {
      equalizer.release();
      equalizer = null;
    }
  }
}