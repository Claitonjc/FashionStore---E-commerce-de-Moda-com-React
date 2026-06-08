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
  return (
    <li className="border-borders bg-general-background mb-5 flex w-full items-center justify-between gap-3 rounded-xl border p-3">
      <label className="flex cursor-pointer gap-3" key={id}>
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
          type="button"
          className="cursor-pointer"
          onClick={() => handleEdit(id)}
        >
          <LuPencil />
        </button>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => removeAddress(id)}
        >
          <CiTrash className="hover:text-alert text-[20px] text-black" />
        </button>
      </div>
    </li>
  );
};
