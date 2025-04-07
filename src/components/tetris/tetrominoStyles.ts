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
  const levelColors = [
    "#00ffff", // Level 1: Cyan
    "#ff8c00", // Level 2: Orange
    "#dda0dd", // Level 3: Purple
    "#7fff00", // Level 4: Green
    "#ff4500", // Level 5: Red
    "#1e90ff", // Level 6: Blue
    "#ffff00", // Level 7: Yellow
    "#ff69b4", // Level 8: Hot Pink
    "#32cd32", // Level 9: Lime Green
    "#9370db", // Level 10: Medium Purple
    "#ff6347", // Level 11: Tomato
    "#4169e1", // Level 12: Royal Blue
    "#ffa500", // Level 13: Orange
    "#8a2be2", // Level 14: Blue Violet
    "#00fa9a", // Level 15: Medium Spring Green
    "#dc143c", // Level 16: Crimson
    "#00bfff", // Level 17: Deep Sky Blue
    "#ff00ff", // Level 18: Magenta
    "#adff2f", // Level 19: Green Yellow
    "#ff1493", // Level 20: Deep Pink
  ];
  
  // Get the base color for the current level (cycle through colors for levels > 20)
  const baseColor = levelColors[(level - 1) % levelColors.length];
  
  // Return the same base color for all tetrominos at this level
  return {
    I: baseColor,
    O: baseColor,
    T: baseColor,
    S: baseColor,
    Z: baseColor,
    J: baseColor,
    L: baseColor,
  };
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
        border: `3px solid ${borderColor}`,
        backgroundImage: `radial-gradient(circle at center, white 30%, transparent 70%)`,
      };
      
    case BlockStyle.DARK: // J, S
      return {
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        boxShadow: `inset 3px 3px 3px rgba(255,255,255,0.2), inset -3px -3px 4px rgba(0,0,0,0.5)`,
        backgroundImage: `linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.2) 100%)`,
      };
      
    case BlockStyle.LIGHT: // Z, L
      return {
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        boxShadow: `inset 4px 4px 5px rgba(255,255,255,0.8), inset -1px -1px 2px rgba(0,0,0,0.05)`,
        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)`,
      };
      
    default:
      return { backgroundColor: color };
  }
}
