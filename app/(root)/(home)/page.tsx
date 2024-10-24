import MeetingTypeList from "@/app/components/MeetingTypeList";

export default function Home() {
	const now = new Date();
	const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
	const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
	return (
		<section className='home h-full w-full border border-neutral-900 rounded-xl px-5 py-5'>
			<div className='h-full w-full flex-start-start flex-col'>
				<div
					className='home-main-display h-[250px] w-full rounded-md bg-hero bg-cover 
								flex flex-col  justify-between py-10 px-6 sm:py-7 sm:px-7
								'
				>
					<div className=''>
						<h2 className='p-2 glassmorphism text-base inline-block px-5 font-bold rounded-md'>
							Upcoming Meeting at 12:30 PM
						</h2>
					</div>

					<div className='flex flex-col'>
						<p className='text-4xl font-extrabold'>{time}</p>

						<p className='text-lg font-[900] pl-1'>{date}</p>
					</div>
				</div>
				<MeetingTypeList />
			</div>
		</section>
	);
}
