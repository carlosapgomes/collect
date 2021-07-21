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
    'Local do proc.',
    'Paciente',
    'Registro',
    'Idade',
    'Sexo',
    'Setor',
    'Leito',
    'Equipe',
    'Usuário1',
    'Usuário2',
    'Usuário3',
    'Usuário4',
    'Usuário5',
    'Usuário6',
  ];
  const rows = procedures.map((p)=>
    [
      DateTime.fromSQL(p.procDateTime).toFormat('dd/LL/yyyy'),
      DateTime.fromSQL(p.procDateTime).toFormat('HH:mm'),
      p.descr,
      p.code,
      p.execPlace,
      p.ptName,
      p.ptRecN,
      p.ptAge,
      p.ptGender,
      p.ptWard,
      p.ptBed,
      p.team,
      p.user1Name,
      p.user2Name,
      p.user3Name,
      p.user4Name,
      p.user5Name,
      p.user6Name,
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

