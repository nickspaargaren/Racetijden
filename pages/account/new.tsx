import axios from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Layout from "@/components/Layout";

const GamertagForm = styled.div``;

type newGamertagProps = {
  id: string;
  gamertag: string;
};

const NewAccount: NextPage = (): ReactElement => {
  const { data: session } = useSession();

  console.log(session);

  const addGamertag = async ({ id, gamertag }: newGamertagProps) => {
    if (gamertag !== "" && id !== undefined) {
      await axios.post(
        `/api/account/${id}?apikey=${process.env.API_KEY}&gamertag=${gamertag}`
      );
      window.location.reload();
    } else {
      alert("Vul je gamertag in");
    }
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      gamertag: "",
      id: "",
    },
  });

  useEffect(() => {
    if (!session) return;

    setValue("id", session?.user?.id);
  }, [session]);

  return (
    <Layout title="Nieuw account" description="New account">
      <h1>Nieuw account</h1>

      <GamertagForm>
        <form onSubmit={handleSubmit(addGamertag)}>
          <div className="grid">
            <input
              type="text"
              placeholder="Gamertag"
              data-cy="gamertag"
              {...register("gamertag")}
            />
          </div>
          <input
            type="submit"
            className="button"
            value="Toevoegen"
            data-cy="submit"
          />
        </form>
      </GamertagForm>
    </Layout>
  );
};

export default NewAccount;
