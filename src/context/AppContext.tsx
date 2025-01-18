import { createContext, useState, useContext, FC, ReactNode } from "react";

interface AppState {
  name: string;
  surname: string;
  topic: string;
  customTopic: string;
  imageUrl: string;
}

interface AppContextProps extends AppState {
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setTopic: (topic: string) => void;
  setCustomTopic: (customTopic: string) => void;
  setImageUrl: (imageUrl: string) => void;
  reset: () => void;
}

const defaultState: AppState = {
  name: "",
  surname: "",
  topic: "Travel",
  customTopic: "",
  imageUrl: ""
};

export const AppContext = createContext<AppContextProps>({
  ...defaultState,
  setName: () => {},
  setSurname: () => {},
  setTopic: () => {},
  setCustomTopic: () => {},
  setImageUrl: () => {},
  reset: () => {}
});

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState(defaultState.name);
  const [surname, setSurname] = useState(defaultState.surname);
  const [topic, setTopic] = useState(defaultState.topic);
  const [customTopic, setCustomTopic] = useState(defaultState.customTopic);
  const [imageUrl, setImageUrl] = useState(defaultState.imageUrl);

  const reset = () => {
    setName("");
    setSurname("");
    setTopic("Travel");
    setCustomTopic("");
    setImageUrl("");
  };

  return (
    <AppContext.Provider
      value={{
        name,
        surname,
        topic,
        customTopic,
        imageUrl,
        setName,
        setSurname,
        setTopic,
        setCustomTopic,
        setImageUrl,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
