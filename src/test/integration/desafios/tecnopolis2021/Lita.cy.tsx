import { challengeTest } from '../../../helpers/challengeTest'

describe("Tecnopolis 2021 - Con Lita", () => {

    challengeTest(2021101, {
        descripcionAdicional: "2021101: Se puede resolver",
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
            <block type=\"MoverACasillaAbajo\"></block>
          </statement>
          <next>
            <block type=\"AgarrarLechuga\">
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
                    <block type=\"AgarrarTomate\">
                      <next>
                        <block type=\"MoverACasillaArriba\">
                          <next>
                            <block type=\"PrepararEnsalada\"></block>
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
    });

    challengeTest(2021102, {
        descripcionAdicional: "2021102: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">
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
                    <block type=\"AgarrarLechuga\">
                      <next>
                        <block type=\"MoverACasillaAbajo\">
                          <next>
                            <block type=\"AgarrarTomate\"></block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
              <next>
                <block type=\"MoverACasillaDerecha\">
                  <next>
                    <block type=\"MoverACasillaAbajo\">
                      <next>
                        <block type=\"PrepararEnsalada\"></block>
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

    challengeTest(2021103, {
        descripcionAdicional: "2021103: Se puede resolver",
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
            <block type=\"AgarrarTomate\">
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
                    <block type=\"AgarrarLechuga\">
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
                                                <block type=\"PrepararEnsalada\"></block>
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
          </next>
        </block>
      </statement>
    </block>
  </xml>`
    })

    challengeTest(2021104, {
        descripcionAdicional: "2021104: Se puede resolver",
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
                <block type=\"AgarrarLechuga\">
                  <next>
                    <block type=\"MoverACasillaAbajo\">
                      <next>
                        <block type=\"AgarrarTomate\"></block>
                      </next>
                    </block>
                  </next>
                </block>
              </next>
            </block>
          </statement>
          <next>
            <block type=\"MoverACasillaDerecha\">
              <next>
                <block type=\"MoverACasillaAbajo\">
                  <next>
                    <block type=\"PrepararEnsalada\"></block>
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

    challengeTest(2021105, {
        descripcionAdicional: "2021105: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"228\" y=\"15\">
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
                <block type=\"AgarrarTomate\"></block>
              </next>
            </block>
          </statement>
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
                    <block type=\"AgarrarLechuga\"></block>
                  </next>
                </block>
              </statement>
              <next>
                <block type=\"MoverACasillaIzquierda\">
                  <next>
                    <block type=\"MoverACasillaIzquierda\">
                      <next>
                        <block type=\"PrepararEnsalada\"></block>
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
    challengeTest(2021106, {
        descripcionAdicional: "2021106: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"228\" y=\"15\">
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
                    <block type=\"AgarrarLechuga\">
                      <next>
                        <block type=\"MoverACasillaAbajo\"></block>
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
                                <block type=\"AgarrarTomate\">
                                  <next>
                                    <block type=\"MoverACasillaArriba\"></block>
                                  </next>
                                </block>
                              </statement>
                              <next>
                                <block type=\"MoverACasillaDerecha\">
                                  <next>
                                    <block type=\"PrepararEnsalada\"></block>
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

    challengeTest(2021107, {
        descripcionAdicional: "2021107: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"228\" y=\"15\">
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
                <block type=\"AgarrarLechuga\"></block>
              </next>
            </block>
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
                    <block type=\"AgarrarTomate\">
                      <next>
                        <block type=\"MoverACasillaIzquierda\"></block>
                      </next>
                    </block>
                  </statement>
                  <next>
                    <block type=\"MoverACasillaArriba\">
                      <next>
                        <block type=\"PrepararEnsalada\"></block>
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
    challengeTest(2021108, {
        descripcionAdicional: "2021108: Se puede resolver",
        solucion: `<xml xmlns=\"http://www.w3.org/1999/xhtml\">
    <variables></variables>
    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"228\" y=\"15\">
      <statement name=\"program\">
        <shadow type=\"required_statement\"></shadow>
        <block type=\"MoverACasillaDerecha\">
          <next>
            <block type=\"MoverACasillaDerecha\">
              <next>
                <block type=\"AgarrarLechuga\">
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
                                <block type=\"AgarrarTomate\">
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
                                        <block type=\"PrepararEnsalada\"></block>
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
})
