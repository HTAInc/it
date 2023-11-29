// Gaya utilitas untuk dropdown indicator
const getCustomDropdownIndicatorStyle = (provided, state) => ({
  ...provided,
  color: state.isFocused ? '#4F46E5' : '#CBD5E0',
});

// Gaya utilitas untuk opsi dalam dropdown
const getCustomOptionStyle = (provided, state) => ({
  ...provided,
  backgroundColor: state.isSelected ? 'red' : 'white',
  color: state.isSelected ? 'white' : '#1E293B',
});

// Gaya utilitas untuk kontrol
const getCustomControlStyle = (provided,state) => ({
  ...provided,
  border: state.isFocused ? '2px solid red !important' : '1px solid #DBDBDB', // Sesuaikan dengan warna border yang diinginkan
  height: '42px',
  borderRadius: '7px',
  boxShadow: 'none',
});

// Fungsi utilitas untuk mengembalikan objek gaya utama
const getSelectStyle = () => ({
  control: getCustomControlStyle,
  // dropdownIndicator: getCustomDropdownIndicatorStyle,
  // option: getCustomOptionStyle,
});

export default getSelectStyle;
