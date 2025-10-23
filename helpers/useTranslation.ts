import nl from "@/translations/nl-NL.json";

export const useTranslation = () => {
  const t = (key: keyof typeof nl, obj?: Record<string, string>) => {
    if (!nl[key]) {
      throw new Error(`No translation found for ${key}`);
    }

    if (!obj) {
      return nl[key];
    }

    const searchValue = `{${Object.keys(obj)[0]}}`;
    const replaceValue = obj[Object.keys(obj)[0]];

    return nl[key].replace(searchValue, replaceValue);
  };

  return {
    t,
  };
};
