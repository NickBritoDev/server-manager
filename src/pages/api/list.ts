/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'ssh2';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
        host: '54.232.67.141',
        port: 2220,
        username: 'ubuntu',
        privateKey: fs.readFileSync('SRVGMVBDB.ppk'),
      });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
