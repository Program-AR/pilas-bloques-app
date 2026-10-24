import { Scene } from '../../../components/serializedChallenge'
import { testCustomChallengeAtColumn } from '../challengeTest'

describe('Challenge view with blocks', () => {
  const scene: Scene = {
    type: 'Lita',
    maps: [[["A", "L", "-"]]]
  }

  const simpleMoveSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="MoverACasillaDerecha"></block>
    </statement>
  </block>
</xml>`

  const moveWithParameterSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <shadow type="required_statement"></shadow>
      <block type="MoverA">
        <value name="direccion">
          <shadow type="required_value"></shadow>
          <block type="ParaLaDerecha"></block>
        </value>
      </block>
      </statement>
      </block>
      </xml>`

  const ifSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <shadow type="required_statement"></shadow>
      <block type="Si">
        <value name="condition">
          <shadow type="required_value"></shadow>
          <block type="HayLechuga"></block>
        </value>
        <statement name="block">
          <shadow type="required_statement"></shadow>
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
  <block type="SiNo" disabled="true" x="-632" y="103">
    <value name="condition">
      <shadow type="required_value"></shadow>
    </value>
    <statement name="block1">
      <shadow type="required_statement"></shadow>
    </statement>
    <statement name="block2">
      <shadow type="required_statement"></shadow>
    </statement>
  </block>
</xml>`

  const repeatSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <shadow type="required_statement"></shadow>
      <block type="Repetir">
        <value name="count">
          <shadow type="required_value"></shadow>
          <block type="math_number">
            <field name="NUM">2</field>
          </block>
        </value>
        <statement name="block">
          <shadow type="required_statement"></shadow>
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
  <block type="SiNo" disabled="true" x="-632" y="103">
    <value name="condition">
      <shadow type="required_value"></shadow>
    </value>
    <statement name="block1">
      <shadow type="required_statement"></shadow>
    </statement>
    <statement name="block2">
      <shadow type="required_statement"></shadow>
    </statement>
  </block>
</xml>`

  const repeatUntilSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <shadow type="required_statement"></shadow>
      <block type="Hasta">
        <value name="condition">
          <shadow type="required_value"></shadow>
          <block type="HayLechuga"></block>
        </value>
        <statement name="block">
          <shadow type="required_statement"></shadow>
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`

  const operatorSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <shadow type="required_statement"></shadow>
      <block type="Si">
        <value name="condition">
          <shadow type="required_value"></shadow>
          <block type="OpComparacion">
          <field name="OP">EQ</field>
          <value name="A">
          <shadow type="required_value"></shadow>
              <block type="Numero">
              <field name="NUM">1</field>
              </block>
            </value>
            <value name="B">
              <shadow type="required_value"></shadow>
              <block type="Numero">
              <field name="NUM">1</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="block">
        <shadow type="required_statement"></shadow>
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`

  const aritmethicSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <shadow type="required_statement"></shadow>
      <block type="Repetir">
        <value name="count">
          <shadow type="required_value"></shadow>
          <block type="OpAritmetica">
            <field name="OP">ADD</field>
            <value name="A">
              <shadow type="required_value"></shadow>
              <block type="Numero">
                <field name="NUM">1</field>
              </block>
            </value>
            <value name="B">
              <shadow type="required_value"></shadow>
              <block type="Numero">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="block">
          <shadow type="required_statement"></shadow>
          <block type="MoverACasillaDerecha"></block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`


  const procedureSolution = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <shadow type="required_statement"></shadow>
      <block type="procedures_callnoreturn">
        <mutation name="Hacer algo"></mutation>
      </block>
    </statement>
  </block>
  <block type="procedures_defnoreturn" x="131" y="177">
    <field name="NAME">Hacer algo</field>
    <statement name="STACK">
      <block type="MoverACasillaDerecha"></block>
    </statement>
  </block>
</xml>`

  const procedureWithParameterSolution = `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="param1">parámetro 1</variable>
  </variables>

  <block type="al_empezar_a_ejecutar" x="15" y="15">
    <statement name="program">
      <block type="procedures_callnoreturn">
        <mutation name="Hacer algo">
          <arg name="parámetro 1"></arg>
        </mutation>
        <value name="ARG0">
          <block type="ParaLaDerecha"></block>
        </value>
      </block>
    </statement>
  </block>

  <block type="procedures_defnoreturn" id="proc_hacer_algo" x="120" y="120">
    <field name="NAME">Hacer algo</field>
    <field name="ARG0">parámetro 1</field>
    <statement name="STACK">
      <block type="MoverA">
        <value name="direccion">
          <block type="variables_get">
            <mutation var="parámetro 1" parent="proc_hacer_algo"></mutation>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>`;

  testCustomChallengeAtColumn('Execution of a solution has effect on scene view', scene, simpleMoveSolution, 1)
  testCustomChallengeAtColumn('Code from blocks have effect - boolean operators', scene, operatorSolution, 1)
  testCustomChallengeAtColumn('Code from blocks have effect - aritmethic operators', scene, aritmethicSolution, 2)
  testCustomChallengeAtColumn('Code from blocks have effect - move with parameters', scene, moveWithParameterSolution, 1)
  testCustomChallengeAtColumn('Code from blocks have effect -  if', scene, ifSolution, 0)
  testCustomChallengeAtColumn('Code from blocks have effect - repeat', scene, repeatSolution, 2)
  testCustomChallengeAtColumn('Code from blocks have effect - repeat until', scene, repeatUntilSolution, 1)
  testCustomChallengeAtColumn('Code from blocks have effect - procedures', scene, procedureSolution, 1)
  testCustomChallengeAtColumn('Code from blocks have effect - procedures with parameter', scene, procedureWithParameterSolution, 1)
})