import { MutableRefObject } from 'react';

export const stopAllSounds = (soundsRef: MutableRefObject<{ [key: string]: () => void }>) => {
  Object.values(soundsRef.current).forEach(stop => stop());
};
