/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from "@chakra-ui/react";

export default function ActionsComponent({ handleGetLogs, handlePostCommand, pm2Id }: any) {
  const isButtonDisabled = pm2Id !== "" ? false : true
  return (
    <Flex mt={2} w={'98%'} flexDir={'column'} alignItems={'center'} gap={2}>
      <Button
        w={'100%'}
        bg={'orange'}
        color={'white'}
        onClick={() => handlePostCommand('reload')}
        disabled={isButtonDisabled}
      >
        Reload
      </Button>
      <Button
        w={'100%'}
        bg={'red'}
        color={'white'}
        onClick={() => handlePostCommand('stop')}
        disabled={isButtonDisabled}
      >
        Stop
      </Button>
      <Button
        w={'100%'}
        bg={'green'}
        color={'white'}
        onClick={() => handlePostCommand('start')}
        disabled={isButtonDisabled}
      >
        Start
      </Button>
      <Button
        w={'100%'}
        bg={'#0759AB'}
        color={'white'}
        onClick={async () => {
          await handleGetLogs(pm2Id);
        }}
        disabled={isButtonDisabled}
      >
        Logs
      </Button>

    </Flex>

  )
}
