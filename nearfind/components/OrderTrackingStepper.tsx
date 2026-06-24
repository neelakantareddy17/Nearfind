import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../lib/theme";

interface OrderTrackingStepperProps {
  currentStatus: string;
  steps?: string[];
}

const DEFAULT_STEPS = [
  "PLACED",
  "ACCEPTED",
  "PACKED",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "DELIVERED",
];

export function OrderTrackingStepper({
  currentStatus,
  steps = DEFAULT_STEPS,
}: OrderTrackingStepperProps) {
  const currentIndex = steps.indexOf(currentStatus);

  const formatStepLabel = (step: string): string => {
    return step
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <View key={step} style={styles.stepWrapper}>
            {/* Circle */}
            <View style={styles.circleContainer}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.circleCompleted,
                  isCurrent && styles.circleCurrent,
                  isPending && styles.circlePending,
                ]}
              >
                {isCompleted && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
                {isCurrent && (
                  <View style={styles.currentDot} />
                )}
              </View>

              {/* Vertical line */}
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    isCompleted && styles.lineCompleted,
                    !isCompleted && styles.linePending,
                  ]}
                />
              )}
            </View>

            {/* Label */}
            <Text
              style={[
                styles.label,
                isCompleted && styles.labelCompleted,
                isCurrent && styles.labelCurrent,
                isPending && styles.labelPending,
              ]}
            >
              {formatStepLabel(step)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },
  circleContainer: {
    alignItems: "center",
    marginRight: SPACING.lg,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  circleCompleted: {
    backgroundColor: COLORS.text,
    borderColor: COLORS.text,
  },
  circleCurrent: {
    backgroundColor: "#FFFFFF",
    borderColor: COLORS.text,
  },
  circlePending: {
    backgroundColor: "transparent",
    borderColor: COLORS.disabled,
  },
  checkmark: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  currentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.text,
  },
  line: {
    width: 2,
    height: 48,
    marginTop: SPACING.sm,
  },
  lineCompleted: {
    backgroundColor: COLORS.text,
  },
  linePending: {
    backgroundColor: COLORS.disabled,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    marginTop: SPACING.xs,
  },
  labelCompleted: {
    color: COLORS.text,
  },
  labelCurrent: {
    color: COLORS.text,
    fontWeight: "600",
  },
  labelPending: {
    color: COLORS.textSecondary,
  },
});
