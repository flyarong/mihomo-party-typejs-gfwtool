import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { BaseEditor } from '../base/base-editor'
import { getProfileStr, setProfileStr } from '@renderer/utils/ipc'
import { useNavigate } from 'react-router-dom'
interface Props {
  id: string
  onClose: () => void
}
const EditFileModal: React.FC<Props> = (props) => {
  const { id, onClose } = props
  const [currData, setCurrData] = useState('')
  const navigate = useNavigate()

  const getContent = async (): Promise<void> => {
    setCurrData(await getProfileStr(id))
  }

  useEffect(() => {
    getContent()
  }, [])

  return (
    <Modal
      backdrop="blur"
      size="5xl"
      hideCloseButton
      isOpen={true}
      onOpenChange={onClose}
      scrollBehavior="inside"
    >
      <ModalContent className="h-full w-[calc(100%-100px)]">
        <ModalHeader className="flex">
          <div className="flex justify-start">
            <div className="flex items-center">编辑订阅</div>
            <small className="ml-2 text-default-500">
              注意：此处编辑配置更新订阅后会还原，如需要自定义配置请使用
              <Button
                size="sm"
                color="primary"
                variant="light"
                onPress={() => {
                  navigate('/override')
                }}
              >
                覆写
              </Button>
              功能
            </small>
          </div>
        </ModalHeader>
        <ModalBody className="h-full">
          <BaseEditor language="yaml" value={currData} onChange={(value) => setCurrData(value)} />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            取消
          </Button>
          <Button
            color="primary"
            onPress={async () => {
              await setProfileStr(id, currData)
              onClose()
            }}
          >
            确认
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditFileModal
