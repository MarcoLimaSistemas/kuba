package com.kubaapp;

import android.media.MediaPlayer;
import android.media.audiofx.Equalizer;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class EqualizerModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "EqualizerModule";
    private Equalizer mEqualizer;
    private MediaPlayer mPlayer;

    public EqualizerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void initEqualizer(Promise promise) {
        try {
            // Inicializa o MediaPlayer
            mPlayer = MediaPlayer.create(getReactApplicationContext(), R.raw.beautiful);
            // Inicializa o Equalizer
            mEqualizer = new Equalizer(0, mPlayer.getAudioSessionId());
            mEqualizer.setEnabled(true);
            mPlayer.start();
            promise.resolve("Equalizer initialized");
        } catch (Exception e) {
            promise.reject("Error initializing equalizer", e);
        }
    }

    @ReactMethod
    public void setBandLevel(int band, int level, Promise promise) {
        try {
            short minEQLevel = mEqualizer.getBandLevelRange()[0];
            mEqualizer.setBandLevel((short) band, (short) level);
            promise.resolve("Band level set");
        } catch (Exception e) {
            promise.reject("Error setting band level", e);
        }
    }

    @ReactMethod
    public void getNumberOfBands(Promise promise) {
        try {
            int numberOfBands = mEqualizer.getNumberOfBands();
            promise.resolve(numberOfBands);
        } catch (Exception e) {
            promise.reject("Error getting number of bands", e);
        }
    }

    @ReactMethod
    public void getBandLevelRange(Promise promise) {
        try {
            short[] range = mEqualizer.getBandLevelRange();
            promise.resolve(range);
        } catch (Exception e) {
            promise.reject("Error getting band level range", e);
        }
    }

    @ReactMethod
    public void getBandFreq(int band, Promise promise) {
        try {
            int freq = mEqualizer.getCenterFreq((short) band);
            promise.resolve(freq);
        } catch (Exception e) {
            promise.reject("Error getting band frequency", e);
        }
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        if (mEqualizer != null) {
            mEqualizer.release();
        }
        if (mPlayer != null) {
            mPlayer.release();
        }
    }
}