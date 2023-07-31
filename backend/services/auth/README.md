# Laboratorio 9: Estilos de Programacion
## _Estilo Cookbook_

El "Estilo Cookbook" en el contexto del desarrollo de software se refiere a un enfoque en el cual se proporcionan fragmentos de código reutilizables y específicos para resolver tareas comunes o problemas recurrentes. El término "Cookbook" proviene de la analogía con un libro de cocina, donde se proporcionan recetas paso a paso para preparar diferentes platos.

En el siguiente código, podemos observar cómo se ha implementado el estilo Cookbook en el desarrollo de una aplicación que utiliza MongoDB y Node.js para la autenticación y gestión de usuarios.

El archivo de código muestra un servidor Express que se encarga de manejar diferentes rutas relacionadas con la autenticación y gestión de usuarios. Cada ruta está asociada con una función de controlador específica que contiene la lógica para realizar las operaciones correspondientes. Esto sigue el enfoque Cookbook, ya que cada controlador representa una receta reutilizable para manejar una tarea específica.

Las rutas /register, /login, /users/:id, /users/:id, y /users/:id representan diferentes tareas relacionadas con la autenticación y gestión de usuarios, como registro de usuario, inicio de sesión, obtención de información de usuario, actualización y eliminación de usuarios.

Cada ruta está vinculada a una función de controlador, como registerUser, loginUser, getUser, updateUser, y deleteUser, que se definen en el archivo userAuth.controllers.js. Estas funciones implementan la lógica necesaria para llevar a cabo las acciones correspondientes.

Este enfoque facilita la comprensión, el mantenimiento y la reutilización del código, ya que cada controlador es independiente y se enfoca en resolver una tarea específica.
- auth.controller.js
```javascript
/**
 * Obtiene información de un usuario específico por su ID.
 * @function getUser
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve los datos del usuario en formato JSON.
 * @throws {Error} - Si el usuario no se encuentra, devuelve un mensaje de error en formato JSON con el código de estado 404 (NOT FOUND).
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};


```

## _Estilo Constructivist_
La implementación del estilo "Adaptativo" en el código se centra en gestionar los errores encontrados y garantizar una respuesta "adaptable" incluso si algo falla durante la obtención de los mensajes de chat.

El estilo "Adaptativo" se puede observar en las siguientes partes del código:

Uso de un bloque try-catch:
El estilo "Adaptativo" utiliza un bloque try-catch para capturar posibles errores que puedan ocurrir durante la ejecución de ciertas operaciones, como la consulta a la base de datos en este caso. Esto permite gestionar los errores de forma controlada y proporcionar una respuesta adecuada al cliente en caso de que algo falle.

Manejo del error:
Dentro del bloque catch, se gestiona el error capturado. En este caso, se muestra el mensaje de error en la consola para que los desarrolladores puedan rastrear el problema durante la fase de desarrollo. Además, se envía una respuesta JSON al cliente con un mensaje de error y un código de estado HTTP 500 (Internal Server Error) para indicar que hubo un problema en el servidor.

Respuesta "adaptable" en caso de error:
En lugar de detener la ejecución del servidor o lanzar una excepción, el estilo "Adaptativo" opta por proporcionar una respuesta "adaptable" al cliente. En este ejemplo, si ocurre algún error durante la consulta a la base de datos, la función de controlador getChats enviará un mensaje de error con el código de estado 500, pero también devolverá una respuesta vacía con un arreglo de mensajes vacío. Esto permite que el cliente reciba una respuesta, incluso si los mensajes no se pueden recuperar correctamente.

En resumen, la implementación del estilo "Adaptativo" en este código se enfoca en gestionar los posibles errores de manera controlada y proporcionar una respuesta adecuada al cliente en caso de que ocurra algún problema durante la obtención de los mensajes de chat. En lugar de detenerse por completo, el código sigue ejecutándose y envía una respuesta "adaptable" para asegurarse de que el servidor continúe funcionando de manera tolerante a fallos.


<!-- Centrar la imagen y darle dimensiones -->
- auth.controllers.js
```javascript
import User from "../models/User.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

```

## _Estilo Plugins_
El estilo de programación de plugins es un enfoque que se utiliza para extender y personalizar el comportamiento de un sistema o componente de software. En este estilo, el software principal se divide en módulos independientes, y los plugins son módulos adicionales que se pueden conectar o desconectar para agregar funcionalidades específicas sin modificar el código base.

Los plugins ofrecen una forma flexible y modular de extender el software sin necesidad de modificar el código fuente original. Esto es especialmente útil cuando se quiere permitir que terceros desarrolladores o usuarios puedan agregar nuevas características o funcionalidades al sistema sin necesidad de alterar la base del software.

Algunos conceptos clave asociados con el estilo de programación de plugins incluyen:

Puntos de extensión (Extension Points): Son puntos específicos en el código donde se pueden conectar los plugins para extender el comportamiento del sistema. Estos puntos de extensión deben estar diseñados de manera que permitan la incorporación de nuevo código sin afectar la estructura interna del software.

Interfaz definida (Defined Interface): Para que los plugins sean eficaces, necesitan interactuar con el software principal de una manera predecible y definida. Esto significa que el software principal debe proporcionar una interfaz clara y bien documentada que los plugins puedan utilizar para interactuar con él.

Inyección de dependencias (Dependency Injection): La inyección de dependencias es una técnica comúnmente utilizada en el estilo de programación de plugins. Permite que los plugins accedan a servicios o componentes proporcionados por el software principal sin crear dependencias rígidas. Esto se logra pasando las dependencias necesarias a los plugins en lugar de que los plugins las instancien directamente.

Dinamismo y Flexibilidad: Los plugins pueden ser cargados y descargados dinámicamente durante la ejecución del programa. Esto brinda una gran flexibilidad para modificar el comportamiento del software en tiempo de ejecución sin detener o reiniciar la aplicación.

El uso de plugins es común en aplicaciones como editores de texto, navegadores web, sistemas de gestión de contenidos (CMS), editores de imágenes y otros tipos de software donde se necesita permitir a los usuarios extender la funcionalidad básica.

Es importante destacar que el estilo de programación de plugins no es aplicable a todas las situaciones, y su implementación requiere una cuidadosa planificación y diseño para asegurar la coherencia y la seguridad del sistema. Sin embargo, cuando se utiliza adecuadamente, el estilo de programación de plugins puede llevar a sistemas altamente flexibles y extensibles.
- authTokenSchema.js
```javascript
import mongoose from "mongoose";

// Creamos un objeto para guardar nuestros plugins personalizados
const authPlugin = {};

// Creamos el esquema base para el token de autenticación
const authTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Puedes agregar más campos relacionados con la gestión de tokens aquí
  },
  { timestamps: true }
);

// Agregamos un método personalizado al esquema utilizando el plugin
authPlugin.addCustomMethod = function () {
  authTokenSchema.methods.customMethod = function () {
    // Aquí puedes definir la lógica del método personalizado
    console.log("Este es un método personalizado en el esquema AuthToken.");
  };
};

// Agregamos un método estático personalizado al modelo utilizando el plugin
authPlugin.addCustomStaticMethod = function () {
  AuthToken.customStaticMethod = function () {
    // Aquí puedes definir la lógica del método estático personalizado
    console.log("Este es un método estático personalizado en el modelo AuthToken.");
  };
};

// Aplicamos los plugins al esquema y al modelo
authPlugin.addCustomMethod();
authPlugin.addCustomStaticMethod();

// Creamos el modelo AuthToken basado en el esquema modificado
const AuthToken = mongoose.model("AuthToken", authTokenSchema);

export default AuthToken;

```

# Laboratorio 10: Codificación Legible (Clean Code)
##Consistent Indentation (Indentación Coherente): 
La indentación consistente es una práctica esencial para mejorar la legibilidad del código. En el código presentado, podemos observar que cada nivel de indentación está compuesto por 2 espacios, lo cual es una elección común en la comunidad de desarrollo de JavaScript. Además, el código dentro de bloques de funciones, como en la función registerUser y loginUser, está correctamente indentado para reflejar la estructura jerárquica y mejorar la comprensión del código.

- auth.controller.js
```javascript
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

```

##Comment and Documentation (Comentarios y Documentación): 
El código está bien documentado con comentarios descriptivos. Cada función tiene comentarios que explican su propósito y su comportamiento. Por ejemplo, la función registerUser tiene un comentario que indica su objetivo, que es registrar un nuevo usuario en la base de datos. También se mencionan los parámetros y el valor de retorno, lo que facilita la comprensión de cómo utilizar la función. La presencia de comentarios y documentación mejora la legibilidad del código y facilita la colaboración entre desarrolladores, ya que otros miembros del equipo pueden entender rápidamente el propósito y el funcionamiento de cada función.

- auth.controller.js
```javascript
/**
 * Función auxiliar para hashear la contraseña.
 * @function hashPassword
 * @async
 * @param {string} password - Contraseña en texto plano.
 * @returns {string} - Contraseña hasheada.
 */
const hashPassword = async (password) => {
  // Código para hashear la contraseña
};

```

##Code Grouping (Agrupación de Código): 
El código está agrupado de manera coherente. Se han definido funciones auxiliares como hashPassword y comparePasswords, que se utilizan para implementar la funcionalidad de hashear y comparar contraseñas. Estas funciones se han colocado en la parte superior del archivo antes de las funciones principales que las utilizan. Además, todas las funciones relacionadas con la gestión de usuarios están agrupadas bajo el módulo "userAuthHandlers", lo que facilita la navegación y organización del código.

- auth.controller.js
```javascript
import bcrypt from "bcrypt"; // Library for password hashing
import User from "../models/User.js";

// ... (Funciones auxiliares hashPassword y comparePasswords) ...

/**
 * Registra un nuevo usuario en la base de datos.
 * @function registerUser
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve el usuario registrado en formato JSON con el código de estado 201 (CREATED).
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
export const registerUser = async (req, res) => {
  // Código para registrar un nuevo usuario
};

```

##Limit Line Length (Limitar la Longitud de Línea): 
Se ha respetado un límite de longitud de línea en el código. Esto se puede observar en las funciones como loginUser, donde las líneas de código no exceden un número razonable de caracteres, lo que facilita su visualización en editores de código sin desplazamientos horizontales. Limitar la longitud de línea es una práctica importante para mantener el código legible y evita la necesidad de desplazarse constantemente en el editor para entender el código.

- auth.controller.js
```javascript
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario por nombre de usuario o correo electrónico
  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) {
    return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
  }

  const passwordMatch = await comparePasswords(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
  }

  // Generar y devolver un token de autenticación (por ejemplo, JWT)
  // Aquí se debe utilizar una biblioteca de manejo de tokens como jsonwebtoken

  const token = generateAuthToken(user._id); // Función que genera el token de autenticación

  res.status(200).json({ token });
};

```

##Avoid Using Magic Numbers (Evitar el Uso de Números Mágicos): 
El código evita el uso directo de números literales sin explicación. Por ejemplo, se ha declarado una constante saltRounds con un valor de 10 para definir el número de rondas utilizadas en el proceso de hashing de contraseñas. El uso de esta constante con un nombre descriptivo hace que el código sea más claro y facilita la comprensión de su propósito.

- auth.controller.js
```javascript
const saltRounds = 10;

const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

```
