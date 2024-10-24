import Image from "next/image";
import React from "react";

export default function Loader() {
	return (
		<div className='h-screen w-full flex-center-center'>
			<Image src='/icons/loading-circle.svg' alt='loading-svg' width={40} height={40} />
		</div>
	);
}
