import "./Diets.css"
import React,{useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import Diet from "./Diet"
import {diets} from "../redux/actions"


export default function Diets(){
    let dietas=useSelector(state=>state.diets)
    let dispatch = useDispatch()
    useEffect(()=>{

        diets()(dispatch)
    },[dispatch])

    return (
        <>
        
        <div className="dietsMain">


        {dietas && dietas.map(diet=>{return <Diet key={diet.id} {...diet}/>})}
            

        </div>

        </>


    )






}