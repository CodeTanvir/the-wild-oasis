import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm"

function AddCabin() {
    return (
     <Modal>
        <Modal.Open open="cabin-form">
        <Button>Add new Cabin</Button>
        <Modal.Window name="cabin-form">
        <CreateCabinForm />
        </Modal.Window>
        </Modal.Open>
     </Modal>
    )
}




// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false)
//     return (
//         <div>
//          <Button onClick={()=> setIsOpenModal((show)=> !show)}
//       >Add new cabin</Button>
//       {isOpenModal && <Modal onClose={()=> setIsOpenModal(false)}>
//         <CreateCabinForm onCloseModal={()=> setIsOpenModal(false)} />
//         </Modal>}
//         </div>
//     )
// }

export default AddCabin
