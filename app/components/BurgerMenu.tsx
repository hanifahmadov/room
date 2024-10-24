"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* constants */
import { navbarLinks } from "@/store/constants/navbarLinks";
import { cn } from "@/lib/utils";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

/* image */
import burger from "../../store/icons/menu.png";
import video from "../../store/icons/video.png";

export default function BurgerMenu() {
	const pathname = usePathname();
	return (
		<div className='burget-setting'>
			{/* <Image src={burger} alt='logo' width={22} height={22} /> */}

			<Sheet>
				<SheetTrigger>
					<div className='border border-neutral-800 rounded-lg p-2'>
						<Image src={burger} alt='logo' width={22} height={22} className='cursor-pointer' />
					</div>
				</SheetTrigger>
				<SheetContent side='left' className='bg-black border-neutral-900 w-[18rem] py-10'>
					<SheetHeader className='flex flex-col gap-5'>
						<SheetTitle>
							<div className='flex gap-2 justify-center items-center'>
								<span className=''>
									<Image src={video} alt='logo' width={24} height={24} />
								</span>

								<span className='font-[600] text-[18px]'>ROOM</span>
							</div>
						</SheetTitle>
						<SheetDescription>
							<SheetClose asChild>
								<div
									className='navbar h-full w-full bg-black
                  		flex gap-2 flex-col justify-start items-center
                		py-0
                    	'
								>
									{navbarLinks.map((link) => {
										const isActive =
											pathname == link.route || pathname.startsWith(`${link.route}/`);

										return (
											<SheetClose asChild key={link.route}>
												<Link
													href={link.route}
													key={link.label}
													className={cn("w-full gap-10 flex justify-start items-center")}
												>
													<div
														className={cn(
															` w-[90%] flex gap-3 justify-start items-center  pl-5 py-3 
                                										rounded-lg border border-neutral-900
                                										transition-all ease-in-out
                                										hover:bg-neutral-950
                                										`,
															{ "bg-neutral-950": isActive }
														)}
													>
														<span className='text-white'>
															<Image
																src={link.icon}
																alt='Personal Icon'
																width={16}
																height={16}
																color='#000'
															/>
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
											</SheetClose>
										);
									})}
								</div>
							</SheetClose>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
