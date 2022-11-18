import { StandaloneSearchBox } from "@react-google-maps/api";
import React from "react";

type SearchBoxProps = {
  onLoad?: (searchBox: google.maps.places.SearchBox) => void;
  onPlacesChanged?: () => void;
};

export default function SearchBox({ onLoad, onPlacesChanged }: SearchBoxProps) {
  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
      <input
        autoFocus
        type="text"
        placeholder="Busque o endereço..."
        className="rounded-md bg-transparent py-1 border-blue-400 font-normal text-sm"
      />
    </StandaloneSearchBox>
  );
}
