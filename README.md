# Sistema de Gestión OTEC

Prototipo visual de un sistema de gestión corporativa para Organismos Técnicos de Capacitación (OTEC).

## Características Principales

### Dashboard Interactivo
- Resumen general de estadísticas en tiempo real
- Accesos rápidos a las funciones principales
- Panel de actividad reciente y notificaciones
- Indicadores de estado del sistema

### Gestión de Solicitudes
- Listado completo de solicitudes de capacitación
- Filtrado avanzado por estado, coordinador, fecha y búsqueda
- Estados de seguimiento: evaluación OTIC, coordinación, ejecución, finalización
- Creación y edición de solicitudes
- Vista detallada de cada solicitud
- Sistema de paginación

### Gestión de Relatores
- Registro y administración de equipo docente
- Visualización de disponibilidad
- Perfiles detallados con información de contacto y especialidades

### Gestión de Empresas
- Catálogo de empresas clientes
- Información de contacto y representantes
- Historial de capacitaciones

### Reportes y Análisis
- Generación de reportes mensuales
- Métricas de rendimiento
- Análisis de cursos realizados

### Interfaz de Usuario
- Diseño moderno y responsive
- Modo claro/oscuro
- Navegación intuitiva con sidebar
- Componentes reutilizables
- Optimizado para desktop y móvil

## Estructura del Proyecto

```
OTEC-prototipo/
├── index.html         # Página principal (GitHub Pages)
├── pages/             # Páginas HTML del sistema
├── assets/
│   ├── css/          # Estilos globales
│   └── js/
│       ├── components/    # Componentes reutilizables
│       ├── data/          # Datos mock
│       ├── pages/         # Scripts específicos por página
│       └── utils/         # Utilidades y helpers
└── README.md
```

## Demo en Línea

El prototipo está desplegado en GitHub Pages y puede accederse en:

**[https://kriptaman10.github.io/OTEC-prototipo/](https://kriptaman10.github.io/OTEC-prototipo/)**

## Instalación Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Kriptaman10/OTEC-prototipo.git
   cd OTEC-prototipo
   ```

2. Abrir `index.html` en un navegador web

3. No requiere instalación de dependencias ni servidor

## Despliegue en GitHub Pages

El proyecto está configurado para funcionar automáticamente en GitHub Pages:

1. El archivo `index.html` en la raíz sirve como punto de entrada
2. Todas las rutas están configuradas para funcionar desde la raíz del repositorio
3. Los assets se cargan desde CDN (Tailwind, Google Fonts, Material Icons)

Para desplegar en tu propio repositorio:

1. Haz fork del repositorio
2. Ve a Settings → Pages
3. Selecciona la rama `main` como fuente
4. El sitio estará disponible en `https://tu-usuario.github.io/OTEC-prototipo/`

## Uso

El sistema está diseñado como un prototipo visual funcional. Todas las funcionalidades utilizan datos mock almacenados localmente.

### Navegación

- **Inicio**: Dashboard con resumen general y accesos rápidos
- **Solicitudes**: Gestión completa de solicitudes de capacitación
- **Relatores**: Administración del equipo docente
- **Reportes**: Análisis y métricas de rendimiento
- **Empresas**: Catálogo de empresas clientes
- **Configuración**: Ajustes del sistema

## Versión

v1.0 - Prototipo Visual

## Certificación

Sistema conforme a ISO 9001:2015
