import {SectionKind} from "../section/section-kind";
import {BadgeKind} from "../badge/badge-kind";
import {Options} from "prettier";

export interface PatreonConfig {
	userId?: string;
}

export interface OpenCollectiveConfig {
	project?: string;
}

export interface DonateConfig {
	patreon: PatreonConfig;
	openCollective: OpenCollectiveConfig;
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

export interface ScaffoldConfig {
	donate: DonateConfig;
	logo: ImageConfig;
	featureImage: ImageConfig;
	readme: ReadmeConfig;
	prettier: Options;
}
