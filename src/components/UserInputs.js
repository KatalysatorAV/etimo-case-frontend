import { useState } from "react";
import styled from "styled-components";
import { colors, measurments, shadows } from "../utils/config";
import Button from "./Button";
import Input from "./Input";

const StyledUserInputs = styled.div`
  form {
    padding: 1rem;
    background: ${colors.neutral[10]};
    border-radius: ${measurments.borderRadius}px;
    box-shadow: ${shadows[3]};
    .inputs-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

const UserInputs = ({ fetchWeather, loading }) => {
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lon: "",
  });

  const [errors, setErrors] = useState({
    lat: false,
    lon: false,
  });

  const handleChange = (e) => {
    setCoordinates({
      ...coordinates,
      [e.target.name]: e.target.value,
    });
  };

  const handleErrors = (lat, lon) => {
    setErrors({
      lat,
      lon,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ lat: false, lon: false });
    fetchWeather(coordinates, handleErrors);
  };

  return (
    <StyledUserInputs>
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          <Input
            required
            label="Longitud"
            type="text"
            disabled={loading}
            value={coordinates.lon}
            name="lon"
            id="lon"
            onChange={handleChange}
            error={errors.lon ? "Felaktigt värde" : ""}
          />
          <Input
            autoFocus
            required
            label="Latitud"
            type="text"
            disabled={loading}
            value={coordinates.lat}
            name="lat"
            id="lat"
            onChange={handleChange}
            error={errors.lat ? "Felaktigt värde" : ""}
          />
        </div>
        <div className="flex jc mtop2">
          <Button type="submit" disabled={loading}>
            {loading ? "Hämtar prognos..." : "Visa väderprogons"}
          </Button>
        </div>
      </form>
    </StyledUserInputs>
  );
};

export default UserInputs;
