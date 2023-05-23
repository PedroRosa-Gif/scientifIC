import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Authorized from "../components/Authorized/Authorized";
import { AuthContext } from "../contexts/auth";
import Footer from "../components/Footer";
import TextInput from "../components/TextInput";

import "./LandingPage.css";
import "../styles/ICsPage.css";

import logoAzul from "../assets/imgs/logo-azul.png";

import SearchIcon from "../assets/icons/search_icon.svg";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearchCard from "../components/ScientificResearchCard";
import DivPagination from "../components/DivPagination";
import DatalistInput from "../components/DatalistInput";
import { allInstitutes } from "../utils/constants/allInstitutes.constants";
import ButtonOrange from "../components/ButtonOrange";
import { allAreas } from "../utils/constants/allAreas.constants";

function ICsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allAreasSelected, setAllAreasSelected] = useState<string[]>([]);
  const [areaSelected, setAreaSelected] = useState("");

  const { signed, setUserInfos } = useContext(AuthContext);
  const navigate = useNavigate()

  const allICs:IScientificResearch[] = [
    {
      title: "Título 1",
      dateToBegin: new Date(),
      forecastFinish:  new Date(),
      areas: ["Área 1", "Área 2"],
      theme: "Tema 1",
      advisorId: "Orientadora 1",
      desireSkills: ["Skill 1", "Skill 2", "Skill 3"],
      studentId: "",
      scholarShip: 1500.00,
      status: 2,
      abstract: "",
      linkToMore: "",
      createdAt: new Date(),
      updateAt: new Date(),
      isShipToDefine: false
    },
    {
      title: "Título 1",
      dateToBegin: new Date(),
      forecastFinish:  new Date(),
      areas: ["Área 1", "Área 2"],
      theme: "Tema 1",
      advisorId: "Orientadora 1",
      desireSkills: ["Skill 1", "Skill 2", "Skill 3"],
      studentId: "",
      scholarShip: 1500.00,
      status: 2,
      abstract: "",
      linkToMore: "",
      createdAt: new Date(),
      updateAt: new Date(),
      isShipToDefine: false
    },
    {
      title: "",
      dateToBegin: new Date(),
      forecastFinish:  new Date(),
      areas: ["Área 2", "Área 4"],
      theme: "Tema 2",
      advisorId: "Orientador 2",
      desireSkills: ["Skill 1", "Skill 2", "Skill 3"],
      studentId: "",
      scholarShip: 950.60,
      status: 1,
      abstract: "",
      linkToMore: "",
      createdAt: new Date(),
      updateAt: new Date(),
      isShipToDefine: true
    },
  ]

  function previousPage() {
    setCurrentPage(currentPage - 1)
    console.log(currentPage - 1);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1)
    console.log(currentPage + 1);
  }

  return (
    <main className="container">
      <header>
        <nav>
          <div className="nav-landing-page">
            <div className="nav-brand">
              <NavLink to={"/"} className="link">
                <img src={logoAzul} alt="LOGO" />
              </NavLink>
              <h1>Scientif<strong>IC</strong></h1>
            </div>
            <div className="nav-content">
              <Authorized 
                isAuthorized={signed}
                authorize={
                  <div className="nav-user">
                    <button onClick={() => {
                      setUserInfos(null);
                      navigate("/");
                    }}>Logout</button>
                    <button>Perfil</button>
                  </div>
                }
                notAuthorize={
                  <div className="nav-user">
                    <NavLink to={"/cadastro"} className="link"><button>Cadastrar</button></NavLink>
                    <NavLink to={"/login"} className="link"><button>Entrar</button></NavLink>
                  </div>
                }
              />
            </div>
          </div>
        </nav>
      </header>
      <section>
        <div className="cards-landing-area ics">
          <h1>Iniciações e Estudos</h1>
          <div className="container-filters-results">
            <div className="container-filters">
              <DatalistInput
                id="institute"
                placeholder="Instituto"
              >
                {
                  allInstitutes.map((institute, index) => {
                    return <option key={index} value={institute}/>
                  })
                }
              </DatalistInput>
              <DatalistInput
                id="status"
                placeholder="Status"
              >
                <option value="Estudante não escolhido" />
                <option value="Projeto não iniciado" />
                <option value="Em fase inicial" />
                <option value="Em andamento" />
                <option value="Em fase de finalização" />
                <option value="Finalizado" />
              </DatalistInput>
              <DatalistInput
                id="scholarShip"
                placeholder="Valor da bolsa"
              >
                <option value="A definir" />
                <option value="Abaixo de R$300,00" />
                <option value="Entre R$300,00 e R$500,00" />
                <option value="Entre R$500,00 e R$1000,00" />
                <option value="Entre R$1000,00 e R$2000,00" />
                <option value="Acima de R$2000,00" />
              </DatalistInput>
              <div className="filter-area">
                <DatalistInput
                  id="area"
                  placeholder="Áreas"
                  value={areaSelected}
                  onChange={(e) => setAreaSelected(e.target.value)}
                >
                  {
                    allAreas.map((area, index) => {
                      return <option key={index} value={area}/>
                    })
                  }
                </DatalistInput>
                <button 
                  className="add-area"
                  onClick={() => {
                    if(areaSelected !== "")
                      setAllAreasSelected([...allAreasSelected, areaSelected])
                  }}
                >
                  <p>[+] Adicionar área</p>
                </button>
                <div className="areas-selected">
                  {
                    allAreasSelected.map((area, index) => {
                      return(
                        <div key={index} className="area-selected">
                          <button 
                            onClick={() => {
                              let newArray = [...allAreasSelected]
                              newArray.splice(index, 1)
                              setAllAreasSelected(newArray)
                            }}
                          >
                            [X]
                          </button>
                          <span>{area}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <hr />
              <div className="buttons">
                { signed ? 
                  <ButtonOrange 
                    title={"Filtrar por minhas áreas de interesse"}
                  /> 
                  : <></>
                }
                <div>
                  <ButtonOrange 
                    title={"Remover filtros"} 
                  />
                  <ButtonOrange 
                    title={"Aplicar filtros"} 
                  />
                </div>
              </div>
            </div>
            <div className="container-results">
              <TextInput 
                icon={SearchIcon}
                placeholder="Pesquisar"
                type="text"
                className="search-input"
              />
              <div className="ics-cards">
                {
                  allICs.map((ic, index) => {
                    return <ScientificResearchCard key={index} ic={ic}/>
                  })
                }
              </div>
              <DivPagination functionToBack={previousPage} functionToNext={nextPage} currentPage={currentPage}/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ICsPage;