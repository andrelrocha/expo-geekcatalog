export const colors = {
  blue: '#87CEEB',
  green: '#98FB98',
  redWeak: '#FFB6C1',
  redWeakDarker: '#DAAEB6',
  redStrong: '#E51A0F',
  redMid: '#FF3131',
  greenStrong: '#008000',
  black: '#000000',
  blackOpacity: hexToRGBA('#000000', 0.5),
  sage: '#CCC9A1',
  sageOpacity: hexToRGBA('#CCC9A1', 0.3),
  greenWeak: '#F0FFCE',
  lightBlue: '#E4D9FF',
  whiteSmoke: "#F4F4F4",
  buttonBlue: '#007bff',
  lightGray: '#D3D3D3',
  gray: '#808080',
  grayOpacity: hexToRGBA('#808080', 0.3),
  grayPlaceholder: hexToRGBA('#808080', 0.5),
};

function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}