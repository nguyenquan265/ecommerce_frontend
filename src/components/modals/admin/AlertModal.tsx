import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

interface AlertModalProps {
  isOpen: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  onConfirm: () => void
  loading: boolean
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  return (
    <Modal title='Bạn có chắc không?' description='Hành động này không thể hoàn tác' isOpen={isOpen} onChange={onClose}>
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={loading} variant='outline' onClick={() => onClose(false)}>
          Hủy bỏ
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          Tiếp tục
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
