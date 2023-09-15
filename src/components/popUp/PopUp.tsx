import React from 'react';

interface PopUpListStyle {
  top?: string
  left?: string
  width?: string
  padding?: string
  marginTop?: string
  hideBackGround?: boolean | undefined
}
interface PopUpListProps {
  isOpen: boolean
  children: React.ReactNode
  popStyle?: PopUpListStyle
}

const PopUpList: React.FC<PopUpListProps> = ({ isOpen, children, popStyle }) => {
  const popListStyle = `
    mt-${popStyle?.marginTop ?? 10}
    top-${popStyle?.top ?? 1}
    left-${popStyle?.left ?? 0}
    w-${popStyle?.width ?? 32}
    p-${popStyle?.padding ?? 2}
  `;
  const backStyle = `${(popStyle?.hideBackGround ?? false) ? '' : 'bg-white rounded-md shadow-md'}`;
  return (
    <>
      {isOpen
        ? <div
          className={`
          absolute
          ${popListStyle}
          ${backStyle}
          `}>
          {children}
        </div>
        : null}
    </>
  );
};

export default PopUpList;
