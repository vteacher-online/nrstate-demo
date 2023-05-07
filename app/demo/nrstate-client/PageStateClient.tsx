'use client';

import { createContext, useContext } from 'react';
import { destroyCookie, parseCookies } from 'nookies';

export const PageStateContext = createContext(undefined as any);
export function usePageState<T>() {
  return useContext<[T, (pageState: T, path: string) => void]>(
    PageStateContext,
  );
}

export function getPageState<T>(initialPageState: T, path: string): T {
  const cookies = parseCookies();

  const value = cookies[path];
  if (!value) {
    return initialPageState;
  }

  const jsonString = decodeURIComponent(value ?? '');
  const json = JSON.parse(jsonString);
  return json;
}

export function clearPageState(path: string) {
  destroyCookie(null, path);
}
