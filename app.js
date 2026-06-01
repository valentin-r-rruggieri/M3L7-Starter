/*
 * app.js — Frontend del Dad Joke Generator
 *
 * ============================================================
 * ❌ ANTI-PATRÓN: así NO se hace (la API key queda expuesta)
 * ============================================================
 *
 * const API_KEY = 'AIzaSyD-ejemplo-esto-es-lo-que-nunca-hay-que-hacer'
 *
 * async function getJokeInseguro() {
 *   const r = await fetch('https://generativelanguage.googleapis.com/v1/...', {
 *     headers: { 'Authorization': `Bearer ${API_KEY}` }  // ← visible en DevTools
 *   })
 *   return r.json()
 * }
 *
 * Cualquiera que abra DevTools → Sources puede ver la key en segundos.
 * ============================================================
 *
 * ✅ SOLUCIÓN: el frontend llama a /api/joke (nuestra serverless function)
 *    y la serverless function llama a Gemini con la key desde process.env.
 *    La key nunca llega al navegador.
 */

// TODO 1: Obtener referencias a los elementos del DOM
// const btn    = document.getElementById('joke-btn')
// const output = document.getElementById('joke-output')
// const text   = document.getElementById('joke-text')
// const errBox = document.getElementById('error-output')
// const errTxt = document.getElementById('error-text')


// TODO 2 (PASO 1 en clase): Agregar event listener al botón
// Por ahora: mostrar un chiste hardcodeado para verificar que el DOM funciona
//
// btn.addEventListener('click', () => {
//   text.textContent = '¿Por qué el libro de matemáticas está triste? Tiene demasiados problemas.'
//   output.classList.remove('hidden')
// })


// TODO 3 (PASO 3 en clase): Función getJoke que llama a /api/joke
// Reemplazar el chiste hardcodeado por un fetch a la serverless function
//
// async function getJoke() {
//   const response = await fetch('/api/joke', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ topic: 'anything' }),
//   })
//   if (!response.ok) throw new Error('Error del servidor')
//   const data = await response.json()
//   return data.joke
// }


// TODO 4 (PASO 3 en clase): Reemplazar el event listener simple por uno async
// con getJoke() + manejo de loading + catch de errores
//
// btn.addEventListener('click', async () => {
//   btn.disabled = true
//   btn.textContent = 'Generando...'
//   output.classList.add('hidden')
//   errBox.classList.add('hidden')
//
//   try {
//     const joke = await getJoke()
//     text.textContent = joke
//     output.classList.remove('hidden')
//   } catch (err) {
//     errTxt.textContent = `Error: ${err.message}`
//     errBox.classList.remove('hidden')
//   } finally {
//     btn.disabled = false
//     btn.textContent = 'Generá un chiste'
//   }
// })
