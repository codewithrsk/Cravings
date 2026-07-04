export const updateUser = async (req, res, next)=>{
    const {fullName , email, phone} = req.body

    res.status(200).json({message:"sucus"})

}