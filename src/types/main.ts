import { Columns } from './columns';
import { SampleDto } from './sampledto';
 export type OsOpen = {
     id?: number,
     cliente?:SampleDto,
     dataabertura?:Date,
     datafim?:Date,
     tipo?:string,
     status?:string,
 };
 export const ColOsOpen:Columns[]=[
    {
      name: 'Cliente',
      selector: 'status',
      sortable: true,
    },
    {
      name: 'Abertura',
      selector: 'dataabertura',
      sortable: true,
    },
    {
      name: 'Data Fim',
      selector: 'datafim',
      sortable: true,
    },
    {
      name: 'Tipo',
      selector: 'tipo',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    }
 ]
 export const MockOpenOs:OsOpen[]=[
    {
        id: 1,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },{
        id: 2,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },{
        id: 3,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },{
        id: 4,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },{
        id: 5,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },{
        id: 6,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },{
        id: 7,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },{
        id: 8,
        cliente:{id:1 ,nome:'mmmm'},
        dataabertura:new Date(),
        datafim:new Date(),
        tipo:'string',
        status:'string',
     },
 ]