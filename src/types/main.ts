import { formatDate } from '../util/formatters';
import { Columns } from './columns';
import { SampleDto } from './sampledto';
 export type OsOpen = {
     id?: number,
     cliente?:SampleDto,
     dataAbertura?:Date,
     dataProgramada?:Date,
     origem?:string,
     tecnico?:string,
 };
 export const ColOsOpen:Columns[]=[
    {
      name: 'Cliente',
      selector: 'tecnico',
      sortable: true,
    },
    {
      name: 'Abertura',
      selector: 'dataAbertura',
      sortable: true,
    },
    {
      name: 'Data Fim',
      selector: 'dataProgramada',
      sortable: true,
    },
    {
      name: 'origem',
      selector: 'origem',
      sortable: true,
    },
    {
      name: 'tecnico',
      selector: 'tecnico',
      sortable: true,
    }
 ]
 export const MockOpenOs=[
    {
        id: 1,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },{
        id: 2,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },{
        id: 3,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },{
        id: 4,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },{
        id: 5,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },{
        id: 6,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },{
        id: 7,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },{
        id: 8,
        cliente:{id:1 ,nome:'mmmm'},
        dataAbertura:formatDate(new Date()),
        dataProgramada:formatDate(new Date()),
        origem:'string',
        tecnico:{id:1 ,nome:'mmmm'},
     },
 ]