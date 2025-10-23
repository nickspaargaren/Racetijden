import { ReactElement } from "react";
import styled from "styled-components";

import useCircuits from "@/hooks/useCircuits";
import { ResponseType } from "@/types";

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
  const { data, isLoading, error } = useCircuits<ResponseType>("/api/circuits");

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading || !data) {
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
      {data.data.circuits.map(
        (item) =>
          (item.name.toLowerCase() + item.description.toLowerCase()).includes(
            searchQuery.toLowerCase(),
          ) && <CircuitItem key={item.name} item={item} />,
      )}
    </StyledCircuitList>
  );
};

export default CircuitList;
