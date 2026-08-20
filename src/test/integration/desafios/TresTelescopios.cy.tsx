import { challengeTest } from '../../helpers/challengeTest'

describe('Desafío 1016 - TresTelescopios', () => {
  it('Resuelve el desafío 1016', () => {
    const solucion = `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="3" inline="true"><value name="count"><block type="math_number" id="4"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="5"><next><block type="Si" id="6" inline="true"><value name="condition"><block type="TocandoTelescopio" id="7"></block></value><statement name="block"><block type="AlinearTelescopio" id="8"></block></statement></block></next></block></statement></block></statement></block></xml>`;
    challengeTest(1016, solucion)
  })

})
