interface Props {
  headerMessage: string;
  bodyMessage: string;
  show?: boolean;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Modal({ headerMessage, bodyMessage, show, onConfirm, onCancel }: Props): JSX.Element {
  return (
    <div className={`${!show && 'hidden'} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl mb-4">{headerMessage}</h2>
        <p>{bodyMessage}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Скасувати
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  )
}
