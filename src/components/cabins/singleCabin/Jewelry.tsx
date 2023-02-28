import { GEM, PURSE, STRONG_BOX } from 'const'
import { ITreasuresState } from 'const/custom'
import React from 'react'

interface IJewelry {
  carJewelry: ITreasuresState[]
}

const Jewelry: React.FC<IJewelry> = ({carJewelry}): JSX.Element => {
  console.log('carJewelry', carJewelry);
  
  const treasureList = [
    {
      type: STRONG_BOX,
      number: carJewelry.filter((tr)=> tr?.treasuresType === STRONG_BOX)?.length,
      icon: 'bg-briefCase w-12 h-10'
    },
    {
      type: GEM,
      number: carJewelry.filter((tr)=> tr?.treasuresType === GEM)?.length,
      icon: 'bg-gem w-10 h-10'
    },
    {
      type: PURSE,
      number: carJewelry.filter((tr)=> tr?.treasuresType === PURSE)?.length,
      icon: 'bg-monyBag w-8 h-10'
    },
  ]
    return (<div className='w-full h-10 flex justify-around absolute bottom-0'>{
      treasureList.filter(tr=> tr.number).map(tr=> <div key={tr.type} className={`${tr.icon} bg-cover`}></div>)}
      </div>)
}
export default Jewelry
