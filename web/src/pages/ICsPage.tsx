import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Authorized from "../components/Authorized";
import { AuthContext } from "../contexts/auth";
import Footer from "../components/Footer";
import TextInput from "../components/TextInput";

import "../styles/LandingPage.css";
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
import SelectInput from "../components/SelectInput";
import { getICs } from "../apis/scientificResearch.endpoint";

function ICsPage() {

  const [search, setSearch] = useState("");
  const [institute, setInstitute] = useState("");
  const [status, setStatus] = useState(0);
  const [isShipToDefine, setIsShipToDefine] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [allAreasSelected, setAllAreasSelected] = useState<string[]>([]);
  const [areaSelected, setAreaSelected] = useState("");

  const { signed, setUserInfos } = useContext(AuthContext);
  const navigate = useNavigate()

  const [allFiltedICs, setAllFiltedICs] = useState<IScientificResearch[]>([]);

  function previousPage() {
    setCurrentPage(currentPage - 1)
    console.log(currentPage - 1);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1)
    console.log(currentPage + 1);
  }

  function resetFilters(){
    setCurrentPage(1)
    getFiltedICs("", [], "", 0, "", 1)
  }

  async function getFiltedICs(search:string, area:string[], institute:string, status:number, isShipToDefine:string, currentPage:number) {
    const result = await getICs(search, area, institute, status, isShipToDefine, currentPage);
    const allICs = result.data.allScientificResearch;
    
    setAllFiltedICs(allICs);
  }

  useEffect(() => {
    getFiltedICs(search, allAreasSelected, institute, status, isShipToDefine, currentPage);
  }, [search, allAreasSelected, institute, status, isShipToDefine, currentPage])

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
              <SelectInput
                id="status"
                placeholder="Status"
                icon={""}
                value={status}
                onChange={(e) => {setStatus(parseInt(e.target.value))}}
              >
                <option value={0}>Status</option>
                <option value={1}>Estudante não escolhido</option>
                <option value={2}>Projeto não iniciado</option>
                <option value={3}>Em fase inicial</option>
                <option value={4}>Em andamento</option>
                <option value={5}>Em fase de finalização</option>
                <option value={6}>Finalizado</option>
              </SelectInput>
              <SelectInput
                id="scholarShip"
                placeholder="Bolsa definida"
                icon={""}
                value={isShipToDefine}
                onChange={(e) => {setIsShipToDefine(e.target.value)}}
              >
                <option value="">Bolsa definida?</option>
                <option value="true">Não</option>
                <option value="false">Sim</option>
              </SelectInput>
              <DatalistInput
                id="institute"
                placeholder="Instituto"
                value={institute}
                onChange={(e) => {setInstitute(e.target.value)}}
              >
                {
                  allInstitutes.map((institute, index) => {
                    return <option key={index} value={institute}/>
                  })
                }
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
                    onClick={() => resetFilters()}
                  />
                  <ButtonOrange 
                    title={"Aplicar filtros"}
                    onClick={() => 
                      getFiltedICs(search, allAreasSelected, institute, status, isShipToDefine, 1)
                    } 
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
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
              />
              <div className="ics-cards">
                {
                  allFiltedICs.map((ic, index) => {
                    return <ScientificResearchCard key={index} ic={ic}/>
                  })
                }
              </div>
              <DivPagination functionToBack={previousPage} functionToNext={nextPage} totalThisPage={allFiltedICs.length} currentPage={currentPage}/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ICsPage;