import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(){
let { data, error } = await supabase.from('cabins').select('*')
if(error){
    throw new Error('Cabins could not be loaded')
}
return data
}

export async function createCabin(newCabin){
const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/","");
const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

const { data, error } = await supabase
.from('cabins')
.insert([{...newCabin, image:imagePath}])

if(error){
    console.error(error);
    throw new Error("Cabin Could not be created")
}

  const { error: storageError } = await supabase.storage
  .from('cabin-images').upload(imageName, newCabin.image)
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id)
    throw new Error("Cabin image could not be uploaded and the cabin was not created")
  } else {
   return data;
  }
 
}



export async function deleteCabin(id){

const {data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)

if(error){
    console.error(error);
    throw new Error("Cabin Could not be deleted")
}
return data;
}