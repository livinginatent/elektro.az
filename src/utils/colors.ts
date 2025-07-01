// colors.ts

export const colors = {
  primary: {
    blue: "#023e8a",
    lightBlue: "#caf0f8",
    hoverBlue: "#0077b6",
    slate: "#1d242a",
  },
  secondary: {
    gray: "#f7f7ff", // Light Red
    main: "#E64A19", // Dark Red
    dark: "#BF360C", // Even Darker Red
    contrastText: "#fff", // White text for contrast
  },
  background: {
    default: "#f5f5f5", // Light Grey Background
    paper: "#ffffff", // White Background for Paper-like components
  },
  text: {
    primary: "#212121", // Dark Grey Text (Primary)
    secondary: "#757575", // Medium Grey Text (Secondary)
    disabled: "#BDBDBD", // Light Grey Text (Disabled)
    hint: "#9E9E9E", // Hint Text Color
  },
  action: {
    active: "#1976D2", // Active Button or Link Color
    hover: "#1565C0", // Hover Effect for Actions
    selected: "#0D47A1", // Selected Item Color
    disabled: "#B0BEC5", // Disabled Action Color
  },
  error: {
    main: "#D32F2F", // Red Color for Error
    light: "#E57373", // Light Red for Lighter Errors
    dark: "#C62828", // Darker Red for Strong Errors
    contrastText: "#fff", // White Text for Contrast in Error Cases
  },
  success: {
    main: "#388E3C", // Green Color for Success
    light: "#66BB6A", // Lighter Green for Minor Success
    dark: "#2C6B2F", // Darker Green for Strong Success
    contrastText: "#fff", // White Text for Contrast in Success Cases
  },
  warning: {
    main: "#FF9800", // Orange Color for Warnings
    light: "#FFB74D", // Lighter Orange for Minor Warnings
    dark: "#F57C00", // Darker Orange for Strong Warnings
    contrastText: "#fff", // White Text for Contrast in Warning Cases
  },
};

export type Colors = typeof colors;
