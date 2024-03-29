import { ReactElement } from "react";
import styled from "styled-components";

import useCircuits from "@/hooks/useCircuits";

import CircuitItem from "./CircuitItem";

const StyledCircuitList = styled.div`
  overflow: hidden;
  margin: 10px;
`;

const CircuitList = ({
  searchQuery,
}: {
  searchQuery: string;
}): ReactElement => {
  const circuits = useCircuits("/api/circuits");

  if (circuits.error) {
    return <>{circuits.error}</>;
  }

  if (circuits.loading) {
    return (
      <StyledCircuitList>
        {[...Array(10)].map((_, key) => (
          <CircuitItem key={key} loading />
        ))}
      </StyledCircuitList>
    );
  }

  return (
    <StyledCircuitList>
      {circuits.data.circuits.map(
        (item) =>
          (item.name.toLowerCase() + item.description.toLowerCase()).includes(
            searchQuery.toLowerCase()
          ) && <CircuitItem key={item.name} item={item} />
      )}
    </StyledCircuitList>
  );
};

export default CircuitList;
