import { MulangExpectationResult } from './mulangResults'

const suggestionMessages: Record<string, string> = {
  uses_simple_repetition:
    'Recordá que en lugar de poner muchos bloques iguales podés usar la repetición para hacer algo muchas veces.',

  uses_conditional_alternative:
    '¿Tu programa anda a veces sí y a veces no? Podés usar alternativa condicional para considerar todos los escenarios posibles.',

  uses_conditional_repetition:
    'Podés usar repetición condicional cuando tenés que repetir algo hasta que se cumpla una condición.',

  main_too_long:
    'El programa principal quedó largo y por lo tanto es difícil de leer. Podrías dividirlo en subtareas usando procedimientos.',

  too_long:
    'Este procedimiento quedó largo y difícil de leer. Podrías dividirlo en subtareas usando procedimientos.',

  do_something:
    'Este procedimiento está vacío y por lo tanto no hace nada. Agregale bloques para que tenga algún efecto.',

  name_was_changed:
    'Podés escribir un nombre para este procedimiento. Una buena forma de nombrarlo es responder a la pregunta: ¿qué hace este procedimiento?',

  is_used:
    'Este procedimiento no está siendo usado desde ninguna parte del programa. Hacé click en la manito y eso crea el nuevo comando que podés usar.',

  is_used_from_main:
    'Este procedimiento está siendo usado por otro, pero ese otro no es llamado desde el programa principal. Revisá eso para que tenga efecto.',

  does_not_use_recursion:
    '¡Cuidado! ¡Este procedimiento se llama a sí mismo! Intentá resolver de otra forma este desafío.',

  does_not_nest_control_structures:
    'Este bloque podría estar en un procedimiento con un buen nombre que describa qué tarea resuelve.',
}

export const messageForExpectation = (result: MulangExpectationResult) =>
  suggestionMessages[result.id] || 'Revisá este bloque.'