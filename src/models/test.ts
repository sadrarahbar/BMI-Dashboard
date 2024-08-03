import { useCallback, useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'testState';

const getUserFromLocalStorage = () => {
  const testState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return testState ? JSON.parse(testState) : { name: '', age: 0 };
};

export default () => {
  const [testState, setTestState] = useState(getUserFromLocalStorage());

  const updateTestState = useCallback((newTestState) => {
    setTestState(newTestState);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTestState));
  }, []);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setTestState(storedUser);
    }
  }, []);

  return { testState, updateTestState };
};
