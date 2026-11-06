import { moduloDesafio, challengeTest } from '../../helpers/challengeTest'

moduloDesafio(1003, () => {
  challengeTest(1003, {
    solucion: `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="13" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="14" inline="true"><value name="count"><block type="math_number" id="15"><field name="NUM">30</field></block></value><statement name="block"><block type="RebotarUnaVezPingPong" id="16"></block></statement></block></statement></block></xml>`,
  })
})
