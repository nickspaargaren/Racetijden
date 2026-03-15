export type ResponseType = {
  data: {
    circuits: CircuitType[];
    times: TimeType[];
  };
  loading: boolean;
  error: string | null;
};

export type CircuitType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  flag: string | null;
  winner: string | null;
  times: TimeType[];
  creationDate: string;
};

export type TimeType = {
  time: string;
  circuit: CircuitType;
  gamertag: string;
  circuitId: string;
  creationDate: string;
  updatedAt: string;
};
