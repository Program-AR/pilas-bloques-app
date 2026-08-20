import { challengeTest } from '../../helpers/challengeTest'

describe('Desafío 1026 - LaSupermaraton', () => {
  it('Resuelve el desafío 1026', () => {
    const solucion = `<?xml version="1.0" encoding="UTF-8"?>
				<xml xmlns="http://www.w3.org/1999/xhtml">
   					<block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0">
      					<statement name="program">
         					<block type="Repetir" id="26" inline="true">
            					<value name="count">
               						<block type="KmsTotales" id="29" />
            					</value>
           					 	<statement name="block">
               						<block type="Avanzar1kmChuy" id="12" />
            					</statement>
         					</block>
      					</statement>
   					</block>
				</xml>`;
    challengeTest(1026, solucion)
  })

})
