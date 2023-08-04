import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { FieldValues } from "react-hook-form";

import Form from "components/common/Form";

const AdminCreate = () => {
  // const { data: user } = useGetIdentity({
  //   // v3LegacyAuthProviderCompatible: true,
  // });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const onFinishHandler = async (data: FieldValues) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      alert("Password dismatch");
    } else {
      await onFinish({
        ...data,
      });
    }
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
    />
  );
};

export default AdminCreate;
