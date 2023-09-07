import logo from "@/images/logo.png";
import Image from "next/image";

export const Loading = () => {
    return (
        <div className="flex justify-center items-center mt-24">
            <div className="relative w-14 h-14 shadow-md animate-spin rounded-full bg-gradient-to-r from-purple-500/50 to-teal-600/50 border-black border dark:border-white">
                <Image src={logo} className='not-drag w-12 sm:mt-1 sm:h-10 sm:w-14' alt='voice quiz' />
            </div>
        </div>
    )
}
