package com.kubaapp;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class EqualizerModule extends ReactContextBaseJavaModule {
  public EqualizerModule(ReactApplicationContext reactApplicationContext) {
    super(reactApplicationContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "EqualizerModule";
  }
  
  @ReactMethod
  void navigateToEqualizer() {
    Activity activity = getCurrentActivity();
    Intent intent = new Intent(activity, EqualizerActivity.class);
    activity.startActivity(intent);
  }
}
