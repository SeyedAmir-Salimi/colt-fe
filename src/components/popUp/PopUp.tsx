import React from 'react';

interface PopUpListProps {
  isOpen: boolean
  children: React.ReactNode
}

const PopUpList: React.FC<PopUpListProps> = ({ isOpen, children }) => {
  return (
    <>
      {isOpen
        ? <div
          className={'absolute top-1 left-0 w-28 p-2 mt-8 bg-white rounded-md shadow-md'}>
          {children}
        </div>
        : null}
    </>
  );
};

export default PopUpList;
