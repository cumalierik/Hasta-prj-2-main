import React, { useState } from "react";

const HastaSorgula = () => {
    const [tcNo, setTcNo] = useState("");
    const [hastaBilgileri, setHastaBilgileri] = useState(null);
    const [gecmisKayitlar, setGecmisKayitlar] = useState([]);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setTcNo(e.target.value);
    };

    const handleSearch = () => {
        if (!/^[1-9][0-9]{10}$/.test(tcNo)) {
            setError("Geçersiz T.C. Kimlik Numarası!");
            return;
        }

        setError("");



        const mockData =

        {
            tc: "12345678901",
            name: "Erik Cumali",
            phone: "05433194795",
            address: "İstanbul",
            records:
                [
                    { date: "2023-01-15", doctor: "Dr. Cumali E.." },
                    { date: "2023-03-22", doctor: "Dr. Esra C.." },
                    { date: "2023-06-10", doctor: "Dr. Ali Veli.." },
                ],
        };


        setTimeout(() => {
            if (tcNo === "12345678901") {
                setHastaBilgileri(mockData);
                setGecmisKayitlar(mockData.records);
            } else {
                setHastaBilgileri(null);
                setGecmisKayitlar([]);
                setError("Hasta bulunamadı.");
            }
        }, 500);
    };

    return (
        <div className="hasta-sorgula-container">
            <h1>Hasta Sorgulama</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="T.C. Kimlik No"
                    value={tcNo}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Sorgula</button>
            </div>
            {error && <p className="error">{error}</p>}
            {hastaBilgileri && (
                <div className="hasta-bilgileri">
                    <h2>Hasta Bilgileri</h2>
                    <p><strong>T.C. Kimlik No:</strong> {hastaBilgileri.tc}</p>
                    <p><strong>Ad Soyad:</strong> {hastaBilgileri.name}</p>
                    <p><strong>Telefon:</strong> {hastaBilgileri.phone}</p>
                    <p><strong>Adres:</strong> {hastaBilgileri.address}</p>
                    <h3>Geçmiş Kayıtlar</h3>
                    <ul>
                        {gecmisKayitlar.map((kayit, index) => (
                            <li key={index}>
                                <strong>Tarih:</strong> {kayit.date} - <strong>Doktor:</strong> {kayit.doctor}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HastaSorgula;
