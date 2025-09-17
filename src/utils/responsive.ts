import { useState, useEffect } from 'react';
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensiones base para el diseño (iPhone 6/7/8)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

export const screenData = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isTablet: SCREEN_WIDTH >= 768,
  isSmallScreen: SCREEN_WIDTH < 350,
  isLargeScreen: SCREEN_WIDTH >= 414,
};

// Función para escalar horizontalmente
export const scaleWidth = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

// Función para escalar verticalmente
export const scaleHeight = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

// Función para escalar texto de manera responsiva
export const scaleText = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  const newSize = size * scale;
  return Math.max(newSize, size * 0.8); // Mínimo 80% del tamaño original
};

// Función para obtener padding/margin responsivo
export const getSpacing = {
  xs: scaleWidth(4),
  sm: scaleWidth(8),
  md: scaleWidth(12),
  lg: scaleWidth(16),
  xl: scaleWidth(20),
  xxl: scaleWidth(24),
  xxxl: scaleWidth(32),
};

// Breakpoints para diferentes tamaños de pantalla
export const breakpoints = {
  small: 350,
  medium: 414,
  large: 768,
  xlarge: 1024,
};

// Función para obtener columnas en grid según el ancho de pantalla
export const getGridColumns = (): number => {
  if (screenData.width < breakpoints.small) return 1;
  if (screenData.width < breakpoints.medium) return 2;
  if (screenData.width < breakpoints.large) return 2;
  return 3;
};

// Función para obtener tamaño de fuente responsivo por categoría
export const getFontSizes = () => ({
  caption: scaleText(12),
  body: scaleText(14),
  subheading: scaleText(16),
  title: scaleText(18),
  headline: scaleText(20),
  display: scaleText(24),
});

// Función para obtener dimensiones de tarjetas/componentes
export const getComponentSizes = () => ({
  cardBorderRadius: scaleWidth(8),
  buttonHeight: scaleHeight(48),
  inputHeight: scaleHeight(56),
  iconSize: scaleWidth(24),
  avatarSize: scaleWidth(40),
  progressBarHeight: scaleHeight(8),
});

// Función para obtener estilos responsive basados en el tipo de pantalla
export const getResponsiveStyle = (styles: {
  base: any;
  small?: any;
  medium?: any;
  large?: any;
  tablet?: any;
}) => {
  let responsiveStyle = { ...styles.base };

  if (screenData.isSmallScreen && styles.small) {
    responsiveStyle = { ...responsiveStyle, ...styles.small };
  } else if (screenData.isLargeScreen && styles.large) {
    responsiveStyle = { ...responsiveStyle, ...styles.large };
  } else if (styles.medium) {
    responsiveStyle = { ...responsiveStyle, ...styles.medium };
  }

  if (screenData.isTablet && styles.tablet) {
    responsiveStyle = { ...responsiveStyle, ...styles.tablet };
  }

  return responsiveStyle;
};

// Hook personalizado para recalcular dimensiones cuando cambie la orientación
export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove?.();
  }, []);

  return dimensions;
};