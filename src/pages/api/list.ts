/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'ssh2';

interface ListRequestBody {
  host: string;
  user: string;
  port: number;
}

const PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAtelTLk8gyMZNQkFXRVkNSJ610CGDQoLrZP6IIgDHNo8LgHNr1AL74GNPkplS\n7j9pS/PlFHWe9iO4uTGPwNUfrvYv2Ugtn0MlGPybrzYcEm6Z8VJ4i2qIBuP/uKCpLc9xLG7gFM4z\n7OjpLS31t7cQJ9F3OQCWIuJGQTbNur9jSWqGxfgqorpr4CaoXBR4yA3Aau3EFetaAH9jPZIiGhrS\nxL9sMIossrP591OAThUrBY6H1l2Lvmd6R68QsD61AVV7FxBAVLgzwZfiraxXJINX9kU8eyV8tMbU\nr/DHeJ/ciyS4/UDNIA0GzYomH+uT4O7hxHzdUAcoFemOHrl0DmQEGQIDAQABAoIBAGR5mU4Muojq\nrqWXvYI6K5Iex0FMIVnNQgMoazyMvXuvCqVKGxahB0nq0HqiYSHiuGAROEhSpxhAprjzXPkfPj6/\nD7KtoTVEOutQKxVdh6fOmwylhptKnhNgP1BUvNzmpRXrr60OL7P8+T3REtUEMdIsafN8FXDzFebT\nRFKPf2F+nKEpLERuZ3J/hukvgdsLa+FhScJh+dOG0Of/Ui6AyUOJ02E3DJQl+3Rkvs++usiq6bP4\nB7nLrlrftEWsfBP5236No0SBMH6MJp8tbMthAtECLD5Q1Muk9JaA1/z+KGOaFECYg72tbrYW5ApU\ns/BclfsPfQnm50pe2zFcSj2hFgECgYEA3+qMHHXLenBAk4X9/oF+I8TRu6iNR7SJ6bcaktoOeXVU\nfpiPsA1xSz+KL3uySWkl35khNaVcBM1oO/I7BbAJGnL3sEoA/YdTRKuvkKK+WF0WPezcJhXEWTEe\n8JEGWAA2DFedHowjjpnLYq83d1DCJA5eXOo62yYI0Oq8JK2s2TkCgYEAz/oA9TMCvwUdlps62YjR\nj5LhA6myAMZ5Lz9DKtcTWh05vc5yFFmnkDhJf4Xz+JmVAvDxScPfB7oja17jRH7fRWj6du861TLd\nrhECKiYSlEjSc+FgnLtQgF1qIQlrAEek2wzU6pO75Li4QY62eMb+rzOj+1hnV+PTZ2pkgrj+4eEC\ngYBFBr34jAuVDAOsNpMtIOgsyKDLE9OxtiMJrEuB17y8joHkoM0yvYIea1EDAEPew45MVp1ZN0ed\np2CpkivFvhWgVK6sZrPVdCEkOzTdBn5dKR0RK/JVv0IPKMhb6qkk+bOvrFagMx1G+XwsSM11d6zR\nhqhqRj6sjhYLqUEkoXF2aQKBgBDd4qQAHhHl1U94iV5JBU3SiKMmaQQ9FGjrhYP861nckuk8y+2w\nk7FTj0pjT7Typ64UYk0sMHNM+kBj8qSEcZEMgXuRzUCrHmVWhclrSwhxm3fAaHhtjIrMiKXjQKVG\nKi2FreLUVmGnRXIzo8LJyK/mzT6+Hat4E5YIf9xGKo2hAoGBAMTfpQ4fV0m03nyhBszowwmoLys3\nhWhIGu+RMwMUDfG5af97E/TepI1Jca6LStsgLF2j7VLHrcDrGb0hgvliQokcGBIOgtffNQT/l7Tw\n8AM8DpFJmIfTzWaLfyCBloYTaHqIyZoC5nYKufYWfi66brQxJwe7Y7iU8WNbQ6apNLu+\n-----END RSA PRIVATE KEY-----"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { host, port, user } = req.query as unknown as ListRequestBody;

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
        privateKey: PRIVATE_KEY,
      });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
