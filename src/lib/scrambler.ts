export default class Scrambler {
  scrambler: string[]
  constructor(scrambler: string[]) {
    this.scrambler = scrambler
  }

  shift(char: string, shift: number): string {
    const charCode = char.charCodeAt(0)
    let shiftedCharCode = charCode + shift
    if (shiftedCharCode > 'Z'.charCodeAt(0)) {
      shiftedCharCode = shiftedCharCode - 26
    } else if (shiftedCharCode < 'A'.charCodeAt(0)) {
      shiftedCharCode = shiftedCharCode + 26
    }
    const shiftedChar = String.fromCharCode(shiftedCharCode)
    return shiftedChar
  }

  forwardScramble(char: string, shift_number: number): string {
    const shiftedChar = this.shift(char, shift_number)
    const scrambledChar = this.scrambler[shiftedChar.charCodeAt(0) - 'A'.charCodeAt(0)]
    return this.shift(scrambledChar, -shift_number)
  }

  backwardScramble(char: string, shift_number: number): string {
    const shiftedChar = this.shift(char, shift_number)
    const scrambledChar = this.scrambler.indexOf(shiftedChar) + 'A'.charCodeAt(0)
    const result = this.shift(String.fromCharCode(scrambledChar), -shift_number)
    return result
  }
}
