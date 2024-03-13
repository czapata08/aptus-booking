import { CarrotIcon, MartiniIcon } from "lucide-react"

export const accounts = [
  {
    label: "Esmé",
    workspace: "Esmé",
    icon: <CarrotIcon />,
  },
  {
    label: "Bar Esmé",
    workspace: "Bar Esmé",
    icon: <MartiniIcon />,
  },
]

export type Account = (typeof accounts)[number]
