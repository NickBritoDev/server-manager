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
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FaListUl } from "react-icons/fa"


export default function ListComponent({ pm2List, handleGetPm2List, loadingList }: any) {
  const [open, setOpen] = useState(false)

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
          {loadingList && <Spinner color={'orange'}/>}
          {pm2List && (
            <Flex p={2} w={'100%'} flexDir={'column'} mt={4}>
              {pm2List.split('\n').map((process: any, index: number) => {
                if (index >= 4 && index <= 29) {
                  return (
                    process.trim() && (
                      <Box key={index} mt={2} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
                        <Text fontSize="sm" color="gray.400">
                          {process}
                        </Text>
                      </Box>
                    )
                  );
                }
                return null;
              })}
            </Flex>
          )}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}