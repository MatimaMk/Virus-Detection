"use client";

import { useState } from "react";
import styles from "../../page.module.css";

interface LoginFormProps {
  onBack: () => void;
  onSwitchToRegister: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginForm({
  onBack,
  onSwitchToRegister,
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find user
      const user = users.find(
        (u: any) =>
          u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Store current user session
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            loginTime: new Date().toISOString(),
          })
        );

        setSuccessMessage("Login successful! Redirecting to dashboard...");

        // Simulate redirect delay
        setTimeout(() => {
          alert("Successfully logged in! Dashboard would load here.");
          onBack(); // For demo purposes, go back to landing
        }, 2000);
      } else {
        setErrors({
          general: "Invalid email or password. Please check your credentials.",
        });
      }
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <button
        className={styles.backButton}
        onClick={onBack}
        title="Back to home"
      >
        ←
      </button>

      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Welcome Back</h1>
          <p className={styles.formSubtitle}>
            Sign in to your CyberDefense AI account
          </p>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        {errors.general && (
          <div
            className={styles.errorMessage}
            style={{
              padding: "0.75rem",
              background: "rgba(220, 38, 38, 0.1)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(220, 38, 38, 0.2)",
              marginBottom: "1.5rem",
            }}
          >
            {errors.general}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.password ? styles.error : ""
              }`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className={styles.formSwitch}>
          Don't have an account?
          <button onClick={onSwitchToRegister}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
