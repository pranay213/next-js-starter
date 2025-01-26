/* eslint-disable @next/next/no-img-element */
import { cloudinary_img_path, getModules, getRoles, uploadLogo } from "@/api";
import DynamicButton from "@/components/Appbutton/Appbutton";
import AppInput from "@/components/AppInput/AppInput";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import "@/css/style.css";
import { toast } from "react-toastify";

interface Permission {
  id: number;
  name: string;
  checked: boolean;
}

interface AddCompanyFormProps {
  onSubmit: (data: {
    name: string;
    logo: File | null;
    permissions: Permission[];
    address: string;
    email: string;
    password: string;
  }) => void;
  formState?: any;
  setFormState?: any;
  operationType?: "ADD" | "EDIT";
}

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({
  onSubmit,
  formState,
  setFormState,
  operationType,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [refetch, setRefetch] = useState(0);
  const inputRef: any = useRef(null);
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await dispatch(getRoles());
      if (response?.success) {
        setRoles(response?.data || []);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const response: any = await dispatch(getModules());
        if (response?.success) {
          setFormState((prev: any) => ({
            ...prev,
            permissions: response.data || [],
          }));
        } else {
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [refetch]);

  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    try {
      const file: File | null = event.target.files?.[0] || null;
      if (!file) {
        toast.error("Please select a file");
        return;
      }
      setLoading(true);
      const formData: any = new FormData();
      formData.append("image", file);
      try {
        const response = await dispatch(uploadLogo(formData));
        if (response?.success) {
          const imageUrl = response.data?.public_id;
          setFormState((prev: any) => ({
            ...prev,
            logo: imageUrl,
          }));
          toast.success("Logo uploaded successfully");
        }
      } catch (error: any) {}
    } finally {
      setLoading(false);
    }
  };

  const LogoChange = () => {
    inputRef.current.focus();
  };

  const handleCheckboxChange = (id: number) => {
    setFormState((prev: { permissions: any[] }) => ({
      ...prev,
      permissions: prev.permissions.map((perm: any) =>
        perm._id === id ? { ...perm, checked: !perm.checked } : perm,
      ),
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const selectedPermissions = formState.permissions
      .filter((perm: any) => perm.checked) // Filter permissions with checked=true
      .map((perm: any) => perm._id); // Extract only the _id values

    const payload = {
      ...formState,
      permissions: selectedPermissions, // Replace permissions with _id array
    };
    event.preventDefault();
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex w-[6%] flex-wrap items-center  gap-2">
        <AppInput
          label="Name"
          type="text"
          value={formState.name}
          onChange={(e) =>
            setFormState((prev: any) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <AppInput
          label="Address"
          type="text"
          value={formState.address}
          onChange={(e) =>
            setFormState((prev: any) => ({ ...prev, address: e.target.value }))
          }
          required
        />
        <AppInput
          label="Email"
          type="email"
          value={formState.email}
          onChange={(e) =>
            setFormState((prev: any) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <AppInput
          label="Password"
          type="password"
          value={formState.password}
          onChange={(e) =>
            setFormState((prev: any) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <AppInput
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          label="Choose Logo"
          required
          ref={inputRef}
        />
        {formState.logo && (
          <div
            style={{ border: "5px solid #c1c1c1" }}
            className="ripple-effect cursor-pointer rounded-full"
            onClick={LogoChange}
          >
            <img
              src={`${cloudinary_img_path}/${formState.logo}`}
              alt="Logo Preview"
              onClick={LogoChange}
              style={{ width: "100px", height: "100px" }}
              className="cursor-pointer rounded-full p-1 hover:scale-125"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <div>
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            ROLE
          </label>
        </div>
        <div>
          <select
            className="rounded border p-2"
            onChange={(e) =>
              setFormState((prev: any) => ({ ...prev, role: e.target.value }))
            }
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            {roles
              .filter((role: any) => role.name === "COMPANY") // Only include roles with name "COMPANY"
              .map((role: any) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block font-medium text-black dark:text-white">
          Permissions Modules:
        </label>
        <div className="flex flex-wrap  gap-2">
          {formState.permissions.map((perm: any) => (
            <div
              key={perm.id}
              className="mx-1 mb-2 flex flex-wrap  items-center space-x-2 rounded-lg border border-[#000] px-2 py-2 hover:bg-[#000]"
            >
              <input
                type="checkbox"
                checked={perm.checked}
                onChange={() => handleCheckboxChange(perm._id)}
                className=""
              />
              <label
                className="inline-block cursor-pointer"
                onClick={() => handleCheckboxChange(perm._id)}
              >
                {perm.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <DynamicButton
          disabled={loading}
          type="submit"
          label={`${operationType} Company`}
          bgColor="#258"
          textColor="#FFFFFF"
          rippleColor="rgba(255, 255, 255, 0.7)"
          animation={true}
          additionalStyles={{
            marginTop: "10px",
            width: "full",
            padding: "10px 5px",
          }}
        />
      </div>
    </form>
  );
};

export default AddCompanyForm;
