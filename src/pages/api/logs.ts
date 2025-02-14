/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'ssh2';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { pm2Id } = req.query;

    if (!pm2Id) {
      return res.status(400).json({ message: 'ID do PM2 não fornecido.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const logsCaptured: string[] = [];

    const sshClient = new Client();
    sshClient
      .on('ready', () => {
        console.log('SSH Connected');

        sshClient.exec(`pm2 logs ${pm2Id} --lines 100`, (err, stream) => {
          if (err) {
            console.error('Erro ao executar comando', err);
            res.status(500).json({ message: `Erro ao executar comando: ${err.message}` });
            return;
          }

          const timeout = setTimeout(() => {
            stream.close();
            sshClient.end();
            res.json({ logs: logsCaptured.join('\n') });
          }, 60000);

          stream.on('data', (data: Buffer) => {
            const log = data.toString();
            console.log(log);
            logsCaptured.push(log);
          });

          stream.on('close', () => {
            console.log('Fechando a conexão com o stream');
            clearTimeout(timeout);
          });

          stream.on('error', (err: { message: any; }) => {
            console.error('Erro no stream', err);
            res.status(500).json({ message: `Erro no stream: ${err.message}` });
            clearTimeout(timeout);
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
