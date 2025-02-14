import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'ssh2';

interface RestartRequestBody {
  pm2Id: string;
  command: string;
  host: string;
  user: string;
  port: number;
}

const PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAtelTLk8gyMZNQkFXRVkNSJ610CGDQoLrZP6IIgDHNo8LgHNr1AL74GNPkplS\n7j9pS/PlFHWe9iO4uTGPwNUfrvYv2Ugtn0MlGPybrzYcEm6Z8VJ4i2qIBuP/uKCpLc9xLG7gFM4z\n7OjpLS31t7cQJ9F3OQCWIuJGQTbNur9jSWqGxfgqorpr4CaoXBR4yA3Aau3EFetaAH9jPZIiGhrS\nxL9sMIossrP591OAThUrBY6H1l2Lvmd6R68QsD61AVV7FxBAVLgzwZfiraxXJINX9kU8eyV8tMbU\nr/DHeJ/ciyS4/UDNIA0GzYomH+uT4O7hxHzdUAcoFemOHrl0DmQEGQIDAQABAoIBAGR5mU4Muojq\nrqWXvYI6K5Iex0FMIVnNQgMoazyMvXuvCqVKGxahB0nq0HqiYSHiuGAROEhSpxhAprjzXPkfPj6/\nD7KtoTVEOutQKxVdh6fOmwylhptKnhNgP1BUvNzmpRXrr60OL7P8+T3REtUEMdIsafN8FXDzFebT\nRFKPf2F+nKEpLERuZ3J/hukvgdsLa+FhScJh+dOG0Of/Ui6AyUOJ02E3DJQl+3Rkvs++usiq6bP4\nB7nLrlrftEWsfBP5236No0SBMH6MJp8tbMthAtECLD5Q1Muk9JaA1/z+KGOaFECYg72tbrYW5ApU\ns/BclfsPfQnm50pe2zFcSj2hFgECgYEA3+qMHHXLenBAk4X9/oF+I8TRu6iNR7SJ6bcaktoOeXVU\nfpiPsA1xSz+KL3uySWkl35khNaVcBM1oO/I7BbAJGnL3sEoA/YdTRKuvkKK+WF0WPezcJhXEWTEe\n8JEGWAA2DFedHowjjpnLYq83d1DCJA5eXOo62yYI0Oq8JK2s2TkCgYEAz/oA9TMCvwUdlps62YjR\nj5LhA6myAMZ5Lz9DKtcTWh05vc5yFFmnkDhJf4Xz+JmVAvDxScPfB7oja17jRH7fRWj6du861TLd\nrhECKiYSlEjSc+FgnLtQgF1qIQlrAEek2wzU6pO75Li4QY62eMb+rzOj+1hnV+PTZ2pkgrj+4eEC\ngYBFBr34jAuVDAOsNpMtIOgsyKDLE9OxtiMJrEuB17y8joHkoM0yvYIea1EDAEPew45MVp1ZN0ed\np2CpkivFvhWgVK6sZrPVdCEkOzTdBn5dKR0RK/JVv0IPKMhb6qkk+bOvrFagMx1G+XwsSM11d6zR\nhqhqRj6sjhYLqUEkoXF2aQKBgBDd4qQAHhHl1U94iV5JBU3SiKMmaQQ9FGjrhYP861nckuk8y+2w\nk7FTj0pjT7Typ64UYk0sMHNM+kBj8qSEcZEMgXuRzUCrHmVWhclrSwhxm3fAaHhtjIrMiKXjQKVG\nKi2FreLUVmGnRXIzo8LJyK/mzT6+Hat4E5YIf9xGKo2hAoGBAMTfpQ4fV0m03nyhBszowwmoLys3\nhWhIGu+RMwMUDfG5af97E/TepI1Jca6LStsgLF2j7VLHrcDrGb0hgvliQokcGBIOgtffNQT/l7Tw\n8AM8DpFJmIfTzWaLfyCBloYTaHqIyZoC5nYKufYWfi66brQxJwe7Y7iU8WNbQ6apNLu+\n-----END RSA PRIVATE KEY-----"

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
        privateKey: PRIVATE_KEY,
      });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
