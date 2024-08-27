import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "./ui/button"
import { Info } from "lucide-react"


export const InfoCard = () => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Button
                size="sm"
                variant="secondary">
                <Info className='size-5' />
            </Button></HoverCardTrigger>
            <HoverCardContent>
                The React Framework – created and maintained by @vercel.
            </HoverCardContent>
        </HoverCard>
    )
}
