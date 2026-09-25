import { challengeTest } from '../../../helpers/challengeTest'


describe("Tecnopolis 2021 - Con Toto", () => {
    challengeTest(2021305, {
        descripcionAdicional: '2021305: Se puede resolver',
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"MoverLeyendoDerecha\">
          <next>
            <block type=\"MoverLeyendoDerecha\">
              <next>
                <block type=\"MoverLeyendoAbajo\">
                  <next>
                    <block type=\"MoverLeyendoDerecha\">
                      <next>
                        <block type=\"MoverLeyendoAbajo\">
                          <next>
                            <block type=\"MoverLeyendoIzquierda\">
                              <next>
                                <block type=\"MoverLeyendoIzquierda\">
                                  <next>
                                    <block type=\"MoverLeyendoIzquierda\">
                                      <next>
                                        <block type=\"MoverLeyendoArriba\">
                                          <next>
                                            <block type=\"MoverLeyendoDerecha\"></block>
                                          </next>
                                        </block>
                                      </next>
                                    </block>
                                  </next>
                                </block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </next>
            </block>
          </next>
        </block>
      </statement>
    </block>
  </xml>`
    })
    challengeTest(2021306, {
        descripcionAdicional: '2021306: Se puede resolver',
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">7</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverLeyendoAbajo\"></block>
          </statement>
        </block>
      </statement>
    </block>
  </xml>`
    })
    challengeTest(2021307, {
        descripcionAdicional: '2021307: Se puede resolver',
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">4</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverLeyendoAbajo\"></block>
          </statement>
          <next>
            <block type=\"repetir\">
              <value name=\"count\">
                <shadow type=\"required_value\"></shadow>
                <block type=\"math_number\">
                  <field name=\"NUM\">3</field>
                </block>
              </value>
              <statement name=\"block\">
                <shadow type=\"required_statement\"></shadow>
                <block type=\"MoverLeyendoArriba\"></block>
              </statement>
            </block>
          </next>
        </block>
      </statement>
    </block>
  </xml>`
    })
    challengeTest(2021308, {
        descripcionAdicional: '2021308: Se puede resolver',
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">8</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverLeyendoDerecha\"></block>
          </statement>
          <next>
            <block type=\"MoverLeyendoAbajo\"></block>
          </next>
        </block>
      </statement>
    </block>
  </xml>`
    })
    challengeTest(2021309, {
        descripcionAdicional: '2021309: Se puede resolver',
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">3</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverLeyendoDerecha\">
              <next>
                <block type=\"MoverLeyendoArriba\"></block>
              </next>
            </block>
          </statement>
        </block>
      </statement>
    </block>
  </xml>`
    })
})