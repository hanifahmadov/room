"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* constants */
import { navbarLinks } from "@/store/constants/navbarLinks";
import { cn } from "@/lib/utils";

export default function SideBar() {
	const pathname = usePathname();
	return (
		<div
			className='navbar h-full w-full bg-black
                  		flex gap-2 flex-col justify-start items-center
                		py-0
                    	'
		>
			{navbarLinks.map((link) => {
				const isActive = pathname == link.route || pathname.startsWith(`${link.route}/`);

				return (
					<Link
						href={link.route}
						key={link.label}
						className={cn("w-full gap-10 flex justify-start items-center")}
					>
						<div
							className={cn(
								`w-[90%] flex gap-3 justify-start items-center  pl-5 py-3 
                                rounded-lg border border-neutral-900
                                transition-all ease-in-out
                                hover:bg-neutral-950
                                `,
								{ "bg-neutral-950": isActive }
							)}
						>
							<span className='text-white'>
								<Image src={link.icon} alt='Personal Icon' width={16} height={16} color='#000' />
							</span>
							<span
								className={cn("text-neutral-600 font-[400] text-[14px]", {
									"text-white font-[600]": isActive,
								})}
							>
								{link.label}
							</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
