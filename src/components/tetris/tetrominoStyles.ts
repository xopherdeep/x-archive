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

// Get tetromino block style based on its type and color
export function getTetrominoBlockStyle(key: string, color: string, size: number = 30): React.CSSProperties {
  const style = tetrominoStyleMap[key];
  
  // Create a darker border color
  const darkerColor = color.replace(/^#/, '');
  const r = parseInt(darkerColor.substr(0, 2), 16) * 0.6;
  const g = parseInt(darkerColor.substr(2, 2), 16) * 0.6;
  const b = parseInt(darkerColor.substr(4, 2), 16) * 0.6;
  const borderColor = `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  
  switch (style) {
    case BlockStyle.BORDERED: // I, O, T
      return {
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        backgroundImage: `radial-gradient(circle at center, white 30%, transparent 70%)`,
      };
      
    case BlockStyle.DARK: // J, S
      return {
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        boxShadow: `inset 2px 2px 2px rgba(255,255,255,0.3), inset -2px -2px 2px rgba(0,0,0,0.3)`,
      };
      
    case BlockStyle.LIGHT: // Z, L
      return {
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        boxShadow: `inset 2px 2px 2px rgba(255,255,255,0.5), inset -2px -2px 2px rgba(0,0,0,0.2)`,
      };
      
    default:
      return { backgroundColor: color };
  }
}
