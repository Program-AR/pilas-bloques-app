import { Challenge, ExpectationConfig } from "./challenges"
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
  expectations?: ExpectationConfig
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
    chapterIds: ['Capítulo 3', 'Capítulo 4', 'Capítulo 5', 'Desafios complementarios'],
    simpleReadMode: true
  },
  {
    id: 2,
    chapterIds: ['1','2','3'],
    simpleReadMode: false,
    expectations: {
      decomposition: true
    }
  },
  {
    id: 3,
    chapterIds: ['4', '5'],
    simpleReadMode: false,
    expectations: {
      decomposition: true
    }
  } 
];
