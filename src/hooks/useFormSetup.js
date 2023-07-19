import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useFormSetup = ({ schema, defaultValues }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  return {
    handleSubmit,
    control,
    errors,
    isValid,
    setValue,
    watch,
    getValues,
    reset,
  };
};

export default useFormSetup