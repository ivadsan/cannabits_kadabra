// # @param group $$ Kadabra V2
// # @param title $$ Intro
// # @param author $$ Iván D. Sánchez

# Kadabra

## Decisiones técnicas

### rollup

Es un empaquetador de módulos Javacript sencillo, menos robusto que webpack pero suficiente para desarrollar una librería.

- Optimizado para producción
- Tree Shaking: Elimina código no utilizado, creando bundles mas pequeños
- Soporte nativo para ES6, commonJS y UMD (Universal Module Definition)

### Arquitectura

Se configura Rollup para extraer el CSS del bundle, lo que significa que en lugar de estar incluido en el archivo JS, se empaqueta por separado en un archivo CSS. Esto tiene varias ventajas: reduce el tamaño del archivo JS, permite que el navegador cargue CSS y JS de forma independiente, y facilita el almacenamiento en caché de los estilos.

Es importante considerar que esta solución requiere que la aplicación de destino importe los archivos de estilo por separado, ya que no estarán incluidos en el bundle JS.

## How to test locally

Located in the root of the library, run the following command:

    npm link

Located in the root of the destination app, run the following command.

    npm link kadabra-docs
