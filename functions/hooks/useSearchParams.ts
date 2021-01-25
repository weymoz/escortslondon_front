import { useLocation } from 'react-router-dom';

export default function useSearchParams() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}
