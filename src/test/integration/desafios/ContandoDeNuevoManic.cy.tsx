import { challengeTest, moduloDesafio } from '../../helpers/challengeTest'

// Fuente: https://github.com/Program-AR/pilas-bloques-ember/blob/develop/tests/integration/desafios/ContandoDeNuevoManic-test.js

moduloDesafio(1027, () => {

  challengeTest(1027, {
    solucion: `<?xml version="1.0" encoding="UTF-8"?>
<xml xmlns="http://www.w3.org/1999/xhtml">
         <block type="al_empezar_a_ejecutar" id="3" deletable="false" movable="false" editable="false" x="0" y="0">
            <statement name="program">
               <block type="Repetir" id="4" inline="true">
                  <value name="count">
                     <block type="math_number" id="5">
                        <field name="NUM">4</field>
                     </block>
                  </value>
                  <statement name="block">
                     <block type="Repetir" id="14" inline="true">
                        <value name="count">
                           <block type="LargoColumnaActual" id="15" />
                        </value>
                        <statement name="block">
                           <block type="MoverACasillaAbajo" id="16">
                              <next>
                                 <block type="si" id="20" inline="true">
                                    <value name="condition">
                                       <block type="TocandoPlaneta" id="21" />
                                    </value>
                                    <statement name="block">
                                       <block type="ContarPlaneta" id="22" />
                                    </statement>
                                    <next>
                                       <block type="si" id="24" inline="true">
                                          <value name="condition">
                                             <block type="TocandoEstrellaManic" id="25" />
                                          </value>
                                          <statement name="block">
                                             <block type="ContarEstrella" id="26" />
                                          </statement>
                                       </block>
                                    </next>
                                 </block>
                              </next>
                           </block>
                        </statement>
                        <next>
                           <block type="Repetir" id="10" inline="true">
                              <value name="count">
                                 <block type="LargoColumnaActual" id="11" />
                              </value>
                              <statement name="block">
                                 <block type="MoverACasillaArriba" id="12" />
                              </statement>
                              <next>
                                 <block type="SiguienteColumna" id="8" />
                              </next>
                           </block>
                        </next>
                     </block>
                  </statement>
                  <next>
                     <block type="Repetir" id="14b" inline="true">
                        <value name="count">
                           <block type="LargoColumnaActual" id="15b" />
                        </value>
                        <statement name="block">
                           <block type="MoverACasillaAbajo" id="16b">
                              <next>
                                 <block type="si" id="20b" inline="true">
                                    <value name="condition">
                                       <block type="TocandoPlaneta" id="21b" />
                                    </value>
                                    <statement name="block">
                                       <block type="ContarPlaneta" id="22b" />
                                    </statement>
                                    <next>
                                       <block type="si" id="24b" inline="true">
                                          <value name="condition">
                                             <block type="TocandoEstrellaManic" id="25b" />
                                          </value>
                                          <statement name="block">
                                             <block type="ContarEstrella" id="26b" />
                                          </statement>
                                       </block>
                                    </next>
                                 </block>
                              </next>
                           </block>
                        </statement>
                     </block>
                  </next>
               </block>
            </statement>
         </block>
      </xml>`,
    resuelveDesafio: true,
  })

})
