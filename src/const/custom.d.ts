
export interface IAllCharacter {
  name: string
  shortDesc: string
  longDesc: string
}

export interface IUserTreasure {
  gameId: string
  id: string
  owner: string
  place: string
  position: string
  round: number
  treasuresType: string
  treasuresValue: number
}

export interface ICharacter {
  id: string
  ai: boolean
  nameOfCharacter: string
  place: string
  position: string
  score: number
  treasures: IUserTreasure[]
  handCards: ICardStates[]
  chosenCards: ICardStates[]
}
export interface ISign {
  ability: string
  id: number
  name: string
}

export interface IRoundCards {
  id: string
  gameId: string
  round: number
  sign: ISign
  tunnelSituation: boolean[]
}

export interface ICardStates {
  id: string
  gameId: string
  round: number | null
  set: number | null
  owner: string
  cardId: string | number
  action: string | keyNullUndefined
  revision?: number
  isUsed?: boolean
  isInvisible?: boolean
  repetition?: number
}
export interface IAction {
  id: string
  gameId: string
  round: number | null
  set: number | null
  action: string
  active: string
  passive?: string | null
  details?: string | number | null
}
export interface ITreasuresState {
  id: string
  gameId: string
  owner: string
  treasuresType: string
  position: string
  place: string
  round: number
  treasuresValue: number
  name: string
}

export interface IGameState {
  actionState: IAction[]
  cars: any
  round: number | keyNullUndefined
  set: number | keyNullUndefined
  minSet?: number | keyNullUndefined
  gameId: string | keyNullUndefined
  roundCard: null | IRoundCards
  userPassives: any[]
  users: ICharacter[]
  usersLastChosenCards: ICardStates[]
}
export interface ICreateChooseCard {
  gameId: string | undefined
  userCardId?: string | null
  isTakeCardFromDeck?: boolean
}
export interface ICreatePlayCard {
  gameId: string | undefined
  passiveId: string | null
}

export type keyType = object | string | number | boolean | undefined | null
export type keyNullUndefined = undefined | null

export type Keyable = Record<any>;

export type typeAllInArray = string[] | boolean[] | object[]
