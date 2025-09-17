import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Tipos para las rutas del Tab Navigator principal
export type MainTabParamList = {
  Dashboard: undefined;
  Presupuesto: undefined;
  Ahorros: undefined;
  Educación: undefined;
  Estadísticas: undefined;
  Perfil: undefined;
};

// Tipos para las rutas de Auth
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Tipos para los Stack Navigators anidados
export type DashboardStackParamList = {
  DashboardMain: undefined;
};

export type BudgetStackParamList = {
  BudgetMain: undefined;
};

export type SavingsStackParamList = {
  SavingsMain: undefined;
};

export type EducationStackParamList = {
  EducationMain: undefined;
};

export type StatisticsStackParamList = {
  StatisticsMain: undefined;
};

// Props para las pantallas del Tab Navigator
export type MainTabScreenProps<T extends keyof MainTabParamList> = BottomTabScreenProps<
  MainTabParamList,
  T
>;

// Props para las pantallas de Auth
export type AuthStackScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<
  AuthStackParamList,
  T
>;

// Props para las pantallas de Dashboard Stack
export type DashboardStackScreenProps<T extends keyof DashboardStackParamList> = CompositeScreenProps<
  StackScreenProps<DashboardStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

// Props para las pantallas de Budget Stack
export type BudgetStackScreenProps<T extends keyof BudgetStackParamList> = CompositeScreenProps<
  StackScreenProps<BudgetStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

// Props para las pantallas de Savings Stack
export type SavingsStackScreenProps<T extends keyof SavingsStackParamList> = CompositeScreenProps<
  StackScreenProps<SavingsStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

// Props para las pantallas de Education Stack
export type EducationStackScreenProps<T extends keyof EducationStackParamList> = CompositeScreenProps<
  StackScreenProps<EducationStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

// Props para las pantallas de Statistics Stack
export type StatisticsStackScreenProps<T extends keyof StatisticsStackParamList> = CompositeScreenProps<
  StackScreenProps<StatisticsStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainTabParamList {}
  }
}