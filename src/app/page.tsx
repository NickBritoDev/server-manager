/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Flex, Heading, Group, Input, InputAddon, Stack, Button, Text, Avatar } from '@chakra-ui/react';
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
import { GiKeyCard } from 'react-icons/gi';

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

  const isButtonDisabled = !host || !port || !user;

  useEffect(() => {
    const storedHost = localStorage.getItem('host');
    const storedPort = localStorage.getItem('port');
    const storedUser = localStorage.getItem('user');
    const storedPem = localStorage.getItem('pem');

    if (storedHost && storedPort && storedUser && storedPem) {
      setAccess(true);
    }
  }, []);

  const handleAccessManager = () => {
    if (host !== "" && port !== "" && user !== "" && pem !== "") {
      console.log(pem, 'formato que esta sendo salvo')
      localStorage.setItem('host', host);
      localStorage.setItem('port', port);
      localStorage.setItem('user', user);
      localStorage.setItem('pem', btoa(pem));
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
      <Flex mb={2} shadow={'xl'} p={2} w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
        <Flex justifyContent={'center'} gap={2} alignItems={'center'}>
          <Heading><strong>Oni</strong>❌<strong>Server</strong></Heading>
        </Flex>
        <Flex opacity={localStorage.getItem('host') ? 1 : 0} align={'center'} justifyContent={'center'} gap={2}>
          <Avatar.Root size={'sm'}>
            <Avatar.Fallback name="onix server" />
            <Avatar.Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz6JqUugVbjc3bzQglF8JWEJNFBiekUbI_kIQK7c9bw6MbbCeHDqSYcVkQam2TY0_7aRw&usqp=CAU"} />
          </Avatar.Root>
          <Text>{localStorage.getItem('host')}</Text>
        </Flex>
      </Flex>

      {!access ? (
        <Stack p={2} w="100%" gap="2">
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

          <Group attached>
            <InputAddon p={2}>
              <GiKeyCard size={22} />
            </InputAddon>
            <Input
              w={'100%'}
              pl={1}
              type="file"
              accept=".pem"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setPem(event.target?.result as string);
                  };
                  reader.readAsText(file);
                }
              }}
              placeholder="Anexe a chave PPK"
            />
          </Group>


          <Button onClick={handleAccessManager} disabled={!host || !port || !user || !pem}>
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
