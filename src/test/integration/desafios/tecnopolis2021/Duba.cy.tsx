import { challengeTest } from '../../../helpers/challengeTest'

describe("Tecnopolis 2021 - Con Duba", () => {

    challengeTest(202102, {
        descripcionAdicional: "202102: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
  <variables></variables>
  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"273\" y=\"15\">
    <statement name=\"program\">
      <shadow type=\"required_statement\"></shadow>
      <block type=\"repetir\">
        <value name=\"count\">
          <shadow type=\"required_value\"></shadow>
          <block type=\"math_number\">
            <field name=\"NUM\">2</field>
          </block>
        </value>
        <statement name=\"block\">
          <shadow type=\"required_statement\"></shadow>
          <block type=\"MoverACasillaDerecha\">
            <next>
              <block type=\"MoverACasillaAbajo\"></block>
            </next>
          </block>
        </statement>
        <next>
          <block type=\"ComerChurrasco\"></block>
        </next>
      </block>
    </statement>
  </block>
</xml>`
    })
    challengeTest(2021001, {
        descripcionAdicional: "2021001: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">5</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverACasillaDerecha\"></block>
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
                <block type=\"MoverACasillaAbajo\"></block>
              </statement>
              <next>
                <block type=\"ComerChurrasco\">
                  <next>
                    <block type=\"MoverACasillaAbajo\">
                      <next>
                        <block type=\"ComerChurrasco\"></block>
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
    challengeTest(2021002, {
        descripcionAdicional: "2021002: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">5</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverACasillaDerecha\">
              <next>
                <block type=\"MoverACasillaAbajo\"></block>
              </next>
            </block>
          </statement>
          <next>
            <block type=\"ComerChurrasco\"></block>
          </next>
        </block>
      </statement>
    </block>
  </xml>`
    })
    challengeTest(2021003, {
        descripcionAdicional: "2021003: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">5</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverACasillaDerecha\"></block>
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
                <block type=\"MoverACasillaAbajo\"></block>
              </statement>
              <next>
                <block type=\"MoverACasillaIzquierda\">
                  <next>
                    <block type=\"MoverACasillaIzquierda\">
                      <next>
                        <block type=\"MoverACasillaAbajo\">
                          <next>
                            <block type=\"MoverACasillaAbajo\">
                              <next>
                                <block type=\"MoverACasillaDerecha\">
                                  <next>
                                    <block type=\"MoverACasillaDerecha\">
                                      <next>
                                        <block type=\"ComerChurrasco\"></block>
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
    challengeTest(2021004, {
        descripcionAdicional: "2021004: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">
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
            <block type=\"MoverACasillaDerecha\">
              <next>
                <block type=\"MoverACasillaAbajo\">
                  <next>
                    <block type=\"ComerChurrasco\"></block>
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </statement>
    </block>
  </xml>`
    })
    challengeTest(2021005, {
        descripcionAdicional: "2021005: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"repetir\">
          <value name=\"count\">
            <shadow type=\"required_value\"></shadow>
            <block type=\"math_number\">
              <field name=\"NUM\">5</field>
            </block>
          </value>
          <statement name=\"block\">
            <shadow type=\"required_statement\"></shadow>
            <block type=\"MoverACasillaDerecha\"></block>
          </statement>
          <next>
            <block type=\"ComerChurrasco\">
              <next>
                <block type=\"repetir\">
                  <value name=\"count\">
                    <shadow type=\"required_value\"></shadow>
                    <block type=\"math_number\">
                      <field name=\"NUM\">5</field>
                    </block>
                  </value>
                  <statement name=\"block\">
                    <shadow type=\"required_statement\"></shadow>
                    <block type=\"MoverACasillaAbajo\"></block>
                  </statement>
                  <next>
                    <block type=\"ComerChurrasco\"></block>
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
    challengeTest(2021006, {
        descripcionAdicional: "2021006: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"MoverACasillaDerecha\">
          <next>
            <block type=\"MoverACasillaDerecha\">
              <next>
                <block type=\"repetir\">
                  <value name=\"count\">
                    <shadow type=\"required_value\"></shadow>
                    <block type=\"math_number\">
                      <field name=\"NUM\">5</field>
                    </block>
                  </value>
                  <statement name=\"block\">
                    <shadow type=\"required_statement\"></shadow>
                    <block type=\"MoverACasillaAbajo\">
                      <next>
                        <block type=\"ComerChurrasco\"></block>
                      </next>
                    </block>
                  </statement>
                  <next>
                    <block type=\"MoverACasillaDerecha\">
                      <next>
                        <block type=\"MoverACasillaDerecha\">
                          <next>
                            <block type=\"repetir\">
                              <value name=\"count\">
                                <shadow type=\"required_value\"></shadow>
                                <block type=\"math_number\">
                                  <field name=\"NUM\">5</field>
                                </block>
                              </value>
                              <statement name=\"block\">
                                <shadow type=\"required_statement\"></shadow>
                                <block type=\"ComerChurrasco\">
                                  <next>
                                    <block type=\"MoverACasillaArriba\"></block>
                                  </next>
                                </block>
                              </statement>
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
    challengeTest(2021007, {
        descripcionAdicional: "2021007: Se puede resolver",
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
            <block type=\"MoverACasillaDerecha\"></block>
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
                <block type=\"MoverACasillaAbajo\"></block>
              </statement>
              <next>
                <block type=\"repetir\">
                  <value name=\"count\">
                    <shadow type=\"required_value\"></shadow>
                    <block type=\"math_number\">
                      <field name=\"NUM\">2</field>
                    </block>
                  </value>
                  <statement name=\"block\">
                    <shadow type=\"required_statement\"></shadow>
                    <block type=\"MoverACasillaIzquierda\"></block>
                  </statement>
                  <next>
                    <block type=\"MoverACasillaArriba\">
                      <next>
                        <block type=\"ComerChurrasco\"></block>
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
    challengeTest(2021008, {
        descripcionAdicional: "2021008: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"MoverACasillaDerecha\">
          <next>
            <block type=\"MoverACasillaDerecha\">
              <next>
                <block type=\"repetir\">
                  <value name=\"count\">
                    <shadow type=\"required_value\"></shadow>
                    <block type=\"math_number\">
                      <field name=\"NUM\">5</field>
                    </block>
                  </value>
                  <statement name=\"block\">
                    <shadow type=\"required_statement\"></shadow>
                    <block type=\"MoverACasillaAbajo\"></block>
                  </statement>
                  <next>
                    <block type=\"MoverACasillaIzquierda\">
                      <next>
                        <block type=\"MoverACasillaIzquierda\">
                          <next>
                            <block type=\"ComerChurrasco\">
                              <next>
                                <block type=\"repetir\">
                                  <value name=\"count\">
                                    <shadow type=\"required_value\"></shadow>
                                    <block type=\"math_number\">
                                      <field name=\"NUM\">5</field>
                                    </block>
                                  </value>
                                  <statement name=\"block\">
                                    <shadow type=\"required_statement\"></shadow>
                                    <block type=\"MoverACasillaDerecha\"></block>
                                  </statement>
                                  <next>
                                    <block type=\"ComerChurrasco\"></block>
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
})