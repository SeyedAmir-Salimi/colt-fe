
export interface IAllCharacter {
  name: string,
  shortDesc: string,
  longDesc: string,
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
  place : string
  position: string
  score: number
  treasures: IUserTreasure[]
}


export type keyType = string | number | boolean | undefined | null

export type Keyable = Record<any>;
