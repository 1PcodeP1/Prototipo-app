# FinanSmart 💰

FinanSmart es una aplicación móvil desarrollada en React Native diseñada para ayudar a usuarios, especialmente jóvenes y estudiantes, a gestionar sus finanzas personales de manera inteligente y educativa.

## 🚀 Características Principales

### 📊 Dashboard Inteligente
- Visualización del balance actual y ahorros
- Actividad reciente de transacciones
- Recomendaciones personalizadas con IA
- Estadísticas financieras en tiempo real

### 💰 Gestión de Presupuesto
- Registro de gastos por categorías
- Seguimiento de límites de gasto
- Historial detallado de transacciones
- Alertas y notificaciones de gastos

### 🎯 Metas de Ahorro
- Creación de objetivos de ahorro personalizados
- Seguimiento visual del progreso
- Desafíos de ahorro gamificados
- Calculadora de tiempo para alcanzar metas

### 📚 Educación Financiera
- Lecciones interactivas sobre finanzas personales
- Sistema de logros y certificaciones
- Contenido adaptado a diferentes niveles
- Progreso de aprendizaje trackeable

### 📈 Análisis y Estadísticas
- Puntuación de salud financiera
- Gráficos de gastos e ingresos
- Tendencias de comportamiento financiero
- Reportes mensuales automatizados

## 🛠️ Tecnologías Utilizadas

### Frontend (React Native)
- **React Native 0.72.6** - Framework principal
- **React Navigation** - Navegación entre pantallas
- **React Native Paper** - Componentes de UI
- **React Native Chart Kit** - Gráficos y visualizaciones
- **React Native Vector Icons** - Iconografía
- **AsyncStorage** - Almacenamiento local
- **Axios** - Cliente HTTP

### Backend (Node.js)
- **Express.js** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Express Validator** - Validación de datos
- **CORS** - Configuración de CORS

## 📁 Estructura del Proyecto

```
finansmart/
├── src/                    # Código fuente React Native
│   ├── screens/           # Pantallas principales
│   │   ├── auth/         # Pantallas de autenticación
│   │   └── main/         # Pantallas principales de la app
│   ├── components/       # Componentes reutilizables
│   ├── navigation/       # Configuración de navegación
│   ├── styles/          # Colores, tipografías y estilos
│   ├── context/         # Context API para estado global
│   └── utils/           # Funciones auxiliares
├── backend/              # Servidor Node.js
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   ├── middleware/      # Middleware personalizado
│   └── config/          # Configuración de la base de datos
├── App.tsx              # Componente principal
├── package.json         # Dependencias del frontend
└── README.md           # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)
- MongoDB

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/finansmart.git
cd finansmart
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 4. Configurar variables de entorno
```bash
# En la carpeta backend, crear archivo .env
cp .env.example .env
# Editar .env con tus configuraciones
```

### 5. Iniciar MongoDB
```bash
# Asegúrate de que MongoDB esté ejecutándose
mongod
```

### 6. Iniciar el backend
```bash
cd backend
npm run dev
```

### 7. Iniciar el frontend
```bash
# En la raíz del proyecto
npm run android  # Para Android
npm run ios      # Para iOS
```

## 📱 Pantallas Principales

### Autenticación
- **Login** - Inicio de sesión
- **Registro** - Creación de cuenta

### Dashboard
- **Dashboard** - Vista principal con resumen financiero
- **Presupuesto** - Gestión de gastos e ingresos
- **Ahorros** - Metas y desafíos de ahorro
- **Educación** - Lecciones y contenido formativo
- **Estadísticas** - Análisis detallado de finanzas
- **Perfil** - Configuración de usuario

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `POST /api/auth/logout` - Cerrar sesión

### Transacciones
- `GET /api/transactions` - Obtener transacciones
- `POST /api/transactions` - Crear transacción
- `PUT /api/transactions/:id` - Actualizar transacción
- `DELETE /api/transactions/:id` - Eliminar transacción

### Presupuestos
- `GET /api/budgets` - Obtener presupuestos
- `POST /api/budgets` - Crear presupuesto
- `PUT /api/budgets/:id` - Actualizar presupuesto
- `DELETE /api/budgets/:id` - Eliminar presupuesto

### Ahorros
- `GET /api/savings/goals` - Obtener metas de ahorro
- `POST /api/savings/goals` - Crear meta de ahorro
- `POST /api/savings/goals/:id/contribute` - Contribuir a meta

### Educación
- `GET /api/education/lessons` - Obtener lecciones
- `POST /api/education/lessons/:id/start` - Iniciar lección
- `PUT /api/education/lessons/:id/progress` - Actualizar progreso

### Estadísticas
- `GET /api/statistics/overview` - Resumen general
- `GET /api/statistics/expenses` - Estadísticas de gastos
- `GET /api/statistics/savings` - Estadísticas de ahorros

## 🎨 Diseño y UX

La aplicación utiliza un diseño moderno y minimalista con:
- **Paleta de colores** profesional y accesible
- **Tipografía** clara y legible
- **Iconografía** consistente y significativa
- **Animaciones** suaves y fluidas
- **Navegación** intuitiva y fácil de usar

## 🔒 Seguridad

- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Validación de datos en frontend y backend
- Rate limiting para prevenir abuso
- CORS configurado correctamente

## 📊 Base de Datos

### Modelos principales:
- **User** - Información de usuarios
- **Transaction** - Transacciones financieras
- **Budget** - Presupuestos por categoría
- **SavingsGoal** - Metas de ahorro
- **Lesson** - Contenido educativo
- **UserProgress** - Progreso de aprendizaje

## 🚀 Despliegue

### Backend
El backend puede desplegarse en:
- Heroku
- DigitalOcean
- AWS
- Google Cloud Platform

### Frontend
El frontend puede compilarse para:
- Google Play Store (Android)
- Apple App Store (iOS)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Desarrollador Principal** - Tu Nombre
- **Diseñador UX/UI** - Nombre del Diseñador
- **Desarrollador Backend** - Nombre del Backend Dev

## 📞 Contacto

- **Email** - tu-email@ejemplo.com
- **LinkedIn** - [Tu Perfil](https://linkedin.com/in/tu-perfil)
- **GitHub** - [@tu-usuario](https://github.com/tu-usuario)

---

¡Gracias por usar FinanSmart! 💰✨