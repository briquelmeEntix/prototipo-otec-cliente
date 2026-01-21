# Portales por Rol - Documentación

## Vista General

El sistema OTEC tiene portales especializados según el rol del usuario. En el **prototipo HTML**, todas las opciones son visibles para facilitar el testing. En **producción (C#/ASP.NET Core)**, cada portal solo será visible según el rol del usuario autenticado.

---

## Portales Disponibles

### 1. Portal Relator (`pages/portal-relator.html`)

**Rol requerido:** `Relator`

**Descripción:** Portal para instructores/relatores donde pueden ver y gestionar sus cursos asignados.

**Páginas relacionadas:**
- `portal-relator.html` - Dashboard con lista de cursos activos y finalizados
- `relator-participantes.html` - Gestión de aprobación de participantes de un curso

**Funcionalidades:**
- Ver cursos asignados (activos y finalizados)
- Gestionar participantes de cada curso
- Aprobar/reprobar alumnos con checkbox simplificado
- Ver resultados históricos de cursos finalizados
- Descargar materiales y documentación

**Badge en menú:** Verde (`bg-green-100 text-green-700`)

---

### 2. Portal OTIC (`pages/portal-otic.html`)

**Rol requerido:** `OTIC`

**Descripción:** Portal para usuarios OTIC donde pueden revisar y aprobar/rechazar cotizaciones de capacitación.

**Funcionalidades:**
- Ver solicitudes pendientes de aprobación
- Revisar detalles de cotizaciones (empresa, curso, participantes, fechas, monto)
- Aprobar cotizaciones
- Rechazar cotizaciones (con motivo)
- Ver historial de solicitudes procesadas
- Filtrar y buscar solicitudes

**Badge en menú:** Morado (`bg-purple-100 text-purple-700`)

---

## Estructura de Archivos

```
/OTEC-prototipo/
├── pages/
│   ├── portal-relator.html        ← Portal Relator (nuevo)
│   ├── relator-participantes.html ← Gestión participantes (nuevo)
│   ├── portal-otic.html           ← Portal OTIC (nuevo)
│   └── ... (otras páginas)
├── assets/
│   └── css/
│       └── global.css             ← Estilos de badges actualizados
└── PORTALES-POR-ROL.md            ← Esta documentación
```

---

## Navegación en el Prototipo

En el prototipo HTML, **todas las opciones del menú lateral son visibles** para facilitar el testing y validación del diseño/UX.

Los nuevos portales aparecen en una sección separada "Portales" en el menú lateral, con badges de colores indicando el rol requerido:

```
├── Inicio
├── Solicitudes
├── Relatores
├── Certificados
├── Reportes
├── Empresas
├── ─────────────────────
├── PORTALES
│   ├── Portal Relator    [Relator]  ← badge verde
│   └── Aprobación OTIC   [OTIC]     ← badge morado
├── ─────────────────────
├── CONFIGURACIÓN
│   └── Ajustes
```

---

## Implementación en ASP.NET Core (Producción)

### Controladores Requeridos

```csharp
// 1. PortalRelatorController.cs
[Authorize(Roles = "Relator")]
public class PortalRelatorController : Controller
{
    // GET: /PortalRelator
    public IActionResult Index()
    {
        // Listar cursos asignados al relator actual
        return View();
    }

    // GET: /PortalRelator/Participantes/{cursoId}
    public IActionResult Participantes(int cursoId)
    {
        // Gestionar participantes del curso
        return View();
    }

    // POST: /PortalRelator/GuardarResultados
    [HttpPost]
    public IActionResult GuardarResultados(ResultadosViewModel model)
    {
        // Guardar aprobados/reprobados
        return RedirectToAction("Index");
    }
}

// 2. PortalOticController.cs
[Authorize(Roles = "OTIC")]
public class PortalOticController : Controller
{
    // GET: /PortalOtic
    public IActionResult Index()
    {
        // Listar solicitudes pendientes de aprobación
        return View();
    }

    // POST: /PortalOtic/Aprobar/{id}
    [HttpPost]
    public IActionResult Aprobar(int id)
    {
        // Aprobar cotización
        return RedirectToAction("Index");
    }

    // POST: /PortalOtic/Rechazar/{id}
    [HttpPost]
    public IActionResult Rechazar(int id, string motivo)
    {
        // Rechazar cotización con motivo
        return RedirectToAction("Index");
    }
}
```

### Menú Dinámico en _Layout.cshtml

```razor
@* Sección de Portales - Solo visible según rol *@
@if (User.IsInRole("Relator") || User.IsInRole("OTIC") || User.IsInRole("Admin"))
{
    <div class="pt-4 pb-2 px-3">
        <p class="text-[10px] uppercase tracking-wider text-[#616e89] font-bold">Portales</p>
    </div>
}

@if (User.IsInRole("Relator") || User.IsInRole("Admin"))
{
    <a asp-controller="PortalRelator" asp-action="Index"
       class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors">
        <span class="material-symbols-outlined text-[24px]">school</span>
        <span class="text-sm font-medium">Portal Relator</span>
        <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">Relator</span>
    </a>
}

@if (User.IsInRole("OTIC") || User.IsInRole("Admin"))
{
    <a asp-controller="PortalOtic" asp-action="Index"
       class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors">
        <span class="material-symbols-outlined text-[24px]">task_alt</span>
        <span class="text-sm font-medium">Aprobación OTIC</span>
        <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">OTIC</span>
    </a>
}
```

### Políticas de Autorización en Program.cs

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SoloRelatores", policy =>
        policy.RequireRole("Relator", "Admin"));

    options.AddPolicy("SoloOTIC", policy =>
        policy.RequireRole("OTIC", "Admin"));

    options.AddPolicy("SoloClientes", policy =>
        policy.RequireRole("Cliente", "Admin"));
});
```

### Redirección Después del Login

```csharp
// En AccountController.cs o donde manejes el login
private IActionResult RedirectByRole(ClaimsPrincipal user)
{
    if (user.IsInRole("OTIC"))
        return RedirectToAction("Index", "PortalOtic");

    if (user.IsInRole("Relator"))
        return RedirectToAction("Index", "PortalRelator");

    if (user.IsInRole("Cliente"))
        return RedirectToAction("Index", "PortalCliente");

    // Admin o Coordinador van al Dashboard principal
    return RedirectToAction("Index", "Dashboard");
}
```

---

## Roles del Sistema

| Rol | Acceso |
|-----|--------|
| **Admin** | Acceso completo a todo el sistema |
| **Coordinador** | Dashboard, Solicitudes, Empresas, Relatores, Certificados, Reportes |
| **OTIC** | Solo Portal OTIC (Aprobación de cotizaciones) |
| **Relator** | Solo Portal Relator (Gestión de cursos y participantes) |
| **Cliente** | Solo Portal Cliente (Solicitudes propias) |

---

## Testing en el Prototipo

Para probar cada portal en el prototipo HTML:

1. Abrir navegador en la raíz del proyecto
2. Navegar a cualquier página con sidebar
3. Hacer clic en "Portal Relator" o "Aprobación OTIC" en el menú lateral
4. Todas las opciones son visibles independientemente del "rol"

**URLs directas:**
- Portal Relator: `pages/portal-relator.html`
- Participantes: `pages/relator-participantes.html`
- Portal OTIC: `pages/portal-otic.html`

---

## Próximos Pasos

- [x] Integrar vistas al prototipo HTML
- [x] Agregar links al menú lateral
- [x] Documentar restricciones de acceso
- [ ] Crear controladores en C# (próximo sprint)
- [ ] Implementar roles y políticas (próximo sprint)
- [ ] Implementar redirección por rol (próximo sprint)
- [ ] Filtrar menú según rol en _Layout.cshtml (próximo sprint)
- [ ] Agregar Portal Cliente si es necesario

---

## Notas Importantes

1. **Prototipo vs Producción:** El prototipo muestra todas las opciones para facilitar el testing. En producción, el menú se filtra según el rol.

2. **Badges de rol:** Los badges de colores en el menú son solo indicativos para el prototipo. En producción, simplemente no se mostrarán las opciones a las que el usuario no tiene acceso.

3. **Comentarios en HTML:** Cada archivo HTML tiene comentarios indicando las restricciones de acceso para facilitar la implementación en C#.

4. **Consistencia de diseño:** Los nuevos portales usan el mismo sidebar lateral que el resto del sistema para mantener la consistencia visual.
