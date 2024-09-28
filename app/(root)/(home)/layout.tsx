import React from "react";
import Image from "next/image";

/* components */
import SideBar from "@/app/components/ui/SideBar";
import Navbar from "@/app/components/ui/Navbar";


const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className='home-layout h-full w-full
                        flex gap-1 flex-col justify-center items-center 
                        '
		>
			<div className='w-full h-[5rem] bg-black px-5 sm:px-8'>
				<Navbar />
			</div>

			<div className='home-content h-[calc(100%-5rem-2rem)] w-full flex justify-between bg-black px-3 sm:px-8'>
				<div className='home-navbar h-full w-[18rem] bg-black hidden sm:flex justify-center items-start'>
					<SideBar />
				</div>
				<div className='side navbar h-full w-full sm:w-[calc(100%-18rem)] sm:min-w-[30rem] bg-black'>{children}</div>
			</div>
		</div>
	);
};

export default HomeLayout;