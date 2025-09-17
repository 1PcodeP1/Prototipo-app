import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Button, Switch, List } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';
import { 
  screenData, 
  getSpacing, 
  getFontSizes, 
  getComponentSizes,
  getResponsiveStyle,
  scaleWidth,
  scaleHeight 
} from '../../utils/responsive';

// Obtener valores responsive
const responsiveSpacing = getSpacing;
const responsiveFontSizes = getFontSizes();
const responsiveComponentSizes = getComponentSizes();

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: logout },
      ]
    );
  };

  const menuItems = [
    {
      id: '1',
      title: 'Configuración de cuenta',
      icon: '👤',
      onPress: () => {},
    },
    {
      id: '2',
      title: 'Notificaciones',
      icon: '🔔',
      onPress: () => {},
    },
    {
      id: '3',
      title: 'Privacidad y seguridad',
      icon: '🔒',
      onPress: () => {},
    },
    {
      id: '4',
      title: 'Categorías personalizadas',
      icon: '📂',
      onPress: () => {},
    },
    {
      id: '5',
      title: 'Exportar datos',
      icon: '📥',
      onPress: () => {},
    },
    {
      id: '6',
      title: 'Ayuda y soporte',
      icon: '❓',
      onPress: () => {},
    },
    {
      id: '7',
      title: 'Acerca de',
      icon: 'ℹ️',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Información del usuario */}
        <View style={styles.profileContainer}>
          <Card style={styles.profileCard}>
            <Card.Content>
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={{ fontSize: 40, color: colors.surface }}>👤</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
                  <Text style={styles.userEmail}>{user?.email || 'usuario@ejemplo.com'}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Estadísticas del usuario */}
        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text style={styles.statsTitle}>Mi Progreso</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>45</Text>
                  <Text style={styles.statLabel}>Días activo</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Metas alcanzadas</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>8.5</Text>
                  <Text style={styles.statLabel}>Puntuación</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Configuraciones */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          
          {menuItems.map((item) => (
            <Card key={item.id} style={styles.menuCard}>
              <List.Item
                title={item.title}
                left={(props) => (
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
                    <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                  </View>
                )}
                right={(props) => (
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                    <Text style={{ fontSize: 16, color: colors.textSecondary }}>›</Text>
                  </View>
                )}
                onPress={item.onPress}
                style={styles.menuItem}
              />
            </Card>
          ))}
        </View>

        {/* Configuraciones de notificaciones */}
        <View style={styles.notificationsContainer}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          
          <Card style={styles.notificationCard}>
            <Card.Content>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Recordatorios de gastos</Text>
                  <Text style={styles.notificationDescription}>
                    Recibe alertas cuando te acerques a tu límite de presupuesto
                  </Text>
                </View>
                <Switch
                  value={true}
                  onValueChange={() => {}}
                  color={colors.primary}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.notificationCard}>
            <Card.Content>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Metas de ahorro</Text>
                  <Text style={styles.notificationDescription}>
                    Notificaciones sobre el progreso de tus metas
                  </Text>
                </View>
                <Switch
                  value={true}
                  onValueChange={() => {}}
                  color={colors.primary}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.notificationCard}>
            <Card.Content>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Consejos financieros</Text>
                  <Text style={styles.notificationDescription}>
                    Recibe consejos y tips diarios
                  </Text>
                </View>
                <Switch
                  value={false}
                  onValueChange={() => {}}
                  color={colors.primary}
                />
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Botón de cerrar sesión */}
        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={colors.error}
          >
            🚪 Cerrar Sesión
          </Button>
        </View>

        {/* Información de la app */}
        <View style={styles.appInfoContainer}>
          <Text style={styles.appInfoText}>
            FinanSmart v1.0.0
          </Text>
          <Text style={styles.appInfoText}>
            Desarrollado con ❤️ para ayudarte a gestionar tus finanzas
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    padding: spacing.lg,
  },
  profileCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body,
    color: colors.textSecondary,
  },
  statsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  statsCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  statsTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  settingsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  menuCard: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
  },
  menuItem: {
    paddingVertical: spacing.sm,
  },
  notificationsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  notificationCard: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  notificationTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  notificationDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  logoutContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  logoutButton: {
    borderRadius: borderRadius.md,
    borderColor: colors.error,
  },
  appInfoContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  appInfoText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
});

export default ProfileScreen;
