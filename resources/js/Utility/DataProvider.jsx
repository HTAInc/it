import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [companyData, setCompanyData] = useState([
        { value: 'ARSI', label: 'ARSI' },
        { value: 'HTA', label: 'HTA' },
        { value: 'TTA', label: 'TTA' },
        { value: 'DCM', label: 'DCM' },
        { value: 'RMU', label: 'RMU' },
        { value: 'GBI', label: 'GBI' },
    ]);

    const [processorData, setProcessorData] = useState([
        {value: 'Intel Celeron', label: 'Intel Celeron'},
        {value: 'Intel Pentium', label: 'Intel Pentium'},
        {value: 'Intel Core Duo', label: 'Intel Core Duo'},
        {value: 'Intel Core i3', label: 'Intel Core i3'},
        {value: 'Intel Core i5', label: 'Intel Core i5'},
        {value: 'Intel Core i7', label: 'Intel Core i7'},
        {value: 'Intel Core i9', label: 'Intel Core i9'},
        {value: 'MD Athlon', label: 'MD Athlon'},
        {value: 'AMD Ryzen 3', label: 'AMD Ryzen 3'},
        {value: 'AMD Ryzen 5', label: 'AMD Ryzen 5'},
        {value: 'AMD Ryzen 7', label: 'AMD Ryzen 7'},
        {value: 'AMD Ryzen 9', label: 'AMD Ryzen 9'},
    ]);

    const [ramTypeData, setRamTypeData] = useState([
        {value: 'DDR', label: 'DDR'},
        {value: 'DDR2', label: 'DDR2'},
        {value: 'DDR3', label: 'DDR3'},
        {value: 'DDR4', label: 'DDR4'},
        {value: 'DDR5', label: 'DDR5'},
    ]);

    const [ramCapacityData, setRamCapacityData] = useState([
        {value: '2GB', label: '2GB'},
        {value: '4GB', label: '4GB'},
        {value: '8GB', label: '8GB'},
        {value: '16GB', label: '16GB'},
        {value: '32GB', label: '32GB'},
        {value: '64GB', label: '64GB'},
        {value: '128GB', label: '128GB'},
        {value: '256GB', label: '256GB'},
    ]);

    const [storageTypeData, setStorageTypeData] = useState([
        {value: 'HDD', label: 'HDD'},
        {value: 'SSD', label: 'SSD'},
        {value: 'SSHD', label: 'SSHD'},
        {value: 'NVMe SSD', label: 'NVMe SSD'},
        {value: 'eMMC', label: 'eMMC'},
        {value: 'RAID', label: 'RAID'},
        {value: 'Tape Drive', label: 'Tape Drive'},
        {value: 'Optical Drive', label: 'Optical Drive'},
        {value: 'SD Card', label: 'SD Card'},
        {value: 'USB Flash Drive', label: 'USB Flash Drive'},
    ]);

    const [storageCapacityData, setStorageCapacityData] = useState([
        {value: '128GB', label: '128GB'},
        {value: '256GB', label: '256GB'},
        {value: '500GB', label: '500GB'},
        {value: '1TB', label: '1TB'},
        {value: '2TB', label: '2TB'},
        {value: '4TB', label: '4TB'},
        {value: '8TB', label: '8TB'},
        {value: '16TB', label: '16TB'},
        {value: '32TB', label: '32TB'},
        {value: '64TB', label: '64TB'},
    ]);

    const [osTypeData, setOsTypeData] = useState([
        {value: 'Windows XP', label: 'Windows XP'},
        {value: 'Windows 7', label: 'Windows 7'},
        {value: 'Windows 8', label: 'Windows 8'},
        {value: 'Windows 10', label: 'Windows 10'},
        {value: 'Windows 11', label: 'Windows 11'},
        {value: 'Windows Server', label: 'Windows Server'},
        {value: 'macOS Big Sur', label: 'macOS Big Sur'},
        {value: 'macOS Catalina', label: 'macOS Catalina'},
        {value: 'macOS Mojave', label: 'macOS Mojave'},
        {value: 'Linux Ubuntu', label: 'Linux Ubuntu'},
        {value: 'Linux Fedora', label: 'Linux Fedora'},
        {value: 'Linux Debian', label: 'Linux Debian'},
        {value: 'Linux CentOS', label: 'Linux CentOS'},
        {value: 'Unix', label: 'Unix'},
        {value: 'Android', label: 'Android'},
        {value: 'iOS', label: 'iOS'},
        {value: 'Chrome OS', label: 'Chrome OS'},
        {value: 'FreeBSD', label: 'FreeBSD'},
        {value: 'Solaris', label: 'Solaris'},
    ]);

    const [osEditionData, setOsEditionData] = useState({
        'Windows XP': ['Home', 'Professional'],
        'Windows 7': ['Home Basic', 'Home Premium', 'Professional', 'Ultimate'],
        'Windows 8': ['Standard', 'Pro', 'Enterprise'],
        'Windows 10': ['Home', 'Pro', 'Enterprise'],
        'Windows 11': ['Home', 'Pro', 'Enterprise'],
        'Windows Server': ['2008', '2012', '2016', '2019'],
        'macOS Big Sur': ['Standard Edition'],
        'macOS Catalina': ['Standard Edition'],
        'macOS Mojave': ['Standard Edition'],
        'Linux Ubuntu': ['Desktop', 'Server'],
        'Linux Fedora': ['Workstation', 'Server'],
        'Linux Debian': ['Desktop', 'Server'],
        'Linux CentOS': ['Desktop', 'Server'],
        'Unix': ['Standard Edition'],
        'Android': ['Standard Edition'],
        'iOS': ['Standard Edition'],
        'Chrome OS': ['Standard Edition'],
        'FreeBSD': ['Standard Edition'],
        'Solaris': ['Standard Edition'],
    });

    const [osArchitectureData, setOsArchitectureData] = useState([
        {value: '32-bit', label: '32-bit'},
        {value: '64-bit', label: '64-bit'},
        {value: 'Multi-bit', label: 'Multi-bit'},
    ]);

    const [statusAssetData, setStatusAssetData] = useState([
        {value: 'Available', label: 'Available'},
        {value: 'Installed', label: 'Installed'},
        // {value: 'Replacement', label: 'Replacement'},
        {value: 'Under Repair', label: 'Under Repair'},
        {value: 'Damaged', label: 'Damaged'},
    ]);

    const [sizeMonitorData, setSizeMonitorData] = useState([
        {value: '14 inch', label: '14 inch'},
        {value: '17 inch', label: '17 inch'},
        {value: '19 inch', label: '19 inch'},
        {value: '21 inch', label: '21 inch'},
        {value: '22 inch', label: '22 inch'},
        {value: '24 inch', label: '24 inch'},
        {value: '27 inch', label: '27 inch'},
        {value: '32 inch', label: '32 inch'},
        {value: '34 inch', label: '34 inch'},
        {value: '40 inch', label: '40 inch'},
        {value: '43 inch', label: '43 inch'},
        {value: '49 inch', label: '49 inch'},
        {value: '55 inch', label: '55 inch'},
        {value: '65 inch', label: '65 inch'},
    ]);
    const [categoryTypeData, setCategoryTypeData] = useState([
        {value: 'ASSET', label: 'ASSET'},
        {value: 'SUPPORT', label: 'SUPPORT'},
    ]);

    const [downtimeCategoryData, setDowntimeCategoryData] = useState([
        {value: 'DATABASE', label: 'DATABASE'},
        {value: 'FILE SHARING', label: 'FILE SHARING'},
        {value: 'INTERNET', label: 'INTERNET'},
        {value: 'SERVER', label: 'SERVER'},
    ]);

    const [categoryWO, setCategoryWO] = useState([
        {value: 'REPAIR', label: 'REPAIR'},
        {value: 'CHANGE', label: 'CHANGE'},
        {value: 'REQUEST DATA', label: 'REQUEST DATA'},
        {value: 'OTHER', label: 'OTHER'},
    ]);

    const [statusWO, setStatusWO] = useState([
        {value: 'CREATED', label: 'CREATED'},
        {value: 'APPROVED', label: 'APPROVED'},
        {value: 'PROGRESS', label: 'PROGRESS'},
        {value: 'DONE', label: 'DONE'},
    ]);

    const value = {
        companyData,
        setCompanyData,
        processorData,
        setProcessorData,
        ramTypeData,
        setRamTypeData,
        ramCapacityData,
        setRamCapacityData,
        storageTypeData,
        setStorageTypeData,
        storageCapacityData,
        setStorageCapacityData,
        osTypeData,
        setOsTypeData,
        osEditionData,
        setOsEditionData,
        osArchitectureData,
        setOsArchitectureData,
        statusAssetData,
        setStatusAssetData,
        sizeMonitorData,
        setSizeMonitorData,
        categoryTypeData,
        setCategoryTypeData,
        downtimeCategoryData,
        setDowntimeCategoryData,
        categoryWO,
        setCategoryWO,
        statusWO,
        setStatusWO
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
