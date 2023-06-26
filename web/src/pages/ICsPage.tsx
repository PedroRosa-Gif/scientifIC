import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/auth";
import Footer from "../components/Footer";
import TextInput from "../components/TextInput";

import "../styles/LandingPage.css";
import "../styles/ICsPage.css";

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
import Notifier from "../components/Notifier";
import ApplyToAScientifResearchCard from "../components/ApplyToScientificResearchCard";
import { allStatus } from "../utils/constants/allStatus.constants";
import AuthorizedMenu from "../components/AuthorizedMenu";
import Logo from "../components/Logo";

function ICsPage() {

  const [search, setSearch] = useState("");
  const [institute, setInstitute] = useState("");
  const [status, setStatus] = useState(0);
  const [isShipToDefine, setIsShipToDefine] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [allAreasSelected, setAllAreasSelected] = useState<string[]>([]);
  const [areaSelected, setAreaSelected] = useState("");
  
	const [showNotifications, setShowNotifications] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<string[]>([]);

  const [showApplicationCard, setShowApplicationCard] = useState<boolean>(false);
  const [icSelected, setICSelected] = useState<IScientificResearch>();

  const [refresh, setRefresh] = useState(true);

  const { signed, userInfos } = useContext(AuthContext);

  const [allFiltedICs, setAllFiltedICs] = useState<IScientificResearch[]>([]);

  function previousPage() {
    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function resetFilters(){
    setSearch("")
    setInstitute("")
    setStatus(0)
    setIsShipToDefine("")

    setAreaSelected("")
    setAllAreasSelected([])

    setCurrentPage(1)
    setRefresh(!refresh)
  }

  function applyMyInterestAreas() {
    
    if(userInfos.interestAreas === undefined || userInfos.interestAreas.length === 0){
      setNotifications(["Você precisa primeiro setar suas áreas de interesse em seu perfil"]);
      setShowNotifications(true);
    }
    else{
      setSearch("")
      setInstitute("")
      setStatus(1)
      setIsShipToDefine("")

      setAreaSelected("")
      setAllAreasSelected(userInfos.interestAreas)

      setCurrentPage(1)
      setRefresh(!refresh)
    }
  }

  async function getFiltedICs() {
    const result = await getICs(search, allAreasSelected, institute, status, isShipToDefine, currentPage);
    const allICs = result.data.allScientificResearch;
    
    setAllFiltedICs(allICs);
  }

  useEffect(() => {
    getFiltedICs()
  }, [currentPage, refresh])

  return (
    <main className="container">
      <header>
        <nav>
          <div className="nav-landing-page">
            <Logo namePlanet={"pinkPlanet"} colorFont={true} />
            <div className="nav-content">
              <AuthorizedMenu/>
            </div>
          </div>
        </nav>
      </header>
      {showApplicationCard && 
      <ApplyToAScientifResearchCard 
        icSelected={icSelected} 
        setNotifications={setNotifications}
        setShowsetShowApplicationCard={setShowApplicationCard}
        setShowNotifications={setShowNotifications}
      />}
      {showNotifications && <Notifier notifications={notifications} show={showNotifications} setShow={setShowNotifications} />}
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
                <option value="">Status</option>
                {
                  allStatus.map((status, index) => {
                    return <option key={index} value={index + 1}>{status}</option>
                  })
                }
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
                    if(areaSelected !== "" && !allAreasSelected.includes(areaSelected))
                      setAllAreasSelected([...allAreasSelected, areaSelected])
                      setAreaSelected("")
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
                    onClick={applyMyInterestAreas}
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
                    onClick={() => {
                      setCurrentPage(1)
                      setRefresh(!refresh)
                    }} 
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
                    return <ScientificResearchCard 
                              key={index} 
                              ic={ic}
                              setNotifications={setNotifications}
                              setShowNotifications={setShowNotifications}
                              setShowApplicationCard={setShowApplicationCard}
                              setICSelected={setICSelected}
                            />
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