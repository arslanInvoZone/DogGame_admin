import Pets from "../models/petsModel.js";


//@des Add Pets 
//@route POST /api/pets/addpets
//@acess Public
const addPets = async (req, res) => {
    const { name, description, imageUrl,fileUrl } = req.body;
    const pet = await Pets.create({
      name,
      description,
      imageUrl,
      fileUrl,
    });
    if (pet) {
      res.status(201);
      res.json({
        message:'Pet Data Added Successfully!'
      });
    } else {
      res.status(400);
      throw new Error("Invalid Pet Data");
    }
  };

  //@des List Pets 
//@route GET /api/pets/
//@acess Public
const listPets = async (req, res) => {
  try{
    const pets = await Pets.find({});
    res.json({petsArray:pets});
  }catch(error){
    res.json(error) 
  }
};

//@des delete Pet 
//@route POST /api/pets/delete
//@acess Private
const deletePet = async (req, res) => {
  try{
    const {petId} = req.body
    const pet = await Pets.findById({_id:petId});
    if(pet){
      await Pets.deleteOne(pet);
      res.json({message:"Pet Deleted Successfully!"});
    }
  }catch(error){
    res.json(error) 
  }
};

//@des delete Pet 
//@route PUT /api/pets/update
//@acess Private
const updatePet = async (req, res) => {
  try{
    const {petId,petName,petDescription,petImageUrl,petFileUrl} = req.body
    const pet = await Pets.findById({_id:petId});
    if(pet){
    pet.name = petName || pet.name;
    pet.description = petDescription || pet.description;
    pet.imageUrl = petImageUrl || pet.imageUrl;
    pet.fileUrl = petFileUrl || pet.fileUrl
    await pet.save();
    res.status(200).json({
      name:pet.name,
      description:pet.description,
      imageUrl:pet.imageUrl,
      fileUrl : pet.fileUrl
    });
    }else{
      res.status(400).json({message:'pet not found!'});
    }
  }catch(error){
    res.json(error) 
  }
};
export  {addPets,listPets,deletePet,updatePet}; 