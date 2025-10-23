"use client";

import { ReactElement, use } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import styled from "styled-components";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { addNewTime } from "@/helpers/addNewTime";
import { useTranslation } from "@/helpers/useTranslation";
import useCircuits from "@/hooks/useCircuits";
import { ResponseType } from "@/types";
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
  justifycontent: "space-between" | "space-around";
}>`
  display: flex;
  justify-content: ${({ justifycontent }) => justifycontent};

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

const CircuitPage = (props: {
  params: Promise<{ circuit: string }>;
}): ReactElement => {
  const params = use(props.params);
  const { data, error, isLoading } = useCircuits<ResponseType>(
    `/api/circuits/${params.circuit}`,
  );
  const { t } = useTranslation();

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      circuitId: 0,
      time: "",
      gamertag: "",
    },
  });

  if (error) {
    return (
      <Layout title={t("F1times", { version: "22" })} description="Circuits">
        {error.message}
      </Layout>
    );
  }

  if (isLoading || !data) {
    return (
      <Layout title={t("loading")} description={t("loading")}>
        <Loading />
      </Layout>
    );
  }

  const [currentCircuit] = data.data.circuits;

  setValue("circuitId", currentCircuit.id);

  const winner = getwinner(currentCircuit.times);

  return (
    <Layout
      title={currentCircuit.name}
      description={currentCircuit.description}
      winner={winner}
    >
      {winner ? (
        currentCircuit.times.map((item, key) => (
          <TimeTable justifycontent="space-between" key={key}>
            <div>
              <TextButton
                type="button"
                onClick={() => setValue("gamertag", item.gamertag)}
              >
                {item.gamertag}
              </TextButton>
            </div>
            <Time>{item.time}</Time>
          </TimeTable>
        ))
      ) : (
        <TimeTable justifycontent="space-around" data-cy="notimes">
          <div>{t("noTimesSet")}</div>
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
            <PatternFormat
              format="##:##.###"
              mask="_"
              type="text"
              placeholder={t("time")}
              data-cy="time"
              onValueChange={(v) => setValue("time", v.formattedValue)}
            />
          </div>
          <input
            type="submit"
            className="button"
            value={t("add")}
            data-cy="submit"
          />
        </form>
      </NewTimeForm>
    </Layout>
  );
};

export default CircuitPage;
