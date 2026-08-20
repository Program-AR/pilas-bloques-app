import { challengeTest } from '../../helpers/challengeTest'

describe('Desafío 1010 - InstalandoJuegosYvoty', () => {
  it('Resuelve el desafío 1010', () => {
    const solucion = `<?xml version="1.0" encoding="UTF-8"?>
	<xml xmlns="http://www.w3.org/1999/xhtml">
	   <block type="al_empezar_a_ejecutar" id="193" deletable="false" movable="false" editable="false" x="0" y="0">
		  <statement name="program">
			 <block type="Repetir" id="212" inline="true">
				<value name="count">
				   <block type="Numero" id="213">
					  <field name="NUM">3</field>
				   </block>
				</value>
				<statement name="block">
				   <block type="PasarASiguienteComputadora" id="221">
					  <next>
						 <block type="procedures_callnoreturn" id="209">
							<mutation name="Procesar compu" />
						 </block>
					  </next>
				   </block>
				</statement>
			 </block>
		  </statement>
	   </block>
	   <block type="Procedimiento" id="195" x="23" y="215">
		  <mutation />
		  <field name="NAME">Procesar compu</field>
		  <statement name="STACK">
			 <block type="PrenderComputadora" id="229">
				<next>
				   <block type="procedures_callnoreturn" id="233">
					  <mutation name="Ingresar password" />
					  <next>
						 <block type="InstalarJuego" id="241">
							<next>
							   <block type="ApagarComputadora" id="249" />
							</next>
						 </block>
					  </next>
				   </block>
				</next>
			 </block>
		  </statement>
	   </block>
	   <block type="Procedimiento" id="198" x="487" y="218">
		  <mutation />
		  <field name="NAME">Ingresar password</field>
		  <statement name="STACK">
			 <block type="EscribirA" id="257">
				<next>
				   <block type="EscribirB" id="265">
					  <next>
						 <block type="EscribirC" id="273" />
					  </next>
				   </block>
				</next>
			 </block>
		  </statement>
	   </block>
	</xml>`;
    challengeTest(1010, solucion)
  })

})
