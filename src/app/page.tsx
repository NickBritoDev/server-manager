/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Flex, Heading, Group, Input, InputAddon, Stack, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ActionsComponent from './components/actions';
import LogsComponent from './components/logs';
import MessageComponent from './components/message';
import FormComponent from './components/form';
import { useGetLogs } from './hooks/useGetLogs';
import { usePostCommand } from './hooks/usePostCommand';
import { MdOutlineVpnKey } from 'react-icons/md';
import { RiDoorLockBoxLine } from 'react-icons/ri';
import { FaUserShield } from 'react-icons/fa';
import { toaster } from "@/components/ui/toaster"
import { useGetPm2List } from './hooks/useGetPm2List';

export default function Home() {
  const [pm2Id, setPm2Id] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [logs, setLogs] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [access, setAccess] = useState<boolean>(false);
  const [pm2List, setPm2List] = useState<string>('');

  const isButtonDisabled = !host || !port || !user;

  useEffect(() => {
    const storedHost = localStorage.getItem('host');
    const storedPort = localStorage.getItem('port');
    const storedUser = localStorage.getItem('user');

    if (storedHost === "54.232.67.141" && storedPort === "2220" && storedUser === "ubuntu") {
      setAccess(true);
    }
  }, []);

  const handleAccessManager = () => {
    if (host === "54.232.67.141" && port === "2220" && user === "ubuntu") {
      localStorage.setItem('host', host);
      localStorage.setItem('port', port);
      localStorage.setItem('user', user);
      setAccess(true);
      toaster.create({ title: "Acesso permitido", type: "success" });
    } else {
      toaster.create({ title: "Credenciais inválidas", type: "error" });
    }
  };

  const maskIp = (value: string) => {
    let sanitizedValue = value.replace(/[^0-9.]/g, '');
    sanitizedValue = sanitizedValue.replace(/\.{2,}/g, '.');
    const blocks = sanitizedValue.split('.').map(block => block.slice(0, 3));
    sanitizedValue = blocks.slice(0, 4).join('.');

    setHost(sanitizedValue);
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
      <Heading my={4}>Gerenciador de Servidor</Heading>

      {!access ? (
        <Stack w="100%" gap="2">
          <Group attached>
            <InputAddon p={2}><MdOutlineVpnKey size={22} /></InputAddon>
            <Input
              w={'100%'}
              pl={1}
              type="text"
              value={host}
              onChange={(e) => maskIp(e.target.value)}
              placeholder="Informe o host"
            />
          </Group>

          <Group attached>
            <InputAddon p={2}><RiDoorLockBoxLine size={22} /></InputAddon>
            <Input
              w={'100%'}
              pl={1}
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Informe a porta"
            />
          </Group>

          <Group attached>
            <InputAddon p={2}><FaUserShield size={22} /></InputAddon>
            <Input
              w={'100%'}
              pl={1}
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Informe o usuário"
            />
          </Group>

          <Button onClick={handleAccessManager} disabled={!host || !port || !user}>
            Acessar gerenciador
          </Button>
        </Stack>
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
