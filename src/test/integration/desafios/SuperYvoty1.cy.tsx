import { challengeTest } from '../../helpers/challengeTest'

describe('Desafío 1019 - SuperYvoty1', () => {
  it('Resuelve el desafío 1019', () => {
    const solucion = `<?xml version="1.0" encoding="UTF-8"?>
	<xml xmlns="http://www.w3.org/1999/xhtml">
	   <block type="al_empezar_a_ejecutar" id="11" deletable="false" movable="false" editable="false" x="0" y="0">
		  <statement name="program">
			 <block type="hasta" id="21" inline="true">
				<value name="condition">
				   <block type="TocandoMeta" id="24" />
				</value>
				<statement name="block">
				   <block type="DespertarLuciernaga" id="27">
					  <next>
						 <block type="MoverACasillaAbajo" id="30" />
					  </next>
				   </block>
				</statement>
			 </block>
		  </statement>
	   </block>
	</xml>`;
    challengeTest(1019, solucion)
  })

})
