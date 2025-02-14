import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'ssh2';
import fs from 'fs';

interface RestartRequestBody {
  pm2Id: string;
  command: string;
  host: string;
  user: string;
  port: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { pm2Id, command, host, port, user } = req.body as RestartRequestBody;

    const sshClient = new Client();
    sshClient
      .on('ready', () => {
        console.log('SSH Connected');
        sshClient.exec(`pm2 ${command} ${pm2Id}`, (err, stream) => {
          if (err) {
            console.error('Erro ao executar comando', err);
            return res.status(500).json({ message: 'Erro ao executar comando no PM2' });
          }

          stream.on('data', (data: Buffer) => {
            const log = data.toString();
            console.log(log);
          });

          stream.on('close', () => {
            sshClient.end();
            res.status(200).json({ message: `Comando ${command} no PM2 ${pm2Id} executado com sucesso.` });
          });
        });
      })
      .on('error', (err) => {
        console.error('Erro de conexão', err);
        res.status(500).json({ message: 'Erro de conexão SSH' });
      })
      .connect({
        host: host,
        port: Number(port),
        username: user,
        privateKey: fs.readFileSync('SRVGMVBDB.ppk'),
      });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
