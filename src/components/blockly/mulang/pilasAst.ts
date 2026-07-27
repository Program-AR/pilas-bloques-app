export type MulangNode = {
  tag: string
  contents: any
}

export const createNode = (tag: string, contents: any): MulangNode => ({
  tag,
  contents,
})

export const createReference = (name: string): MulangNode =>
  createNode('Reference', name)

export const createEmptyNode = (): MulangNode =>
  createNode('None', [])