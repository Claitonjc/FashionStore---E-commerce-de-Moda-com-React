export const AddressList = ({ street, number, district, city, uf, cep }) => {
  return (
    <label className="border-borders bg-general-background mb-5 flex w-full cursor-pointer gap-3 rounded-xl border p-3">
      <input type="radio" className="cursor-pointer" />
      <div>
        <p>{`${street}, ${number} - ${district} ${city}, ${uf}, CEP ${cep}`}</p>
      </div>
    </label>
  );
};
