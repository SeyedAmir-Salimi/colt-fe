import React from 'react'
import { carsInfoArray } from 'const';
import CabinSingle from './singleCabin/CabinSingle'


const Cabins: React.FC = (): JSX.Element => {
    return (
    <>
      {carsInfoArray.map(car=> <CabinSingle key={`${car?.place}-${car?.position}`} {...car}/>)}
    </>
      )
}
export default Cabins
