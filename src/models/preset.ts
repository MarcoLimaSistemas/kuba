export interface IPresets {
	name: string;
	description: string;
	preamp:number;
	equalizerConfigs: IEqualizerConfig[];
	genre_id: number;
	isPublic: boolean;
}
export interface IPresetResponse {
	meta: Meta;
	data: IPreset[];
}

export interface  IPreset {
	id:               number;
	genre_id:         number | null;
	name:             string;
	description:      string;
	preamp:           number;
	img_url:          string;
	is_public:        boolean;
	client_id:        string|null;
	created_at:       string;
	updated_at:       string;
	equalizerConfigs: IEqualizerConfig[];
	settings?:        any;
}

export interface IEqualizerConfig {
	id:               number;
	frequency:        number;
	decibel_quantity: number;
	quality:number;
	preset_id:        number;
}

export interface Meta {
	total:             number;
	per_page:          number;
	current_page:      number;
	last_page:         number;
	first_page:        number;
	first_page_url:    string;
	last_page_url:     string;
	next_page_url:     string|null;
	previous_page_url: string|null;
}


