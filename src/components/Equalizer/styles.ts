import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin-left: ${scale(8)}px;
  margin-right: ${scale(8)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${scale(16)}px;
`;

export const ContainerBars = styled.View`
  margin-top: ${scale(16)}px;
  margin-bottom: ${scale(16)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerBar = styled.View`
  align-items: center;
`;

export const ContainerSlider = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerDropdown = styled.View`
  z-index: 1001;
`;

export const LineSeparator = styled.View`
  height: ${scale(1)}px;
  background: #f0f0f0;
`;

// GAIA Equalizer Styles
export const Section = styled.View`
  margin-bottom: ${scale(24)}px;
`;

export const PresetsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${scale(8)}px;
`;

export const PresetButton = styled.TouchableOpacity`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  background-color: #f5f5f5;
  border-radius: ${scale(8)}px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
`;

export const PresetButtonSelected = styled.View`
  background-color: #0033a0;
  border-color: #0033a0;
`;

export const PresetButtonDisabled = styled.View`
  background-color: #f0f0f0;
  border-color: #d0d0d0;
  opacity: 0.5;
`;

export const ControlSwitchContainer = styled.View`
  margin-bottom: ${scale(12)}px;
  padding: ${scale(12)}px;
  background-color: #f9f9f9;
  border-radius: ${scale(8)}px;
`;

export const ControlSwitchContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BandsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: ${scale(200)}px;
`;

export const BandContainer = styled.View`
  align-items: center;
  flex: 1;
`;

export const BandSlider = styled.View`
  height: ${scale(120)}px;
  justify-content: center;
`;

export const VerticalSlider = styled.View`
  transform: rotate(-90deg);
  width: ${scale(120)}px;
`;

export const MasterGainContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(16)}px;
`;

export const MasterGainSlider = styled.View`
  flex: 1;
  margin-horizontal: ${scale(16)}px;
`;

export const HorizontalSlider = styled.View`
  width: 100%;
  height: ${scale(40)}px;
`;
