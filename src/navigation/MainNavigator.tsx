import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DashboardScreen from '../screens/main/DashboardScreen';
import BudgetScreen from '../screens/main/BudgetScreen';
import SavingsScreen from '../screens/main/SavingsScreen';
import EducationScreen from '../screens/main/EducationScreen';
import StatisticsScreen from '../screens/main/StatisticsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DashboardMain" 
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const BudgetStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="BudgetMain" 
      component={BudgetScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SavingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="SavingsMain" 
      component={SavingsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const EducationStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="EducationMain" 
      component={EducationScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const StatisticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="StatisticsMain" 
      component={StatisticsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Presupuesto':
              iconName = 'account-balance-wallet';
              break;
            case 'Ahorros':
              iconName = 'savings';
              break;
            case 'Educación':
              iconName = 'school';
              break;
            case 'Estadísticas':
              iconName = 'bar-chart';
              break;
            case 'Perfil':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Presupuesto" component={BudgetStack} />
      <Tab.Screen name="Ahorros" component={SavingsStack} />
      <Tab.Screen name="Educación" component={EducationStack} />
      <Tab.Screen name="Estadísticas" component={StatisticsStack} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
