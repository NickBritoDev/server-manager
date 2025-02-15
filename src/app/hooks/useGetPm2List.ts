/* eslint-disable @typescript-eslint/no-explicit-any */
export const useGetPm2List = async (toaster: any, setLoadingList: any, setPm2List: any) => {
  const host = typeof window !== 'undefined' ? localStorage.getItem('host') : null;
  const port = typeof window !== 'undefined' ? localStorage.getItem('port') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const pem = typeof window !== 'undefined' ? localStorage.getItem('pem') : null;


    if (!host || !port || !user) {
        toaster.create({ title: "Erro: Credenciais SSH não encontradas", type: "error" });
        return;
    }

    setLoadingList(true);

    try {
        const response = await fetch(`/api/list?host=${host}&port=${port}&user=${user}&pem=${pem}`);
        const data = await response.json();
        setPm2List(data.processes);
    } catch (error) {
        console.error("Erro ao obter lista de PM2:", error);
        toaster.create({ title: "Erro ao obter lista de PM2", type: "error" });
    } finally {
        setLoadingList(false);
    }
};
