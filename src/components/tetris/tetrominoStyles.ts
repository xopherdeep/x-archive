// Define the three types of block styles
export enum BlockStyle {
  BORDERED = "bordered", // I, O, T pieces - bordered squares with white centers
  DARK = "dark",         // J, S pieces - dark variation with 3D shadowing
  LIGHT = "light"        // Z, L pieces - light variation with 3D shadowing
}

// Map each tetromino to its block style
export const tetrominoStyleMap: Record<string, BlockStyle> = {
  I: BlockStyle.BORDERED,
  O: BlockStyle.BORDERED,
  T: BlockStyle.BORDERED,
  J: BlockStyle.DARK,
  S: BlockStyle.DARK,
  Z: BlockStyle.LIGHT,
  L: BlockStyle.LIGHT
};

// Generate color variations for a base color
export function generateColorVariations(baseColor: string): {
  light: string;
  dark: string;
  border: string;
  highlight: string;
  shadow: string;
} {
  // Convert hex to RGB for easier manipulation
  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  };

  // Clamp value between 0 and 255
  const clamp = (value: number): number => Math.min(255, Math.max(0, value));

  const [r, g, b] = hexToRgb(baseColor);

  // Create variations
  const light = rgbToHex(clamp(r * 1.3), clamp(g * 1.3), clamp(b * 1.3));
  const dark = rgbToHex(clamp(r * 0.7), clamp(g * 0.7), clamp(b * 0.7));
  const border = rgbToHex(clamp(r * 0.5), clamp(g * 0.5), clamp(b * 0.5));
  const highlight = rgbToHex(clamp(r * 1.5), clamp(g * 1.5), clamp(b * 1.5));
  const shadow = rgbToHex(clamp(r * 0.3), clamp(g * 0.3), clamp(b * 0.3));

  return { light, dark, border, highlight, shadow };
}

// Generate CSS for a tetromino block based on its style and color
export function generateBlockStyle(
  tetrominoKey: string,
  baseColor: string,
  blockSize: number = 30
): React.CSSProperties {
  const variations = generateColorVariations(baseColor);
  const style = tetrominoStyleMap[tetrominoKey];

  switch (style) {
    case BlockStyle.BORDERED:
      return {
        backgroundColor: variations.light,
        border: `2px solid ${variations.border}`,
        boxShadow: `inset 2px 2px 2px ${variations.highlight}, inset -2px -2px 2px ${variations.shadow}`,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '4px',
          left: '4px',
          right: '4px',
          bottom: '4px',
          backgroundColor: '#ffffff',
          opacity: 0.7,
        }
      } as React.CSSProperties;

    case BlockStyle.DARK:
      return {
        backgroundColor: variations.dark,
        border: `1px solid ${variations.border}`,
        boxShadow: `inset 3px 3px 3px ${variations.highlight}, inset -3px -3px 3px ${variations.shadow}`,
      } as React.CSSProperties;

    case BlockStyle.LIGHT:
      return {
        backgroundColor: variations.light,
        border: `1px solid ${variations.border}`,
        boxShadow: `inset 3px 3px 3px ${variations.highlight}, inset -3px -3px 3px ${variations.shadow}`,
      } as React.CSSProperties;

    default:
      return { backgroundColor: baseColor };
  }
}

// Level color themes
export function getLevelColorTheme(level: number): Record<string, string> {
  // Base colors for different level ranges
  const themes = [
    // Levels 1-5
    {
      I: "#00ffff", // Cyan
      O: "#ffff00", // Yellow
      T: "#dda0dd", // Purple
      S: "#7fff00", // Green
      Z: "#ff4500", // Red
      J: "#1e90ff", // Blue
      L: "#ff8c00", // Orange
    },
    // Levels 6-10
    {
      I: "#00cccc", // Darker Cyan
      O: "#cccc00", // Darker Yellow
      T: "#ba8bb0", // Darker Purple
      S: "#6fbf00", // Darker Green
      Z: "#e03e00", // Darker Red
      J: "#199ae6", // Darker Blue
      L: "#e68a00", // Darker Orange
    },
    // Levels 11+
    {
      I: "#009999", // Even Darker Cyan
      O: "#999900", // Even Darker Yellow
      T: "#a275a2", // Even Darker Purple
      S: "#5fb000", // Even Darker Green
      Z: "#c02e00", // Even Darker Red
      J: "#157bb8", // Even Darker Blue
      L: "#cc7000", // Even Darker Orange
    }
  ];

  // Select theme based on level
  if (level <= 5) return themes[0];
  if (level <= 10) return themes[1];
  return themes[2];
}

// Render a tetromino block with the appropriate style
export function renderTetrominoBlock(
  tetrominoKey: string,
  baseColor: string,
  level: number,
  size: number = 30
): React.CSSProperties {
  const style = generateBlockStyle(tetrominoKey, baseColor, size);
  
  // Add level-specific effects for higher levels
  if (level > 10) {
    return {
      ...style,
      animation: 'pulse 2s infinite',
    };
  }
  
  return style;
}

// Generate a bordered block with white center
export function createBorderedBlock(color: string, size: number = 30): React.CSSProperties {
  const variations = generateColorVariations(color);
  
  return {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: variations.light,
    border: `2px solid ${variations.border}`,
    boxSizing: 'border-box',
  } as React.CSSProperties;
}

// Generate a 3D-looking dark block
export function createDarkBlock(color: string, size: number = 30): React.CSSProperties {
  const variations = generateColorVariations(color);
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: variations.dark,
    border: `1px solid ${variations.border}`,
    boxShadow: `inset 3px 3px 3px ${variations.highlight}, inset -3px -3px 3px ${variations.shadow}`,
    boxSizing: 'border-box',
  } as React.CSSProperties;
}

// Generate a 3D-looking light block
export function createLightBlock(color: string, size: number = 30): React.CSSProperties {
  const variations = generateColorVariations(color);
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: variations.light,
    border: `1px solid ${variations.border}`,
    boxShadow: `inset 3px 3px 3px ${variations.highlight}, inset -3px -3px 3px ${variations.shadow}`,
    boxSizing: 'border-box',
  } as React.CSSProperties;
}
