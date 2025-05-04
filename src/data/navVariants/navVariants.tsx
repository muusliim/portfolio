export const navVariants = {
	open: {
		x: "0%",
		borderTopLeftRadius: "0vw",
		borderBottomLeftRadius: "0vw",
		opacity: 1,
	},
	closed: {
		x: "100%",
		borderTopLeftRadius: "50vw",
		borderBottomLeftRadius: "50vw",
		opacity: 0,
	},
};

export const linkWrapperVariants = {
	open: {
		transition: {
			staggerChildren: 0.1,
		},
	},
	closed: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const navLinkVariants = {
	open: { x: 0 },
	closed: { x: 25 },
};
