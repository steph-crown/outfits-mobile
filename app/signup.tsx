import { LockIcon, MailIcon } from "@/components/icons";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button, InputField, toast } from "@/components/ui";
import { BrandColors } from "@/constants/Colors";
import { Fonts, FontStyles } from "@/constants/Fonts";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

interface SignUpForm {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [form, setForm] = useState<SignUpForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    // Show general toast if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignUpForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleContinueWithGoogle = () => {
    console.log("Continue with Google pressed");
    // Implement Google sign-in logic
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) return;

    try {
      clearError();
      await register({
        email: form.email,
        password: form.password,
      });

      // Show success toast and navigate to home
      toast.success("Account created successfully! Welcome to OutFits 🎉");
      router.replace("/(tabs)");
    } catch (err) {
      void err;
      // console.error("Error creating account:", err);
      // The error message is set in the auth store, use that for the toast
      const errorMessage = error || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleLogIn = () => {
    console.log("Navigate to log in");
    router.push("/login");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              // xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M17 11H9.41002L12.71 7.71C12.8983 7.52169 13.0041 7.2663 13.0041 7C13.0041 6.7337 12.8983 6.4783 12.71 6.29C12.5217 6.10169 12.2663 5.99591 12 5.99591C11.7337 5.99591 11.4783 6.10169 11.29 6.29L6.29002 11.29C6.19898 11.3851 6.12761 11.4972 6.08002 11.62C5.98 11.8635 5.98 12.1365 6.08002 12.38C6.12761 12.5027 6.19898 12.6149 6.29002 12.71L11.29 17.71C11.383 17.8037 11.4936 17.8781 11.6154 17.9289C11.7373 17.9797 11.868 18.0058 12 18.0058C12.132 18.0058 12.2627 17.9797 12.3846 17.9289C12.5065 17.8781 12.6171 17.8037 12.71 17.71C12.8037 17.617 12.8781 17.5064 12.9289 17.3846C12.9797 17.2627 13.0058 17.132 13.0058 17C13.0058 16.868 12.9797 16.7373 12.9289 16.6154C12.8781 16.4936 12.8037 16.383 12.71 16.29L9.41002 13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8947 12.5196 18 12.2652 18 12C18 11.7348 17.8947 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11Z"
                fill="black"
              />
            </Svg>
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Create your <Text style={styles.titleAccent}>Outfits</Text>
            {"\n"}account
          </Text>
          <Text style={styles.subtitle}>Let us create your account</Text>
        </View>

        {/* Continue with Google Button */}
        <Button
          title="Continue with Google"
          onPress={handleContinueWithGoogle}
          variant="outline"
          fullWidth
          style={styles.googleButton}
          icon={<GoogleIcon size={24} />}
        />

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="Email address"
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
            icon={<MailIcon />}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
            wrapperStyle={{
              marginBottom: 24,
            }}
          />

          <InputField
            label="Password"
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
            icon={<LockIcon />}
            isPassword
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.password}
          />
        </View>

        {/* Create Account Button */}
        <Button
          title="Create account"
          onPress={handleCreateAccount}
          variant="primary"
          size="medium"
          fullWidth
          loading={isLoading}
          style={styles.createAccountButton}
        />

        {/* Already have account */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogIn}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    // width: 40,
    // height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    // fontSize: 24,
    color: BrandColors.primaryBlack,
    // backgroundColor: "red",
    marginLeft: -6,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    ...FontStyles.heading1,
    color: BrandColors.primaryBlack,
    lineHeight: 36,
    marginBottom: 8,
  },
  titleAccent: {
    color: BrandColors.primary,
  },
  subtitle: {
    ...FontStyles.bodyMedium,
    color: BrandColors.black3,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    ...FontStyles.body,
    color: "#DC2626",
    fontSize: 14,
  },
  googleButton: {
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BrandColors.black4,
  },
  dividerText: {
    ...FontStyles.body,
    color: BrandColors.black3,
    paddingHorizontal: 16,
  },
  form: {
    marginBottom: 32,
  },
  createAccountButton: {
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    ...FontStyles.bodyMedium,
    color: BrandColors.black3,
    fontSize: 14,
  },
  loginLink: {
    ...FontStyles.body,
    color: BrandColors.primary,
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: Fonts.MonaSans.Bold,
  },
});
