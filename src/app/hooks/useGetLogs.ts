/* eslint-disable @typescript-eslint/no-explicit-any */
const formatLogs = (logs: string) => { return logs.replace(/(,)/g, '\n'); };

export const useGetLogs = async (pm2Id: string, setMessage: any, setLogs: any, setIsLoading: any) => {
  setIsLoading(true)
  setMessage('Capturando logs... Esse processo leva exatamente 1 min!');
  const res = await fetch(`/api/logs?pm2Id=${pm2Id}`);

  if (!res.ok) {
    setMessage('Erro ao capturar logs');
    setIsLoading(false)
    return;
  }

  const data = await res.json();
  if (data) {
    setIsLoading(false)
  }
  setLogs(formatLogs(data.logs));
  setMessage('Logs capturados.');
};