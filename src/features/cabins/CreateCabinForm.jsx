import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import toast from "react-hot-toast";

function CreateCabinForm({cabinToEdit = {}}) {
 
  const {id: editId, ...editValues} = cabinToEdit;

  const isEditSession = Boolean(editId)

 const {register, handleSubmit, reset, getValues, formState} = useForm({
  defaultValues: isEditSession ? editValues : {}
 });

  const queryClient = useQueryClient();

  const {mutate: createCabin, isLoading:isCreating} = useMutation({
    mutationFn:  createEditCabin,
    onSuccess: ()=>{
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({queryKey: ["cabins"]})
      reset();
    },
    onError:(err)=> toast.error(err.message)
  });


  const {mutate: editCabin, isLoading:isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: ()=>{
      toast.success(" Cabin Successfully edited");
      queryClient.invalidateQueries({queryKey: ["cabins"]})
      reset();
    },
    onError:(err)=> toast.error(err.message)
  });

 const isWorking = isCreating || isEditing

  const {errors} = formState;

  function onSubmit(data){
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId});
   else  createCabin({...data, image: image});
}
  function onError(error){
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

    <FormRow label="Cabin name" error={errors?.name?.message}>
    <Input disabled={isWorking} type="text" id="name" {...register("name",{
          required: "This field is required"
        })}/>
    </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input disabled={isWorking} type="number" id="maxCapacity" {...register("maxCapacity",{
          required:"This field is required",
          min:{
            value:1,
            message:"Capacity should be at least 1"
          }
        })}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input disabled={isWorking} type="number" id="regularPrice" {...register("regularPrice",{
          required:"This field is required",
          min:{
            value:1,
            message:"Price should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register("discount",{
          required:"This field is required",
        validate: (value) => value < Number(getValues().regularPrice) || "Discount should be less than\
        regular price"
        })} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea disabled={isWorking} 
        type="number" id="description" defaultValue="" {...register("description",{
          required:"This field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput disabled={isWorking}
         id="image" accept="image/*"  {...register("image",{
          required: isEditSession ? false : "This field is required",

         })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
