import { challengeTest } from '../../helpers/challengeTest'

describe('Desafío 1006 - LosTrofeosDeChuy', () => {
  it('Resuelve el desafío 1006', () => {
    const solucion = `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="7" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="16" inline="true"><value name="count"><block type="math_number" id="17"><field name="NUM">4</field></block></value><statement name="block"><block type="MoverACasillaArriba" id="23"></block></statement><next><block type="Repetir" id="45" inline="true"><value name="count"><block type="math_number" id="46"><field name="NUM">4</field></block></value><statement name="block"><block type="RecogerTrofeo" id="29"><next><block type="MoverACasillaAbajo" id="35"><next><block type="MoverACasillaDerecha" id="41"></block></next></block></next></block></statement><next><block type="RecogerTrofeo" id="53"></block></next></block></next></block></statement></block></xml>`;
    challengeTest(1006, solucion)
  })

})
