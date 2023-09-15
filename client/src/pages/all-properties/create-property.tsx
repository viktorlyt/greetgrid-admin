import { useGetIdentity } from "@refinedev/core";
import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import Form from "components/common/Form";
import { FieldValues } from "react-hook-form";

const CreateProperty = () => {
  const { data: user } = useGetIdentity<{ email: string }>();
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) alert("Please select an image");

    await onFinish({ ...data, photo: propertyImage.url, email: user?.email });
  };

  return (
    <Form
      type="create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
