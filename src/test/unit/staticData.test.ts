import { Book, getBook } from '../../staticData/books';
import { Challenge, getChallengeWithId, getChallengeWithName, getPathToChallenge, PathToChallenge } from '../../staticData/challenges';
import { expectToThrow } from '../testUtils';

describe('Static data fetching', () => {
  test('Should get book if it exists', () => {
    const book: Book = getBook(1)

    expect(book.id).toEqual(1)
  });

  test("Should throw error on getting book if it doesnt exist", () => {
    expectToThrow(() => getBook(1337))
  })

  test("Should get challenge by id if it exists", () => {
    const challenge: Challenge = getChallengeWithId(201)

    expect(challenge.id).toEqual(201)
  })

  test("Should throw error on getting challenge by id if it doesnt exist", () => {
    expectToThrow(() => getChallengeWithId(1337))
  })

  test("Should get challenge by name if it exists", () => {
    const challenge: Challenge = getChallengeWithName("NoMeCansoDeSaltar")

    expect(challenge.id).toEqual(1003)
  })

  test("Should throw error on getting challenge by name if it doesnt exist", () => {
    expectToThrow(() => getChallengeWithName("MeCanseDeSaltar"))
  })

  test("Path to a challenge", () => {
    const path: PathToChallenge = getPathToChallenge(201)

    expect(path.challenge.id).toEqual(201)
    expect(path.group.id).toEqual("manual1cPrimaria3.1.2")
    expect(path.chapter.id).toEqual("Capítulo 3")
    expect(path.book.id).toEqual(1)
  })
});