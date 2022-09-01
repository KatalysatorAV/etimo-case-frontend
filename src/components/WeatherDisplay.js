import styled from "styled-components";
import { wsymb2Dict } from "../utils/wsymb2";

const StyledWeatherDisplay = styled.span`
  img {
    width: 30px;
  }
`;

const WeatherDisplay = ({ data }) => {
  if (!data) return "-";
  return (
    <StyledWeatherDisplay>
      {data.t}°C,{" "}
      <img
        src={`/wsymb2icons/${data.wsymb2}.png`}
        alt={wsymb2Dict[data.wsymb2]}
        title={wsymb2Dict[data.wsymb2]}
      />
    </StyledWeatherDisplay>
  );
};

export default WeatherDisplay;
