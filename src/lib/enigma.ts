import { scramblerSample1, scramblerSample2, scramblerSample3, reflectorSample } from "./scramblerSample";
import Scrambler from "./scrambler";
export type Enigma = {
  scrambler: Scrambler[];
  reflector: Scrambler;
  scramblerShift: number[];
}

export const enigmaSample: Enigma = {
  scrambler: [
    new Scrambler(scramblerSample1),
    new Scrambler(scramblerSample2),
    new Scrambler(scramblerSample3),
  ],
  reflector: new Scrambler(reflectorSample),
  scramblerShift: [0, 0, 0],
}

const convert = (char: string, enigma: Enigma): [string, Enigma] => {
  const { scrambler, reflector, scramblerShift } = enigma;
  const scrambler1 = scrambler[0];
  const scrambler2 = scrambler[1];
  const scrambler3 = scrambler[2];
  const scrambler1Shift = scramblerShift[0];
  const scrambler2Shift = scramblerShift[1];
  const scrambler3Shift = scramblerShift[2];

  const scrambler1ScrambledChar = scrambler1.forwardScramble(char, scrambler1Shift);
  const scrambler2ScrambledChar = scrambler2.forwardScramble(scrambler1ScrambledChar, scrambler2Shift);
  const scrambler3ScrambledChar = scrambler3.forwardScramble(scrambler2ScrambledChar, scrambler3Shift);
  const reflectedChar = reflector.forwardScramble(scrambler3ScrambledChar, 0);
  const scrambler3ReflectedChar = scrambler3.backwardScramble(reflectedChar, scrambler3Shift);
  const scrambler2ReflectedChar = scrambler2.backwardScramble(scrambler3ReflectedChar, scrambler2Shift);
  const scrambler1ReflectedChar = scrambler1.backwardScramble(scrambler2ReflectedChar, scrambler1Shift);
  const convertedChar = scrambler1ReflectedChar;
  let newScrambler1Shift = scrambler1Shift + 1;
  let newScrambler2Shift = scrambler2Shift;
  let newScrambler3Shift = scrambler3Shift;
  if (newScrambler1Shift > 25) {
    newScrambler1Shift -= 26;
    newScrambler2Shift += 1;
  }
  if (newScrambler2Shift > 25) {
    newScrambler2Shift -= 26;
    newScrambler3Shift += 1;
  }
  if (newScrambler3Shift > 25) {
    newScrambler3Shift -= 26;
  }
  const newScramblerShift = [
    newScrambler1Shift,
    newScrambler2Shift,
    newScrambler3Shift,
  ];
  const newEnigma = {
    scrambler: [scrambler1, scrambler2, scrambler3],
    reflector,
    scramblerShift: newScramblerShift,
  };
  return [convertedChar, newEnigma];
}

export const convertString = (str: string, enigma: Enigma): [string, Enigma] => {
  let convertedStr = '';
  let newEnigma = enigma;
  for (const char of str) {
    if (char === ' ') {
      convertedStr += ' '
      continue
    }
    const [convertedChar, newEnigma_] = convert(char, newEnigma);
    convertedStr += convertedChar;
    newEnigma = newEnigma_;
  }
  return [convertedStr, newEnigma];
}

export const rewindScrambler = (enigma: Enigma): Enigma => {
  const newScramblerShift = enigma.scramblerShift;
  newScramblerShift[0] -= 1;
  if (newScramblerShift[0] < 0) {
    newScramblerShift[0] += 26;
    newScramblerShift[1] -= 1;
  }
  if (newScramblerShift[1] < 0) {
    newScramblerShift[1] += 26;
    newScramblerShift[2] -= 1;
  }
  if (newScramblerShift[2] < 0) {
    newScramblerShift[2] += 26;
  }
  return {
    scrambler: enigma.scrambler,
    reflector: enigma.reflector,
    scramblerShift: newScramblerShift,
  }
}
