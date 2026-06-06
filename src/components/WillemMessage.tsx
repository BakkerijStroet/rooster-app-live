import type { CSSProperties } from "react";

export type WillemMessageVariant = "info" | "success" | "warning" | "empty";

export type WillemMessageProps = {
  message: string;
  variant?: WillemMessageVariant;
};

const WILLEM_AVATAR_SRC = "/mascot/willem/willem-avatar-v1.png";

const variantStyles: Record<
  WillemMessageVariant,
  {
    background: string;
    border: string;
    accent: string;
    title: string;
  }
> = {
  info: {
    background: "#fffaf3",
    border: "#f4d5b7",
    accent: "#f47b20",
    title: "#7a3510"
  },
  success: {
    background: "#f6fbf4",
    border: "#cfe6c8",
    accent: "#6f9f3a",
    title: "#315d1e"
  },
  warning: {
    background: "#fff8eb",
    border: "#f0c98e",
    accent: "#d2691e",
    title: "#78350f"
  },
  empty: {
    background: "#fbfaf8",
    border: "#e8ded3",
    accent: "#c76b2a",
    title: "#5f4a3c"
  }
};

const styles: Record<string, CSSProperties> = {
  card: {
    alignItems: "center",
    border: "1px solid",
    borderLeftWidth: 5,
    borderRadius: 8,
    boxShadow: "0 12px 32px rgba(64, 43, 24, 0.08)",
    boxSizing: "border-box",
    display: "flex",
    gap: 14,
    maxWidth: "100%",
    padding: "14px 16px",
    width: "100%"
  },
  avatarWrap: {
    alignItems: "center",
    borderRadius: "50%",
    display: "flex",
    flex: "0 0 auto",
    height: 58,
    justifyContent: "center",
    overflow: "hidden",
    width: 58
  },
  avatar: {
    display: "block",
    height: "100%",
    objectFit: "cover",
    width: "100%"
  },
  content: {
    minWidth: 0
  },
  title: {
    display: "block",
    fontSize: 14,
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: 4
  },
  message: {
    color: "#342923",
    fontSize: 15,
    lineHeight: 1.45,
    margin: 0,
    overflowWrap: "anywhere"
  }
};

export function WillemMessage({ message, variant = "info" }: WillemMessageProps) {
  const theme = variantStyles[variant] || variantStyles.info;

  return (
    <aside
      aria-live="polite"
      data-willem-message-variant={variant}
      style={{
        ...styles.card,
        background: theme.background,
        borderColor: theme.border,
        borderLeftColor: theme.accent
      }}
    >
      <span
        aria-hidden="true"
        style={{
          ...styles.avatarWrap,
          background: `linear-gradient(135deg, ${theme.accent} 0%, #fff5eb 100%)`
        }}
      >
        <img
          alt=""
          decoding="async"
          src={WILLEM_AVATAR_SRC}
          style={styles.avatar}
        />
      </span>
      <div style={styles.content}>
        <strong style={{ ...styles.title, color: theme.title }}>Willem zegt:</strong>
        <p style={styles.message}>{message}</p>
      </div>
    </aside>
  );
}

export default WillemMessage;
