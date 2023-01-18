import { IAllCharacter, Keyable } from "./custom";

export enum ButtonType {
  primary,
  secondary,
}

export const ALL_CHARACTER: IAllCharacter[] = [
  {
    name: 'Ghost',
    shortDesc: 'Ghost is one stealthy bandit.',
    longDesc: 'During your first turn of each Round, you can play your Action card face-down on the common deck.'
  },
  {
    name: 'Cheyenne',
    shortDesc: 'Cheyenne is an outstanding pickpocket',
    longDesc: 'When punching a Bandit, you can take the Purse he has just lost.'
  },
  {
    name: 'Django',
    shortDesc: 'Django`s shots are so powerful that they knock the other bandits back.',
    longDesc: 'When shooting a Bandit, make him move one Car in the direction of fire.'
  },
  {
    name: 'Belle',
    shortDesc: 'Belle`s beauty is her best weapon.',
    longDesc: 'You can shoot a Bandit who is on the same Car as you are, on the other level, through the roof of your Car.'
  },
  {
    name: 'Tuco',
    shortDesc: 'Tuco`s shots are not stopped by the roof.',
    longDesc: 'You cannot be the target of a Fire action or a Punch action if there is another Bandit who can be targeted, too.'
  },
  {
    name: 'Doc',
    shortDesc: 'Doc is the smartest Bandit of the party.',
    longDesc: 'At the beginning of each Round, draw seven cards instead of six.'
  },
]

export const characterImages: Keyable = {
  'Doc': 'bg-Doc',
  'Belle': 'bg-Belle',
  'Ghost': 'bg-Ghost',
  'Cheyenne': 'bg-Cheyenne',
  'Django': 'bg-Django',
  'Tuco': 'bg-Tuco',
}

export const GEM = 'gem';
export const PURSE = 'purse';
export const SCORE = 'score';
export const STRONG_BOX = 'strongbox';

const exportedObject = {
  ALL_CHARACTER,
  ButtonType,
  characterImages,
  GEM,
  PURSE,
  SCORE
};

export default exportedObject;
