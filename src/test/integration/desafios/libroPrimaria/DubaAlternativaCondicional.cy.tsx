import { challengeTest } from '../../../helpers/challengeTest'

describe("Duba - Alternativa condicional", () => {

    challengeTest(242, {
        descripcionAdicional: "242: Se puede resolver",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="MoverACasillaDerecha">
      <next>
      <block type="si">
        <value name="condition">
          <block type="HayChurrasco"></block>
        </value>
        <statement name="block">
          <block type="ComerChurrasco">
          </block>
        </statement>
      </block>
      </next>
      </block>
    </statement>
    </block>
  </xml>`
    });

    challengeTest(242, {
        descripcionAdicional: "242: Debe estar en la posición final para resolver el desafío",
        resuelveDesafio: false,
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <variables></variables>
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="300" y="15">
      <statement name="program">
        <shadow type="required_statement"></shadow>
        <block type="MoverACasillaDerecha">
          <next>
            <block type="MoverACasillaIzquierda"></block>
          </next>
        </block>
      </statement>
    </block>
  </xml>`
    });


    challengeTest(243, {
        descripcionAdicional: "243: Se puede resolver",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="MoverACasillaDerecha">
      <next>
      <block type="si">
        <value name="condition">
          <block type="HayChurrasco"></block>
        </value>
        <statement name="block">
          <block type="ComerChurrasco">
          </block>
        </statement>
      <next>
      <block type="MoverACasillaDerecha">
      <next>
      <block type="si">
        <value name="condition">
          <block type="HayChurrasco"></block>
        </value>
        <statement name="block">
          <block type="ComerChurrasco">
          </block>
        </statement>
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

    challengeTest(243, {
        descripcionAdicional: "243: Debe estar en la posición final para resolver el desafío",
        resuelveDesafio: false,
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <variables></variables>
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="300" y="15">
      <statement name="program">
        <shadow type="required_statement"></shadow>
        <block type="MoverACasillaDerecha"></block>
      </statement>
    </block>
  </xml>`
    });

    challengeTest(246, {
        descripcionAdicional: "246: Se puede resolver (solución 1)",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="SiNo">
        <value name="condition">
          <block type="HayObstaculoDerecha"></block>
        </value>
        <statement name="block1">
          <block type="MoverACasillaAbajo">
          <next>
          <block type="MoverACasillaAbajo">
          </block>
          </next>
          </block>
        </statement>
        <statement name="block2">
          <block type="MoverACasillaDerecha">
          <next>
          <block type="MoverACasillaDerecha">
          </block>
          </next>
          </block>
        </statement>
      <next>
      <block type="ComerChurrasco">
      </block>
      </next>
      </block>
    </statement>
    </block>
  </xml>`
    });

    challengeTest(246, {
        descripcionAdicional: "246: Se puede resolver (solución 2)",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="SiNo">
        <value name="condition">
          <block type="HayObstaculoAbajo"></block>
        </value>
        <statement name="block1">
          <block type="MoverACasillaDerecha">
          <next>
          <block type="MoverACasillaDerecha">
          </block>
          </next>
          </block>
        </statement>
        <statement name="block2">
          <block type="MoverACasillaAbajo">
          <next>
          <block type="MoverACasillaAbajo">
          </block>
          </next>
          </block>
        </statement>
      <next>
      <block type="ComerChurrasco">
      </block>
      </next>
      </block>
    </statement>
    </block>
  </xml>`
    });

    challengeTest(247, {
        descripcionAdicional: "247: Se puede resolver",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="MoverACasillaDerecha">
      <next>
      <block type="SiNo">
        <value name="condition">
          <block type="HayObstaculoDerecha"></block>
        </value>
        <statement name="block1">
          <block type="MoverACasillaArriba">
          <next>
          <block type="MoverACasillaDerecha">
          <next>
          <block type="MoverACasillaDerecha">
          <next>
          <block type="MoverACasillaAbajo">
          </block>
          </next>
          </block>
          </next>
          </block>
          </next>
          </block>
        </statement>
        <statement name="block2">
          <block type="MoverACasillaDerecha">
          <next>
          <block type="MoverACasillaDerecha">
          </block>
          </next>
          </block>
        </statement>
      <next>
      <block type="MoverACasillaDerecha">
      <next>
      <block type="ComerChurrasco">
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

    challengeTest(248, {
        descripcionAdicional: "248: Se puede resolver",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="Repetir">
        <value name="count">
          <block type="math_number">
            <field name="NUM">7</field>
          </block>
        </value>
        <statement name="block">
          <block type="MoverACasillaDerecha">
          </block>
        </statement>
      <next>
      <block type="si">
        <value name="condition">
          <block type="HayChurrasco"></block>
        </value>
        <statement name="block">
          <block type="ComerChurrasco">
          </block>
        </statement>
      </block>
      </next>
      </block>
    </statement>
    </block>
  </xml>`
    });

    challengeTest(248, {
        descripcionAdicional: "248: Debe estar en la posición final para resolver el desafío",
        resuelveDesafio: false,
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <variables></variables>
    <block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="300" y="15">
      <statement name="program">
        <shadow type="required_statement"></shadow>
        <block type="MoverACasillaDerecha"></block>
      </statement>
    </block>
  </xml>`
    });

    challengeTest(249, {
        descripcionAdicional: "249: Se puede resolver",
        solucion: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="Repetir">
        <value name="count">
          <block type="math_number">
            <field name="NUM">7</field>
          </block>
        </value>
        <statement name="block">
          <block type="MoverACasillaDerecha">
          <next>
          <block type="si">
            <value name="condition">
              <block type="HayChurrasco"></block>
            </value>
            <statement name="block">
              <block type="ComerChurrasco">
              </block>
            </statement>
          </block>
          </next>
          </block>
        </statement>
      </block>
    </statement>
    </block>
  </xml>`
    });

});
