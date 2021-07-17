import {DateTime} from 'luxon';

export default function sheets (procedures,user){

  const wb = window.XLSX.utils.book_new();
  wb.Props = {
    Title: "Relatório de Produção",
    Subject: "Produção HGRS",
    Author: `${user.name}`,
    CreatedDate: DateTime.local().toISO(),
  };
  wb.SheetNames.push("Sheet1");
  const header = [
    'Data',
    'Hora',
    'Procedimento',
    'Código',
    'Paciente',
    'Registro',
    'Idade',
    'Sexo',
    'Setor',
    'Leito',
    'Médico',
    'CRM',
  ];
  const rows = procedures.map((p)=>
    [
      DateTime.fromSQL(p.procDateTime).toFormat('dd/LL/yyyy'),
      DateTime.fromSQL(p.procDateTime).toFormat('HH:mm'),
      p.descr,
      p.code,
      p.ptName,
      p.ptRecN,
      p.ptAge,
      p.ptGender,
      p.ptWard,
      p.ptBed,
      p.docName,
      p.docLicenceNumber,
    ] 
  );
  const wsData = [header,...rows];
  // console.log(JSON.stringify(wsData,null,2));
  const ws = window.XLSX.utils.aoa_to_sheet(wsData);
  wb.Sheets.Sheet1 = ws;
  const userName = user.name.replace(/\s/g,'');
  const dateTime = DateTime.local().toFormat('yyyyLLddHHmmss');
  const fileName = `RelatorioProducao_${userName}_${dateTime}.xlsx`;
  window.XLSX.writeFile(wb, fileName);
}

