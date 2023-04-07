import React from 'react';

interface PopUpListStyle {
  top?: string
  left?: string
  width?: string
  padding?: string
  marginTop?: string
}
interface PopUpListProps {
  isOpen: boolean
  children: React.ReactNode
  popStyle?: PopUpListStyle
}

const PopUpList: React.FC<PopUpListProps> = ({ isOpen, children, popStyle }) => {
  const popListStyle = `
    mt-${popStyle?.marginTop ?? 14}
    top-${popStyle?.top ?? 1}
    left-${popStyle?.left ?? 0}
    w-${popStyle?.width ?? 28}
    p-${popStyle?.padding ?? 2}
  `;

  return (
    <>
      {isOpen
        ? <div
          className={`absolute ${popListStyle} bg-white rounded-md shadow-md`}>
          {children}
        </div>
        : null}
    </>
  );
};

export default PopUpList;
