/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Input, InputAddon, Stack } from '@chakra-ui/react';
import { LuServerCog } from 'react-icons/lu';
import ListComponent from './list';

export default function FormComponent({ pm2Id, setPm2Id, pm2List, handleGetPm2List, loadingList }: any) {
  return (
    <form style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', paddingInline: '12px' }} onSubmit={(e) => e.preventDefault()}>
      <Stack w={'100%'} gap="10">
        <Group attached>
          <InputAddon p={2}><LuServerCog size={22} /></InputAddon>
          <Input
            w={'100%'}
            pl={1}
            type="text"
            value={pm2Id}
            onChange={(e) => setPm2Id(e.target.value)}
            placeholder="Informe o ID do PM2"
          />
        </Group>
      </Stack>

      <ListComponent pm2List={pm2List} handleGetPm2List={handleGetPm2List} loadingList={loadingList}/>

    </form>
  )
}
