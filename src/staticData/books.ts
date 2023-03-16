import { Chapter, getChapter } from "./chapters"

export type Book = {
  id: number,
  chapters: Chapter[]
  simpleReadMode: boolean
}

type RawBookData = {
  id: number,
  chapterIds: string[],
  simpleReadMode: boolean,
  expectations?: any
}

/**
  @throws Error
 **/
export const getBook = (id: number): Book => {
  const bookData: RawBookData | undefined = rawBooksData.find(chapter => chapter.id === id)

  if(!bookData) throw new Error("Book does not exist")

  const chapters = bookData.chapterIds.map(getChapter) 
  return {id, chapters, simpleReadMode: bookData.simpleReadMode}
}

const rawBooksData: RawBookData[] = [
  {
    id: 1,
    chapterIds: ['Capítulo 3', 'Capítulo 4', 'Capítulo 5'],
    simpleReadMode: true // modo de lectura para niños pequeños.
  },
  {
    id: 2,
    chapterIds: ['Autómatas, comandos, procedimientos y repetición', 'Alternativa condicional', 'Repetición condicional', 'Sensores Numéricos', 'Parametrización de soluciones'],
    simpleReadMode: false,
    expectations: {
      decomposition: true
    }
  },
  {
    id: 100,
    chapterIds: ['Tecnopolis 2021 Ejercicio Modelo', 'Tecnopolis 2021 Con Duba', 'Tecnopolis 2021 Con Lita', 'Tecnopolis 2021 Con Coty', 'Tecnopolis 2021 Con Toto'],
    simpleReadMode: true
  },
];
