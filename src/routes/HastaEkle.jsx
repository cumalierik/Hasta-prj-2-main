import { useRef, useEffect, useState } from "react";

const HastaEkle = () => {
  const [data, setData] = useState([]);
  const [tcValidation, setTcValidation] = useState(false);
  const [editId, setEditId] = useState(false);
  const [formData, setFormData] = useState({
    tc: "",
    name: "",
    phone: "",
    address: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const outsideClick = useRef(false);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredData = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!editId) return;

    let selectedItem = document.querySelectorAll(`[id='${editId}']`);
    selectedItem[0].focus();
  }, [editId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(event.target)
      ) {
        setEditId(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, ''); 
      setFormData({ ...formData, [name]: onlyNumbers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isValidTCKimlikNo = (tcKimlikNo) => {  
    
    if (!/^[1-9][0-9]{10}$/.test(tcKimlikNo)) {
      return false;
    }

    let digits = tcKimlikNo.split("").map(Number);

    let sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    let sumEven = digits[1] + digits[3] + digits[5] + digits[7];
    let checksum1 = (sumOdd * 7 - sumEven) % 10;
    let checksum2 = (sumOdd + sumEven + digits[9]) % 10;

    return checksum1 === digits[9] && checksum2 === digits[10];
  };

  const handleAddClick = () => {
    if (formData.name && formData.tc && formData.phone && formData.address) {
      if (isValidTCKimlikNo(formData.tc)) {
        const newItem = {
          id: Date.now(),
          tc: formData.tc,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        };

        setData([...data, newItem]);
        setFormData({ tc: "", name: "", phone: "", address: "" });
      } else {
        setTcValidation(true)

        setTimeout(() => {
          setTcValidation(false)
        }, 2000);
      }
    }
  };

  const handleEdit = (id, updatedData) => {
    if (!editId || editId !== id) {
      return;
    }

    const updatedList = data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setData(updatedList);
  };

  const handleDelete = (id) => {
    if (filteredData.length === 1 && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
    const updatedList = data.filter((item) => item.id !== id);
    setData(updatedList);
  };

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            placeholder="TC"
            name="tc"
            value={formData.tc}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Ad Soyad"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Telefon"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <button className="add" onClick={handleAddClick}>
          Ekle
        </button>
      </div>

      <p className={tcValidation ? "tc-content tc-invalid" : "tc-content"}>TC Kimlik Numarası geçerli değil!</p>

      <div className="search-table-container">
        <input
          className="search-input"
          type="text"
          placeholder="İsme göre ara"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>TC</th>
              <th>Ad Soyad</th>
              <th>Telefon</th>
              <th>Adres</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { tc: e.target.innerText })
                  }
                >
                  {item.tc}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { name: e.target.innerText })
                  }
                >
                  {item.name}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { phone: parseInt(e.target.innerText) })
                  }
                >
                  {item.phone}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, {
                      address: parseInt(e.target.innerText),
                    })
                  }
                >
                  {item.address}
                </td>
                <td className="actions">
                  <button
                    className="edit"
                    onClick={() => {
                      setEditId(item.id);
                    }}
                  >
                    Düzenle
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredItems.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                style={{
                  backgroundColor: currentPage === index + 1 && "lightgreen",
                }}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HastaEkle;
