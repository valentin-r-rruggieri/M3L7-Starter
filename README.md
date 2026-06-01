# Dad Joke Generator — STARTER M3L7

## De qué se trata

Una app que genera chistes malos (dad jokes) en español usando inteligencia artificial.
Pero con una condición: **la API key de Gemini nunca debe estar visible en el navegador.**

Vamos a construir un flujo seguro:

```
Navegador  →  /api/joke  →  Serverless Function  →  process.env  →  Gemini
    ↑                        ↑
  código público           código privado (Vercel)
  visible en DevTools       la key nunca llega acá
```

Este es el mismo patrón que usan apps como Notion, Linear o Figma para consumir APIs de terceros sin exponer credenciales.

---

## Lo que ya está listo (no tocar)

| Archivo | Rol |
|---------|-----|
| ✅ index.html | Interfaz completa — botón, caja de chiste, caja de error |
| ✅ styles.css | Dark mode minimalista, mobile-first |
| ✅ package.json | Dependencia `@google/generative-ai` ya incluida |
| ✅ .gitignore | `node_modules`, `.env`, `.vercel` ya excluidos |
| ✅ .env.example | Template para que copies tu API key |

---

## Lo que vas a construir (el delta)

| Archivo | Estado | Tu tarea |
|---------|--------|----------|
| `app.js` | ⚠️ esqueleto con anti-patrón comentado | Escribir el frontend completo |
| `api/joke.js` | ⚠️ esqueleto con TODOs | Escribir la serverless function |

---

## Paso a paso en clase (7 pasos)

### Paso 1 — app.js: chiste hardcodeado

Antes de tocar el backend, verificamos que el DOM funciona.

```
btn → click → mostrar un chiste fijo en pantalla
```

¿Por qué hardcodeado primero? Para aislar problemas. Si el botón no funciona, no tiene sentido investigar el backend.

**Qué aprendés:** Referencias al DOM con `getElementById`, event listeners, toggle de clases CSS.

---

### Paso 2 — api/joke.js: versión MOCK

Creás tu primera **Serverless Function de Vercel**.

```
handler(req, res)  →  validar POST  →  devolver { joke: "[MOCK]..." }
```

Sin Gemini todavía. Sin API key. Sin gastar tokens.

**Qué aprendés:**
- Cómo se estructura una serverless function (`export default async function handler(req, res)`)
- Qué hace cada parte: `req.method`, `res.status().json()`
- Por qué el mock permite probar el flujo entero sin depender de la API externa

---

### Paso 3 — app.js: conectar con fetch

Reemplazás el chiste hardcodeado por una llamada real a `fetch('/api/joke')`.

**Qué aprendés:**
- `fetch` con método POST y JSON en el body
- Manejo de errores con `try/catch/finally`
- Estados de UI: loading, éxito, error
- Por qué el frontend llama a `/api/joke` y NO directamente a Gemini

---

### Paso 4 — vercel dev: probar el mock

```bash
npm install
vercel dev
```

Abrís `http://localhost:3000`, hacés clic y ves `[MOCK]`. El flujo completo funciona sin haber tocado Gemini.

**Qué aprendés:** Cómo se levanta un entorno local de Vercel, cómo se ven las requests en DevTools → Network.

---

### Paso 5 — .env: agregar la API key real

```bash
cp .env.example .env   # editar y pegar tu GEMINI_API_KEY
```

**Qué aprendés:**
- Qué es un archivo `.env` y por qué **nunca** se sube a Git
- Que las variables de entorno se cargan en `process.env` del servidor
- Que hay que reiniciar `vercel dev` para que los cambios de `.env` surtan efecto

---

### Paso 6 — api/joke.js: Gemini real

Reemplazás el mock por código que usa `@google/generative-ai` con `process.env.GEMINI_API_KEY`.

Este es el **momento clave de toda la clase**. Acá la API key aparece por primera vez, pero SOLO en el servidor.

**Qué aprendés:**
- `import { GoogleGenerativeAI }` de la librería oficial de Google
- Cómo inicializar el modelo y mandar un prompt
- Que `process.env.GEMINI_API_KEY` solo existe en el servidor — el navegador no tiene acceso

---

### Paso 7 — Verificar seguridad

```js
F12 → Sources → buscar "AIza" → no aparece nada
```

**Qué aprendés:** La confirmación visual de que la API key nunca llegó al navegador. Si no está en Sources, no hay forma de que un usuario la robe.

---

## Referencia: el patrón de seguridad

```
❌ INSEGURO:
   Navegador → API key visible → Gemini
               (cualquiera la ve en DevTools)

✅ SEGURO (este proyecto):
   Navegador → /api/joke → Serverless Function → process.env → Gemini
               ↑                                    ↑
          solo conoce          la key vive acá,
          el endpoint          el navegador no la ve
```

---

## Setup inicial

```bash
npm install              # instalar dependencias
vercel dev               # levantar servidor local
```

## Prerequisitos

- **Node.js** instalado (`node -v`)
- **Vercel CLI** instalado — si no: `npm install -g vercel`
- **API key de Gemini** — https://aistudio.google.com → Get API key

---

> Este Starter es el punto de partida. Al final de la clase vas a tener
> exactamente el mismo proyecto que está en `M3L7-Resolution/`.
