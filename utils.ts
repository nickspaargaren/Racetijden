export const getwinner = <T extends { gamertag: string }>(
  object: T[],
): T["gamertag"] => (object.length > 0 ? object[0].gamertag : "");
