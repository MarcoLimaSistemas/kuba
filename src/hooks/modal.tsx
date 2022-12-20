import React from 'react';
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ModalContextData {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModalDelete: boolean;
  setOpenModalDelete: Dispatch<SetStateAction<boolean>>;
}
interface ModalProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProps): ReactElement {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        openModal,
        openModalDelete,
        setOpenModal,
        setOpenModalDelete,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
export function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  return context;
}
