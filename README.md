# 🥕 Recetario Aventura

Juego de escaleras y serpientes (1 a 4 jugadores) donde cada 3 casillas hay una fruta o verdura con una receta sencilla,
pensado para madres y padres que no saben cómo usar ciertos ingredientes.

**Fundación Por un Mañana Mejor · La Gaitana, Suba**

## Cómo se juega
1. Tira el dado y avanza. Escaleras 🪜 suben, gusanitos 🐛 bajan.
2. Al caer en una casilla verde se abre la receta: **Escuchar**, **¡Cocinar!** (alistar ingredientes, pasos y temporizador) o **Guardar y seguir**.
3. Las recetas descubiertas quedan en **Mi recetario** y las cocinadas llenan **Tu plato** (se guardan en el navegador).
4. Gana quien llegue exacto a la casilla 100.

## Novedades v2
- Diseño "huerta": marco de madera, escaleras con peldaños, serpientes, fichas que se deslizan.
- Música de fondo generada con Web Audio (botón 🎵) y efectos (botón 🔔). No usa archivos de audio.
- Más interacción: avisos al subir/bajar, vibración en el celular, confeti al ganar, toca una receta descubierta para leerla.
- Recetas con tiempo, dificultad y "Cómo escogerla y guardarla".

## Estructura
```
index.html      # Marcado de la página
css/styles.css  # Estilos (modo claro y oscuro automático)
js/data.js      # Recetas (F), reserva (RESERVA) y trucos (TR)
js/game.js      # Tablero, dado, turnos, modo cocinar, recetario
```

## Agregar o cambiar recetas
En `js/data.js` cada receta es `[vegetal, emoji, nombre, ingredientes, pasos]`: ingredientes separados por `, ` y pasos por `|`.
El tablero tiene 33 casillas de receta (3, 6, 9… 99), así que `F` debe tener 33 elementos. Si pasos incluyen "N minutos", el modo cocinar crea un temporizador.

## Escaleras y serpientes
Están en `js/game.js` (`L` y `S`). Evita que empiecen en múltiplos de 3, porque esas casillas son de receta.

## Publicar
GitHub → Settings → Pages → Branch `main` → `/ (root)`.
