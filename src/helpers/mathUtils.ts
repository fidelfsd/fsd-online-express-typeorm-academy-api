/**
 * Genera un número entero aleatorio en el rango especificado, incluyendo ambos extremos.
 *
 * @param min - Valor mínimo del rango (incluido).
 * @param max - Valor máximo del rango (incluido).
 * @returns Número entero aleatorio en el rango especificado.
 * @throws Un error si el valor mínimo es mayor que el valor máximo.
 */
export const generateRandomInteger = (min: number, max: number): number => {
   // Verifica si el valor mínimo es mayor que el valor máximo
   if (min > max) {
      // Lanza un error si la condición no se cumple
      throw new Error(
         "El valor mínimo debe ser menor o igual al valor máximo."
      );
   }

   // Calcula y retorna un número entero aleatorio en el rango especificado
   const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;

   return randomInteger;
};
