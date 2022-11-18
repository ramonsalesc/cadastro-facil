import { InfoWindow } from "@react-google-maps/api";
import React, { PropsWithChildren } from "react";
import { Imovel } from "./SearchImovel";
type InfoWindowImovelProps = {
  item: Imovel;
  keyInfoWindowImovel: number | string;
  onCloseClick: (() => void) | undefined;
};
export default function InfoWindowImovel({
  children,
  keyInfoWindowImovel,
  item,
  onCloseClick,
}: PropsWithChildren<InfoWindowImovelProps>) {
  return (
    <InfoWindow key={keyInfoWindowImovel} onCloseClick={onCloseClick}>
      {children}
    </InfoWindow>
  );
}
