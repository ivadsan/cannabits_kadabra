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

### Técnicas zero shot, one shot y few shot para prompts efectivos

#### Zero-shot

Le pides la tarea sin dar ningún ejemplo. El modelo usa solo su conocimiento previo.

    "Clasifica este texto como positivo o negativo: 'Me encantó la película'"

El modelo responde directamente sin guía adicional. Funciona bien para tareas simples o cuando el modelo ya tiene mucho contexto sobre el tema.

#### One-shot

Le das un solo ejemplo antes de la tarea real.

    "Clasifica el sentimiento. Ejemplo: 'Qué aburrida la clase' → negativo. Ahora clasifica: 'Me encantó la película'"

Útil cuando quieres mostrarle el formato o estilo de respuesta esperado sin saturar el prompt.

#### Few-shot

Le das varios ejemplos (típicamente 3–10) antes de la tarea.

    "Clasifica el sentimiento:
    'Qué aburrida la clase' → negativo
    'El servicio fue excelente' → positivo
    'No me gustó nada' → negativo
    Ahora clasifica: 'Me encantó la película'"

Es la técnica más poderosa de las tres cuando necesitas que el modelo aprenda un patrón específico, un formato poco usual o un estilo muy concreto.

#### ¿Cuándo usar cada una?

TécnicaUsa cuando...Zero-shotLa tarea es sencilla o estándarOne-shotQuieres definir el formato de salidaFew-shotLa tarea es compleja, ambigua o requiere un patrón específico

En general, más ejemplos = mejor rendimiento, pero también = más tokens consumidos. El truco está en encontrar el balance.

#### ¿Importa el orden de los ejemplos en el prompt?

- Sí: el orden puede afectar la efectividad entre 50% y 90%.
- Lo que va al final recibe más atención del LLM; no dejes siempre lo negativo al final para no sesgar.
- Alterna y varía: “uno sí, uno no” para balancear la atención en los ejemplos.

### Estructura de prompts con etiquetas XML para IA

Estructura de prompts con etiquetas XML para IA es una técnica de prompt engineering donde se usan etiquetas tipo XML para organizar y delimitar las distintas partes de un prompt, en lugar de escribirlo como texto plano corrido.

En vez de esto:
Eres un asistente experto. El usuario pregunta sobre Python. Responde de forma corta.

Se estructura así:

```
<role>Eres un asistente experto en programación</role>
<user_input>¿Cómo funciona un decorador en Python?</user_input>
<instructions>Responde de forma concisa, máximo 3 párrafos</instructions>
```

#### ¿Por qué funciona mejor?

- Le da al modelo límites claros entre contexto, instrucciones y datos
- Reduce ambigüedad cuando el prompt es largo o complejo
- Es especialmente útil cuando mezclas roles, ejemplos, contexto y restricciones en un mismo prompt
- Anthropic lo recomienda explícitamente para Claude, ya que fue entrenado reconociendo esta estructura

Se usa mucho para:

- Separar documentos del sistema de instrucciones del usuario
- Few-shot con ejemplos bien delimitados (<example>, <input>, <output>)
- Prompts de producción en aplicaciones reales

Es una de las técnicas más prácticas e impactantes del prompt engineering moderno.

## Manejo de contexto extenso y datos

### Ventana de contexto y modelo de atención en LLMs

#### Ventana de contexto

Es la cantidad máxima de texto que un modelo de IA puede "ver" y procesar al mismo tiempo en una sola interacción, contada en tokens.

#### ¿Qué es un token?

Una unidad de texto que puede ser una palabra, parte de una palabra o un carácter. Como regla general, 1 token ≈ ¾ de palabra en inglés (en español puede variar un poco).

#### ¿Qué entra en la ventana de contexto?

Todo lo que el modelo procesa cuenta:

- El system prompt
- El historial de la conversación
- Los documentos o archivos que adjuntas
- Tu mensaje actual
- La respuesta que genera el modelo

#### ¿Por qué importa?

Si el contenido supera la ventana, el modelo olvida lo que quedó fuera, generalmente lo más antiguo. No tiene acceso a ello aunque haya estado en la conversación.

#### Analogía simple

Imagina que el modelo tiene una hoja de papel de tamaño fijo. Todo lo que necesita recordar o considerar debe caber en esa hoja. Si escribes más de lo que cabe, lo que sobra desaparece del borde.

#### Tamaños típicos

| Modelo            | Ventana aproximada |
| ----------------- | ------------------ |
| GPT-3.5           | 16k tokens         |
| GPT-4o            | 128k tokens        |
| Claude Sonnet 4.6 | 200k tokens        |
| Gemini 1.5 Pro    | 1M tokens          |

Una ventana de 200k tokens equivale aproximadamente a un libro de 400–500 páginas.

En prompt engineering esto es clave porque si diseñas prompts muy largos con mucho contexto, documentos y ejemplos, debes considerar qué tan cerca estás del límite.

#### Ventana de contexto + Mecanismo de Atención

**¿Cómo se relacionan?**

El modelo no lee el contexto como tú lees un párrafo, de forma lineal y uniforme. Usa un mecanismo llamado self-attention que le permite "prestarle atención" a diferentes partes del contexto con distinta intensidad según qué tan relevante es cada parte para generar el siguiente token.

Dicho simple: no todo lo que está en la ventana tiene el mismo peso.

**El problema: Lost in the Middle**

Investigaciones han mostrado que los modelos tienden a prestar más atención a lo que está al principio y al final de la ventana de contexto, y menos a lo que queda en el medio.

    [INICIO ✅ alta atención] ... [MEDIO ⚠️ baja atención] ... [FINAL ✅ alta atención]

Esto significa que aunque algo esté dentro de la ventana, no garantiza que el modelo lo use bien.

**Tips prácticos**

1. Pon lo más importante al inicio o al final
   Si tienes instrucciones críticas o contexto clave, no las entierres en el medio del prompt.
2. Repite instrucciones clave
   Para tareas complejas, reafirmar la instrucción principal al final del prompt ayuda a que el modelo la tenga "fresca" al generar la respuesta.
3. Sé selectivo con el contexto
   Meter mucho texto no siempre es mejor. El ruido compite por atención con lo que realmente importa. Menos contexto relevante > más contexto irrelevante.
4. Usa etiquetas XML
   Volviendo a la clase anterior — las etiquetas ayudan al mecanismo de atención a identificar qué sección es qué, funcionando casi como señales visuales para el modelo.
5. En conversaciones largas, resume
   Si la conversación se extiende mucho, considera incluir un resumen de los puntos clave en lugar de dejar que el historial crudo consuma la ventana.

**Analogía integrada**

Si la ventana de contexto es la hoja de papel, la atención es el resaltador del modelo — puede ver toda la hoja, pero subraya activamente ciertas partes más que otras al momento de responder.

### Grounding

Es la técnica de **anclarle al modelo información externa y verificable** para que sus respuestas estén basadas en hechos concretos en lugar de en lo que "recuerda" de su entrenamiento.

---

#### ¿Por qué existe este problema?

Los LLMs tienen dos limitaciones importantes:

- **Knowledge cutoff** → su conocimiento se congela en la fecha en que fueron entrenados
- **Alucinaciones** → pueden generar información falsa con total confianza

El grounding es la solución a ambos problemas.

---

#### ¿Cómo funciona?

En lugar de dejar que el modelo responda desde su memoria, le **inyectas la información relevante directamente en el prompt** para que base su respuesta en ese contenido.

```xml
<context>
  [Aquí va el documento, artículo, base de datos, etc.]
</context>

<question>
  Con base únicamente en el contexto anterior, responde: ¿Cuál es la política de devoluciones?
</question>
```

El modelo ya no "adivina" — lee el contexto y responde desde ahí.

---

#### Tipos de grounding

**1. Grounding con documentos**
Le pasas PDFs, artículos, manuales directamente en el prompt.

**2. Grounding con búsqueda web (RAG)**
El sistema busca información actualizada en internet o en una base de datos antes de construir el prompt. Esto se llama **RAG** _(Retrieval-Augmented Generation)_ y es la arquitectura más usada en producción hoy en día.

**3. Grounding con base de conocimiento interna**
Empresas que conectan el LLM a su propia documentación, FAQs o bases de datos para que responda solo con información corporativa verificada.

---

#### Ejemplo sin vs con grounding

❌ **Sin grounding**

> _"¿Cuál es el precio del plan Pro de nuestra app?"_
> El modelo inventa un precio o dice que no sabe.

✅ **Con grounding**

> _"Según el siguiente documento de precios: [documento], ¿cuál es el precio del plan Pro?"_
> El modelo lee el documento y responde con el dato exacto.

---

#### Conectando con lo que ya viste

| Concepto            | Relación con grounding                                            |
| ------------------- | ----------------------------------------------------------------- |
| Ventana de contexto | Es donde metes la información de grounding                        |
| Atención            | El modelo le presta atención al contexto inyectado                |
| System prompt       | Puedes instruir al modelo a responder _solo_ con el contexto dado |
| Few-shot            | También es una forma de grounding: le muestras ejemplos concretos |

---

#### Tip clave

Cuando uses grounding, agrégale esta instrucción al prompt:

> _"Responde únicamente basándote en el contexto proporcionado. Si la respuesta no está en el contexto, di que no tienes esa información."_

Esto evita que el modelo mezcle el contexto con su conocimiento propio y empiece a alucinar.

### Chain of Thought (Cadena de pensamiento)

Es una técnica donde le pides al modelo que **muestre su razonamiento paso a paso** antes de dar la respuesta final, en lugar de saltar directo a la conclusión.

#### ¿Por qué funciona?

Los LLMs generan token por token. Cuando fuerzan un razonamiento intermedio, cada paso sirve de contexto para el siguiente, lo que reduce errores en tareas complejas como matemáticas, lógica o análisis.

#### ¿Cómo se activa?

**Zero-shot CoT** — simplemente agregando una frase mágica:

```
Resuelve este problema paso a paso.
```

```
Piensa antes de responder.
```

**Few-shot CoT** — mostrando ejemplos con razonamiento incluido:

```
Pregunta: Si tengo 3 cajas con 4 manzanas cada una y regalo 5, ¿cuántas me quedan?
Razonamiento: 3 cajas × 4 manzanas = 12 manzanas. 12 - 5 = 7.
Respuesta: 7 manzanas.

Ahora resuelve: Si tengo 5 cajas con 6 naranjas...
```

#### Cuándo usarlo

Tareas de razonamiento lógico, matemáticas, análisis de casos, decisiones con múltiples pasos.

---

### Self-Consistency

Es una técnica que va **un nivel encima del Chain of Thought**. En lugar de pedirle al modelo que razone una sola vez, le pides que razone **múltiples veces** y luego tomas la respuesta más frecuente.

#### La idea central

Un modelo puede llegar a la respuesta correcta por distintos caminos. Si la mayoría de esos caminos convergen en la misma respuesta, esa respuesta es probablemente la más confiable.

```
Pregunta → Razonamiento 1 → Respuesta A
Pregunta → Razonamiento 2 → Respuesta A
Pregunta → Razonamiento 3 → Respuesta B
Pregunta → Razonamiento 4 → Respuesta A

Respuesta final → A (3 de 4 caminos)
```

#### ¿Cómo se implementa?

Llamas al modelo varias veces con la misma pregunta usando **temperatura alta** (para que varíe su razonamiento) y luego haces un "voto" entre las respuestas.

```xml
<instruction>
  Resuelve este problema paso a paso. Puedes explorar diferentes enfoques.
</instruction>
<problem>
  [tu problema aquí]
</problem>
```

Repites esto N veces y te quedas con la respuesta mayoritaria.

---

#### Cómo se relacionan ambas técnicas

|                     | Chain of Thought          | Self-Consistency              |
| ------------------- | ------------------------- | ----------------------------- |
| **Razonamientos**   | 1                         | Múltiples                     |
| **Respuesta final** | La del único razonamiento | La más votada                 |
| **Costo**           | Bajo                      | Alto (más llamadas al modelo) |
| **Confiabilidad**   | Media-alta                | Alta                          |

Self-Consistency es esencialmente **CoT repetido con votación**. No tiene sentido usar Self-Consistency sin Chain of Thought.

---

#### Tip integrador

Conectando con lo que ya viste — estas técnicas explotan al máximo la **ventana de contexto y la atención**. Al hacer que el modelo escriba su razonamiento, ese razonamiento queda en el contexto y el mecanismo de atención lo usa para generar mejores tokens finales. Le estás dando al modelo "espacio para pensar" dentro de su propia ventana.
