import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'ssh2';
import { RestartRequestBody } from '../types/command';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { pm2Id, command, host, port, user, pem } = req.body as RestartRequestBody;
    const privateKey = Buffer.from(pem, 'base64').toString('utf-8')

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
        privateKey: privateKey,
      });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
