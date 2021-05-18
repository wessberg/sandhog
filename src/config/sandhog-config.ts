import {SectionKind} from "../section/section-kind";
import {BadgeKind} from "../badge/badge-kind";
import {Options} from "prettier";
import {Contributor} from "../contributor/contributor";

export interface PatreonConfig {
	userId?: string;
	username?: string;
}

export interface OpenCollectiveConfig {
	project?: string;
}

export interface OtherDonorsConfig {
	donors: Contributor[];
	fundingUrl?: string;
}

export interface DonateConfig {
	patreon: PatreonConfig;
	openCollective: OpenCollectiveConfig;
	other: OtherDonorsConfig;
}

export interface ImageConfig {
	url?: string;
	height: number;
}

export interface BadgeConfig {
	exclude: Iterable<BadgeKind>;
}

export interface SectionConfig {
	exclude: Iterable<SectionKind>;
}

export interface ReadmeConfig {
	sections: SectionConfig;
	badges: BadgeConfig;
}

export interface SandhogConfig {
	isDevelopmentPackage: boolean;
	donate: DonateConfig;
	logo: ImageConfig;
	featureImage: ImageConfig;
	readme: ReadmeConfig;
	prettier: Options;
}
