import { Loader2 } from "lucide-react"
import Image from "next/image"
import logo from "@/images/logo.png";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <div className="relative w-14 h-14 shadow-md shadow-teal-600/40 animate-spin rounded-full bg-gradient-to-r from-purple-500/80 to-teal-600/80 border-black border dark:border-white">
                <Image src={logo} className='not-drag w-12 sm:mt-1 sm:h-10 sm:w-14' alt='voice quiz' />
            </div>
        </div>
    )
}
