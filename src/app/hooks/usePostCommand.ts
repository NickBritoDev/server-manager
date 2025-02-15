/* eslint-disable @typescript-eslint/no-explicit-any */
export const usePostCommand = async (command: string, setMessage: any, pm2Id: string) => {
  const host = localStorage?.getItem('host');
  const port = localStorage?.getItem('port');
  const user = localStorage?.getItem('user');
  const pem = localStorage?.getItem('pem');

  setMessage('Executando comando...');
  const res = await fetch('/api/command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pm2Id, command, host, port, user, pem }),
  });

  const data = await res.json();
  setMessage(data.message);
};