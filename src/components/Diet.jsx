import "./Diet.css"

export default function Diet({name,description}){


    return (
        <>
        
        <div className="dietMain">
            <div className="box">
            <h1>{name}</h1>
            <p>{description}</p></div>

        </div>
        </>
    )
}