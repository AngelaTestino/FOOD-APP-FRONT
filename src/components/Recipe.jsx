import { NavLink } from "react-router-dom";
import "./Recipe.css";

export default function Recipe({ id, image, title, diets, healthScore }) {
  return (
    <>
      <div className="containerCard">
        <div className="divImg">
          <NavLink className="linkCard" to={`/home/recipes/${id}`}>
            <img className="imgCard" src={image} alt="card"></img>
            <div className="overlayRecipeCard">
              <span className="spanDetails">
                <svg
                  width="36px"
                  height="36px"
                  // style={{ marginRight: "0.5rem" }}
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 511.999 511.999"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        fill="beige"
                        d="M452.385,303.234c-8.626-9.975-23.69-11.241-33.867-2.768l-70.465,58.669c-13.597,11.32-30.73,17.519-48.422,17.519    h-83.315c-12.531,0-22.69-10.158-22.69-22.69c0-12.531,10.158-22.69,22.69-22.69h26.193h53.785c12.531,0,22.69-10.158,22.69-22.69    c0-12.531-10.158-22.69-22.69-22.69H163.513c-25.464,0-48.987,13.617-61.668,35.7l-10.166,17.704    c-7.012,12.211-15.721,23.365-25.866,33.131l-41.587,40.028l59.909,99.542l40.149-37.542    c10.178-9.517,23.591-14.811,37.525-14.811h105.917c24.914,0,49.015-8.867,67.989-25.013l113.362-96.471    C459.526,329.46,461.28,313.52,452.385,303.234z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        fill="beige"
                        d="M450.989,217.24c-7.549-84.89-70.772-154.006-152.815-170.476c0.571-2.634,0.878-5.366,0.878-8.168    C299.052,17.314,281.739,0,260.458,0c-21.281,0-38.594,17.314-38.594,38.595c0,2.803,0.307,5.534,0.878,8.168    C140.7,63.234,77.477,132.351,69.928,217.24H33.143v34.168h454.631V217.24H450.989z"
                      />
                    </g>
                  </g>
                </svg>{" "}
                More details
              </span>
            </div>
          </NavLink>
        </div>
        <div className="divText">
          <p className="title">{title}</p>

          {diets && <p className="textRecipe">{diets.join(", ")}</p>}
          <span className="textScore">
            <svg
              className="svgStar"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 55.867 55.867"
              xmlSpace="preserve"
            >
              <path d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558  s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024  l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506  c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017  l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z" />
            </svg>
            {healthScore}
          </span>
        </div>
      </div>
    </>
  );
}
