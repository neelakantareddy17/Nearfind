import { useMemo, useState } from "react";
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

import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { demoCredentials } from "../lib/auth/mockAuth";
import { COLORS, RADIUS, SHADOW, SPACING } from "../lib/theme";

export default function Home() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>(demoCredentials.customer.email);
  const [password, setPassword] = useState<string>(demoCredentials.customer.password);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const credentialTiles = useMemo(
    () => [
      {
        label: "Customer",
        email: demoCredentials.customer.email,
        password: demoCredentials.customer.password,
      },
      {
        label: "Retailer",
        email: demoCredentials.retailer.email,
        password: demoCredentials.retailer.password,
      },
      {
        label: "Delivery",
        email: demoCredentials.delivery.email,
        password: demoCredentials.delivery.password,
      },
      {
        label: "Admin",
        email: demoCredentials.admin.email,
        password: demoCredentials.admin.password,
      },
    ],
    [],
  );

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
        <View style={styles.topBrand}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>N</Text>
          </View>
          <Text style={styles.brandName}>NearFind</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>Sign in to NearFind</Text>
          <Text style={styles.subtitle}>
            A clean marketplace workflow for customers, retailers, delivery partners, and admins.
          </Text>
        </View>

        <View style={styles.loginCard}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="name@nearfind.com"
            placeholderTextColor={COLORS.muted}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter password"
            placeholderTextColor={COLORS.muted}
            style={styles.input}
          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Pressable
            onPress={handleSignIn}
            disabled={loading}
            style={({ pressed }) => [styles.primaryButton, (pressed || loading) && styles.primaryButtonPressed]}
          >
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Sign in</Text>}
          </Pressable>

          <Text style={styles.helperText}>
            Mock authentication only. Firebase Auth can replace this later without changing route logic.
          </Text>
        </View>

        <View style={styles.demoCard}>
          <Text style={styles.sectionTitle}>Demo credentials</Text>
          <Text style={styles.sectionHint}>Use any of these pairs to jump into a role-specific dashboard.</Text>

          <View style={styles.demoList}>
            {credentialTiles.map((credential) => (
              <Pressable
                key={credential.label}
                onPress={() => {
                  setEmail(credential.email);
                  setPassword(credential.password);
                }}
                style={({ pressed }) => [styles.demoTile, pressed && styles.demoTilePressed]}
              >
                <View>
                  <Text style={styles.demoLabel}>{credential.label}</Text>
                  <Text style={styles.demoEmail}>{credential.email}</Text>
                </View>
                <StatusBadge status="Accepted" compact />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Designed for mobile first</Text>
          <Text style={styles.footerText}>
            White background, black text, subtle green accents, and simple touch targets for a polished Uber-style
            login feel.
          </Text>
        </View>
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
    paddingTop: 64,
    paddingBottom: 28,
    gap: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  topBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
  },
  brandMarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  brandName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  hero: {
    gap: 10,
    paddingTop: 8,
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
    maxWidth: 340,
  },
  loginCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    ...SHADOW,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 4,
  },
  input: {
    borderRadius: RADIUS.input,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#FAFBFA",
    color: COLORS.text,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
  },
  errorText: {
    color: "#B42318",
    fontSize: 13,
    fontWeight: "700",
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    minHeight: 52,
  },
  primaryButtonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  helperText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  demoCard: {
    backgroundColor: COLORS.accentSoft,
    borderRadius: 28,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: "#CDE9D4",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  sectionHint: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
  },
  demoList: {
    gap: 10,
    marginTop: 8,
  },
  demoTile: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D9E9DE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  demoTilePressed: {
    opacity: 0.95,
  },
  demoLabel: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  demoEmail: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  footerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    gap: 8,
  },
  footerTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
  },
});