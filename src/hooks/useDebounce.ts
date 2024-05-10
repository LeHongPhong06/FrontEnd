import {useDebounce} from 'use-debounce';
export const useAppDedounce = (input: string) => {
  const [value] = useDebounce(input, 750);
  return value;
};
