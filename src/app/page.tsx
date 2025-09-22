"use client";

import { useState } from "react";
import styles from "./page.module.css";
import LoginForm from "../app/components/auth-cmp/loginForm";
import RegisterForm from "../app/components/auth-cmp/registerForm";

export default function Home() {
  const [currentView, setCurrentView] = useState<
    "landing" | "login" | "register"
  >("landing");

  const renderContent = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onBack={() => setCurrentView("landing")}
            onSwitchToRegister={() => setCurrentView("register")}
          />
        );
      case "register":
        return (
          <RegisterForm
            onBack={() => setCurrentView("landing")}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        );
      default:
        return (
          <div className={styles.landingContent}>
            <div className={styles.hero}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  AI-Powered Cybersecurity
                  <span className={styles.heroSubtitle}>Defence System</span>
                </h1>
                <p className={styles.heroDescription}>
                  Next-generation enterprise security platform combining
                  deep-learning anomaly detection with blockchain-based
                  immutable logging to defend against advanced AI-driven
                  cyberattacks in real time.
                </p>
                <div className={styles.heroFeatures}>
                  <div className={styles.heroFeature}>
                    <div className={styles.heroFeatureIcon}>🔍</div>
                    <span>Real-time Threat Detection</span>
                  </div>
                  <div className={styles.heroFeature}>
                    <div className={styles.heroFeatureIcon}>⛓️</div>
                    <span>Blockchain Security Logs</span>
                  </div>
                  <div className={styles.heroFeature}>
                    <div className={styles.heroFeatureIcon}>🤖</div>
                    <span>AI-Powered Analysis</span>
                  </div>
                  <div className={styles.heroFeature}>
                    <div className={styles.heroFeatureIcon}>🛡️</div>
                    <span>Enterprise Protection</span>
                  </div>
                </div>
                <div className={styles.heroActions}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => setCurrentView("register")}
                  >
                    Get Started
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={() => setCurrentView("login")}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.features}>
              <div className={styles.container}>
                <div className={styles.featureGrid}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>🧠</div>
                    <h3 className={styles.featureTitle}>
                      AI/ML Threat Detection
                    </h3>
                    <p className={styles.featureDescription}>
                      Deep learning models identify zero-day exploits,
                      polymorphic malware, and AI-driven phishing attacks in
                      real-time network data.
                    </p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>⛓️</div>
                    <h3 className={styles.featureTitle}>Blockchain Logging</h3>
                    <p className={styles.featureDescription}>
                      Hyperledger Fabric ensures 100% immutable security logs,
                      creating tamper-proof audit trails for compliance.
                    </p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>⚡</div>
                    <h3 className={styles.featureTitle}>Automated Response</h3>
                    <p className={styles.featureDescription}>
                      AI-driven containment reduces Mean Time to Respond from
                      hours to milliseconds with autonomous threat mitigation.
                    </p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>📊</div>
                    <h3 className={styles.featureTitle}>
                      Real-time Monitoring
                    </h3>
                    <p className={styles.featureDescription}>
                      Live dashboards with interactive visualizations for
                      continuous security monitoring and threat analysis.
                    </p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>🛡️</div>
                    <h3 className={styles.featureTitle}>Compliance Ready</h3>
                    <p className={styles.featureDescription}>
                      GDPR, HIPAA, and POPIA compliant with automated report
                      generation and cryptographic verification.
                    </p>
                  </div>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>🔗</div>
                    <h3 className={styles.featureTitle}>
                      Enterprise Integration
                    </h3>
                    <p className={styles.featureDescription}>
                      Seamless integration with ERP, CRM, and IoT systems
                      through secure APIs and scalable architecture.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonials}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>
                  Trusted by Industry Leaders
                </h2>
                <div className={styles.testimonialGrid}>
                  <div className={styles.testimonial}>
                    <div className={styles.testimonialContent}>
                      "CyberDefense AI reduced our incident response time by 90% and prevented 3 major attacks in the first month."
                    </div>
                    <div className={styles.testimonialAuthor}>
                      <strong>Sarah Mitchell</strong>
                      <span>CISO, TechCorp</span>
                    </div>
                  </div>
                  <div className={styles.testimonial}>
                    <div className={styles.testimonialContent}>
                      "The blockchain logging feature has been crucial for our compliance audits. Immutable logs save us weeks of work."
                    </div>
                    <div className={styles.testimonialAuthor}>
                      <strong>Michael Chen</strong>
                      <span>Security Director, FinanceMax</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.security}>
              <div className={styles.container}>
                <div className={styles.securityContent}>
                  <div className={styles.securityText}>
                    <h2 className={styles.sectionTitle}>
                      Enterprise-Grade Security
                    </h2>
                    <ul className={styles.securityList}>
                      <li>SOC 2 Type II Certified</li>
                      <li>ISO 27001 Compliant</li>
                      <li>GDPR & HIPAA Ready</li>
                      <li>Zero Trust Architecture</li>
                      <li>End-to-End Encryption</li>
                      <li>24/7 Security Operations Center</li>
                    </ul>
                  </div>
                  <div className={styles.securityBadges}>
                    <div className={styles.badge}>🏆 SOC 2</div>
                    <div className={styles.badge}>🔒 ISO 27001</div>
                    <div className={styles.badge}>🛡️ GDPR</div>
                    <div className={styles.badge}>⚡ Zero Trust</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cta}>
              <div className={styles.container}>
                <h2 className={styles.ctaTitle}>
                  Ready to Secure Your Enterprise?
                </h2>
                <p className={styles.ctaDescription}>
                  Join 500+ organizations protecting themselves against next-generation cyber threats.
                </p>
                <div className={styles.ctaStats}>
                  <div className={styles.ctaStat}>
                    <span>500+</span>
                    <small>Enterprise Clients</small>
                  </div>
                  <div className={styles.ctaStat}>
                    <span>99.9%</span>
                    <small>Uptime SLA</small>
                  </div>
                  <div className={styles.ctaStat}>
                    <span>24/7</span>
                    <small>Expert Support</small>
                  </div>
                </div>
                <button
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
                  onClick={() => setCurrentView("register")}
                >
                  Start Free Trial
                </button>
                <p className={styles.ctaNote}>
                  No credit card required • 30-day free trial • Setup in minutes
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🛡️</span>
            <span className={styles.logoText}>CyberDefense AI</span>
          </div>
          {currentView === "landing" && (
            <nav className={styles.nav}>
              <button
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setCurrentView("login")}
              >
                Sign In
              </button>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => setCurrentView("register")}
              >
                Get Started
              </button>
            </nav>
          )}
        </div>
      </header>
      {renderContent()}
    </main>
  );
}
