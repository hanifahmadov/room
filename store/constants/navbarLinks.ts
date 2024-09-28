import house from "../icons/house.png";
import calendar from "../icons/calendar.png";
import folder from "../icons/folder.png";
import archive from "../icons/archive.png";
import shield from "../icons/shield.png";

export const navbarLinks = [
	{
		label: "Home",
		icon: house,
		route: "/",
	},
	{
		label: "Upcoming",
		icon: calendar,
		route: "/upcoming",
	},
	{
		label: "Previous",
		icon: folder,
		route: "/previous",
	},
	{
		label: "Recordings",
		icon: archive,
		route: "/recordings",
	},
	{
		label: "Personal Room",
		icon: shield,
		route: "/personal-room",
	},
];
