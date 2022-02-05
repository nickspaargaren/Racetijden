import { ReactElement } from 'react';
import styled from 'styled-components';

import useCircuits from '@/hooks/useCircuits';

import CircuitItem from './CircuitItem';

const StyledCircuitList = styled.div`
  overflow: hidden;
  margin: 10px;
`;

const CircuitList = (): ReactElement => {
  const circuits = useCircuits('https://f1.racetijden.nl/api/circuits');

  if (circuits.error) {
    return (
      <>{circuits.error}</>
    );
  }

  if (circuits.loading) {
    return (
      <StyledCircuitList>
        {[...Array(10)].map((index) => <CircuitItem key={index} loading />)}
      </StyledCircuitList>
    );
  }

  return (
    <StyledCircuitList>
      {circuits.data.circuits
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => (
          <CircuitItem key={item._id} item={item} />
        ))}
    </StyledCircuitList>
  );
};

export default CircuitList;
