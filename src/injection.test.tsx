import React from 'react';
import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import renderer from 'react-test-renderer';
import { ContainerProvider, useInjection } from './index';

describe('injection hook', () => {
  let container: Container,
      identifier: interfaces.ServiceIdentifier<symbol>,
      Component: React.FC;

  beforeEach(() => {
    container  = new Container();
    identifier = Symbol('name');

    container.bind<string>(identifier).toConstantValue('world');
    Component = () => {
      const value = useInjection<string>(identifier);

      return (
        <p>{ value }</p>
      );
    };
  });

  it('should return the value if it is bound', () => {
    const rendered = renderer.create(
      <ContainerProvider container={ container }>
        <Component />
      </ContainerProvider>,
          ),
          tree     = rendered.toJSON();

    expect(tree).toMatchSnapshot();
    // @ts-ignore
    expect(tree?.children).toEqual(['world']);
  });

  it('should throw if the value if unbound', () => {
    const OtherComponent: React.FC = () => {
            const nonValue = useInjection<string>(Symbol('nonValue'));

            return (
              <p>{ nonValue }</p>
            );
          };

    const render = () => {
      const rendered = renderer.create(
        <ContainerProvider container={ container }>
          <OtherComponent />
        </ContainerProvider>,
      );

      rendered.toJSON();
    };

    expect(render).toThrow(' matching bindings found for serviceIdentifier: Symbol(');
  });
});
