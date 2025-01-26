"use client";

import Appbutton from "@/components/Appbutton/Appbutton";
import CustomTable from "@/components/Customtable/Customtable";
import Dailog from "@/components/Dailogbox/dailogbox";
import React, { useEffect, useState } from "react";
import AddCompanyForm from "./components/addcompany/addcompany";
import { useAppDispatch } from "@/redux/hooks";
import { addCompany, getCompanies, getCompnayById } from "@/api";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";

interface ModuleProps {
  _id?: string;
  name: string;
  createdAt?: string;
  status?: boolean;
}

interface HeaderProps {
  key: keyof ModuleProps;
  label: string;
}

interface FormProps {
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => any;
  handleSubmit?: (e: React.FormEvent) => any;
  state: { name: string; _id?: string; status?: boolean };
  operationType?: string;
}

interface Permission {
  id: number;
  name: string;
  checked: boolean;
}

const headers: HeaderProps[] = [
  { key: "name", label: "Company Name" },
  { key: "createdAt", label: "Created At" },
  { key: "status", label: "Status" },
];

const Company: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState([]);
  const [operationType, setOperationType] = useState<"ADD" | "EDIT">("ADD");
  const [formState, setFormState] = useState({
    name: "",
    logo: null as File | null,
    permissions: [] as Permission[],
    address: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await dispatch(getCompanies());
      if (response?.success) {
        setTableData(response.data);
      }
      setLoading(false);
    })();
  }, []);

  const GetCompany = async (id: string) => {
    setLoading(true);
    const response: any = await dispatch(getCompnayById(id));
    setLoading(false);
    if (response?.success) {
      handleOpenModal();
      setOperationType("EDIT");
      setFormState(response?.data || {});
    }
  };

  const handleFormSubmit = async (formState: any) => {
    setLoading(true);
    const response = await dispatch(addCompany(formState));
    setLoading(false);
    setIsModalOpen(false);
    if (response?.success) {
      toast.success(response?.message);
    }
  };

  const actions = [
    {
      label: "Edit",
      className: "bg-[#f00] text-[#000] hover:bg-blue-600",
      onClick: (module: any) => GetCompany(module._id),
    },
  ];

  if (loading) return <Loader />;
  return (
    <>
      <Dailog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add Company"
        overlayBackground="rgba(0, 0, 0, 0.7)"
        // eslint-disable-next-line react/no-children-prop
        children={
          <AddCompanyForm
            onSubmit={handleFormSubmit}
            formState={formState}
            setFormState={setFormState}
            operationType={operationType}
          />
        }
      />
      <div className="flex flex-row items-center justify-between">
        <h1 className="mb-4 text-xl font-bold">Companies</h1>
        <Appbutton
          label="Add-Company"
          bgColor="#252525"
          textColor="#FFFFFF"
          rippleColor="rgba(255, 255, 255, 0.7)"
          onClick={handleOpenModal}
          animation={true}
          additionalStyles={{
            margin: "10px",
          }}
        />
      </div>
      <CustomTable headers={headers} data={tableData} actions={actions} />
    </>
  );
};

export default Company;
