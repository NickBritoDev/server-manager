/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Box, Button, Flex, Group, Input, InputAddon, Spinner, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { FaListUl } from "react-icons/fa"

export default function ListComponent({ pm2List, handleGetPm2List, loadingList }: any) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const filteredProcesses = pm2List
    ? pm2List.split('\n').filter((process: string, index: number) =>
      process.toLowerCase().includes(searchTerm.toLowerCase()) && index >= 4 && index <= 29
    )
    : []

  return (
    <DrawerRoot size={'full'} open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button onClick={handleGetPm2List} variant="outline">
          <FaListUl />
        </Button>
      </DrawerTrigger>
      <DrawerContent p={2}>
        <DrawerHeader>
          <DrawerTitle>Lista de processos</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {loadingList && (
            <Flex gap={2}>
              <Text>Atualizando...</Text>
              <Spinner color={'orange'} />
            </Flex>
          )}

          <Stack mt={10} display={"flex"} alignItems={"center"} justifyContent={"center"} w={'100%'}>
            <Group w={'99%'} attached>
              <InputAddon p={2}><BsSearch size={22} /></InputAddon>
              <Input w={'100%'}
                placeholder="Pesquisar por processo..."
                value={searchTerm}
                onChange={handleSearchChange}
                pl={1}
              />
            </Group>
          </Stack>


          {filteredProcesses.length > 0 ? (
            <Flex p={1} w={'100%'} flexDir={'column'} mt={4}>
              {filteredProcesses.map((process: string, index: number) => (
                <Box key={index} mt={2} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
                  <Text fontSize="sm" color="gray.400">
                    {process}
                  </Text>
                </Box>
              ))}
            </Flex>
          ) : (
            <Text mt={4} color="gray.500">Nenhum processo encontrado.</Text>
          )}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}
