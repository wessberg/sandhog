export interface ICommandOption {
	shortOption: string;
	longOption: string;
	description: string;
	defaultValue?: string|number|boolean;
}