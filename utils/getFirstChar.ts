export const getFirstChar = (str: string) => {
	return str
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase())
		.toString()
		.replace(",", "");
};
