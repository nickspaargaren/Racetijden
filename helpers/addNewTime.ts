import { api } from "@/lib/eden";

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
    await api
      .times({ gamertag })
      .add.post(
        { time, circuitId },
        { query: { apikey: process.env.API_KEY } },
      );
    window.location.reload();
  } else {
    alert(t("checkGamertagAndTime"));
  }
};
