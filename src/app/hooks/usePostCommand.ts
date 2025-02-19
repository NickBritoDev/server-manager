/* eslint-disable @typescript-eslint/no-explicit-any */
export const usePostCommand = async (command: string, setMessage: any, pm2Id: string) => {
  const host = typeof window !== 'undefined' ? localStorage.getItem('host') : null;
  const port = typeof window !== 'undefined' ? localStorage.getItem('port') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const pem = typeof window !== 'undefined' ? localStorage.getItem('pem') : null;

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