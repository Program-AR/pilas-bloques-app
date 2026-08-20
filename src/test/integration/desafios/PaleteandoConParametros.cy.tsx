import { challengeTest, moduloDesafio } from '../../helpers/challengeTest'

// Fuente: https://github.com/Program-AR/pilas-bloques-ember/blob/develop/tests/integration/desafios/PaleteandoConParametros-test.js

moduloDesafio(1135, () => {

  challengeTest(1135, {
    solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0">
    <statement name="program">
      <!-- Avanzar paleteando hacia Derecha -->
      <block type="Repetir">
        <value name="count"><block type="math_number"><field name="NUM">4</field></block></value>
        <statement name="block">
          <block type="MoverACasillaDerecha"><next>
            <block type="Si">
              <value name="condition"><block type="TocandoPingPong"></block></value>
              <statement name="block"><block type="RebotarPingPong"></block></statement>
            </block>
          </next></block>
        </statement>
        <next>
          <!-- Avanzar paleteando hacia Abajo -->
          <block type="Repetir">
            <value name="count"><block type="math_number"><field name="NUM">4</field></block></value>
            <statement name="block">
              <block type="MoverACasillaAbajo"><next>
                <block type="Si">
                  <value name="condition"><block type="TocandoPingPong"></block></value>
                  <statement name="block"><block type="RebotarPingPong"></block></statement>
                </block>
              </next></block>
            </statement>
            <next>
              <!-- Avanzar paleteando hacia Izquierda -->
              <block type="Repetir">
                <value name="count"><block type="math_number"><field name="NUM">4</field></block></value>
                <statement name="block">
                  <block type="MoverACasillaIzquierda"><next>
                    <block type="Si">
                      <value name="condition"><block type="TocandoPingPong"></block></value>
                      <statement name="block"><block type="RebotarPingPong"></block></statement>
                    </block>
                  </next></block>
                </statement>
                <next>
                  <!-- Avanzar paleteando hacia Arriba -->
                  <block type="Repetir">
                    <value name="count"><block type="math_number"><field name="NUM">4</field></block></value>
                    <statement name="block">
                      <block type="MoverACasillaArriba"><next>
                        <block type="Si">
                          <value name="condition"><block type="TocandoPingPong"></block></value>
                          <statement name="block"><block type="RebotarPingPong"></block></statement>
                        </block>
                      </next></block>
                    </statement>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>`,
    resuelveDesafio: true,
  })

  challengeTest(1135, {
    descripcionAdicional: 'Da error al querer avanzar hacia la izquierda si no hay camino',
    solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="0" y="0">
    <statement name="program">
      <block type="MoverACasillaIzquierda"></block>
    </statement>
  </block>
</xml>`,
    errorEsperado: 'No puedo ir para la izquierda',
  })

})
