import { ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { api } from "@/lib/eden";

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
  const { data, isLoading, error } = useSWR("circuits", () =>
    api.circuits.get(),
  );

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

  const circuits = data.data ?? [];

  return (
    <StyledCircuitList>
      {circuits.map(
        (item) =>
          (item.name.toLowerCase() + item.description.toLowerCase()).includes(
            searchQuery.toLowerCase(),
          ) && <CircuitItem key={item.name} item={item} />,
      )}
    </StyledCircuitList>
  );
};

export default CircuitList;
