import styled from "styled-components";
import WeatherRow from "./WeatherRow";

const StyledWeatherList = styled.div``;

const WeatherList = ({ weatherData, loading }) => {
  if (loading) return <p className="c">Laddar väderprognos...</p>;
  if (!weatherData) return null;
  return (
    <StyledWeatherList>
      {Object.keys(weatherData).map((key) => (
        <WeatherRow row={weatherData[key]} key={key} date={key} />
      ))}
    </StyledWeatherList>
  );
};

export default WeatherList;
