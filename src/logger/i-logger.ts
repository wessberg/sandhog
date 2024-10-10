export interface ILogger {
	/**
	 * Logs info-related messages
	 * @param messages
	 */
	info(...messages: string[]): void;

	/**
	 * Logs verbose-related messages
	 * @param messages
	 */
	verbose(...messages: string[]): void;

	/**
	 * Logs debug-related messages
	 * @param messages
	 */
	debug(...messages: string[]): void;

	/**
	 * Logs warning-related messages
	 * @param messages
	 */
	warn(...messages: string[]): void;
}
