/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Text } from "@chakra-ui/react";
import { FaStop } from "react-icons/fa";
import { ImTerminal } from "react-icons/im";
import { SlReload } from "react-icons/sl";
import { VscDebugStart } from "react-icons/vsc";

export default function ActionsComponent({ handleGetLogs, handlePostCommand, pm2Id }: any) {
  const isButtonDisabled = pm2Id !== "" ? false : true
  return (
    <Flex mt={6} p={4} w={'100%'} flexDir={'column'} alignItems={'center'} justifyContent={"center"} gap={2}>
      <Flex gap={2} w={'100%'}>
        <Button
          h={'25vh'}
          display={'flex'}
          flexDir={"column"}
          w={'50%'}
          bg={'orange'}
          color={'white'}
          onClick={() => handlePostCommand('reload')}
          disabled={isButtonDisabled}
        >
          <Text textTransform={"uppercase"} >Reload</Text>
          <SlReload size={52} />
        </Button>
        <Button
          h={'25vh'}
          display={'flex'}
          flexDir={"column"}
          w={'50%'}
          bg={'red'}
          color={'white'}
          onClick={() => handlePostCommand('stop')}
          disabled={isButtonDisabled}
        >
          <Text textTransform={"uppercase"} >Stop</Text>
          <FaStop size={52} />
        </Button>
      </Flex>

      <Flex gap={2} w={'100%'}>
        <Button
          h={'25vh'}
          display={'flex'}
          flexDir={"column"}
          w={'50%'}
          bg={'green'}
          color={'white'}
          onClick={() => handlePostCommand('start')}
          disabled={isButtonDisabled}
        >
          <Text textTransform={"uppercase"} >Start</Text>
          <VscDebugStart size={52} />
        </Button>
        <Button
          h={'25vh'}
          display={'flex'}
          flexDir={"column"}
          w={'50%'}
          bg={'#0759AB'}
          color={'white'}
          onClick={async () => {
            await handleGetLogs(pm2Id);
          }}
          disabled={isButtonDisabled}
        >
          <Text textTransform={"uppercase"} >Logs</Text>
          <ImTerminal size={52} />
        </Button>
      </Flex>

    </Flex>

  )
}
