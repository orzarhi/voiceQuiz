import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex justify-center mt-24">
            <Loader2 className="h-14 w-14 animate-spin" />
        </div>
    )
}
