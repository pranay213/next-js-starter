"use client";
import { addModule, getModuleById, getModules, updateModule } from "@/api";
import Appbutton from "@/components/Appbutton/Appbutton";
import AppInput from "@/components/AppInput/AppInput";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import CustomTable from "@/components/Customtable/Customtable";
import Dialog from "@/components/Dailogbox/dailogbox";
import Iconify from "@/components/Iconify/Iconify";
import { useAppDispatch } from "@/redux/hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
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

const headers: HeaderProps[] = [
  { key: "_id", label: "ID" },
  { key: "name", label: "Module Name" },
  { key: "createdAt", label: "Created At" },
  { key: "status", label: "Status" },
];

const Form = ({
  handleChange,
  handleSubmit,
  state,
  operationType,
}: FormProps) => (
  <form onSubmit={handleSubmit} className="mt-6">
    <div className="mb-4">
      <AppInput
        label="Module Name"
        type="text"
        name="name"
        value={state?.name}
        onChange={handleChange}
        error={""}
        icon={<Iconify icon="line-md:email-filled" />}
      />
    </div>

    {operationType === "EDIT" && (
      <div className="mb-4">
        <label
          htmlFor="moduleType"
          className="block text-sm font-medium text-gray-700"
        >
          Module Type
        </label>
        <select
          id="status"
          name="status"
          value={state?.status ? "true" : "false"}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Status</option>
          <option value="true">Active</option>
          <option value="false">In-Active</option>
        </select>
      </div>
    )}

    <Appbutton label="Submit" type="submit" rippleColor="#125" />
  </form>
);
const Modules = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [formState, setFormState] = useState<ModuleProps>({
    name: "",
    status: true,
  });
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<ModuleProps[]>([]);
  const [operationType, setOperationType] = useState<"ADD" | "EDIT">("ADD");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const response: any = await dispatch(getModules());
        if (response?.success) {
          setModules(response.data || []);
        } else {
          console.error("Failed to fetch modules:", response?.error);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const AddHandler = () => {
    setFormState({} as any);
    setOperationType("ADD");
    showDialogFn();
  };
  const showDialogFn = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the API call
    try {
      let response: any;
      if (operationType === "ADD") {
        response = await dispatch(addModule(formState));
      }
      if (operationType === "EDIT") {
        response = await dispatch(updateModule(formState._id, formState));
      }
      if (response?.success) {
        closeDialog(); // Close dialog on success
        toast.success(response?.message || "Request Sent");
        setFormState({} as ModuleProps); // Reset form state
        setRefetch((prev) => prev + 1); // Trigger refetch
      }
    } catch (error) {}
    setLoading(false); // Reset loading on success
  };

  //editfetching handle
  const GetModule = async (id: string) => {
    setLoading(true);
    const response: any = await dispatch(getModuleById(id));
    setLoading(false);
    if (response?.success) {
      showDialogFn();
      setOperationType("EDIT");
      setFormState(response?.data || {});
    }
  };

  const actions = [
    {
      label: "Edit",
      className: "bg-[#f00] text-[#000] hover:bg-blue-600",
      onClick: (module: any) => GetModule(module._id),
    },
  ];

  if (loading) return <Loader />;
  return (
    <>
      <Dialog
        isOpen={showDialog}
        onClose={closeDialog}
        title={`${operationType} Module `}
      >
        <Form
          handleChange={handleChange}
          state={formState}
          handleSubmit={handleSubmit}
          operationType={operationType}
        />
      </Dialog>
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-xl font-bold">Modules</h1>
        <Appbutton label="Add" onClick={AddHandler} />
      </div>
      {loading ? (
        <p className="mt-4 text-center">Loading modules...</p>
      ) : (
        <div className="mt-4">
          <CustomTable
            headers={headers}
            data={modules}
            actions={actions} // Filter actions based on visibility
          />
        </div>
      )}
    </>
  );
};

export default Modules;
