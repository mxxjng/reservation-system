import { Modal, ModalProps } from "@mantine/core";

import { ModalState } from "./reducer";

type Props = ModalProps & {
  /* State of the modal */
  state: ModalState;
};

/* Modal Wrapper */
const FormModal = ({ state, children, ...rest }: Props) => {
  return (
    <Modal
      {...rest}
      centered
      radius="md"
      withCloseButton={false}
      size={
        state.type === "DELETE" ||
        state.type === "DELETE_MANY" ||
        state.type === "COPY"
          ? "md"
          : "xl"
      }
    >
      {children}
    </Modal>
  );
};

export default FormModal;
