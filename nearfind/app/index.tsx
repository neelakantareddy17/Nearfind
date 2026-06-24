import { useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { demoCredentials } from "../lib/auth/mockAuth";
import { COLORS, RADIUS, SPACING } from "../lib/theme";

export default function Home() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>(demoCredentials.customer.email);
  const [password, setPassword] = useState<string>(demoCredentials.customer.password);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMessage("Enter an email and password to continue.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const user = await signIn(email.trim(), password);
      router.replace(user.role === "customer" ? "/customer" : `/${user.role}`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Top spacing */}
        <View style={{ height: 80 }} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>N</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign in</Text>

        {/* Large spacing */}
        <View style={{ height: SPACING.xl }} />

        {/* Form */}
        <View style={styles.form}>
          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="name@example.com"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
            />
          </View>

          {/* Password Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
            />
          </View>

          {/* Error Message */}
          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {/* Large spacing */}
          <View style={{ height: SPACING.lg }} />

          {/* Sign In Button */}
          <Button
            label={loading ? "" : "Sign in"}
            onPress={handleSignIn}
            disabled={loading}
            loading={loading}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>

        {/* Helper text */}
        <Text style={styles.helperText}>
          Mock authentication. Use customer@nearfind.com / password
        </Text>

        {/* Bottom spacing */}
        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  brandMark: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.button,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.text,
  },
  brandMarkText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
  },
  form: {
    gap: SPACING.lg,
  },
  fieldContainer: {
    gap: SPACING.sm,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.text,
  },
  input: {
    borderRadius: RADIUS.input,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    fontSize: 15,
    fontWeight: "400",
  },
  errorText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "500",
  },
  helperText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
});