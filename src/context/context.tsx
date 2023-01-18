import React, {useState} from 'react';

export const Context: any = React.createContext(null);

interface props{
    children: JSX.Element | JSX.Element[]
}
const ContextProvider = ({ children }: props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [contextValues, setContextValues] = useState<{
      port: string | undefined
    }>
    ({
      port: process.env.REACT_APP_GAME_VERSION
    })

    return (
      <Context.Provider value={contextValues}>
        {children}
      </Context.Provider>
    );
  };
  
  export default ContextProvider;
