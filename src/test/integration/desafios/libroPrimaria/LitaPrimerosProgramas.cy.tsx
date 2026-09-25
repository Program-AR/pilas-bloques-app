import { challengeTest } from '../../../helpers/challengeTest'

describe("Lita - Primeros programas", () => {

    challengeTest(214, {
        descripcionAdicional: '214: Se puede resolver',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="AgarrarTomate">
                  <next>
                    <block type="MoverACasillaDerecha">
                      <next>
                        <block type="AgarrarLechuga">
                          <next>
                            <block type="MoverACasillaDerecha">
                              <next>
                                <block type="MoverACasillaAbajo">
                                  <next>
                                    <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });

    challengeTest(214, {
        descripcionAdicional: "214: Da error al chocarse un obstáculo",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaIzquierda"></block>
      </statement>
    </block>
  </xml>`,
        errorEsperado: "¡Hay un obstáculo!"
    });

    challengeTest(214, {
        descripcionAdicional: "214: Hacen falta tomate y lechuga",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="MoverACasillaDerecha">
                  <next>
                    <block type="MoverACasillaDerecha">
                      <next>
                        <block type="MoverACasillaAbajo">
                          <next>
                            <block type="PrepararEnsalada"></block>
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
  </xml>`,
        errorEsperado: "¡Todavía me quedan ingredientes por recoger!"
    });

    challengeTest(214, {
        descripcionAdicional: "214: Hace falta tomate",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="MoverACasillaDerecha">
                  <next>
                    <block type="AgarrarLechuga">
                      <next>
                        <block type="MoverACasillaDerecha">
                          <next>
                            <block type="MoverACasillaAbajo">
                              <next>
                                <block type="PrepararEnsalada"></block>
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
  </xml>`,
        errorEsperado: "¡Todavía me queda tomate por recoger!"
    });

    challengeTest(214, {
        descripcionAdicional: "214: Hace falta lechuga",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="AgarrarTomate">
                  <next>
                    <block type="MoverACasillaDerecha">
                      <next>
                        <block type="MoverACasillaDerecha">
                          <next>
                            <block type="MoverACasillaAbajo">
                              <next>
                                <block type="PrepararEnsalada"></block>
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
  </xml>`,
        errorEsperado: '¡Todavía me queda lechuga por recoger!'
    });

    challengeTest(214, {
        descripcionAdicional: "214: Solo se puede preparar ensalada si hay ensaladera",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="PrepararEnsalada"></block>
      </statement>
    </block>
  </xml>`,
        errorEsperado: "¡Acá no hay ensaladera!"
    });


    challengeTest(214, {
        descripcionAdicional: "214: Se chequea que se haya preparado la ensalada",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="AgarrarTomate">
                  <next>
                    <block type="MoverACasillaDerecha">
                      <next>
                        <block type="AgarrarLechuga">
                          <next>
                            <block type="MoverACasillaDerecha">
                              <next>
                                <block type="MoverACasillaAbajo"></block>
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
  </xml>`,
        resuelveDesafio: false
    });


    challengeTest(215, {
        descripcionAdicional: '215: Se puede resolver',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaArriba">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="MoverACasillaDerecha">
                  <next>
                    <block type="AgarrarLechuga">
                      <next>
                        <block type="MoverACasillaArriba">
                          <next>
                            <block type="AgarrarTomate">
                              <next>
                                <block type="MoverACasillaAbajo">
                                  <next>
                                    <block type="MoverACasillaDerecha">
                                      <next>
                                        <block type="MoverACasillaDerecha">
                                          <next>
                                            <block type="MoverACasillaAbajo">
                                              <next>
                                                <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });


    challengeTest(216, {
        descripcionAdicional: '216: Se puede resolver (solución 1)',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaArriba">
              <next>
                <block type="AgarrarLechuga">
                  <next>
                    <block type="MoverACasillaAbajo">
                      <next>
                        <block type="MoverACasillaAbajo">
                          <next>
                            <block type="AgarrarTomate">
                              <next>
                                <block type="MoverACasillaArriba">
                                  <next>
                                    <block type="MoverACasillaDerecha">
                                      <next>
                                        <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });

    challengeTest(216, {
        descripcionAdicional: '216: Se puede resolver (solución 2)',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaAbajo">
              <next>
                <block type="AgarrarTomate">
                  <next>
                    <block type="MoverACasillaArriba">
                      <next>
                        <block type="MoverACasillaArriba">
                          <next>
                            <block type="AgarrarLechuga">
                              <next>
                                <block type="MoverACasillaAbajo">
                                  <next>
                                    <block type="MoverACasillaDerecha">
                                      <next>
                                        <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });


    challengeTest(217, {
        descripcionAdicional: '217: Se puede resolver',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaArriba">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="AgarrarLechuga">
                  <next>
                    <block type="MoverACasillaDerecha">
                      <next>
                        <block type="AgarrarTomate">
                          <next>
                            <block type="MoverACasillaDerecha">
                              <next>
                                <block type="MoverACasillaAbajo">
                                  <next>
                                    <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });


    challengeTest(218, {
        descripcionAdicional: '218: Se puede resolver',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaIzquierda">
          <next>
            <block type="MoverACasillaAbajo">
              <next>
                <block type="AgarrarLechuga">
                  <next>
                    <block type="MoverACasillaDerecha">
                      <next>
                        <block type="MoverACasillaDerecha">
                          <next>
                            <block type="AgarrarTomate">
                              <next>
                                <block type="MoverACasillaIzquierda">
                                  <next>
                                    <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });


    challengeTest(219, {
        descripcionAdicional: '219: Se puede resolver',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaAbajo">
          <next>
            <block type="AgarrarTomate">
              <next>
                <block type="MoverACasillaIzquierda">
                  <next>
                    <block type="AgarrarLechuga">
                      <next>
                        <block type="MoverACasillaAbajo">
                          <next>
                            <block type="MoverACasillaDerecha">
                              <next>
                                <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });


    challengeTest(224, {
        descripcionAdicional: '224: La solución provista no resuelve el problema',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="MoverACasillaDerecha">
                  <next>
                    <block type="AgarrarLechuga">
                      <next>
                        <block type="MoverACasillaArriba">
                          <next>
                            <block type="MoverACasillaDerecha">
                              <next>
                                <block type="MoverACasillaAbajo">
                                  <next>
                                    <block type="PrepararEnsalada"></block>
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
  </xml>`,
        errorEsperado: '¡Todavía me queda tomate por recoger!'
    });

    challengeTest(224, {
        descripcionAdicional: '224: La solución correcta resuelve el problema',
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
      <statement name="program">
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaDerecha">
              <next>
                <block type="MoverACasillaDerecha">
                  <next>
                    <block type="AgarrarLechuga">
                      <next>
                        <block type="MoverACasillaArriba">
                          <next>
                            <block type="MoverACasillaDerecha">
                              <next>
                                <block type="AgarrarTomate">
                                  <next>
                                    <block type="MoverACasillaAbajo">
                                      <next>
                                        <block type="PrepararEnsalada"></block>
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
  </xml>`,
    });

});
