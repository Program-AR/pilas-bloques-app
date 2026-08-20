import { challengeTest, moduloDesafio } from '../../helpers/challengeTest'

// Fuente: https://github.com/Program-AR/pilas-bloques-ember/blob/develop/tests/integration/desafios/ChuyHaciendoJueguito-test.js

moduloDesafio(1002, () => {

  challengeTest(1002, {
    solucion: `<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><shadow type="required_statement"></shadow><block type="Avanzar"><next><block type="Avanzar"><next><block type="Retroceder"><next><block type="Avanzar"><next><block type="Retroceder"><next><block type="RecogerPulpito"><next><block type="RevolearPulpito"><next><block type="RebotarPiePulpito"><next><block type="Retroceder"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`,
    resuelveDesafio: true,
  })

  challengeTest(1002, {
    descripcionAdicional: 'Invirtiendo acciones sigue funcionando la solución',
    solucion: `<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="8O=exD$F3=:_5wwm@Rz%" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><shadow type="required_statement" id="7\`[j0;$l_g)1W68#pz;6"></shadow><block type="Avanzar" id="h:.~1Q8on)sp5+qA%C=?"><next><block type="Avanzar" id="w!ZKhN]E]!PVH4QF(;u("><next><block type="Retroceder" id="y=L?JR;ZO2e3DfauQTo1"><next><block type="Avanzar" id="w!ZKhN]E]!PVH4QF(;u("><next><block type="Retroceder" id="y=L?JR;ZO2e3DfauQTo1"><next><block type="RecogerPulpito" id="@?3v[lMO$z*tS?gEPc3s"><next><block type="RebotarPiePulpito" id="OcD([58?~Q\`rMn{do-t)"><next><block type="RevolearPulpito" id="G.tP]pAjhR*iTIDwQ}cP"><next><block type="Retroceder" id="8KI3:N.SKPWtfH6=ghG]"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`,
    resuelveDesafio: true,
  })

  challengeTest(1002, {
    descripcionAdicional: 'Da error al no seguir la secuencia esperada',
    solucion: `<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="8O=exD$F3=:_5wwm@Rz%" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><shadow type="required_statement" id="\`vmtRyF)]_|/f?R);lOM"></shadow><block type="RevolearPulpito" id="G.tP]pAjhR*iTIDwQ}cP"><next><block type="RebotarPiePulpito" id="OcD([58?~Q\`rMn{do-t)"><next><block type="Retroceder" id="/|_Mh[Iz6Bv(vmAx-!gX"><next><block type="Avanzar" id="h:.~1Q8on)sp5+qA%C=?"><next><block type="Avanzar" id="w!ZKhN]E]!PVH4QF(;u("><next><block type="Retroceder" id="y=L?JR;ZO2e3DfauQTo1"><next><block type="RecogerPulpito" id="@?3v[lMO$z*tS?gEPc3s"></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`,
    errorEsperado: 'Primero hay que entrar en calor y agarrar la pelota',
  })

})
