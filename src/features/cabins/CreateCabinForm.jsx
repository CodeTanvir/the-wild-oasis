import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

// const FormRow2 = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {mutate, isLoading:isCreating} = useMutation({
    mutationFn:  createCabin,
    onSuccess: ()=>{
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({queryKey: ["cabins"]})
      reset();
    },
    onError:(err)=> toast.error(err.message)
  });

  const {register, handleSubmit, reset, getValues, formState} = useForm();

  const {errors} = formState;

  function onSubmit(data){
    mutate({...data, image: data.image[0]});
}
  function onError(error){
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

    <FormRow label="Cabin name" error={errors?.name?.message}>
    <Input disabled={isCreating} type="text" id="name" {...register("name",{
          required: "This field is required"
        })}/>
    </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input disabled={isCreating} type="number" id="maxCapacity" {...register("maxCapacity",{
          required:"This field is required",
          min:{
            value:1,
            message:"Capacity should be at least 1"
          }
        })}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input disabled={isCreating} type="number" id="regularPrice" {...register("regularPrice",{
          required:"This field is required",
          min:{
            value:1,
            message:"Price should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input disabled={isCreating} type="number" id="discount" defaultValue={0} {...register("discount",{
          required:"This field is required",
        validate: (value) => value < Number(getValues().regularPrice) || "Discount should be less than\
        regular price"
        })} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea disabled={isCreating} 
        type="number" id="description" defaultValue="" {...register("description",{
          required:"This field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput disabled={isCreating}
         id="image" accept="image/*"  {...register("image",{
          required:"This field is required"
         })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
