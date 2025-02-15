/* eslint-disable @typescript-eslint/no-explicit-any */
export const useGetPm2List = async (toaster: any, setLoadingList: any, setPm2List: any) => {
    const host = localStorage?.getItem('host');
    const port = localStorage?.getItem('port');
    const user = localStorage?.getItem('user');
    const pem = localStorage?.getItem('pem');

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
