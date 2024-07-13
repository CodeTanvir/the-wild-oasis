import { useQueryClient } from "@tanstack/react-query"


const queryClient = useQueryClient()

 const {isLoading: isDeleting, mutate} = useMutation({
    mutationFn:deleteCabin,
    onSuccess:()=>{
      toast.success("Cabin Successfully Deleted")
      queryClient.invalidateQueries({
        queryKey:['cabins'],
        mutationFn:deleteCabin,
      })
    },
    onError: (err)=> toast.error(err.message)
  })