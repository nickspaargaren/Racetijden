import axios from "axios";
import formatStringByPattern from "format-string-by-pattern";
import type { GetServerSideProps, NextPage } from "next";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import styled from "styled-components";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import useCircuits from "@/hooks/useCircuits";
import { getwinner } from "@/utils";

const TextButton = styled.button`
  border: 0;
  background: none;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  color: inherit;
`;

const NewTimeForm = styled.div`
  background-color: #15151e;
  padding: 10px;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    input {
      display: block;
      width: 100%;
      margin: 0 0 10px;
      line-height: normal;
      padding: 5px;
      border: 0;
      border-radius: 0;
      font-size: 16px;
    }
  }

  .button {
    background-color: #e30600;
    color: #fff;
    text-align: center;
    line-height: normal;
    padding: 5px;
    font-size: 16px;
    display: block;
    width: 100%;
    outline: none;
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
  }
`;

const TimeTable = styled.div<{
  justifyContent: "space-between" | "space-around";
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  > div {
    padding: 5px 10px;
  }
`;

const Time = styled.div`
  text-align: right;
  font-family: monospace;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1.5px;
  margin: auto 0;
`;

type newtimeProps = {
  circuitId: number;
  time: string;
  gamertag: string;
};

const Circuit: NextPage<{ circuit: string }> = ({ circuit }): ReactElement => {
  const circuits = useCircuits(`/api/circuits/${circuit}?times=true`);

  const addNewTime = async ({ circuitId, time, gamertag }: newtimeProps) => {
    if (gamertag !== "" && time !== "" && !time.includes("_")) {
      await axios.post(
        `/api/times/${gamertag}?apikey=${process.env.API_KEY}&time=${time}&circuitId=${circuitId}`
      );
      window.location.reload();
    } else {
      alert("Controleer je gamertag en tijd.");
    }
  };

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      circuitId: 0,
      time: "",
      gamertag: "",
    },
  });

  if (circuits.error) {
    return (
      <Layout title="F1 stats" description="Circuits">
        {circuits.error}
      </Layout>
    );
  }

  if (circuits.loading) {
    return (
      <Layout title={circuit} description="Loading...">
        <Loading />
      </Layout>
    );
  }

  const [currentCircuit] = circuits.data.circuits;

  setValue("circuitId", currentCircuit.id);

  const winner = getwinner(currentCircuit.times);

  return (
    <Layout
      title={currentCircuit.name}
      description={currentCircuit.description}
      winner={winner}
    >
      {winner ? (
        currentCircuit.times.map((item, index) => {
          let difference;

          if (index + 1 <= currentCircuit.times.length && index > 0) {
            const comparetime = currentCircuit.times[index - 1].time
              .replace(".", "")
              .replace(":", "");

            const time = item.time.replace(".", "").replace(":", "");

            difference = Number(time) - Number(comparetime);

            if (difference.toString().split("").length < 4) {
              difference = `0${difference}`;
            }

            if (difference < 0) {
              difference = "";
            } else {
              if (difference.toString().length === 8) {
                difference = formatStringByPattern("+00:00.000", difference);
              } else if (difference.toString().length === 7) {
                difference = formatStringByPattern("+0:00.000", difference);
              } else if (difference.toString().length === 6) {
                difference = formatStringByPattern("+00.000", difference);
              } else if (difference.toString().length === 5) {
                difference = formatStringByPattern("+00.000", difference);
              } else if (difference.toString().length === 4) {
                difference = formatStringByPattern("+0.000", difference);
              } else if (difference.toString().length === 3) {
                difference = formatStringByPattern("+000", difference);
              }
            }
          }

          return (
            <TimeTable justifyContent="space-between" key={item._id}>
              <div style={{ marginRight: "auto" }}>
                <TextButton
                  type="button"
                  onClick={() => setValue("gamertag", item.gamertag)}
                >
                  {item.gamertag}
                </TextButton>
              </div>
              <Time style={{ color: "#f00" }}>{difference}</Time>
              <Time>{item.time}</Time>
            </TimeTable>
          );
        })
      ) : (
        <TimeTable justifyContent="space-around" data-cy="notimes">
          <div>Nog geen tijden</div>
        </TimeTable>
      )}
      <NewTimeForm>
        <form onSubmit={handleSubmit(addNewTime)}>
          <div className="grid">
            <input
              type="text"
              placeholder="Gamertag"
              data-cy="gamertag"
              {...register("gamertag")}
            />
            <NumberFormat
              format="##:##.###"
              mask="_"
              type="text"
              placeholder="Tijd"
              data-cy="time"
              onValueChange={(v) => setValue("time", v.formattedValue)}
            />
          </div>
          <input
            type="submit"
            className="button"
            value="Toevoegen"
            data-cy="submit"
          />
        </form>
      </NewTimeForm>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      circuit: context.query.circuit,
    },
  };
};

export default Circuit;
