
const gst=(req,res)=>{
    const price=Number(req.productPrice);
    if(price>=1000&&price<=5000){
        return (0.12*price+200);
    }
    else{
        return (0.12*price+200);
    }
}

export default gst