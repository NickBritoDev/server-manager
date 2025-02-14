/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { IoMdCloseCircle } from "react-icons/io"

export default function MessageComponent({ setLogs, setMessage, setPm2Id, message, isLoading }: any) {
  return (
    <>
      {message &&
        <Flex my={4} w={'98%'} bg={'black'} border={'solid white'} color={'white'} rounded={'lg'} flexDir={'column'}>
          <Flex justifyContent={"space-between"} alignItems={"center"} cursor={'pointer'} onClick={() => {
            setLogs("")
            setMessage("")
            setPm2Id("")
          }} p={1} borderBottom={'solid'}>
            <IoMdCloseCircle size={22} color='red' />
            <Flex display={isLoading ? 'flex' : 'none'} gap={2}>
              <Text>Atualizando...</Text>
              <Spinner color={'orange'} />
            </Flex>
          </Flex>
          <Text color={'green'} p={1} >{message}</Text>
        </Flex>
      }

    </>
  )
}
