import React from 'react';
import { IAllCharacter, keyNullUndefined } from './custom';
import { GiRobber, GiPunchBlast, GiGunshot } from 'react-icons/gi';
import { BiMoveHorizontal, BiMoveVertical } from 'react-icons/bi';
import { MdOutlineLocalPolice } from 'react-icons/md';
export enum ButtonType {
  primary,
  secondary,
}

export const BELLE = 'Belle';
export const CHEYENNE = 'Cheyenne';
export const DJANGO = 'Django';
export const DOC = 'Doc';
export const GHOST = 'Ghost';
export const MARSHAL = 'marshal';
export const TUCO = 'Tuco';

export const MOVE_FORWARD = 'move forward';
export const MOVE_UP = 'move up';
export const MOVE_DOWN = 'move down';
export const PUNCH = 'punch';
export const SHOOT = 'shoot';
export const STEAL = 'steal';
export const SHOTTED_BY_MARSHAL = `shotted by ${MARSHAL}`;
export const BEEN_SHOT = 'been shot';

export const CAR_1 = 'car1';
export const CAR_2 = 'car2';
export const CAR_3 = 'car3';
export const CAR_4 = 'car4';
export const IN = 'in';
export const OUT = 'out';

export const cardActionsLabel = {
  [PUNCH]: 'Punch',
  [MOVE_FORWARD]: 'Move',
  [MOVE_UP]: 'Move',
  [SHOOT]: 'Shoot',
  [STEAL]: 'Steal',
  [MARSHAL]: 'Marshal',
  [BEEN_SHOT]: 'Been shot',
  [SHOTTED_BY_MARSHAL]: `Shotted by ${MARSHAL}`
};

export const carsInfoArray = [
  {
    place: CAR_4,
    style: 'bottom-[25em] left-[6em]',
    position: IN
  },
  {
    place: CAR_4,
    style: 'bottom-[34.5em] left-[6em]',
    position: OUT
  },
  {
    place: CAR_3,
    style: 'bottom-[25em] left-[29em]',
    position: IN
  },
  {
    place: CAR_3,
    style: 'bottom-[34.5em] left-[29em]',
    position: OUT
  },
  {
    place: CAR_2,
    style: 'bottom-[25EM] left-[53em]',
    position: IN
  },
  {
    place: CAR_2,
    style: 'bottom-[34.5em] left-[53em]',
    position: OUT
  },
  {
    place: CAR_1,
    style: 'bottom-[25em] left-[75em]',
    position: IN
  },
  {
    place: CAR_1,
    style: 'bottom-[34.5em] left-[75em]',
    position: OUT
  }
];

export const findCardSymbol = (actionType: string | keyNullUndefined, classStyle?: string): React.ReactNode => {
  switch (actionType) {
  case MOVE_FORWARD:
    return <BiMoveHorizontal className={classStyle}/>;
  case MOVE_UP:
    return <BiMoveVertical className={classStyle}/>;
  case MOVE_DOWN:
    return <BiMoveVertical className={classStyle}/>;
  case PUNCH:
    return <GiPunchBlast className={classStyle}/>;
  case SHOOT:
    return <GiGunshot className={classStyle}/>;
  case STEAL:
    return <GiRobber className={classStyle}/>;
  case MARSHAL:
    return <MdOutlineLocalPolice className={classStyle}/>;

  default:
    return <h1 className={classStyle}>?</h1>;
  }
};

export const ALL_CHARACTER: IAllCharacter[] = [
  {
    name: GHOST,
    shortDesc: 'Ghost is one stealthy bandit.',
    longDesc: 'During your first turn of each Round, you can play your Action card face-down on the common deck.'
  },
  {
    name: CHEYENNE,
    shortDesc: 'Cheyenne is an outstanding pickpocket',
    longDesc: 'When punching a Bandit, you can take the Purse he has just lost.'
  },
  {
    name: DJANGO,
    shortDesc: 'Django`s shots are so powerful that they knock the other bandits back.',
    longDesc: 'When shooting a Bandit, make him move one Car in the direction of fire.'
  },
  {
    name: BELLE,
    shortDesc: 'Belle`s beauty is her best weapon.',
    longDesc: 'You can shoot a Bandit who is on the same Car as you are, on the other level, through the roof of your Car.'
  },
  {
    name: TUCO,
    shortDesc: 'Tuco`s shots are not stopped by the roof.',
    longDesc: 'You cannot be the target of a Fire action or a Punch action if there is another Bandit who can be targeted, too.'
  },
  {
    name: DOC,
    shortDesc: 'Doc is the smartest Bandit of the party.',
    longDesc: 'At the beginning of each Round, draw seven cards instead of six.'
  }
];

export type CharactersEnumType = Record<string, string>;

export const characterWantedImages: CharactersEnumType = {
  [BELLE]: 'bg-BelleWanted',
  [CHEYENNE]: 'bg-CheyenneWanted',
  [DJANGO]: 'bg-DjangoWanted',
  [DOC]: 'bg-DocWanted',
  [GHOST]: 'bg-GhostWanted',
  [TUCO]: 'bg-TucoWanted',
  [MARSHAL]: ''
};

export const characterImages: CharactersEnumType = {
  [BELLE]: 'bg-Belle',
  [CHEYENNE]: 'bg-Cheyenne',
  [DJANGO]: 'bg-Django',
  [DOC]: 'bg-Doc',
  [GHOST]: 'bg-Ghost',
  [TUCO]: 'bg-Tuco',
  [MARSHAL]: 'bg-Sherif'
};

export const charactersColors: CharactersEnumType = {
  [BELLE]: 'belleViolet',
  [CHEYENNE]: 'cheyenneGreen',
  [DJANGO]: 'dJangoGray',
  [DOC]: 'docBlue',
  [GHOST]: 'ghostWhite',
  [TUCO]: 'tucoRed',
  [MARSHAL]: ''
};

export const ACTION_STATE = 'actionState';
export const CARS = 'cars';
export const GAME_ID = 'gameId';
export const GAME_STATE = 'gameState';
export const GEM = 'gem';
export const SELECTED_PASSIVE = 'selectedPassive';
export const PORT = 'port';
export const PURSE = 'purse';
export const ROUND = 'round';
export const ROUND_CARD = 'roundCard';
export const SCORE = 'score';
export const SET = 'set';
export const STRONG_BOX = 'strongbox';
export const USER_PASSIVES = 'userPassives';
export const USERS = 'users';
export const USERS_LAST_CHOSEN_CARDS = 'usersLastChosenCards';

export const FIXED_SIZE = 'w-[1920px] h-[1080px]';
export const NOTHING = 'nothing';
