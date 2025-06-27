// format 18/07/2024 to 2024-07-18T00:00:00.000Z
export function dateToTimestamp(dateString: string) {
	// Parse the input date string
	const [day, month, year] = dateString.split('/').map(Number);

	// Create a Date object (note: month is 0-indexed in JavaScript)
	const date = new Date(year, month - 1, day);

	// Set the time to a default value (e.g., 20:13:04 UTC)
	date.setUTCHours(20, 13, 4, 0);

	// Format the date as an ISO 8601 timestamp string
	return date.toISOString();
}

// format 2024-07-18T00:00:00.000Z to 18/07/2024

export function timestampToDate(timestamp: string) {
	const date = new Date(timestamp);
	const utcDate = new Date(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate()
	);
	const formattedDate = Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(utcDate);
	return formattedDate;
}
