/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Input, InputAddon, Stack, Button } from '@chakra-ui/react';
import { GiKeyCard } from 'react-icons/gi';
import { FaUserShield } from 'react-icons/fa';
import { RiDoorLockBoxLine } from 'react-icons/ri';
import { MdOutlineVpnKey } from 'react-icons/md';

export default function CredenciaisComponent({ host, setHost, port, setPort, user, setUser, pem, setPem, handleAccessManager }: any) {
  return (
    <Stack p={2} w="100%" gap="2">
      <Group attached>
        <InputAddon p={2}><MdOutlineVpnKey size={22} /></InputAddon>
        <Input
          w={'100%'}
          pl={1}
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
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

      <Group alignItems={'center'} attached>
        <InputAddon p={2}>
          <GiKeyCard size={22} />
        </InputAddon>
        <Input
          pt={1.5}
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
        />
      </Group>


      <Button fontWeight={'semibold'} textTransform={'uppercase'} bg={!host || !port || !user || !pem ? '' : 'green'} color={!host || !port || !user || !pem ? '' : 'white'} onClick={handleAccessManager} disabled={!host || !port || !user || !pem}>
        Acessar gerenciador
      </Button>
    </Stack>
  )
}
