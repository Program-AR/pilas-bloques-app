export const runMulangSmokeTest = () => {
  const mulangGlobal = (window as any).mulang ?? (globalThis as any).mulang

  console.log('MULANG GLOBAL', mulangGlobal)

  if (!mulangGlobal) {
    throw new Error('Mulang no está cargado como script global')
  }

  const ast = {
    tag: 'Sequence',
    contents: []
  }

  const result = mulangGlobal.astCode(ast).customExpect('')
  console.log('MULANG RESULT', result)

  return result
}