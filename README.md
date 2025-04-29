
# Bienvenido a la aplicación **Yo Me Cuido**

Este es un proyecto desarrollado en [Expo](https://expo.dev) utilizando [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).  
La app tiene como objetivo educar y entretener a los jóvenes sobre seguridad digital mediante un sistema de niveles gamificados.

---

## Comenzando

### 1. Clonar el repositorio

```bash
git clone https://github.com/sistemascec-hue/yomecuido.git
cd YOMECUIDO-APP
```

### 2. Instalar las dependencias

```bash
npm install
```

Asegúrate de tener instalados:
- Node.js (versión recomendada 18 o superior)
- Expo CLI

Si no tienes Expo CLI, instala con:

```bash
npm install -g expo-cli
```

### 3. Configurar Firebase

- La aplicación ya está configurada para utilizar un proyecto de Firebase con las credenciales necesarias.
- No necesitas realizar configuraciones adicionales si usas el repositorio oficial.

El proyecto de Firebase está registrado con el siguiente usuario de prueba:

- **Correo:** `sistemas2.cecasem@gmail.com`
- **Contraseña:** `sistemas123`

Puedes usar estas credenciales para iniciar sesión en la app.

### 4. Iniciar la aplicación

```bash
npx expo start
```

Esto abrirá Expo Developer Tools en tu navegador.

Puedes probar la app en:

- **Dispositivo físico** usando [Expo Go](https://expo.dev/go)
- **Emulador Android** (requiere Android Studio instalado)
- **Simulador iOS** (requiere Xcode en MacOS)

---

## 📂 Estructura del Proyecto

El código fuente principal se encuentra dentro de la carpeta `app/`, utilizando **ruteo basado en archivos** ([file-based routing](https://docs.expo.dev/router/introduction/)).

Otras carpetas relevantes incluyen:
- `components/`: Componentes reutilizables.
- `contexts/`: Contextos como `AuthContext` para la autenticación global.
- `hooks/`: Hooks personalizados como `useAuth`.
- `constants/`: Colores, estilos y constantes generales.
- `data/`: Información estructurada de niveles y contenidos educativos.
- `assets/`: Imágenes, íconos y recursos estáticos.

---

## 🧹 Resetear el proyecto (opcional)

Si deseas iniciar un proyecto en blanco:

```bash
npm run reset-project
```

Este comando moverá el código de ejemplo a la carpeta **app-example** y dejará una estructura limpia en **app/**.

---

## 📚 Recursos útiles para seguir aprendiendo

- [Documentación oficial de Expo](https://docs.expo.dev/)
- [Tutorial Aprende Expo](https://docs.expo.dev/tutorial/introduction/)
- [Guía de desarrollo con Firebase en Expo](https://docs.expo.dev/guides/using-firebase/)
- [Comunidades de Expo](https://chat.expo.dev/)

---

## 👥 Contribuye o aprende más

- [Expo en GitHub](https://github.com/expo/expo)
- [Únete al Discord oficial de Expo](https://chat.expo.dev)


### 📱 Recomendación para ejecutar la app desde un dispositivo móvils

Para probar la aplicación directamente en tu celular, sigue estos pasos:

1. **Activa el modo desarrollador** en tu dispositivo móvil:
   - En Android: depende de tu modelo como debes activarlo
   - En iOS: no es necesario activar modo desarrollador si usas Expo Go.

2. **Instala la app Expo Go** desde tu tienda de aplicaciones:
   - [Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Expo Go para iOS](https://apps.apple.com/app/expo-go/id982107779)

3. **Inicia el proyecto desde tu computadora** con el siguiente comando:

   ```bash
   npx expo start
   ```

4. **Escanea el código QR** que se muestra en tu terminal o navegador con la app Expo Go.

¡Y listo! Podrás visualizar y probar la aplicación **Yo Me Cuido** directamente en tu celular.  
