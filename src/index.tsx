import React, { useContext } from 'react';
import { Container, interfaces } from 'inversify';

const ContainerContext = React.createContext<{ container: Container }>({ container: null! });

type Props = {
  container: Container;
};

export const ContainerProvider: React.FC<Props> = ({ children, container }) => (
  <ContainerContext.Provider value={ { container } }>
    { children }
  </ContainerContext.Provider>
);

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<any>): T {
  const { container } = useContext(ContainerContext);

  return container.get<T>(identifier);
}
