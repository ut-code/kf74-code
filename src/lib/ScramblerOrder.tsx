import { Select } from "@chakra-ui/react";

export default function ScramblerOrder({ onChange }: { onChange: (key: number[]) => void }) {
  return (
    <Select w={32} onChange={(e) => onChange([Number(e.target.value[0]), Number(e.target.value[1]), Number(e.target.value[2])])}>
      <option value="012">{"1->2->3"}</option>
      <option value="021">{"1->3->2"}</option>
      <option value="102">{"2->1->3"}</option>
      <option value="120">{"2->3->1"}</option>
      <option value="201">{"3->1->2"}</option>
      <option value="210">{"3->2->1"}</option>
    </Select>
  )
}
