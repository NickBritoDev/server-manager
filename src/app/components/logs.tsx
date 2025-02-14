/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Text } from "@chakra-ui/react"
import { IoMdCloseCircle } from "react-icons/io"

export default function LogsComponent({ logs, setLogs, setMessage, setPm2Id, pm2Id }: any) {
  return (
    <>
      {logs && (
        <Flex bg={'black'} border={'solid white'} color={'white'} rounded={'lg'} pos={'fixed'} top={10} mt={4} w={'98%'} flexDir="column" >
          <Flex cursor={'pointer'} onClick={() => {
            setLogs("")
            setMessage("")
            setPm2Id("")
          }} p={1} borderBottom={'solid'}>
            <IoMdCloseCircle color='red' />
          </Flex>
          <Flex h={'80vh'} overflowY={'scroll'} flexDir={'column'} px={1}>
            {logs
              .split(`${pm2Id}|`)
              .map((log: string, index: number) => (
                <Text color={'green'} key={index} mt={2}>{log}</Text>
              ))}
          </Flex>
        </Flex>
      )}
    </>
  )
}
