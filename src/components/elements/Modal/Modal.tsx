import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children: React.ReactNode;
  hideButtons?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  hideButtons = false
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-whitepink rounded-lg shadow-lg max-w-lg w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-pink-100">
          {title ? (
            <h2 className="text-4xl font-heading font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              {title}
            </h2>
          ) : (
            <div></div>
          )}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="#0F1729"
                ></path>
              </g>
            </svg>
          </button>
        </div>

        <div className={`px-4 ${hideButtons ? 'pb-4' : ''} text-gray-800`}>{children}</div>

        {!hideButtons && <div className="flex justify-end gap-4 p-4 border-pink-100">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-secondary text-white rounded shadow hover:bg-primary transition"
          >
            Fechar
          </button>
          <button
            className="px-4 py-1 bg-white text-secondary border border-secondary rounded shadow hover:bg-secondary hover:text-white transition"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirmar
          </button>
        </div>}
      </div>
    </div>
  );
}
