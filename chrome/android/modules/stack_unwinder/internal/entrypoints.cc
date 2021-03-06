// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "base/android/jni_utils.h"
#include "chrome/android/modules/stack_unwinder/internal/jni_registration.h"

extern "C" {
// This JNI registration method is found and called by module framework code.
__attribute__((visibility("default"))) bool JNI_OnLoad_stack_unwinder(
    JNIEnv* env) {
  if (!base::android::IsSelectiveJniRegistrationEnabled(env) &&
      !stack_unwinder::RegisterNonMainDexNatives(env)) {
    return false;
  }
  if (!stack_unwinder::RegisterMainDexNatives(env)) {
    return false;
  }
  return true;
}

}  // extern "C"
