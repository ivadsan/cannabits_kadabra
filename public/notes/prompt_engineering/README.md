[//]: # @param group $$ Inteligencia Artificial para la Productividad
[//]: # @param title $$ 02-Prompt Engineering
[//]: # @param author $$ Iván D. Sánchez

# Prompt Engineering

## Fundamentos prácticos de la IA generativa

### Estructura de un prompt efectivo (Rol, Enfoque, Límites y Contexto)

Para obtener mejores respuestas de un LLM como ChatGPT, es clave estructurar el prompt en **cuatro componentes**:

#### 1. Rol

Define quién “es” el modelo (su especialidad o perspectiva).

- Alinea el tono, criterio y nivel técnico.
- Reduce ambigüedad.

#### 2. Enfoque o instrucción

Explica qué acción debe realizar.

- Debe incluir un verbo claro (crear, analizar, explicar, resumir, etc.).
- Da dirección operativa a la respuesta.

#### 3. Límites

Establece restricciones.

- Formato, extensión, estilo, audiencia o reglas específicas.
- Evita respuestas largas, vagas o fuera de objetivo.

#### 4. Contexto (Memoria)

Proporciona información relevante.

- Permite respuestas útiles y no genéricas.
- Reduce el riesgo de “alucinaciones”.

> 💡 La combinación de estos cuatro elementos transforma instrucciones vagas en resultados precisos.

---

#### Ejemplo

- **Rol:** Profesor universitario de bases de datos.
- **Enfoque:** Explicar la normalización de bases de datos a un estudiante principiante.
- **Límites:** Máximo 200 palabras, lenguaje sencillo, incluir un ejemplo práctico.
- **Contexto:** El estudiante ya entiende qué es una tabla y una clave primaria, pero no conoce las formas normales.

---

#### 🧠 Buenas prácticas adicionales

- Divide problemas complejos en pasos pequeños.
- Ajusta creatividad vs precisión según el objetivo.
- Proporciona suficiente contexto (ni demasiado ni muy poco).
- Elige el modelo según la tarea (redacción, análisis, clasificación, ideación).

---

#### 🧾 Prompt completo de ejemplo

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

**Ejemplo 2**

```
ROL:
Actúa como tutor experto en inteligencia artificial con experiencia
enseñando a ingenieros de sistemas.

INSTRUCCIÓN:
Genera unas notas de estudio claras y técnicas sobre la clase
"Cómo definir roles efectivos en prompts de IA", cubriendo
obligatoriamente estos cuatro conceptos: rol, enfoque o instrucción,
contexto de la memoria y límites.

CONTEXTO:
El estudiante es ingeniero de sistemas con conocimientos de
programación y fundamentos de ML. Entiende términos como espacio
vectorial, patrones y modelos de lenguaje. La clase explica que
asignar un rol desplaza el espacio vectorial del LLM hacia el área
de conocimiento relevante, y que una buena estructura de prompt
mejora la precisión desde el primer intento.

LÍMITES:
- Máximo 200 palabras
- Formato: título + 4 secciones con bullet points (una por concepto)
- Lenguaje técnico pero directo
- Sin introducciones ni cierres genéricos
- Usa terminología de sistemas cuando sea posible
```

### Cómo interpretan los LLM el significado de las palabras

Los LLM procesan el lenguaje transformando palabras en embeddings, representaciones numéricas ubicadas en un espacio vectorial multidimensional donde cada dimensión captura rasgos semánticos o sintácticos. En este espacio multidimensional, palabras con significados similares quedan geométricamente cercanas, permitiendo al modelo modelar relaciones entre conceptos: analogías, jerarquías y asociaciones semánticas emergen como patrones matemáticos medibles.

Sin embargo, una palabra aislada es ambigua. Aquí entra el contexto: la misma palabra puede tener embeddings distintos según las palabras que la rodean. Para capturar esto, los LLM utilizan el modelo de atención (attention mechanism), un mecanismo que pondera dinámicamente qué otras palabras del texto son relevantes para interpretar cada token en un momento dado.

El resultado es una comprensión del lenguaje que no es simbólica ni rígida, sino geométrica y probabilística: el significado no se almacena como una definición, sino como una posición relativa dentro de un espacio matemático de alta dimensionalidad, modulada siempre por el contexto circundante.

### Cómo definir roles efectivos en prompts de IA

#### Rol

- Desplaza el espacio vectorial del LLM hacia una región semántica específica
- Activa patrones de conocimiento del dominio asignado ("actúa como arquitecto de software")
- Reduce la entropía en la distribución de probabilidad del output desde el token inicial

#### Enfoque / Instrucción

- Define el objetivo de la tarea con precisión operacional
- Debe ser atómica y sin ambigüedad: el modelo optimiza hacia lo que se mide
- Verbos directos mejoran el signal: _genera, analiza, refactoriza_, no _ayúdame con_

#### Contexto de memoria

- El LLM no tiene estado persistente entre sesiones; el contexto es la única "RAM" disponible
- Incluir información relevante en el prompt = cargar el heap antes de ejecutar
- Más contexto útil → inferencia más precisa; contexto ruido → degradación del output

#### Límites

- Acotan el espacio de búsqueda del modelo: formato, extensión, tono, restricciones
- Funcionan como constraints en un problema de optimización
- Sin límites explícitos, el modelo generaliza hacia la respuesta más probable, no la más útil

## Estructurando instrucciones claras y efectivas

### Comparación práctica de ChatGPT, Claude, Gemini y Microsoft Copilot

**¿Qué diferencia hay entre herramientas y modelos LLM?**

No es lo mismo la aplicación que usas que el modelo que responde. ChatGPT, Claude y Gemini desarrollan modelos propios; Copilot usa modelos de OpenAI y añade orquestación.

- ChatGPT: empresa OpenAI; modelos GPT (1–5). En la versión de pago verás modos de GPT‑5: bajo pensamiento, pensamiento y pro.
- Claude: empresa Anthropic; modelos Opus y Sonnet. Sonnet es eficiente para el día a día; Opus es el más poderoso para retos complejos.
- Gemini: empresa Google; modelos Gemini 2.5 Pro y Gemini 2.5 Flash. Flash es rápido; Pro ofrece mejor razonamiento, matemática y código.
- Microsoft Copilot: usa GPT‑4 o puedes habilitar GPT‑5. Añade una capa llamada Prometheus que orquesta el LLM con datos de Microsoft.

**¿Cómo impacta la integración en tus resultados?**

- En entornos empresariales, Copilot puede usar tus correos y OneDrive a través de Prometheus.
- Para usuarios sin entorno empresarial, Copilot recurre a Bing cuando necesita información actualizada.
- Si trabajas con Google Workspace, Gemini se integra en apps de Google. Para llevar contexto al chat, debes aportarlo explícitamente.

**¿Qué opciones de modelos verás en la interfaz?**

- En Gemini: selector entre 2.5 Flash y 2.5 Pro.
- En ChatGPT de pago: modos dentro de GPT‑5 con diferentes niveles de “pensamiento”.
- En Claude: elección entre Opus 4.1 y Sonnet.
- En Copilot: selección entre GPT‑4 y GPT‑5.

**¿Cuándo usar un modelo rápido vs uno de razonamiento para tus prompts?**

La diferencia principal es la planificación interna. Los modelos de razonamiento piensan pasos antes de responder; los rápidos contestan de inmediato.

- Modelo rápido: respuesta inmediata basada en entrenamiento o búsqueda. Útil para preguntas directas.
- Modelo de razonamiento: planifica con think step by step (cadena de pensamiento) y luego ejecuta. Útil para problemas complejos.
- Trade‑off: mayor calidad y profundidad pueden implicar más tiempo y costo.

**¿Cómo decidir el tipo de modelo según tu problema?**

Pregunta: ¿requiere plan paso a paso o basta con una respuesta directa?.

- Empieza con el modelo rápido. Si no llegas a la solución, prueba el de razonamiento.
- Para productividad del equipo, prioriza: claridad de enfoque, pasos accionables y métricas de seguimiento.

**¿Cómo escribir prompts efectivos según el modelo?**

- Para modelos rápidos: pide formato concreto y síntesis.
- Para modelos de razonamiento: solicita análisis y pasos. Aunque muchos ya planifican, explicitar ayuda.
- Estructura recomendada: rol, enfoque, contexto y límites.
- Usa pro-prompts cuando necesites desgloses, evaluación de alternativas y recomendaciones priorizadas.
