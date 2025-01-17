export interface IBand{
  id:number,
  label:string,
  frequency:string,
  quality:string,
  gain:string,


}
export interface IPresetUser{
  id:number,
  label:string,
  name:string
  description: string;
  genreId: number;
  equalizerConfigs: IBand[];
   //isPublic: boolean;
}


export interface ISelectBand {
  id:number,
  value:string,
  type:"gain"|"quality"
}