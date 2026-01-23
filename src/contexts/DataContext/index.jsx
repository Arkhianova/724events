import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("./events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  

 useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await api.loadData();
      setData(result);
    } catch (err) {
      setError(err);
    }
  };

  fetchData();
}, []);

  
const last = useMemo(() => {
  if (!data?.events?.length) return null;

  return data.events.reduce((latest, current) =>
    new Date(current.date) > new Date(latest.date) ? current : latest
  );
}, [data]);

  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
