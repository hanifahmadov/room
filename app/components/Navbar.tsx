import React from "react";
import Image from "next/image";

import { SignedIn, UserButton } from "@clerk/nextjs";

/* image */
import video from "../../store/icons/video.png";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
	return (
		<div
			className='home-header w-full h-full
                       flex justify-between items-center
                    '
		>
			<div
				className='room
                            '
			>
				<div className='w-auto sm:w-[18rem] hidden sm:flex  h-[3rem]  gap-2 justify-center items-center'>
					<span className=''>
						<Image src={video} alt='logo' width={22} height={22} />
					</span>

					<span className='font-[600] text-[18px] hidden sm:block'>ROOM</span>
				</div>

				<div className='mobile-setting  sm:hidden'>
					<BurgerMenu />
				</div>
			</div>

			<div className='dummy  h-[3rem] flex-end-center flex-grow'>
				<div>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</div>
	);
}
