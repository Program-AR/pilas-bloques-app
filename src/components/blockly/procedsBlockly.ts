import * as Blockly from 'blockly/core';

const PLUS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfhDAUCCjFLV0NqAAAC60lEQVR42u3dQW7aQABA0Wl7MMjJICeDnIwuqm4qVQrYjMH/Pa/jsfFnTJDwjAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBUP7Y+gClOY4zznX9zHmN8bn3gLHcYtwXbYevDZ5nLost/G7dx2foUeNzyyy+BN7Zs8ncjeHvrvP/NAW9qvff/rueAn1sfwNMcX3hvL2S/3wPcVt7fTl+p/c4AfIsA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4mYHcBinVRdz+v+2tjlHfdrv8lRjHFZcyG3P22VmBPOWQrrsd+WtJ7iOjzkDzQrA5b/XpATmBHAY1ynj7MtxfD1/kDkBrP+RrGHC1ZnxX8Bpwhj7NOGV8z1A3IxbgBvA455+fcwAcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcT9mjLKcevTfFPn5/860AwQ58ehr2wnPw51C3jMccYgcwL48nyAu11nPB3AI2Je1bRHxMz7EPgxjuaBb7mO46zLP3MG+OMwjuM8ecx3cp419f81O4B51v7PY6evlO8B4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQN2fp2G0cV9zXhEVct7HfGeD6wntjisu4rbRdtj4VHnFYLYDD1qfCY9aZA7z/39jyBFz+N7fsRrD7yX+n62H+4zTG3QvWnscYn1sfOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALvzG8Ijm7EmMQYoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEyLTA1VDAyOjEwOjQ5LTA1OjAwJa2zowAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMi0wNVQwMjoxMDo0OS0wNTowMFTwCx8AAAAASUVORK5CYII="
const MINUS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfhDAUCCi+xWH4JAAABcUlEQVR42u3c7ZGCMBSG0etuYcTKls7AyrSEVWd4+bjnUECMeSbhD6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBzu4XHm2rUvPekD2yutR57/4itTLXU0/Pvs9SUW5TcDrDUyE3r9Na6ZwZKBWD5PxVKIBPAVGtknGsZibeBTADPyCjXE1idn8A0/gJjXFPgn0sEwIEljgAHwPc2Xx87QHMCaE4AzQmgOQE0J4DmBNCcAJoTQHMCaE4AzQmgOQE0J4DmBNCcAJoTQHMCaE4AzQmgOQE0J4DmBNDcb2SUsfc0T2re/utAO0BzPg49sot8HOoI+M5IDJIJ4OF+gI+F7gpyRcwxxa6Iyb0E3mvYB96y1kgtv2vijubS18QBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAWXq7xrTQhKAi3AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEyLTA1VDAyOjEwOjQ3LTA1OjAwdZLI/gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMi0wNVQwMjoxMDo0Ny0wNTowMATPcEIAAAAASUVORK5CYII="
const HAND = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiBAUBKBeKSgeBAAABTElEQVQoz22QzyvDcRjHX5/vvrMyStI2uZgftdVCSpJCyW1y00oUF+Xg4OIkx5VyUyJOsgv/gnJw4YCSSFMyB5pGbLJ99/k8LltreB2f9+v50eOigoc5FvGTJF8pugCwaKaNaE98uf9zMBXwjtNpbvmuaH2B0+HXuuyMEbOlQ4U1M5ZVcYbowg02YfZW5cnE9JIROdI7jsiOacoMPLZdEYPR1ouQkxCRG+feESlIXkQOzLR+NhvCpc3UbPcHAoRsADcAQ0Twq0ZosQgEVY0SqvGpkAUCxkIUYRP4bZRRNi9pvaD+TwXyFseHuYzy/Kt8CWfQ5Ems6C/5y7uZyDEH0Nt8vq0dUx0XzaapPyIIoIi23+47+SrlTvrTjLhKy2wmO95OqiacS+QBH9gAFDlOZnYbrimWOixSZCwUlK+vZd7bXiPldyi0yqX1OtkfCBS/9XAtDKAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMDVUMDQ6NDQ6NDItMDM6MDD+uUN1AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTA1VDA0OjQwOjIzLTAzOjAw5hdZgAAAAABJRU5ErkJggg=="

export const ProcedsBlocklyInit = () => {
  Blockly.Blocks['procedures_defnoreturn'] = {
    init: function () {
      makeProcedureInit(this,
        true,
        Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,
        Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE,
        Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT,
        Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP,
        Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL
      )
    },

    /*     customContextMenu: makeProcedureCustomMenu(),
        updateParams_: makeUpdateParams(),
        domToMutation: makeProcedureDomToMutation(), */
  };

}


var makeProcedureInit = function (
  block: Blockly.Block,
  withParameters = false,
  defaultName: string,
  title: string,
  comment: string,
  tooltip: string,
  helpUrl: string,
) {

  var defaultLegalName = Blockly.Procedures.findLegalName(defaultName, block);
  var nameField = new Blockly.FieldTextInput(defaultLegalName, Blockly.Procedures.rename);
  nameField.setSpellcheck(false);

  // [!]
  var addParameterButton = new Blockly.FieldImage(
    PLUS,
    16,
    16,
    Blockly.Msg.PROCEDURES_ADD_PARAMETER,
    function () { /*addParameter(block, 0, nameField)*/}
  );

  var input = block.appendDummyInput()
    .appendField(title)
    .appendField(nameField, 'NAME')
    .appendField('', 'PARAMS')

    block.appendStatementInput("DO").setCheck(null)

  if (withParameters)
    input.appendField(addParameterButton);

  if ((block.workspace.options.comments ||
    (block.workspace.options.parentWorkspace &&
      block.workspace.options.parentWorkspace.options.comments)) &&
    comment) {
    block.setCommentText(comment);
  }
  block.setCommentText(null);
  block.setColour(290);
  block.setTooltip(tooltip);
  block.setHelpUrl(helpUrl);
  //block.arguments_ = [];
  //block.statementConnection_ = null;

  // [!] adding create call button
  var createCallButton = new Blockly.FieldImage(
    HAND,
    16,
    16,
    "",
    function () {
    }
  );
  input.appendField(createCallButton);
};


/* var addParameter = function(self: Blockly.Block, index: number, name: string) {
  //var i = index === undefined ? self.arguments_.length : index;
  var tmpName = name === undefined ? Blockly.Msg.PROCEDURES_PARAMETER + " " + (i + 1) : name;
  var name = index === undefined ? getAvailableName(self, tmpName) : tmpName;
  var id = "INPUTARG" + i;

  if (index === undefined) {
    self.arguments_.push(name);
    self.updateParams_();

    var blocks = self.workspace.getAllBlocks();
    for (block of blocks)
      if (block.type === self.callType_ && block.getProcedureCall() === self.getProcedureDef()[0]) {
        block.arguments_.push(name);
        block.updateShape_();
      }
  }

  var createCallButton = new Blockly.FieldImage(
    ProcedsBlockly.HAND,
    16,
    16,
    Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name),
    function() {
      createParameterCaller(self, self.arguments_[i])();
    }
  );

  var removeParameterButton = new Blockly.FieldImage(
    ProcedsBlockly.MINUS,
    16,
    16,
    Blockly.Msg.PROCEDURES_REMOVE_PARAMETER,
    function() {
      for (var j = 0; j < self.arguments_.length; j++)
        self.removeInput("INPUTARG" + j);
      self.arguments_.splice(i, 1);
      self.arguments_.forEach(function(name, i) {
        addParameter(this, i, name, true);
      }.bind(self));

      var blocks = self.workspace.getAllBlocks();
      for (block of blocks)
        if (block.type === self.callType_ && block.getProcedureCall() === self.getProcedureDef()[0]) {
          block.arguments_.splice(i, 1);
          block.updateShape_();
        }
    }
  );

  var nameField = new Blockly.FieldTextInput(name, function(newName) {
    var oldName = self.arguments_[i];

    if (oldName !== newName)
      newName = getAvailableName(self, newName);

    self.arguments_[i] = newName;

    var blocks = self.workspace.getAllBlocks();
    for (block of blocks) {
      if (block.type === self.callType_ && block.getProcedureCall() === self.getProcedureDef()[0]) {
        block.arguments_ = block.arguments_.map(function(it) {
          return it === oldName ? newName : it;
        });
        block.updateShape_();
      }

      if (block.type === "variables_get" && block.$parent === self.id) {
        var varField = block.getField("VAR");
        if (varField.getValue() === oldName) {
          varField.setValue(newName);
        }
      }
    }

    return newName;
  });

  self
    .appendDummyInput(id)
    .appendField(Blockly.Msg.PROCEDURES_BEFORE_PARAMS)
    .appendField(nameField, 'ARG' + i)
    .appendField(createCallButton)
    .appendField(removeParameterButton);

  self.moveInputBefore(id, 'STACK');
};
 */