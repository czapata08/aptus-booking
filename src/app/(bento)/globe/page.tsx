import { Card } from "@/components/ui/card"
import { GlobeDemo } from "@/components/registry/globe/globe-demo"

export default function GlobePage() {
  return (
    <div className="h-screen bg-gradient-to-tr from-[#2C3E50] to-[#000000] w-full flex justify-center items-center">
      <div className="w-full grid grid-cols-3 p-8 container flex-1">
        <Card className="w-full h-fit flex justify-center items-center bg-transparent border-none container hover:scale-40">
          <GlobeDemo />
        </Card>
        <Card className="w-full h-fit flex justify-center items-center bg-transparent border-none container hover:scale-40">
          <GlobeDemo />
        </Card>
        <Card className="w-full h-fit flex justify-center items-center bg-transparent border-none container hover:scale-40">
          <GlobeDemo />
        </Card>
      </div>
    </div>
  )
}
