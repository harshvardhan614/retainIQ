import Image from 'next/image'
import React from 'react'

const SideNav = () => {
    return (
        <div className="sticky top-0 h-screen bg-black text-white px-3 py-10 sm:px-5">
            <div className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-col gap-8 items-center">
                    <Image src="/retainiq_logo.jpeg" alt="Logo" width={35} height={35} className="cursor-pointer" />
                    <Image src="/img.svg" alt="Logo" width={25} height={25} className="cursor-pointer" />
                    <Image src="/meta.svg" alt="Logo" width={25} height={25} className="cursor-pointer" />
                    <Image src="/shopify.svg" alt="Logo" width={25} height={25} className="cursor-pointer" />
                </div>
                <Image src="/setting.svg" alt="Logo" width={25} height={25} className="cursor-pointer" />
            </div>
        </div>

    )
}

export default SideNav