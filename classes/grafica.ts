export class GraficaData{
    private months: Array<any> = [ "enero", "febrero", "marzo", "abril", "mayo", "junio" ];
    private values:Array<number> =[0,0,0,0,0,0];

    constructor(){
    }

    getDataGrafica(){
        return [ {data : this.values , label: "Ventas"}];
    }

    incrementValue(month:string, value:number){

        console.log(month, value);
        month = month.toLowerCase().trim();

        for (let i in this.months) {
           if( this.months[i] === month)
           this.values[i] +=value;
            
        }
        return this.getDataGrafica();
    }
}