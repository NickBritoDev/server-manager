/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosLogOut } from 'react-icons/io'

export default function NavComponent({ storedHost, setAccess }: any) {
  return (
    <Flex mb={2} shadow={'xl'} p={2} w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
      <Flex justifyContent={'center'} gap={2} alignItems={'center'}>
        <Heading><strong>Oni</strong>❌<strong>Server</strong></Heading>
      </Flex>
      <Flex pl={2} rounded={'lg'} bg={"gray.400"} opacity={storedHost ? 1 : 0} align={'center'} justifyContent={'center'} gap={2}>
        <Text fontWeight={'semibold'}>{storedHost}</Text>
        <Button
          onClick={() => {
            localStorage.removeItem("pem")
            localStorage.removeItem("host")
            localStorage.removeItem("user")
            localStorage.removeItem("port")
            setAccess(false)
          }}
          bg={'red'}><IoIosLogOut color='white' size={22} /></Button>
      </Flex>
    </Flex>
  )
}
