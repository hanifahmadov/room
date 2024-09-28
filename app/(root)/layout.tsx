import React, { useEffect } from "react";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className='root-layout h-[100svh] w-[100svw] 
                        flex flex-col justify-center items-center 
						fixed inset-0 bg-black'
		>
			<div
				className='root-children h-full w-full 
							flex flex-col justify-center items-center
							'
			>
				{children}
			</div>
		</div>
	);
};

export default RootLayout;
