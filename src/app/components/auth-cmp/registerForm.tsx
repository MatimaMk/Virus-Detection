"use client";

import { useState } from "react";
import styles from "../../page.module.css";
interface RegisterFormProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  organization: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  organization?: string;
  general?: string;
}

export default function RegisterForm({
  onBack,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    organization: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    // Organization validation
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization name is required";
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
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if user already exists
      const userExists = existingUsers.some(
        (user: any) => user.email === formData.email
      );

      if (userExists) {
        setErrors({
          general:
            "An account with this email already exists. Please use a different email or sign in.",
        });
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullName: formData.fullName.trim(),
        email: formData.email,
        password: formData.password, // In production, this would be hashed
        role: formData.role,
        organization: formData.organization.trim(),
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      // Add to users array
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setSuccessMessage("Account created successfully! You can now sign in.");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        organization: "",
      });

      // Auto-redirect to login after success
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
          <h1 className={styles.formTitle}>Create Account</h1>
          <p className={styles.formSubtitle}>
            Join CyberDefense AI to secure your enterprise
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
            <label htmlFor="fullName" className={styles.label}>
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.fullName ? styles.error : ""
              }`}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.fullName && (
              <span className={styles.errorMessage}>{errors.fullName}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address *
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
            <label htmlFor="organization" className={styles.label}>
              Organization *
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.organization ? styles.error : ""
              }`}
              placeholder="Enter your organization name"
              disabled={isLoading}
            />
            {errors.organization && (
              <span className={styles.errorMessage}>{errors.organization}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="role" className={styles.label}>
              Role *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.role ? styles.error : ""}`}
              disabled={isLoading}
              style={{ cursor: "pointer" }}
            >
              <option value="">Select your role</option>
              <option value="security_analyst">Security Analyst</option>
              <option value="administrator">System Administrator</option>
              <option value="compliance_officer">Compliance Officer</option>
              <option value="it_manager">IT Manager</option>
              <option value="ciso">Chief Information Security Officer</option>
              <option value="other">Other</option>
            </select>
            {errors.role && (
              <span className={styles.errorMessage}>{errors.role}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password *
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
              placeholder="Create a strong password"
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
            <div className={styles.warningMessage}>
              Password must be at least 8 characters with uppercase, lowercase,
              and number.
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.confirmPassword ? styles.error : ""
              }`}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className={styles.formSwitch}>
          Already have an account?
          <button onClick={onSwitchToLogin}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
