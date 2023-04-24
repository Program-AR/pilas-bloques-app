import {describe, expect, test} from '@jest/globals';
import { Book, getBook } from '../staticData/books';
import { Challenge, getChallengeWithId, getPathToChallenge, PathToChallenge } from '../staticData/challenges';

describe('Static data fetching', () => {
  test('Should get book if it exists', () => {
    const book: Book = getBook(1)

    expect(book.id).toEqual(1)
  });

  test("Should throw error on getting book if it doesnt exist", () => {
    expect(() => getBook(1337)).toThrowError()
  })

  test("Should get challenge it it exists", () => {
    const challenge: Challenge = getChallengeWithId(201)

    expect(challenge.id).toEqual(201)
  })

  test("Should throw error on getting challenge if it doesnt exist", () => {
    expect(() => getChallengeWithId(1337)).toThrowError()
  })

  test("Path to a challenge", () => {
    const path: PathToChallenge = getPathToChallenge(201)

    expect(path.challenge.id).toEqual(201)
    expect(path.group.id).toEqual("manual1cPrimaria3.1.2")
    expect(path.chapter.id).toEqual("Capítulo 3")
    expect(path.book.id).toEqual(1)
  })
});