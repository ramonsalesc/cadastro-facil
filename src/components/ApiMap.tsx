import {
  GoogleMap,
  InfoWindowF,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import pin from "../images/pin.png";
import pin5 from "../images/pin5.png";
import { TailSpin } from "react-loader-spinner";
import SearchBox from "./SearchBox";
import SearchImovel, { type Imovel } from "./SearchImovel";
import MarkerImovel from "./MarkerImovel";
import UpdateImovel from "./UpdateImovel";
import AddImovel from "./AddImovel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Libraries
type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];
const librarie: Libraries = ["places", "geometry"];

export type Coordinates = {
  coordinatesLat?: number;
  coordinatesLng?: number;
};

const TABS = {
  searchEndereco: 0,
  searchImovel: 1,
  route: 2,
};
const TAGGLE = {
  searchUpdate: 0,
  searchAdd: 1,
};

// APIFUNCTION

export default function ApiMap() {
  const center = {
    lat: -10.436044468110113,
    lng: -36.53640426619836,
  };

  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [location, setLocation] = useState<google.maps.LatLngLiteral>(center);
  const [librarie1] = useState<Libraries>(librarie);
  const [activeTab, setActiveTab] = useState(TABS.searchEndereco);
  const [activeTaggle, setActiveTaggle] = useState<number | null>();
  const [activeSearch, setActiveSearch] = useState(false);
  const [imovelData, setImovelData] = useState<Imovel>();
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>();
  const [imoveisData, setImoveisData] = useState<[Imovel]>();
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [activeAdd, setActiveAdd] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: librarie1,
  });

  // ROTA

  const [origin, setOrigin] = useState<
    | string
    | google.maps.LatLngLiteral
    | undefined
    | google.maps.LatLng
    | google.maps.Place
    | null
  >();
  const [pointOrigin, setPointOrigin] =
    useState<google.maps.LatLngLiteral | null>();
  const [destination, setDestination] = useState<
    | string
    | google.maps.LatLng
    | undefined
    | google.maps.Place
    | google.maps.LatLngLiteral
    | null
  >();
  const [response, setResponse] = useState<
    google.maps.DistanceMatrixRequest | null | undefined
  >();

  useEffect(() => {
    axios
      .get("http://localhost:5000/imovel")
      .then(({ data }) => {
        setImoveisData(data);
        console.log("dentro do useefect");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isLoaded && !loadError) {
    toast.info(
      "Para cadastrar um novo imóvel, selecione um imóvel de referência clicando em um marcador no Mapa."
    );

    console.log("no toast");
  }

  const handleOnPlacesChange = () => {
    if (searchBox) {
      const places = searchBox!.getPlaces();
      const place = places![0];
      const newLocation = {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      };
      setLocation(newLocation);
    }
  };

  const handleImoveis = (matricula: number) => {
    imoveisData?.filter((elem) => {
      if (elem.MATRICULA === matricula) {
        setImovelData(elem);
        setActiveSearch(!activeSearch);
      }
    });
  };

  const traceRoute = () => {
    if (pointOrigin && imovelData) {
      setOrigin(pointOrigin);
      setDestination({
        lat: imovelData.COORDENADAX,
        lng: imovelData.COORDENADAY,
      });
    }
  };

  const onPointClear = (point: google.maps.LatLngLiteral) => {
    setOrigin(null);
    setDestination(null);
    setResponse(null);
  };
  const onOringinChanged = (point: google.maps.LatLngLiteral) => {};
  const onDestinyChanged = (point: google.maps.LatLngLiteral) => {};
  // @ts-ignore
  const directionsServiceOption = useMemo<google.maps.DirectionsRequest>(() => {
    return {
      origin,
      destination,
      travelMode: "DRIVING",
    };
  }, [origin, destination]);

  // const directionasCallBack = (useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
  //   if (result!==null) {
  //     setResponse(result)
  //   }
  // }, []))

  const directionsRendererOptions = useMemo<any>(() => {
    return { directions: response };
  }, [response]);

  const renderMap = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-justify">
          <ToastContainer
            position="top-center"
            autoClose={10000}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>

        <GoogleMap
          zoom={12}
          center={
            imovelData && activeTab === 1
              ? {
                  lat: imovelData?.COORDENADAX!,
                  lng: imovelData?.COORDENADAY!,
                }
              : location
          }
          mapContainerStyle={{ width: "100%", height: "90vh" }}
          onRightClick={(e) => {
            let coordinatesLat = e?.latLng?.lat();
            let coordinatesLng = e?.latLng?.lng();

            e.stop();
            setCoordinates({ coordinatesLat, coordinatesLng });
          }}
        >
          <div className=" flex w-full justify-center ">
            {!activeAdd && !activeUpdate && (
              <div className="absolute min-w-min border rounded-md p-2 m-2 h-36 w-2/12 space-y-4 box-border shadow-md bg-white bg-opacity-70">
                <nav className="space-x-1 text-sm flex flex-row opacity-80 w-full text-white">
                  <button
                    type="submit"
                    className={`${
                      activeTab === TABS.searchEndereco ? " bg-blue-800" : ""
                    } text-center  rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600`}
                    onClick={() => setActiveTab(TABS.searchEndereco)}
                  >
                    ENDEREÇO
                  </button>
                  <button
                    type="submit"
                    className={`${
                      activeTab === TABS.searchImovel ? " bg-blue-800" : ""
                    } text-center  rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600`}
                    onClick={() => setActiveTab(TABS.searchImovel)}
                  >
                    IMÓVEL
                  </button>
                  {/* <button
                    type="submit"
                    className={`${
                      activeTab === TABS.route ? " bg-blue-800" : ""
                    } text-center  rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600`}
                    onClick={() => setActiveTab(TABS.route)}
                  >
                    ROTA
                  </button> */}
                </nav>
                {activeTab === TABS.searchEndereco ? (
                  <SearchBox
                    onLoad={setSearchBox}
                    onPlacesChanged={handleOnPlacesChange}
                  />
                ) : activeTab === TABS.searchImovel ? (
                  <SearchImovel handleImoveis={handleImoveis}></SearchImovel>
                ) : null}
              </div>
            )}

            {activeUpdate && selectedImovel && (
              <UpdateImovel
                imovel={selectedImovel}
                imoveis={imoveisData}
                activeUpdateImovel={activeUpdate}
                onClickCloseUpdateImovel={() => {
                  return setActiveUpdate(false), setActiveTaggle(null);
                }}
              ></UpdateImovel>
            )}
            {activeAdd && selectedImovel && coordinates && (
              <AddImovel
                imovel={selectedImovel}
                activeAddImovel={activeAdd}
                onClickCloseAddImovel={() => {
                  return (
                    setCoordinates(null),
                    setActiveAdd(false),
                    setActiveTaggle(null)
                  );
                }}
                imoveis={imoveisData}
                coordinates={coordinates}
              ></AddImovel>
            )}

            {imovelData && (
              <MarkerImovel
                titleImovel={`Imóvel ${imovelData?.MATRICULA}`}
                keyImovel={imovelData?.MATRICULA || ""}
                iconImovel={
                  imovelData
                    ? {
                        url: pin,
                        scaledSize: new window.google.maps.Size(38, 38),
                      }
                    : {
                        url: pin5,
                        scaledSize: new window.google.maps.Size(26, 38),
                      }
                }
                positionImovel={{
                  lat: imovelData?.COORDENADAX!,
                  lng: imovelData?.COORDENADAY!,
                }}
                onClickImovel={() => {
                  return setSelectedImovel(imovelData);
                }}
              >
                {imovelData && selectedImovel === imovelData ? (
                  <InfoWindowF
                    options={{ minWidth: 200 }}
                    onCloseClick={() => {
                      return (
                        setImovelData(undefined),
                        setSelectedImovel(null),
                        setActiveUpdate(false),
                        setActiveAdd(false)
                      );
                    }}
                  >
                    <div className="text-blue-600 flex flex-col space-y-2 items-start">
                      <h1 className="text-blue-600 text-sm font-semibold">
                        Dados do imóvel
                      </h1>
                      <p>Matricula: {imovelData.MATRICULA}</p>
                      <p>Endereço: </p>
                      <span className="text-blue-600">{`${imovelData.ENDERECO[0].TIPO_LOGRADOURO} ${imovelData.ENDERECO[0].LOGRADOURO}, ${imovelData.ENDERECO[0].NUM_IMOVEL}`}</span>
                      <div className="space-x-1 flex flex-row opacity-80 w-full text-white">
                        <button
                          type="submit"
                          className={`${
                            activeTaggle === TAGGLE.searchUpdate
                              ? " bg-blue-800"
                              : ""
                          } text-center  rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600`}
                          onClick={() => {
                            return (
                              setActiveUpdate(true),
                              setActiveTaggle(TAGGLE.searchUpdate),
                              setActiveAdd(false)
                            );
                          }}
                        >
                          EDITAR
                        </button>
                        <button
                          type="submit"
                          className={`${
                            activeTaggle === TAGGLE.searchAdd
                              ? " bg-blue-800"
                              : ""
                          } text-center  rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600`}
                          onClick={() => {
                            if (coordinates === null || !coordinates) {
                              toast.info(
                                "Antes de informar os dados do imóvel, marque com um clique do botão direito do mouse a localização do imóvel a ser cadastro."
                              );
                            }

                            return (
                              setActiveAdd(true),
                              setActiveTaggle(TAGGLE.searchAdd),
                              setActiveUpdate(false)
                            );
                          }}
                        >
                          NOVO
                        </button>
                      </div>
                    </div>
                  </InfoWindowF>
                ) : (
                  ""
                )}
              </MarkerImovel>
            )}

            {imoveisData
              ?.filter((a) => a.MATRICULA !== imovelData?.MATRICULA)
              .map((item) => (
                <MarkerImovel
                  titleImovel={`Imóvel ${item?.MATRICULA}`}
                  key={item.MATRICULA}
                  keyImovel={item.MATRICULA}
                  iconImovel={
                    selectedImovel && selectedImovel === item ? pin : ""
                  }
                  positionImovel={{
                    lat: item.COORDENADAX!,
                    lng: item.COORDENADAY!,
                  }}
                  onClickImovel={() => {
                    return setSelectedImovel(item);
                  }}
                >
                  {selectedImovel && selectedImovel === item ? (
                    <InfoWindowF
                      key={`infoWindow-${item.MATRICULA}`}
                      onCloseClick={() => {
                        return (
                          setSelectedImovel(null),
                          setActiveUpdate(false),
                          setActiveAdd(false)
                        );
                      }}
                    >
                      <div className="text-blue-600 flex flex-col space-y-2 items-start">
                        <h1 className="text-blue-600 text-sm font-semibold">
                          Dados do imóvel
                        </h1>
                        <p>Matricula: {item.MATRICULA}</p>
                        <p>Endereço: </p>
                        <span className="text-blue-600">{`${item.ENDERECO[0].TIPO_LOGRADOURO} ${item.ENDERECO[0].LOGRADOURO}, ${item.ENDERECO[0].NUM_IMOVEL}`}</span>
                        <div className="space-x-1 flex flex-row opacity-80 w-full text-white">
                          <button
                            type="submit"
                            className={`${
                              activeTaggle === TAGGLE.searchUpdate
                                ? " bg-blue-800"
                                : ""
                            } text-center  rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600`}
                            onClick={() => {
                              return (
                                setActiveUpdate(true),
                                setActiveTaggle(TAGGLE.searchUpdate),
                                setActiveAdd(false)
                              );
                            }}
                          >
                            EDITAR
                          </button>
                          <button
                            type="submit"
                            className={`${
                              activeTaggle === TAGGLE.searchAdd
                                ? " bg-blue-800"
                                : ""
                            } text-center  rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600`}
                            onClick={() => {
                              // if (coordinates === null || !coordinates) {
                              //   toast.info(
                              //     "Antes de informar os dados do imóvel, marque com um clique do botão direito do mouse a localização do imóvel a ser cadastro."
                              //   );
                              // }

                              return (
                                setActiveAdd(true),
                                setActiveTaggle(TAGGLE.searchAdd),
                                setActiveUpdate(false)
                              );
                            }}
                          >
                            NOVO
                          </button>
                        </div>
                      </div>
                    </InfoWindowF>
                  ) : (
                    ""
                  )}
                </MarkerImovel>
              ))}
            {/* {origin && destination && (
              <DirectionsService
                options={directionsServiceOption}
                callback={directionasCallBack}
              />
            )} */}
          </div>
        </GoogleMap>
      </div>
    );
  };

  if (loadError) {
    return (
      <div className="flex flex-col justify-center items-center">
        Map cannot be loaded right now, sorry.
      </div>
    );
  }

  return isLoaded ? (
    renderMap()
  ) : (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <TailSpin />
    </div>
  );
}
