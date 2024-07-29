import React from "react";

type ModalPayload = {
  id: string;
  name: string;
  data?: any;
} | null;

export type ModalTypes =
  | "CREATE"
  | "EDIT"
  | "DELETE"
  | "NONE"
  | "DELETE_MANY"
  | "COPY"
  | "CREATE_MANY";

export type ModalState = {
  type: ModalTypes;
  data: ModalPayload;
  open: boolean;
};

export type ModalAction =
  | {
      type: "OPEN_MODAL";
      payload: {
        type: ModalTypes;
        data: ModalPayload;
      };
    }
  | {
      type: "CLOSE_MODAL";
    };

export const defaultState: ModalState = {
  type: "NONE",
  data: null,
  open: false,
};

function modalRecucer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        open: true,
        type: action.payload.type,
        data: action.payload.data,
      };
    }
    case "CLOSE_MODAL": {
      return { ...state, open: false };
    }
    default: {
      throw new Error(`Unhandled modal type...`);
    }
  }
}

/* useModal hook to toggle state between opened modals */
export function useModal({ reducer = modalRecucer } = {}) {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const openModal = (payload: { type: ModalTypes; data: ModalPayload }) =>
    dispatch({ type: "OPEN_MODAL", payload });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

  return { state, openModal, closeModal };
}
