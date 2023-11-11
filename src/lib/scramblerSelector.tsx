import { Select } from "@chakra-ui/react";

export default function ScramblerSelector({onChange} : {onChange: (key: number) => void}) {
  return (
    <Select w={20} onChange={(e)=>onChange(Number(e.target.value))}>
      <option value={0}>A</option>
      <option value={1}>B</option>
      <option value={2}>C</option>
      <option value={3}>D</option>
      <option value={4}>E</option>
      <option value={5}>F</option>
      <option value={6}>G</option>
      <option value={7}>H</option>
      <option value={8}>I</option>
      <option value={9}>J</option>
      <option value={10}>K</option>
      <option value={11}>L</option>
      <option value={12}>M</option>
      <option value={13}>N</option>
      <option value={14}>O</option>
      <option value={15}>P</option>
      <option value={16}>Q</option>
      <option value={17}>R</option>
      <option value={18}>S</option>
      <option value={19}>T</option>
      <option value={20}>U</option>
      <option value={21}>V</option>
      <option value={22}>W</option>
      <option value={23}>X</option>
      <option value={24}>Y</option>
      <option value={25}>Z</option>
    </Select>
  )
}
