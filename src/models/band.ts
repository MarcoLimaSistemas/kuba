export interface IBand{
  id:number,
 // label:string,
  frequency:string,
  quality:string,
  gain:string,


}
export interface IBandSettings{
  id:number
  label:string,
  frequency:number,
  quality:number,
  gain:number,
}

export interface IPresetUser{
  id:number,
 // label:string,
  name:string
  description: string;
  genreId: number;
  equalizerConfigs: IBandSettings[];
 
}


export interface ISelectBand {
  id:number,
  value:string,
  type:"gain"|"quality"
}