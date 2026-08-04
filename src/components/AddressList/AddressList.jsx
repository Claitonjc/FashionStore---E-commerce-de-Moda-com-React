import { LuPencil } from "react-icons/lu";
import { CiTrash } from "react-icons/ci";

export const AddressList = ({
  street,
  number,
  district,
  city,
  uf,
  cep,
  id,
  removeAddress,
  handleEdit,
  value,
  checked,
  onChange,
}) => {
  // =========================================================================
  // 1. RENDER
  // =========================================================================
  return (
    <li className="border-borders bg-general-background mb-5 flex w-full items-center justify-between gap-3 rounded-xl border p-3">
      <label className="flex cursor-pointer gap-3">
        <input
          type="radio"
          className="cursor-pointer"
          name="address"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <p>{`${street}, ${number} - ${district}, ${city}, ${uf}, CEP ${cep}`}</p>
      </label>
      <div className="flex items-center gap-3">
        <button
          aria-label="Editar Endereço"
          type="button"
          className="cursor-pointer text-[18px] text-black transition-colors hover:text-gray-600"
          onClick={() => handleEdit(id)}
        >
          <LuPencil />
        </button>
        <button
          aria-label="Excluir Endereço"
          type="button"
          className="hover:text-alert cursor-pointer text-[20px] text-black transition-colors"
          onClick={() => removeAddress(id)}
        >
          <CiTrash />
        </button>
      </div>
    </li>
  );
};
