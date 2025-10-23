import axios from "axios";

import { useTranslation } from "./useTranslation";

type newtimeProps = {
  circuitId: number;
  time: string;
  gamertag: string;
};

export const addNewTime = async ({
  circuitId,
  time,
  gamertag,
}: newtimeProps) => {
  const { t } = useTranslation();
  if (gamertag !== "" && time !== "" && !time.includes("_")) {
    await axios.post(
      `/api/times/${gamertag}/add?apikey=${process.env.API_KEY}&time=${time}&circuitId=${circuitId}`,
    );
    window.location.reload();
  } else {
    alert(t("checkGamertagAndTime"));
  }
};
