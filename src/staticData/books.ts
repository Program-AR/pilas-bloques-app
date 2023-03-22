import { Challenge } from "./challenges"
import { Chapter, chapterIncludesChallenge, getChapter } from "./chapters"

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

export const getAllBooks = (): Book[] => {
  return rawBooksData.map(rawDataToBook)
}

/**
  @throws Error
 **/
export const getBook = (id: number): Book => {
  const bookData: RawBookData | undefined = rawBooksData.find(chapter => chapter.id === id)

  if(!bookData) throw new Error("Book does not exist")

  return rawDataToBook(bookData)
}

const rawDataToBook = (rawBook: RawBookData): Book => {
  const chapters = rawBook.chapterIds.map(getChapter) 
  return {id: rawBook.id, chapters, simpleReadMode: rawBook.simpleReadMode}
}

export const bookIncludesChallenge = (book: Book, challenge: Challenge): boolean => {
  return book.chapters.some(chapter => chapterIncludesChallenge(chapter, challenge))
}

const rawBooksData: RawBookData[] = [
  {
    id: 1,
    chapterIds: ['Capítulo 3', 'Capítulo 4', 'Capítulo 5'],
    simpleReadMode: true
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
