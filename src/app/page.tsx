/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster"
import CredenciaisComponent from './components/credenciais';
import NavComponent from './components/nav';
import ActionsComponent from './components/actions';
import LogsComponent from './components/logs';
import MessageComponent from './components/message';
import FormComponent from './components/form';
import { useGetLogs } from './hooks/useGetLogs';
import { usePostCommand } from './hooks/usePostCommand';
import { useGetPm2List } from './hooks/useGetPm2List';

export default function Home() {
  const [pm2Id, setPm2Id] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [pem, setPem] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [logs, setLogs] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [access, setAccess] = useState<boolean>(false);
  const [pm2List, setPm2List] = useState<string>('');

  const storedHost = typeof window !== 'undefined' ? localStorage.getItem('host') : null;
  const storedPort = typeof window !== 'undefined' ? localStorage.getItem('port') : null;
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const storedPem = typeof window !== 'undefined' ? localStorage.getItem('pem') : null;

  const isButtonDisabled = !host || !port || !user;

  useEffect(() => {
    if (storedHost && storedPort && storedUser && storedPem) {
      setAccess(true);
    }
  }, [storedHost, storedPem, storedPort, storedUser]);

  const handleAccessManager = () => {
    if (host !== "" && port !== "" && user !== "" && pem !== "") {
      console.log(pem, 'formato que esta sendo salvo')
      if (typeof window !== 'undefined') {
        localStorage.setItem('host', host);
        localStorage.setItem('port', port);
        localStorage.setItem('user', user);
        localStorage.setItem('pem', btoa(pem));
      }
      setAccess(true);
      toaster.create({ title: "Acesso permitido", type: "success" });
    } else {
      toaster.create({ title: "Credenciais inválidas", type: "error" });
    }
  };

  const handlePostCommand = (command: string) => {
    usePostCommand(command, setMessage, pm2Id);
  };

  const handleGetLogs = (pm2Id: string) => {
    useGetLogs(pm2Id, setMessage, setLogs, setIsLoading);
  };

  const handleGetPm2List = () => {
    useGetPm2List(toaster, setLoadingList, setPm2List);
  };

  return (
    <Flex overflowX={'hidden'} ml={-1} flexDir="column" alignItems="center" justifyContent={'center'} w="100%">
      <NavComponent storedHost={storedHost} setAccess={setAccess} />

      {!access ?
        (
          <CredenciaisComponent
            host={host}
            setHost={setHost}
            port={port}
            setPort={setPort}
            user={user}
            setUser={setUser}
            pem={pem}
            setPem={setPem}
            handleAccessManager={handleAccessManager} />
        ) : (
          <>
            <FormComponent
              loadingList={loadingList}
              pm2Id={pm2Id}
              setPm2Id={setPm2Id}
              handleGetPm2List={handleGetPm2List}
              pm2List={pm2List}
            />

            <MessageComponent
              isLoading={isLoading}
              setLogs={setLogs}
              setMessage={setMessage}
              setPm2Id={setPm2Id}
              message={message}
            />

            <ActionsComponent
              handleGetLogs={handleGetLogs}
              handlePostCommand={handlePostCommand}
              pm2Id={pm2Id}
              isButtonDisabled={isButtonDisabled} />

            <LogsComponent
              logs={logs}
              pm2Id={pm2Id}
              setLogs={setLogs}
              setMessage={setMessage}
              setPm2Id={setPm2Id}
            />
          </>
        )}
    </Flex>
  );
}
