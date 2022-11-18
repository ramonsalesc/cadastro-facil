import React, { PropsWithChildren } from "react";
import { Marker } from "@react-google-maps/api";

interface ImovelProps {
  titleImovel?: string;
  labelImovel?: string | google.maps.MarkerLabel | undefined;
  keyImovel: number | string;
  positionImovel: google.maps.LatLngLiteral;
  onClickImovel: ((e: google.maps.MapMouseEvent) => void) | undefined;
  iconImovel?: string | google.maps.Icon | google.maps.Symbol | undefined;
}

export default function MarkerImovel({
  children,
  titleImovel,
  keyImovel,
  labelImovel,
  positionImovel,
  onClickImovel,
  iconImovel,
}: PropsWithChildren<ImovelProps>) {
  return (
    <Marker
      label={labelImovel}
      title={titleImovel}
      key={keyImovel}
      position={positionImovel}
      onClick={onClickImovel}
      icon={iconImovel}
    >
      {children}
    </Marker>
  );
}
