package com.invoiceapp
import android.util.Log
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


/**
 *
 * For Android, Java/Kotlin native modules are written as
 * classes that extend ReactContextBaseJavaModule and implement
 * the functionality required by JavaScript.
 */


class GreetingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    /**
     * All Java/Kotlin native modules in Android need to implement the getName() method.
     * This method returns a string, which represents the name of the native module. The native module can then be accessed in JavaScript using its name.
     * For example, in the below code snippet, getName() returns "GreetingModule".
     *
     *
     * const {GreetingModule} = ReactNative.NativeModules;
     */
    override fun getName() = "GreetingModule"

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun greetHuman(name: String, message: String):String {
        Log.d("Greeting", "Hello, $name, $message")
        return "Hello, $name, $message"
    }
}