import React, { useContext } from 'react';
import { Container, interfaces } from 'inversify';

const ContainerContext = React.createContext<{ container: Container | undefined }>({ container: undefined });

type Props = {
  container: Container;
};

export const ContainerProvider: React.FC<Props> = ({ children, container }) => (
  <ContainerContext.Provider value={ { container } }>
    { children }
  </ContainerContext.Provider>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInjection<T>(identifier: interfaces.ServiceIdentifier<any>): T {
  const { container } = useContext(ContainerContext);

  if (typeof container === 'undefined') {
    throw new Error('You must pass a container to ContainerProvider');
  }

  return container.get<T>(identifier);
}
