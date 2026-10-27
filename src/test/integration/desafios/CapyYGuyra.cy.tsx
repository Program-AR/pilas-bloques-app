import { moduloDesafio, challengeTest } from '../../helpers/challengeTest'

moduloDesafio(1001, () => {

    challengeTest(1001, {
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <variables></variables>
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <shadow type="required_statement"></shadow>
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="MoverACasillaDerecha">
                  <next>
                    <block type="SubirPajarito"></block>
                  </next>
                </block>
              </next>
            </block>
          </next>
        </block>
      </statement>
    </block>
  </xml>`}
    )
}); 