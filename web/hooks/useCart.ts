import { useSelector } from "react-redux";


interface CartProps{
    addedIds:[number]
    quantityById:{
        id:number
    }
}

export default function useCart(){
    return useSelector((state:CartProps) => state)
}