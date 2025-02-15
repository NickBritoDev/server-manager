/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'ssh2';
import { ListRequestQuery } from '../types/list';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { host, port, user, pem } = req.query as unknown as ListRequestQuery;
    const privateKey = Buffer.from(pem, 'base64').toString('utf-8')

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sshClient = new Client();
    sshClient
      .on('ready', () => {
        console.log('SSH Connected');

        sshClient.exec('pm2 list', (err, stream) => {
          if (err) {
            console.error('Erro ao executar comando', err);
            res.status(500).json({ message: `Erro ao executar comando: ${err.message}` });
            return;
          }

          let output = '';

          stream.on('data', (data: Buffer) => {
            output += data.toString();
          });

          stream.on('close', (code: number, signal: string) => {
            console.log(`Processo fechado com código: ${code} e sinal: ${signal}`);

            res.json({ processes: output.trim() });
            sshClient.end();
          });

          stream.on('error', (err: { message: any }) => {
            console.error('Erro no stream', err);
            res.status(500).json({ message: `Erro no stream: ${err.message}` });
            sshClient.end();
          });
        });
      })
      .on('error', (err) => {
        console.error('Erro de conexão', err);
        res.status(500).json({ message: 'Erro de conexão SSH' });
        res.end();
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
