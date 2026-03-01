[//]: # @param group $$ Inteligencia Artificial para la Productividad
[//]: # @param title $$ 02-Prompt Engineering
[//]: # @param author $$ Iván D. Sánchez

# Prompt Engineering

## Estructura de un prompt efectivo (Rol, Enfoque, Límites y Contexto)

Para obtener mejores respuestas de un LLM como ChatGPT, es clave estructurar el prompt en **cuatro componentes**:

### 1. Rol

Define quién “es” el modelo (su especialidad o perspectiva).

- Alinea el tono, criterio y nivel técnico.
- Reduce ambigüedad.

### 2. Enfoque

Explica qué acción debe realizar.

- Debe incluir un verbo claro (crear, analizar, explicar, resumir, etc.).
- Da dirección operativa a la respuesta.

### 3. Límites

Establece restricciones.

- Formato, extensión, estilo, audiencia o reglas específicas.
- Evita respuestas largas, vagas o fuera de objetivo.

### 4. Contexto (Memoria)

Proporciona información relevante.

- Permite respuestas útiles y no genéricas.
- Reduce el riesgo de “alucinaciones”.

> 💡 La combinación de estos cuatro elementos transforma instrucciones vagas en resultados precisos.

---

### Ejemplo

- **Rol:** Profesor universitario de bases de datos.
- **Enfoque:** Explicar la normalización de bases de datos a un estudiante principiante.
- **Límites:** Máximo 200 palabras, lenguaje sencillo, incluir un ejemplo práctico.
- **Contexto:** El estudiante ya entiende qué es una tabla y una clave primaria, pero no conoce las formas normales.

---

### 🧠 Buenas prácticas adicionales

- Divide problemas complejos en pasos pequeños.
- Ajusta creatividad vs precisión según el objetivo.
- Proporciona suficiente contexto (ni demasiado ni muy poco).
- Elige el modelo según la tarea (redacción, análisis, clasificación, ideación).

---

### 🧾 Prompt completo de ejemplo

```text
Rol: Actúa como profesor universitario de bases de datos con experiencia enseñando a principiantes.

Enfoque: Explica qué es la normalización de bases de datos y por qué es importante.

Límites:
- Máximo 200 palabras.
- Lenguaje claro y sencillo.
- Incluye un ejemplo práctico.
- Usa viñetas si ayuda a la comprensión.

Contexto:
El estudiante ya entiende qué es una tabla y una clave primaria, pero no conoce las formas normales ni problemas de redundancia de datos.

```
