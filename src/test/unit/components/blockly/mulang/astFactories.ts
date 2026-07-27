export function procedure(name: string, params: string[], ...seq: any[]) {
  return {
    tag: "Procedure",
    contents: [
      name,
      [
        equation(params, ...seq)
      ]
    ]
  }
}

export function equation(params: string[], ...seq: any[]) {
  return [
    params.map(name => variable(name)),
    body(...seq)
  ]
}

export function variable(name: string) {
  return {
    tag: "VariablePattern",
    contents: name
  }
}

export function body(...seq: any[]) {
  return {
    tag: "UnguardedBody",
    contents: sequence(...seq)
  }
}


export function entryPoint(name: string, ...seq: any[]) {
  return {
    tag: "EntryPoint",
    contents: [
      name,
      sequence(...seq)
    ]
  }
}

export function sequence(...seq: any[]) {
  if (seq.length == 0) return none()
  if (seq.length == 1) return seq[0]
  return rawSequence(seq)
}

export function rawSequence(contents: any[]) {
  return {
    tag: "Sequence",
    contents
  }
}

export function reference(name: string) {
  return {
    tag: "Reference",
    contents: name
  }
}

export function application(name: string, ...params: any[]) {
  return {
    tag: "Application",
    contents: [
      reference(name),
      params
    ]
  }
}

export function repeat(count: any, ...seq: any[]) {
  return {
    tag: "Repeat",
    contents: [
      count,
      sequence(...seq)
    ]
  }
}

export function muIf(condition: any, ...seq: any[]) {
  return {
    tag: "If",
    contents: [
      condition,
      sequence(...seq),
      none()
    ]
  }
}

export function ifElse(condition: any, seqTrue: any, seqFalse: any) {
  return {
    tag: "If",
    contents: [
      condition,
      seqTrue,
      seqFalse
    ]
  }
}

export function muUntil(condition: any, ...seq: any[]) {
  return {
    tag: "While",
    contents: [
      primitiveApplication('Negation', condition),
      sequence(...seq)
    ]
  }
}

export function number(n: number) {
  return {
    tag: "MuNumber",
    contents: n
  }
}

export function string(s: string) {
  return {
    tag: "MuString",
    contents: s
  }
}

export function none() {
  return {
    tag: "None",
    contents: []
  }
}

function primitive(name: string) {
  return {
    tag: "Primitive",
    contents: name
  }
}

function primitiveApplication(name: string, ...params: any[]) {
  return {
    tag: "Application",
    contents: [primitive(name), params]
  }
}
